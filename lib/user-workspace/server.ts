import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { adapterKnowledgeSources, adapterPersonas, adapterPromptTypes, adapterTemplates } from "@/lib/user-workspace/data";
import { estimateModelCost } from "@/lib/user-workspace/pricing";
import { getPrismRuntimeStatus, responseFromAgentRun, routePrismTask, runPrismCoderPlan } from "@/lib/user-workspace/prism-kernel";
import { isCoderIntent, permissionsForRole, roleFromProfile, validateUpload } from "@/lib/user-workspace/intent.js";
import type { RequestIdentity } from "@/lib/user-workspace/auth";
import type { ApiEnvelope, Approval, Artifact, ChatRequest, ChatResponse, ModelInfo, Notification, UsageSummary, UserProfile, UserTask, WorkspaceFile } from "@/lib/user-workspace/types";

const execFileAsync = promisify(execFile);
type Store = { tasks: UserTask[]; chats: ChatResponse[]; files: WorkspaceFile[]; artifacts: Artifact[]; approvals: Approval[]; notifications: Notification[] };
const globalStore = globalThis as typeof globalThis & { __prismUserWorkspace?: Store };
const store = globalStore.__prismUserWorkspace ?? { tasks: [], chats: [], files: [], artifacts: [], approvals: [], notifications: [] };
globalStore.__prismUserWorkspace = store;

const todo = "TODO(PRISM-API): replace adapter response when this backend endpoint is deployed";

export function profileFor(identity: RequestIdentity): ApiEnvelope<UserProfile> {
  const role = roleFromProfile(identity.role, identity.jobRole) as UserProfile["role"];
  const persona = role === "developer" ? "developer" : role === "administrator" ? "administrator" : "business-user";
  return { source: "adapter", todo, data: { id: identity.id, name: identity.name, email: identity.email, organization: identity.organization, department: identity.department, role, jobRole: identity.jobRole, activePersonaId: persona, subscriptionPlan: "Unassigned", permissions: permissionsForRole(role), source: "adapter" } };
}

export const personaEnvelope = () => ({ data: adapterPersonas, source: "adapter" as const, todo });
export const promptTypeEnvelope = () => ({ data: adapterPromptTypes, source: "adapter" as const, todo });
export const templateEnvelope = () => ({ data: adapterTemplates, source: "adapter" as const, todo });
export const knowledgeEnvelope = () => ({ data: adapterKnowledgeSources, source: "adapter" as const, todo });

function usage(): UsageSummary {
  const inputTokens = store.chats.reduce((sum, item) => sum + item.inputTokens, 0);
  const outputTokens = store.chats.reduce((sum, item) => sum + item.outputTokens, 0);
  const estimatedCostUsd = store.chats.reduce((sum, item) => sum + item.estimatedCostUsd, 0);
  const today = new Date().toISOString().slice(0, 10);
  const tasks = store.tasks.filter((task) => task.createdAt.startsWith(today));
  return {
    inputTokens, outputTokens, totalTokens: inputTokens + outputTokens, estimatedCostUsd: Number(estimatedCostUsd.toFixed(6)),
    monthlyBudgetUsd: 0, remainingBudgetUsd: 0,
    mostUsedModel: store.chats[0]?.model || null, mostUsedTaskType: store.tasks[0]?.taskType || null,
    tasksToday: { created: tasks.length, completed: tasks.filter((item) => item.status === "completed").length, awaitingReview: tasks.filter((item) => item.status === "awaiting-review").length, failed: tasks.filter((item) => item.status === "failed").length, drafts: tasks.filter((item) => item.status === "draft").length },
  };
}

export const usageEnvelope = () => ({ data: usage(), source: "adapter" as const, todo });
export const tasksEnvelope = () => ({ data: store.tasks, source: "adapter" as const, todo });
export const historyEnvelope = () => ({ data: store.chats, source: "adapter" as const, todo });
export const filesEnvelope = () => ({ data: store.files, source: "adapter" as const, todo });
export const artifactsEnvelope = () => ({ data: store.artifacts, source: "adapter" as const, todo });
export const approvalsEnvelope = () => ({ data: store.approvals, source: "adapter" as const, todo });
export const notificationsEnvelope = () => ({ data: store.notifications, source: "adapter" as const, todo });
export async function prismStatusEnvelope() { return { data: await getPrismRuntimeStatus(), source: "backend" as const }; }

let modelsCache: { expires: number; data: ModelInfo[] } | null = null;
export async function modelsEnvelope(): Promise<ApiEnvelope<ModelInfo[]>> {
  if (modelsCache && modelsCache.expires > Date.now()) return { data: modelsCache.data, source: "backend" };
  const sql = "SELECT model_id,label,provider,tier,context_window,is_recommended FROM `ctoteam.prism_model_catalog.model_pricing` QUALIFY ROW_NUMBER() OVER(PARTITION BY model_id ORDER BY effective_date DESC,created_at DESC)=1 ORDER BY is_recommended DESC,provider";
  try {
    const { stdout } = await execFileAsync("bq", ["query", "--location=us-central1", "--use_legacy_sql=false", "--format=json", sql], { timeout: 30_000, maxBuffer: 2_000_000 });
    const rows = JSON.parse(stdout) as Record<string, string>[];
    const data = rows.map((row) => ({ id: row.model_id, label: row.label, provider: row.provider, tier: row.tier, contextWindow: row.context_window, recommended: row.is_recommended === "true", dataPolicy: "Governed by organization policy" }));
    modelsCache = { expires: Date.now() + 300_000, data };
    return { data, source: "backend" };
  } catch {
    return { data: [{ id: "automatic", label: "Automatic routing", tier: "governed", recommended: true }], source: "adapter", todo: "TODO(PRISM-API): model catalog unavailable; check BigQuery credentials" };
  }
}

async function token() {
  if (process.env.GOOGLE_OAUTH_ACCESS_TOKEN) return process.env.GOOGLE_OAUTH_ACCESS_TOKEN;
  const { stdout } = await execFileAsync("gcloud", ["auth", "print-access-token"], { timeout: 15_000, maxBuffer: 1_000_000 });
  return stdout.trim();
}

async function generateWithVertex(prompt: string, agent: ChatResponse["agent"]) {
  const project = process.env.GOOGLE_CLOUD_PROJECT || "ctoteam";
  const location = process.env.VERTEX_LOCATION || "global";
  const model = process.env.USER_WORKSPACE_VERTEX_MODEL || "gemini-3.5-flash";
  const response = await fetch(`https://aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`, {
    method: "POST",
    headers: { authorization: `Bearer ${await token()}`, "content-type": "application/json", "x-goog-user-project": project },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: `You are ${agent}, the governed enterprise assistant in AIDIRAC. Give a useful, accurate response. Never claim to have executed tools, edited files, or deployed anything unless the runtime explicitly did so.\n\n${prompt}` }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 4096 } }),
    signal: AbortSignal.timeout(120_000),
  });
  const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>; usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number }; error?: { message?: string } };
  if (!response.ok) throw new Error(payload.error?.message || `Vertex AI returned HTTP ${response.status}`);
  const text = payload.candidates?.flatMap((candidate) => candidate.content?.parts || []).map((part) => part.text || "").filter(Boolean).join("\n\n") || "No response was returned.";
  return { text, model, inputTokens: payload.usageMetadata?.promptTokenCount || 0, outputTokens: payload.usageMetadata?.candidatesTokenCount || 0 };
}

function governanceFor(request: ChatRequest) {
  if (request.sensitivity === "restricted") return "Needs review" as const;
  if (/\b(password|secret key|private key|social security|credit card)\b/i.test(request.prompt)) return "Sensitive content detected" as const;
  return "Approved" as const;
}

export async function runChat(request: ChatRequest, profile: UserProfile): Promise<ApiEnvelope<ChatResponse>> {
  if (!request.prompt.trim()) throw new Error("Prompt is required");
  const started = performance.now();
  const technical = isCoderIntent(request.prompt);
  const authorizedCoder = technical && profile.permissions.canUseCoderAgent;
  const agent: ChatResponse["agent"] = technical ? "PRISM Coder Agent" : "PRISM";
  const context = {
    workspace_id: request.workspaceId,
    project_name: "aidirac-user-workspace",
    user_id: profile.id,
    organization_id: request.organizationId,
    persona: request.persona,
    task_type: request.taskType,
    sensitivity: request.sensitivity,
    approval_required: request.sensitivity === "restricted",
  };
  let prismRoute: Awaited<ReturnType<typeof routePrismTask>> | null = null;
  let prismRouteError: string | null = null;
  try { prismRoute = await routePrismTask(request.prompt, context); }
  catch (error) { prismRouteError = error instanceof Error ? error.message : "PRISM routing unavailable"; }

  let generation: Awaited<ReturnType<typeof generateWithVertex>>;
  let executionBackend: ChatResponse["executionBackend"] = "vertex-ai";
  let executionStatus: ChatResponse["executionStatus"] = prismRoute ? "routed" : "fallback";
  let kernelRequestId: string | undefined;
  let kernelGraph: Array<Record<string, unknown>> | undefined;
  let coderFallback: string | null = null;
  if (authorizedCoder) {
    try {
      const run = await runPrismCoderPlan(request.prompt, context);
      const response = responseFromAgentRun(run);
      if (!response) throw new Error("PRISM Coder Agent returned execution metadata without a response");
      const coderModel = prismRoute?.routes.find((route) => route.agent === "coder")?.model || prismRoute?.recommendedModel || "PRISM routed model";
      generation = { text: response, model: coderModel, inputTokens: 0, outputTokens: 0 };
      executionBackend = "prism-v2-kernel";
      executionStatus = "completed";
      kernelRequestId = run.request_id;
      kernelGraph = run.graph;
    } catch (error) {
      coderFallback = error instanceof Error ? error.message : "PRISM Coder Agent execution unavailable";
      generation = await generateWithVertex(request.prompt, agent);
      executionStatus = "fallback";
    }
  } else {
    generation = await generateWithVertex(request.prompt, agent);
  }
  const timestamp = new Date().toISOString();
  const routingReason = technical
    ? authorizedCoder
      ? coderFallback
        ? `PRISM routed this technical request to Coder Agent, but plan execution was unavailable (${coderFallback}). Vertex AI supplied a non-executing fallback response.`
        : prismRoute?.routingReason || "PRISM classified and routed this request to Coder Agent"
      : "Technical intent detected; Coder Agent requires developer permission, so Vertex AI supplied advisory guidance only"
    : prismRoute?.routingReason || prismRouteError || "Business request handled by the governed Vertex AI assistant";
  const result: ChatResponse = {
    id: crypto.randomUUID(), conversationId: request.conversationId || crypto.randomUUID(), prompt: request.prompt,
    response: generation.text, persona: request.persona, taskType: request.taskType, model: generation.model,
    modelMode: request.modelPreference, routingReason,
    agent, technicalExecutionRequired: technical, sources: prismRoute ? [{ id: "prism-v2-kernel", title: "PRISM v2 governed intent and model route" }] : [], confidence: prismRoute?.confidence || 0.82, durationMs: Math.round(performance.now() - started),
    inputTokens: generation.inputTokens, outputTokens: generation.outputTokens, estimatedCostUsd: await estimateModelCost(generation.model, generation.inputTokens, generation.outputTokens),
    governanceStatus: governanceFor(request), timestamp, executionBackend, executionStatus, kernelRequestId, kernelGraph,
  };
  store.chats.unshift(result);
  store.tasks.unshift({ id: result.id, title: request.prompt.slice(0, 72), taskType: request.taskType, persona: request.persona, status: result.governanceStatus === "Needs review" ? "awaiting-review" : "completed", model: result.model, outputFormat: request.outputFormat, owner: profile.name, createdAt: timestamp, updatedAt: timestamp });
  store.notifications.unshift({ id: crypto.randomUUID(), type: "task-completed", title: "Task completed", message: request.prompt.slice(0, 100), read: false, createdAt: timestamp });
  return { data: result, source: "backend" };
}

export function addFile(file: File, owner: string, sensitivity: string) {
  const error = validateUpload(file.name, file.size);
  if (error) throw new Error(error);
  const item: WorkspaceFile = { id: crypto.randomUUID(), name: file.name, type: file.type || file.name.split(".").pop() || "file", size: file.size, owner, uploadedAt: new Date().toISOString(), processingStatus: "Uploaded", indexingStatus: "Not indexed", sensitivity, source: "User upload" };
  store.files.unshift(item);
  return { data: item, source: "adapter" as const, todo };
}

export function generateArtifact(input: { name?: string; type?: string }, owner: string) {
  const item: Artifact = { id: crypto.randomUUID(), name: input.name || "Generated artifact", type: input.type || "Document", status: "Ready", createdAt: new Date().toISOString(), version: "1.0", owner, approvalStatus: "Draft" };
  store.artifacts.unshift(item);
  return { data: item, source: "adapter" as const, todo };
}

export function createApproval(input: { title?: string }, owner: string) {
  const item: Approval = { id: crypto.randomUUID(), title: input.title || "Content review", status: "Ready for review", owner, updatedAt: new Date().toISOString() };
  store.approvals.unshift(item);
  return { data: item, source: "adapter" as const, todo };
}
