"use client";

import { getCurrentToken, getCurrentUser } from "@/utils/portalAuth";
import type { ApiEnvelope, Approval, Artifact, ChatRequest, ChatResponse, KnowledgeSource, ModelInfo, Notification, Persona, PrismRuntimeStatus, PromptType, Template, UsageSummary, UserProfile, UserTask, WorkspaceFile } from "@/lib/user-workspace/types";

const baseUrl = (process.env.NEXT_PUBLIC_USER_WORKSPACE_API_URL || "").replace(/\/$/, "");

export class WorkspaceApiError extends Error {
  constructor(message: string, public status: number, public retryable: boolean) { super(message); this.name = "WorkspaceApiError"; }
}

type RequestOptions = RequestInit & { timeoutMs?: number; retries?: number };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);
  const user = getCurrentUser();
  const headers = new Headers(options.headers);
  const token = getCurrentToken();
  if (token) headers.set("authorization", `Bearer ${token}`);
  if (user) {
    headers.set("x-aidirac-organization", user.organization);
    headers.set("x-aidirac-job-role", user.jobRole);
  }
  if (options.body && !(options.body instanceof FormData)) headers.set("content-type", "application/json");
  try {
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers, signal: options.signal || controller.signal });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) throw new WorkspaceApiError(payload.error || `Request failed with HTTP ${response.status}`, response.status, response.status >= 500 || response.status === 429);
    return payload as T;
  } catch (error) {
    const normalized = error instanceof WorkspaceApiError ? error : new WorkspaceApiError(error instanceof Error && error.name === "AbortError" ? "The request timed out" : "Unable to connect to the workspace service", 0, true);
    if ((options.retries || 0) > 0 && normalized.retryable && !options.signal?.aborted) return request<T>(path, { ...options, retries: (options.retries || 0) - 1 });
    throw normalized;
  } finally {
    window.clearTimeout(timeout);
  }
}

const get = <T,>(path: string) => request<ApiEnvelope<T>>(path, { retries: 1 });

export const userWorkspaceApi = {
  profile: () => get<UserProfile>("/api/user/profile"),
  personas: () => get<Persona[]>("/api/personas"),
  promptTypes: () => get<PromptType[]>("/api/prompt-types"),
  templates: () => get<Template[]>("/api/templates"),
  tasks: () => get<UserTask[]>("/api/user/tasks"),
  history: () => get<ChatResponse[]>("/api/user/history"),
  files: () => get<WorkspaceFile[]>("/api/files"),
  knowledgeSources: () => get<KnowledgeSource[]>("/api/knowledge/sources"),
  artifacts: () => get<Artifact[]>("/api/artifacts"),
  approvals: () => get<Approval[]>("/api/approvals"),
  models: () => get<ModelInfo[]>("/api/models"),
  usage: () => get<UsageSummary>("/api/usage"),
  notifications: () => get<Notification[]>("/api/notifications"),
  prismStatus: () => get<PrismRuntimeStatus>("/api/user/prism/status"),
  chat: (input: ChatRequest, signal?: AbortSignal) => request<ApiEnvelope<ChatResponse>>("/api/user/chat", { method: "POST", body: JSON.stringify(input), signal, timeoutMs: 130_000 }),
  executeTemplate: (input: ChatRequest, signal?: AbortSignal) => request<ApiEnvelope<ChatResponse>>("/api/templates/execute", { method: "POST", body: JSON.stringify(input), signal, timeoutMs: 130_000 }),
  upload: (file: File, sensitivity: string) => { const form = new FormData(); form.set("file", file); form.set("sensitivity", sensitivity); return request<ApiEnvelope<WorkspaceFile>>("/api/files/upload", { method: "POST", body: form, timeoutMs: 60_000 }); },
  searchKnowledge: (query: string, sourceIds: string[]) => request<ApiEnvelope<unknown[]>>("/api/knowledge/search", { method: "POST", body: JSON.stringify({ query, sourceIds }) }),
  generateArtifact: (name: string, type: string) => request<ApiEnvelope<Artifact>>("/api/artifacts/generate", { method: "POST", body: JSON.stringify({ name, type }) }),
  submitApproval: (title: string) => request<ApiEnvelope<Approval>>("/api/approvals", { method: "POST", body: JSON.stringify({ title }) }),
};
