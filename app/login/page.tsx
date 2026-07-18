"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { loginPortalUser, savePortalSession, type PortalUser } from "@/utils/portalAuth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    let session = loginPortalUser(email, password);

    if (!session) {
      const adminResponse = await fetch("/api/auth/admin-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!adminResponse.ok) {
        setError("Invalid email or password.");
        return;
      }
      const payload = await adminResponse.json() as { user: PortalUser };
      session = savePortalSession(payload.user);
    }

    if (session.user.role === "admin") {
      const adminResponse = await fetch("/api/auth/admin-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...session.user, password }),
      });
      if (!adminResponse.ok) {
        setError("This account is not provisioned for the admin console.");
        return;
      }
    }
    router.push(session.user.role === "admin" ? "/admin" : "/subscription");
  }

  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <section className="rounded-sm bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Login</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Access your subscription portal</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            JWT-style portal sessions route normal users to subscriptions and admin users to the separated admin area.
          </p>
        </section>
        <form onSubmit={handleSubmit} className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" autoComplete="email" className="h-11 rounded-sm border border-slate-300 px-3 text-slate-950" />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" autoComplete="current-password" className="h-11 rounded-sm border border-slate-300 px-3 text-slate-950" />
          </label>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          <button type="submit" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">
            Log in
          </button>
          <p className="mt-4 text-center text-sm text-slate-600">
            New to AIDIRAC? <Link href="/signup" className="font-semibold text-blue-700">Create account</Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
