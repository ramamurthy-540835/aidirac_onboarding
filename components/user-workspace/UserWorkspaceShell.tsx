"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { UserProfile, UsageSummary } from "@/lib/user-workspace/types";

export type WorkspaceView = "home" | "assistant" | "coder" | "templates" | "work" | "documents" | "presentations" | "reports" | "diagrams" | "knowledge" | "approvals" | "shared" | "usage" | "notifications" | "settings" | "models" | "audit";
const navigation: Array<{ id: WorkspaceView; label: string; marker: string }> = [
  { id: "home", label: "Home", marker: "HM" }, { id: "assistant", label: "AI Assistant", marker: "AI" },
  { id: "templates", label: "Templates", marker: "TP" }, { id: "work", label: "My Work", marker: "MW" },
  { id: "documents", label: "Documents", marker: "DC" }, { id: "presentations", label: "Presentations", marker: "PT" },
  { id: "reports", label: "Reports", marker: "RP" }, { id: "diagrams", label: "Diagrams", marker: "DG" },
  { id: "knowledge", label: "Knowledge", marker: "KN" }, { id: "approvals", label: "Approvals", marker: "AP" },
  { id: "shared", label: "Shared with Me", marker: "SH" }, { id: "usage", label: "Usage", marker: "US" },
  { id: "notifications", label: "Notifications", marker: "NT" }, { id: "settings", label: "Settings", marker: "ST" },
];

export function UserWorkspaceShell({ profile, usage, connected, activePersona, activeView, onView, children, activity }: { profile: UserProfile; usage: UsageSummary; connected: boolean; activePersona: string; activeView: WorkspaceView; onView: (view: WorkspaceView) => void; children: ReactNode; activity?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const developerWorkspaceEnabled = process.env.NEXT_PUBLIC_DEVELOPER_WORKSPACE_ENABLED === "true";
  const roleItems: Array<{ id: WorkspaceView; label: string; marker: string }> = [];
  if (profile.permissions.canUseCoderAgent) roleItems.push({ id: "coder", label: "Coder Agent", marker: "CA" });
  if (profile.permissions.canManageModels) roleItems.push({ id: "models", label: "Models", marker: "MD" });
  if (profile.permissions.canViewAudit) roleItems.push({ id: "audit", label: "Audit", marker: "AU" });
  const items = [...navigation, ...roleItems];
  const initials = profile.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <div className="min-h-dvh bg-slate-50 text-slate-950">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle workspace navigation" aria-expanded={mobileOpen} className="grid size-10 place-items-center rounded-md border border-slate-300 lg:hidden">☰</button><Link href="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-sm bg-blue-700 text-xs font-bold text-white">AI</span><span><span className="block text-sm font-semibold">AIDIRAC</span><span className="block text-xs text-slate-500">User Workspace</span></span></Link></div>
        <div className="hidden md:block"><p className="text-sm font-semibold text-slate-950">Enterprise AI workspace</p><p className="text-xs text-slate-500">{activePersona} · {profile.subscriptionPlan} · {usage.totalTokens.toLocaleString()} tokens</p></div>
        <div className="flex items-center gap-3"><span className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${connected ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{connected ? "PRISM connected" : "PRISM connection issue"}</span><span className="grid size-9 place-items-center rounded-full bg-blue-700 text-xs font-semibold text-white">{initials}</span><span className="hidden text-right xl:block"><span className="block text-sm font-semibold">{profile.name}</span><span className="block text-xs text-slate-500">{profile.organization} · {profile.department}</span></span></div>
      </div>
    </header>
    <div className="flex">
      <aside className={`${mobileOpen ? "fixed inset-y-16 left-0 z-30 flex" : "hidden"} w-72 shrink-0 flex-col bg-blue-700 px-3 py-4 text-white lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)]`}>
        <nav aria-label="User Workspace" className="min-h-0 flex-1 space-y-1 overflow-y-auto">{items.map((item) => <button key={item.id} type="button" onClick={() => { onView(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition ${activeView === item.id ? "bg-white text-blue-800" : "text-blue-50 hover:bg-blue-600"}`}><span className="grid size-7 place-items-center bg-blue-800 text-[10px] font-bold text-blue-100">{item.marker}</span>{item.label}</button>)}</nav>
        {developerWorkspaceEnabled && profile.permissions.canUseCoderAgent ? <Link href="/workspace/developer" className="mt-3 flex items-center justify-center border border-blue-200 bg-white px-3 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50">Open Developer Workspace</Link> : null}
      </aside>
      {mobileOpen ? <button type="button" aria-label="Close navigation" className="fixed inset-0 top-16 z-20 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} /> : null}
      <main className="min-w-0 flex-1 p-4 sm:p-6"><div className={`mx-auto grid max-w-[1600px] gap-6 ${activity ? "2xl:grid-cols-[minmax(0,1fr)_20rem]" : ""}`}><div className="min-w-0">{children}</div>{activity ? <aside className="hidden 2xl:block">{activity}</aside> : null}</div></main>
    </div>
  </div>;
}
