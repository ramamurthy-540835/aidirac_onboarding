import "server-only";

import type { PrismRuntimeStatus } from "@/lib/user-workspace/types";

const kernelUrl = (process.env.PRISM_KERNEL_URL || "https://prism-v2-kernel-gygcwrc62a-el.a.run.app").replace(/\/$/, "");

type PrismIntent = { type?: string; priority?: string; operation?: string; raw_task?: string; prompt_uid?: string | null };
type PrismRoute = { node?: string; agent?: string; model?: string };
export type PrismRoutingResult = { intent?: PrismIntent; recommendedModel?: string; confidence?: number; routingReason?: string; routes: PrismRoute[] };
export type PrismAgentRun = { status?: string; source?: string; request_id?: string; agents?: Array<Record<string, unknown>>; graph?: Array<Record<string, unknown>> };

async function prismRequest<T>(path: string, init?: RequestInit, timeoutMs = 20_000): Promise<T> {
  const response = await fetch(`${kernelUrl}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });
  const text = await response.text();
  let payload: unknown;
  try { payload = text ? JSON.parse(text) : {}; }
  catch { payload = { detail: text || "Invalid response" }; }
  if (!response.ok) {
    const detail = typeof payload === "object" && payload && "detail" in payload ? String(payload.detail) : `HTTP ${response.status}`;
    throw new Error(`PRISM kernel ${path} failed: ${detail}`);
  }
  return payload as T;
}

export async function getPrismRuntimeStatus(): Promise<PrismRuntimeStatus> {
  try {
    const [status, agents] = await Promise.all([
      prismRequest<{ service?: string; kernel?: { bridgeStatus?: string }; bridge?: { mode?: string } }>("/status"),
      prismRequest<{ agents?: Array<{ name?: string; status?: string; selected_model?: string }> }>("/agents"),
    ]);
    const coder = agents.agents?.find((agent) => agent.name === "coder");
    return {
      connected: true,
      service: status.service || "prism-v2-kernel",
      bridgeStatus: status.kernel?.bridgeStatus || "unknown",
      bridgeMode: status.bridge?.mode || "unknown",
      coderAgentStatus: coder?.status || "unavailable",
      coderModel: coder?.selected_model || null,
    };
  } catch (error) {
    return {
      connected: false,
      service: "prism-v2-kernel",
      bridgeStatus: "unavailable",
      bridgeMode: "unavailable",
      coderAgentStatus: "unavailable",
      coderModel: null,
      error: error instanceof Error ? error.message : "PRISM kernel is unavailable",
    };
  }
}

function taskPayload(task: string, context: Record<string, unknown>, operation = "plan") {
  return JSON.stringify({ task, operation, context });
}

export async function routePrismTask(task: string, context: Record<string, unknown>): Promise<PrismRoutingResult> {
  const init = { method: "POST", body: taskPayload(task, context, "route") };
  const [intent, route] = await Promise.all([
    prismRequest<{ intent?: PrismIntent }>("/intent", init),
    prismRequest<{ modelRouter?: { recommendedModel?: string; confidence?: number; routingReason?: string; routes?: PrismRoute[] } }>("/route", init),
  ]);
  return {
    intent: intent.intent,
    recommendedModel: route.modelRouter?.recommendedModel,
    confidence: route.modelRouter?.confidence,
    routingReason: route.modelRouter?.routingReason,
    routes: route.modelRouter?.routes || [],
  };
}

export function runPrismCoderPlan(task: string, context: Record<string, unknown>) {
  return prismRequest<PrismAgentRun>("/agents/run", { method: "POST", body: taskPayload(task, context, "plan") }, 120_000);
}

export function responseFromAgentRun(run: PrismAgentRun): string | null {
  const preferredKeys = ["response", "output", "content", "text", "message", "plan", "summary"];
  const seen = new Set<unknown>();
  function visit(value: unknown): string | null {
    if (typeof value === "string" && value.trim().length > 20) return value.trim();
    if (!value || typeof value !== "object" || seen.has(value)) return null;
    seen.add(value);
    if (Array.isArray(value)) {
      for (let index = value.length - 1; index >= 0; index -= 1) { const found = visit(value[index]); if (found) return found; }
      return null;
    }
    const record = value as Record<string, unknown>;
    for (const key of preferredKeys) { if (key in record) { const found = visit(record[key]); if (found) return found; } }
    for (const nested of Object.values(record)) { const found = visit(nested); if (found) return found; }
    return null;
  }
  return visit(run.agents);
}
