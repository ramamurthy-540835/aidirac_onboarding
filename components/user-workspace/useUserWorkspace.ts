"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { userWorkspaceApi } from "@/lib/user-workspace/api-client";
import { validateUpload } from "@/lib/user-workspace/intent.js";
import type { Approval, Artifact, ChatRequest, ChatResponse, KnowledgeSource, ModelInfo, Notification, Persona, PrismRuntimeStatus, PromptType, Template, UsageSummary, UserProfile, UserTask, WorkspaceFile } from "@/lib/user-workspace/types";

const emptyUsage: UsageSummary = { inputTokens: 0, outputTokens: 0, totalTokens: 0, estimatedCostUsd: 0, monthlyBudgetUsd: 0, remainingBudgetUsd: 0, mostUsedModel: null, mostUsedTaskType: null, tasksToday: { created: 0, completed: 0, awaitingReview: 0, failed: 0, drafts: 0 } };

export function useUserWorkspace() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [promptTypes, setPromptTypes] = useState<PromptType[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [history, setHistory] = useState<ChatResponse[]>([]);
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [usage, setUsage] = useState<UsageSummary>(emptyUsage);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activePersonaId, setActivePersonaId] = useState("business-user");
  const [activeTaskTypeId, setActiveTaskTypeId] = useState("ask-a-question");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [prismStatus, setPrismStatus] = useState<PrismRuntimeStatus | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    const calls = await Promise.allSettled([
      userWorkspaceApi.profile(), userWorkspaceApi.personas(), userWorkspaceApi.promptTypes(), userWorkspaceApi.templates(),
      userWorkspaceApi.tasks(), userWorkspaceApi.history(), userWorkspaceApi.files(), userWorkspaceApi.knowledgeSources(),
      userWorkspaceApi.artifacts(), userWorkspaceApi.approvals(), userWorkspaceApi.models(), userWorkspaceApi.usage(), userWorkspaceApi.notifications(), userWorkspaceApi.prismStatus(),
    ]);
    const rejected = calls.find((result) => result.status === "rejected");
    if (rejected?.status === "rejected") setError(rejected.reason instanceof Error ? rejected.reason.message : "Some workspace data could not be loaded");
    const value = <T,>(index: number) => calls[index].status === "fulfilled" ? (calls[index] as unknown as PromiseFulfilledResult<{ data: T }>).value.data : undefined;
    const loadedProfile = value<UserProfile>(0); if (loadedProfile) { setProfile(loadedProfile); setActivePersonaId(loadedProfile.activePersonaId); }
    setPersonas(value<Persona[]>(1) || []); setPromptTypes(value<PromptType[]>(2) || []); setTemplates(value<Template[]>(3) || []);
    setTasks(value<UserTask[]>(4) || []); setHistory(value<ChatResponse[]>(5) || []); setFiles(value<WorkspaceFile[]>(6) || []);
    setKnowledgeSources(value<KnowledgeSource[]>(7) || []); setArtifacts(value<Artifact[]>(8) || []); setApprovals(value<Approval[]>(9) || []);
    setModels(value<ModelInfo[]>(10) || []); setUsage(value<UsageSummary>(11) || emptyUsage); setNotifications(value<Notification[]>(12) || []);
    setPrismStatus(value<PrismRuntimeStatus>(13) || null);
    setConnected(calls[0].status === "fulfilled" && Boolean(value<PrismRuntimeStatus>(13)?.connected)); setLoading(false);
  }, []);

  useEffect(() => { const frame = window.requestAnimationFrame(() => void load()); return () => { window.cancelAnimationFrame(frame); abortRef.current?.abort(); }; }, [load]);

  const activePersona = useMemo(() => personas.find((persona) => persona.id === activePersonaId) || personas[0], [personas, activePersonaId]);
  const suggestions = activePersona?.suggestions.length ? activePersona.suggestions : ["Summarize a document", "Create an executive report", "Draft a customer email", "Generate a project plan"];

  async function submitChat(input: Omit<ChatRequest, "userId" | "organizationId" | "workspaceId">) {
    if (!profile) return;
    abortRef.current?.abort(); abortRef.current = new AbortController();
    setSubmitting(true); setError(null);
    try {
      const result = await userWorkspaceApi.chat({ ...input, userId: profile.id, organizationId: profile.organization, workspaceId: "user-workspace" }, abortRef.current.signal);
      setHistory((items) => [result.data, ...items]);
      const refreshed = await Promise.all([userWorkspaceApi.tasks(), userWorkspaceApi.usage(), userWorkspaceApi.notifications()]);
      setTasks(refreshed[0].data); setUsage(refreshed[1].data); setNotifications(refreshed[2].data);
      return result.data;
    } catch (caught) {
      if (!abortRef.current?.signal.aborted) setError(caught instanceof Error ? caught.message : "Generation failed");
    } finally { setSubmitting(false); }
  }

  function cancelChat() { abortRef.current?.abort(); setSubmitting(false); }

  async function uploadFile(file: File, sensitivity: string) {
    const validation = validateUpload(file.name, file.size);
    if (validation) { setError(validation); return; }
    try { const result = await userWorkspaceApi.upload(file, sensitivity); setFiles((items) => [result.data, ...items]); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Upload failed"); }
  }

  async function createArtifact(name: string, type: string) { const result = await userWorkspaceApi.generateArtifact(name, type); setArtifacts((items) => [result.data, ...items]); return result.data; }
  async function submitApproval(title: string) { const result = await userWorkspaceApi.submitApproval(title); setApprovals((items) => [result.data, ...items]); return result.data; }

  return { profile, personas, promptTypes, templates, tasks, history, files, knowledgeSources, artifacts, approvals, models, usage, notifications, prismStatus, activePersonaId, setActivePersonaId, activeTaskTypeId, setActiveTaskTypeId, activePersona, suggestions, loading, submitting, error, connected, retry: load, submitChat, cancelChat, uploadFile, createArtifact, submitApproval, setError };
}

export type UserWorkspaceState = ReturnType<typeof useUserWorkspace>;
