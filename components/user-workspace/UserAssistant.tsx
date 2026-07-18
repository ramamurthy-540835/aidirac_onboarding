"use client";

import { useMemo, useState } from "react";
import { EmptyState, StatusPill, WorkspacePanel } from "@/components/user-workspace/WorkspaceUI";
import type { UserWorkspaceState } from "@/components/user-workspace/useUserWorkspace";
import type { ChatResponse, ModelMode } from "@/lib/user-workspace/types";

const outputFormats = ["Response", "Markdown", "Document", "Presentation", "PDF", "Email draft", "Diagram"];
const modelModes: Array<{ id: ModelMode; label: string }> = [{ id: "automatic", label: "Automatic" }, { id: "fast", label: "Fast" }, { id: "balanced", label: "Balanced" }, { id: "advanced", label: "Advanced" }, { id: "lowest-cost", label: "Lowest cost" }, { id: "private", label: "Private model" }];

export function UserAssistant({ state }: { state: UserWorkspaceState }) {
  const [prompt, setPrompt] = useState(""); const [outputFormat, setOutputFormat] = useState("Response");
  const [modelMode, setModelMode] = useState<ModelMode>("automatic"); const [sensitivity, setSensitivity] = useState("internal");
  const [selectedSources, setSelectedSources] = useState<string[]>([]); const [lastRequest, setLastRequest] = useState<string | null>(null);
  const activeTask = useMemo(() => state.promptTypes.find((item) => item.id === state.activeTaskTypeId), [state.promptTypes, state.activeTaskTypeId]);

  async function submit(override?: string) {
    const value = (override || prompt).trim(); if (!value) { state.setError("Enter a request for PRISM"); return; }
    setLastRequest(value);
    const result = await state.submitChat({ persona: state.activePersonaId, taskType: state.activeTaskTypeId, prompt: value, attachments: state.files.map((file) => file.id), conversationId: "", outputFormat, modelPreference: modelMode, knowledgeSourceIds: selectedSources, sensitivity });
    if (result) setPrompt("");
  }

  return <div className="space-y-6">
    <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">AI Assistant</p><h1 className="mt-2 text-3xl font-semibold text-slate-950">Work with PRISM</h1><p className="mt-2 text-slate-600">Ask questions, analyse information, and create governed business artifacts.</p></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="border border-blue-200 bg-blue-50 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-blue-900">PRISM AI Assistant</p><StatusPill tone="green">Available</StatusPill></div><p className="mt-2 text-xs leading-5 text-blue-800">Business questions, analysis, documents, reports, presentations, and knowledge work.</p></div><div className="border border-slate-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-900">PRISM Coder Agent</p><StatusPill tone={state.prismStatus?.coderAgentStatus === "ready" && state.profile?.permissions.canUseCoderAgent ? "green" : "slate"}>{state.profile?.permissions.canUseCoderAgent ? state.prismStatus?.coderAgentStatus === "ready" ? "Live" : "Unavailable" : "Advisory"}</StatusPill></div><p className="mt-2 text-xs leading-5 text-slate-600">Automatically selected for code, repository, testing, API, and deployment requests.</p></div></div>
    <WorkspacePanel title="Chat with PRISM" description="Business requests use AI Assistant; technical requests automatically route to Coder Agent" action={<StatusPill tone={state.connected ? "green" : "amber"}>{state.connected ? "Connected" : "Retry connection"}</StatusPill>}>
      <form onSubmit={(event) => { event.preventDefault(); void submit(); }} className="space-y-4">
        <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">What would you like to do?</span><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={7} placeholder="Ask PRISM to create, analyse, summarize, compare or generate anything for your work." className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 placeholder:text-slate-500 focus:border-blue-700" /></label>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Select label="Persona" value={state.activePersonaId} onChange={state.setActivePersonaId} options={state.personas.map((item) => ({ value: item.id, label: item.name }))} />
          <Select label="Task type" value={state.activeTaskTypeId} onChange={state.setActiveTaskTypeId} options={state.promptTypes.map((item) => ({ value: item.id, label: item.name }))} />
          <Select label="Output format" value={outputFormat} onChange={setOutputFormat} options={outputFormats.map((item) => ({ value: item, label: item }))} />
          <Select label="Model mode" value={modelMode} onChange={(value) => setModelMode(value as ModelMode)} options={modelModes.map((item) => ({ value: item.id, label: item.label }))} />
          <Select label="Sensitivity" value={sensitivity} onChange={setSensitivity} options={[{ value: "public", label: "Public" }, { value: "internal", label: "Internal" }, { value: "confidential", label: "Confidential" }, { value: "restricted", label: "Restricted" }]} />
        </div>
        <fieldset><legend className="mb-2 text-sm font-medium text-slate-700">Knowledge sources</legend><div className="flex flex-wrap gap-2">{state.knowledgeSources.filter((source) => source.status === "Connected" || source.status === "Available").map((source) => <label key={source.id} className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs ${selectedSources.includes(source.id) ? "border-blue-300/50 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-600"}`}><input type="checkbox" className="sr-only" checked={selectedSources.includes(source.id)} onChange={() => setSelectedSources((items) => items.includes(source.id) ? items.filter((id) => id !== source.id) : [...items, source.id])} />{source.name}</label>)}</div></fieldset>
        <div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-300/50"><input type="file" className="sr-only" accept=".pdf,.docx,.pptx,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.webp,.json,.md" onChange={(event) => { const file = event.target.files?.[0]; if (file) void state.uploadFile(file, sensitivity); event.currentTarget.value = ""; }} />Upload file</label>
          <button type="submit" disabled={state.submitting} className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">{state.submitting ? "PRISM is working…" : "Submit to PRISM"}</button>
          {state.submitting ? <button type="button" onClick={state.cancelChat} className="rounded-md border border-red-400/40 px-4 py-2.5 text-sm font-semibold text-red-700">Cancel generation</button> : null}
          {lastRequest && !state.submitting ? <button type="button" onClick={() => void submit(lastRequest)} className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">Retry last request</button> : null}
          <span className="text-xs text-slate-500">{activeTask?.description}</span>
        </div>
      </form>
    </WorkspacePanel>
    <WorkspacePanel title="Conversation" description="Governed responses and artifact actions">
      {state.history.length ? <div className="space-y-5">{state.history.map((message) => <Conversation key={message.id} item={message} authorized={Boolean(state.profile?.permissions.canViewExecutionLogs)} onRegenerate={() => void submit(message.prompt)} onArtifact={state.createArtifact} onApproval={state.submitApproval} />)}</div> : <EmptyState title="No conversation yet." description="Enter a request above or choose one of your suggested actions." />}
    </WorkspacePanel>
  </div>;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) { return <label className="block"><span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950">{options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>; }

function Conversation({ item, authorized, onRegenerate, onArtifact, onApproval }: { item: ChatResponse; authorized: boolean; onRegenerate: () => void; onArtifact: (name: string, type: string) => Promise<unknown>; onApproval: (title: string) => Promise<unknown> }) {
  const tone = item.governanceStatus === "Approved" ? "green" : item.governanceStatus === "Blocked" ? "red" : "amber";
  function download() { const blob = new Blob([item.response], { type: "text/markdown" }); const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = `prism-response-${item.id}.md`; anchor.click(); URL.revokeObjectURL(anchor.href); }
  return <article className="overflow-hidden rounded-xl border border-slate-300 bg-white"><div className="border-b border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-blue-700">You · {item.persona} · {item.taskType}</p><p className="mt-2 text-sm leading-6 text-slate-700">{item.prompt}</p></div><div className="p-4"><div className="flex flex-wrap items-center gap-2"><StatusPill tone={tone}>{item.governanceStatus}</StatusPill><StatusPill>{item.agent}</StatusPill>{item.technicalExecutionRequired ? <span className="text-xs font-medium text-blue-700">This request requires technical execution. {item.agent} has been selected.</span> : null}</div><div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{item.response}</div>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500"><span>Confidence {Math.round(item.confidence * 100)}%</span><span>{item.durationMs.toLocaleString()} ms</span><span>{(item.inputTokens + item.outputTokens).toLocaleString()} tokens</span><span>${item.estimatedCostUsd.toFixed(5)}</span><span>{new Date(item.timestamp).toLocaleString()}</span><span>Backend: {item.executionBackend} · {item.executionStatus}</span>{authorized && item.routingReason ? <span>Route: {item.routingReason}</span> : null}</div>
    <div className="mt-4 flex flex-wrap gap-2"><Action label="Copy" onClick={() => void navigator.clipboard.writeText(item.response)} /><Action label="Regenerate" onClick={onRegenerate} /><Action label="Improve" onClick={onRegenerate} /><Action label="Shorten" onClick={onRegenerate} /><Action label="Expand" onClick={onRegenerate} /><Action label="Convert to document" onClick={() => void onArtifact(item.prompt.slice(0, 48), "Word")} /><Action label="Convert to presentation" onClick={() => void onArtifact(item.prompt.slice(0, 48), "PowerPoint")} /><Action label="Convert to email" onClick={() => void onArtifact(item.prompt.slice(0, 48), "Email draft")} /><Action label="Convert to diagram" onClick={() => void onArtifact(item.prompt.slice(0, 48), "Architecture diagram")} /><Action label="Download" onClick={download} /><Action label="Submit for approval" onClick={() => void onApproval(item.prompt.slice(0, 72))} /></div></div></article>;
}

function Action({ label, onClick }: { label: string; onClick: () => void }) { return <button type="button" onClick={onClick} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-300/40 hover:text-blue-700">{label}</button>; }
