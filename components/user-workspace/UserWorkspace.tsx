"use client";

import Link from "next/link";
import { useState } from "react";
import { CoderConsole } from "@/components/user-workspace/CoderConsole";
import { UserAssistant } from "@/components/user-workspace/UserAssistant";
import { UserDashboardClean } from "@/components/user-workspace/UserDashboardClean";
import { UserResources } from "@/components/user-workspace/UserResources";
import { UserWorkspaceShell, type WorkspaceView } from "@/components/user-workspace/UserWorkspaceShell";
import { ErrorBanner, WorkspaceSkeleton } from "@/components/user-workspace/WorkspaceUI";
import { useUserWorkspace } from "@/components/user-workspace/useUserWorkspace";

export function UserWorkspace() {
  const state = useUserWorkspace();
  const [view, setView] = useState<WorkspaceView>("home");

  if (state.loading) return <main className="min-h-dvh bg-slate-50 p-6"><div className="mx-auto max-w-7xl"><div className="mb-8 h-16 animate-pulse rounded-xl bg-slate-200" /><WorkspaceSkeleton /></div></main>;
  if (!state.profile) return <main className="grid min-h-dvh place-items-center bg-slate-50 p-6"><div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-7 shadow-sm"><h1 className="text-2xl font-semibold text-slate-950">User Workspace access</h1><p className="mt-3 text-slate-600">{state.error || "Sign in to open your workspace."}</p><div className="mt-6 flex gap-3"><Link href="/login?next=/workspace/user" className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white">Log in</Link><button type="button" onClick={() => void state.retry()} className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold">Retry</button></div></div></main>;

  return <UserWorkspaceShell profile={state.profile} usage={state.usage} connected={state.connected} activePersona={state.activePersona?.name || "Business User"} activeView={view} onView={setView}>
    {state.error ? <div className="mb-5"><ErrorBanner message={state.error} onRetry={() => void state.retry()} /></div> : null}
    {view === "home" ? <UserDashboardClean state={state} onView={setView} /> : view === "assistant" ? <UserAssistant state={state} /> : view === "coder" ? state.profile.permissions.canUseCoderAgent ? <CoderConsole state={state} /> : <UserDashboardClean state={state} onView={setView} /> : <UserResources view={view} state={state} onView={setView} />}
  </UserWorkspaceShell>;
}
