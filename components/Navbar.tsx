"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutPortalUser, type PortalUser } from "@/utils/portalAuth";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/subscription", label: "Subscription" },
  { href: "/account", label: "Account" },
];

export function Navbar() {
  const [user, setUser] = useState<PortalUser | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setUser(getCurrentUser()));
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  async function logout() {
    logoutPortalUser();
    await fetch("/api/auth/admin-session", { method: "DELETE" });
    window.location.assign("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="AIDIRAC home">
          <span className="grid size-9 place-items-center rounded-sm bg-blue-700 text-sm font-semibold text-white">AI</span>
          <span className="text-base font-semibold text-slate-950">AIDIRAC</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-700">{link.label}</Link>
          ))}
        </nav>
        {user ? <SignedInActions user={user} onLogout={logout} /> : <GuestActions />}
      </div>
    </header>
  );
}

function GuestActions() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 sm:inline-flex">Log in</Link>
      <Link href="/signup" className="inline-flex h-10 items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">Get started</Link>
    </div>
  );
}

function workspaceHref(user: PortalUser) {
  if (user.role === "admin") return "/admin";
  if (user.jobRole.toLowerCase() === "client") return "/client";
  return "/workspace/user";
}

function SignedInActions({ user, onLogout }: { user: PortalUser; onLogout: () => void }) {
  const href = workspaceHref(user);

  return (
    <div className="flex items-center gap-2">
      <Link href={href} className="hidden h-10 items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 lg:inline-flex">
        Open workspace
      </Link>
      <UserMenu user={user} workspaceHref={href} onLogout={onLogout} />
    </div>
  );
}

function UserMenu({ user, workspaceHref, onLogout }: { user: PortalUser; workspaceHref: string; onLogout: () => void }) {
  const initials = user.fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full py-1 pl-1 pr-3 hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
        <span className="grid size-9 place-items-center rounded-full bg-blue-700 text-sm font-semibold text-white">{initials}</span>
        <span className="hidden max-w-40 text-left sm:block">
          <span className="block truncate text-sm font-semibold text-slate-950">{user.fullName}</span>
          <span className="block truncate text-xs text-slate-500">{user.jobRole}</span>
        </span>
        <span className="text-xs text-slate-500 transition group-open:rotate-180" aria-hidden="true">⌄</span>
      </summary>
      <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 p-4">
          <p className="truncate text-sm font-semibold text-slate-950">{user.fullName}</p>
          <p className="mt-1 truncate text-sm text-slate-600">{user.email}</p>
          <p className="mt-2 text-xs text-slate-500">{user.organization}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">{user.role}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{user.jobRole}</span>
          </div>
        </div>
        <div className="p-2">
          <Link href="/account" className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">View account</Link>
          <button type="button" onClick={onLogout} className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-50">Log out</button>
          <Link href={workspaceHref} className="block rounded-md px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">Open workspace</Link>
        </div>
      </div>
    </details>
  );
}
