"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { registerPortalUser } from "@/utils/portalAuth";
import type { SubscriptionPlan } from "@/utils/subscriptionTypes";

const roles = ["Developer", "Business", "Client", "Admin"];
const tokenFormatter = new Intl.NumberFormat("en-US");

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") ?? "student";
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [plansStatus, setPlansStatus] = useState<"loading" | "ready" | "error">("loading");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "creating" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlans() {
      try {
        const response = await fetch("/api/subscription/plans");
        const payload = (await response.json()) as SubscriptionPlan[];

        if (!active) {
          return;
        }

        if (!response.ok || !Array.isArray(payload)) {
          setPlansStatus("error");
          return;
        }

        const activePlans = payload
          .filter((plan) => plan.is_active)
          .sort((left, right) => left.display_order - right.display_order);
        setPlans(activePlans);
        setSelectedPlan((current) => activePlans.some((plan) => plan.plan_code === current) ? current : activePlans[0]?.plan_code ?? "student");
        setPlansStatus("ready");
      } catch {
        if (active) {
          setPlansStatus("error");
        }
      }
    }

    loadPlans();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const organization = String(data.get("organization") ?? "").trim();
    const role = String(data.get("role") ?? "User");

    if (!fullName || !email || !password || !organization || !role) {
      setSubmitStatus("error");
      setMessage("Complete every field to create your account.");
      return;
    }

    if (!selectedPlan) {
      setSubmitStatus("error");
      setMessage("Select a subscription plan before creating the account.");
      return;
    }

    setSubmitStatus("creating");
    setMessage("Creating account and subscription...");
    const session = registerPortalUser({ fullName, email, password, organization, role });

    if (session.user.role === "admin") {
      setSubmitStatus("success");
      setMessage("Admin account created. Redirecting to admin console...");
      window.setTimeout(() => router.push("/admin"), 700);
      return;
    }

    const response = await fetch("/api/subscription/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        planCode: selectedPlan,
        billingCycle: "monthly",
      }),
    });

    const payload = await response.json().catch(() => null) as { detail?: string } | null;

    if (!response.ok) {
      setSubmitStatus("error");
      setMessage(payload?.detail ?? "Account was created locally, but the subscription was not written to BigQuery.");
      return;
    }

    window.localStorage.removeItem("aidirac_selected_plan");
    setSubmitStatus("success");
    setMessage(`Account created and ${selectedPlan.toUpperCase()} subscription saved to BigQuery. Redirecting...`);
    window.setTimeout(() => router.push("/subscription"), 900);
  }

  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section className="rounded-sm bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Signup</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Create your AIDIRAC account</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Register for the public customer portal, select a subscription, and save the subscription record to BigQuery through the AIDIRAC backend.
          </p>
          <div className="mt-6 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            After account creation, normal users are redirected to the subscription dashboard. Admin users are redirected to the separated admin console.
          </div>
        </section>

        <form onSubmit={handleSubmit} className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <Field label="Full Name" name="fullName" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <Field label="Password" name="password" type="password" autoComplete="new-password" />
            <Field label="Organization" name="organization" autoComplete="organization" />
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Role
              <select name="role" className="h-11 rounded-sm border border-slate-300 bg-white px-3 text-slate-950">
                {roles.map((role) => <option key={role}>{role}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">Choose subscription plan</p>
                <p className="mt-1 text-sm text-slate-600">This selection is saved through the backend into BigQuery.</p>
              </div>
              {plansStatus === "loading" ? <span className="text-xs text-slate-500">Loading plans</span> : null}
            </div>

            {plansStatus === "error" ? (
              <div className="mt-4 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Plans are not visible because the subscription API could not be reached.
              </div>
            ) : null}

            {plansStatus === "ready" ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {plans.map((plan) => (
                  <PlanOption
                    key={plan.plan_code}
                    plan={plan}
                    selected={selectedPlan === plan.plan_code}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {message ? (
            <p className={["mt-5 rounded-sm border p-3 text-sm", submitStatus === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : submitStatus === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-blue-200 bg-blue-50 text-blue-800"].join(" ")}>{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitStatus === "creating" || plansStatus === "loading"}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {submitStatus === "creating" ? "Creating account..." : "Create account"}
          </button>
          <p className="mt-4 text-center text-sm text-slate-600">
            Already registered? <Link href="/login" className="font-semibold text-blue-700">Log in</Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function PlanOption({
  plan,
  selected,
  onSelect,
}: {
  plan: SubscriptionPlan;
  selected: boolean;
  onSelect: (planCode: string) => void;
}) {
  const price = plan.monthly_price_usd === null ? plan.pricing_label ?? "Contact sales" : `$${Number(plan.monthly_price_usd)}/month`;
  const tokens = plan.monthly_token_limit === null ? "Custom tokens" : `${tokenFormatter.format(plan.monthly_token_limit)} tokens`;

  return (
    <button
      type="button"
      onClick={() => onSelect(plan.plan_code)}
      className={[
        "rounded-sm border p-4 text-left transition",
        selected ? "border-blue-700 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-300",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-950">{plan.name}</p>
          <p className="mt-1 text-sm text-slate-600">{tokens}</p>
        </div>
        <span className="text-sm font-semibold text-blue-700">{price}</span>
      </div>
    </button>
  );
}

function Field({ label, name, type = "text", autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      {label}
      <input name={name} type={type} autoComplete={autoComplete} className="h-11 rounded-sm border border-slate-300 px-3 text-slate-950" />
    </label>
  );
}
