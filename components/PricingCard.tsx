"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCurrentUser } from "@/utils/portalAuth";
import type { SubscriptionPlan } from "@/utils/subscriptionTypes";

type PricingCardProps = {
  plan: SubscriptionPlan;
  onSubscribed?: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

const tokenFormatter = new Intl.NumberFormat("en-US");

export function PricingCard({ plan, onSubscribed }: PricingCardProps) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const priceLabel = plan.monthly_price_usd === null ? plan.pricing_label ?? "Contact sales" : currencyFormatter.format(Number(plan.monthly_price_usd));
  const tokenLabel = plan.monthly_token_limit === null ? "Custom allowance" : `${tokenFormatter.format(plan.monthly_token_limit)} tokens`;

  async function subscribe() {
    const user = getCurrentUser();

    if (!user) {
      window.localStorage.setItem("aidirac_selected_plan", plan.plan_code);
      router.push(`/signup?plan=${encodeURIComponent(plan.plan_code)}`);
      return;
    }

    setState("loading");
    const response = await fetch("/api/subscription/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, planCode: plan.plan_code, billingCycle: "monthly" }),
    });

    if (!response.ok) {
      setState("error");
      return;
    }

    setState("success");
    onSubscribed?.();
    router.push("/subscription");
  }

  return (
    <article className="flex h-full flex-col rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">{plan.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
          </div>
          {plan.plan_code === "enterprise" ? (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Enterprise</span>
          ) : null}
        </div>
        <div className="mt-6">
          <p className="text-4xl font-semibold tracking-normal text-slate-950">{priceLabel}</p>
          {plan.monthly_price_usd !== null ? <p className="mt-1 text-sm text-slate-500">per month</p> : null}
        </div>
        <div className="mt-5 rounded-sm bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Monthly allowance</p>
          <p className="mt-1 text-base font-semibold text-slate-950">{tokenLabel}</p>
        </div>
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-700" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={subscribe}
        disabled={state === "loading"}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {state === "loading" ? "Processing..." : plan.plan_code === "enterprise" ? "Contact sales" : "Subscribe"}
      </button>
      {state === "error" ? <p className="mt-3 text-sm text-red-600">Unable to update subscription. Try again.</p> : null}
    </article>
  );
}
