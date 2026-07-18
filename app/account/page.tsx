"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getCurrentToken, getCurrentUser, logoutPortalUser, type PortalUser } from "@/utils/portalAuth";

export default function AccountPage() {
  const [user] = useState<PortalUser | null>(() => getCurrentUser());
  const [token] = useState<string | null>(() => getCurrentToken());

  function logout() {
    logoutPortalUser();
    window.location.assign("/");
  }

  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Customer account</h1>
        {!user ? (
          <section className="mt-8 rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">You are not logged in.</p>
            <div className="mt-5 flex gap-3">
              <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">Log in</Link>
              <Link href="/signup" className="inline-flex h-11 items-center justify-center rounded-sm border border-slate-300 px-4 text-sm font-semibold text-slate-900 hover:border-blue-700 hover:text-blue-700">Signup</Link>
            </div>
          </section>
        ) : (
          <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Profile</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <Detail label="Name" value={user.fullName} />
                <Detail label="Email" value={user.email} />
                <Detail label="Organization" value={user.organization} />
                <Detail label="Role" value={user.role} />
                <Detail label="Job role" value={user.jobRole} />
              </div>
              <button onClick={logout} className="mt-6 inline-flex h-11 items-center justify-center rounded-sm border border-slate-300 px-4 text-sm font-semibold text-slate-900 hover:border-blue-700 hover:text-blue-700">
                Log out
              </button>
            </div>
            <div className="rounded-sm border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-950">JWT session</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">This portal currently uses a local JWT-style session until a real authentication service is connected.</p>
              <code className="mt-5 block break-all rounded-sm bg-white p-4 text-xs text-slate-700 ring-1 ring-slate-200">{token}</code>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-950">{value}</span>
    </div>
  );
}
