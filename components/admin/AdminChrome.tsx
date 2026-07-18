"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutPortalUser } from "@/utils/portalAuth";

const navigation = [
  ["/admin", "Dashboard", "DB"],
  ["/admin/users", "Users", "US"],
  ["/admin/subscriptions", "Subscriptions", "SB"],
  ["/admin/plans", "Plans", "PL"],
  ["/admin/analytics", "Usage Analytics", "AN"],
  ["/admin/billing", "Billing", "BL"],
  ["/admin/audit-logs", "Audit Logs", "AL"],
  ["/admin/settings", "Settings", "ST"],
] as const;

export function AdminChrome({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: { name: string; email: string; organization: string };
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    logoutPortalUser();
    await fetch("/api/auth/admin-session", { method: "DELETE" });
    window.location.assign("/login");
  }

  const sidebar = (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-blue-500/40 px-5">
        <span className="grid size-9 place-items-center bg-white text-sm font-bold text-blue-700">AI</span>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">AIDIRAC</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-blue-200">Admin Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {navigation.map(([href, label, marker]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition ${active ? "bg-white text-blue-800" : "text-blue-50 hover:bg-blue-600"}`}
            >
              <span className={`grid size-7 place-items-center text-[10px] font-bold ${active ? "bg-blue-100 text-blue-700" : "bg-blue-800 text-blue-100"}`}>{marker}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-blue-500/40 p-4 text-xs text-blue-100">
        <p className="truncate font-semibold text-white">{admin.organization}</p>
        <p className="mt-1 truncate">Protected administration</p>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-blue-700 lg:flex">{sidebar}</aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <aside className="relative flex h-full w-72 flex-col bg-blue-700">{sidebar}</aside>
        </div>
      ) : null}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center border border-slate-300 text-slate-700 lg:hidden" aria-label="Open navigation">☰</button>
            <div>
              <p className="text-sm font-semibold text-slate-950">Enterprise administration</p>
              <p className="text-xs text-slate-500">Subscription and usage control plane</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-950">{admin.name}</p>
              <p className="text-xs text-slate-500">{admin.email}</p>
            </div>
            <button onClick={logout} className="h-9 border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:border-blue-700 hover:text-blue-700">Sign out</button>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
