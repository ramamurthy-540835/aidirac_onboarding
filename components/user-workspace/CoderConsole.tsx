"use client";

import { codingAgentDashboardUrl } from "@/lib/user-workspace/public-config";
import type { UserWorkspaceState } from "@/components/user-workspace/useUserWorkspace";
import { StatusPill, WorkspacePanel } from "@/components/user-workspace/WorkspaceUI";

export function CoderConsole({ state }: { state: UserWorkspaceState }) {
  const runtime = state.prismStatus;
  return <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">PRISM Coder Agent</p><h1 className="mt-2 text-3xl font-semibold text-slate-950">Live Coder Console</h1><p className="mt-2 text-slate-600">The existing five-agent coding dashboard, governed and routed through PRISM v2.</p></div>
      <a href={codingAgentDashboardUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Open console in new tab</a>
    </div>
    <div className="grid gap-3 sm:grid-cols-3">
      <RuntimeCard label="PRISM kernel" value={runtime?.connected ? "Connected" : "Unavailable"} healthy={Boolean(runtime?.connected)} />
      <RuntimeCard label="Coder Agent" value={runtime?.coderAgentStatus || "Checking"} detail={runtime?.coderModel || undefined} healthy={runtime?.coderAgentStatus === "ready"} />
      <RuntimeCard label="PRISM v1 bridge" value={runtime?.bridgeStatus || "Checking"} detail={runtime?.bridgeMode || undefined} healthy={runtime?.bridgeStatus === "connected"} />
    </div>
    <WorkspacePanel title="Coding Agent Dashboard" description="Planning, coding, review, test, and deployment orchestration from the existing ctoteam service">
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <iframe title="PRISM Coding Agent Dashboard" src={codingAgentDashboardUrl} className="h-[72dvh] min-h-[680px] w-full" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads" referrerPolicy="no-referrer" />
      </div>
    </WorkspacePanel>
  </div>;
}

function RuntimeCard({ label, value, detail, healthy }: { label: string; value: string; detail?: string; healthy: boolean }) {
  return <div className="border border-slate-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p><StatusPill tone={healthy ? "green" : "amber"}>{value}</StatusPill></div>{detail ? <p className="mt-3 text-sm font-medium text-slate-800">{detail}</p> : null}</div>;
}
