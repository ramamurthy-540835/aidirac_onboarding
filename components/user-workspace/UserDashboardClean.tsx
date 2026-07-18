"use client";

import { EmptyState, Metric, StatusPill, WorkspacePanel } from "@/components/user-workspace/WorkspaceUI";
import type { UserWorkspaceState } from "@/components/user-workspace/useUserWorkspace";
import type { WorkspaceView } from "@/components/user-workspace/UserWorkspaceShell";

export function UserDashboardClean({ state, onView }: { state: UserWorkspaceState; onView: (view: WorkspaceView) => void }) {
  const tasks = state.usage.tasksToday;
  return <>
    <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">AIDIRAC User</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Create governed content, work with enterprise knowledge, and track your AI activity.</p>
      </div>
      <span className="text-xs font-medium text-slate-500">PRISM governed workspace</span>
    </div>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Metric label="Tasks Today" value={String(tasks.created)} detail="Created in this workspace" />
      <Metric label="Completed" value={String(tasks.completed)} detail="Finished successfully" />
      <Metric label="Awaiting Review" value={String(tasks.awaitingReview)} detail="Pending approval" />
      <Metric label="Token Consumption" value={state.usage.totalTokens.toLocaleString()} detail={`$${state.usage.estimatedCostUsd.toFixed(4)} estimated`} />
      <Metric label="Budget Remaining" value={`$${state.usage.remainingBudgetUsd.toFixed(2)}`} detail="Current billing period" />
    </section>

    <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <WorkspacePanel title="Recent work" description="Latest conversations and generated content" action={<button type="button" onClick={() => onView("work")} className="text-xs font-semibold text-blue-700">View all</button>}>
        {state.tasks.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr>{["Work item", "Task type", "Status", "Updated"].map((label) => <th key={label} className="border-b border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</th>)}</tr></thead><tbody>{state.tasks.slice(0, 6).map((item) => <tr key={item.id}><td className="max-w-72 truncate border-b border-slate-100 px-3 py-3 font-medium text-slate-950">{item.title}</td><td className="border-b border-slate-100 px-3 py-3 text-slate-600">{item.taskType}</td><td className="border-b border-slate-100 px-3 py-3"><StatusPill tone={item.status === "completed" ? "green" : item.status === "failed" ? "red" : "amber"}>{item.status}</StatusPill></td><td className="border-b border-slate-100 px-3 py-3 text-slate-500">{new Date(item.updatedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div> : <EmptyState />}
      </WorkspacePanel>

      <WorkspacePanel title="Quick actions" description={`Recommended for ${state.activePersona?.name || "your role"}`}>
        <div className="space-y-2">{state.suggestions.slice(0, 5).map((suggestion) => <button key={suggestion} type="button" onClick={() => onView("assistant")} className="flex w-full items-center justify-between border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"><span>{suggestion}</span><span aria-hidden="true">→</span></button>)}</div>
        <div className="mt-5 border-t border-slate-200 pt-4 text-sm"><Summary label="Most-used model" value={state.usage.mostUsedModel || "Not available"} /><Summary label="Top task type" value={state.usage.mostUsedTaskType || "Not available"} /></div>
      </WorkspacePanel>
    </div>
  </>;
}

function Summary({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4 border-b border-slate-100 py-2 last:border-0"><span className="text-slate-500">{label}</span><span className="truncate font-medium text-slate-900">{value}</span></div>; }
