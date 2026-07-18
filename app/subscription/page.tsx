"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PricingPortal } from "@/components/PricingPortal";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { UsageMeter } from "@/components/UsageMeter";
import { getCurrentUser } from "@/utils/portalAuth";
import type { UsageSummary, UserSubscription } from "@/utils/subscriptionTypes";

type SubscriptionState = {
  subscription: UserSubscription | null;
  summary: UsageSummary | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function SubscriptionPage() {
  const [userId] = useState<string | null>(() => getCurrentUser()?.id ?? null);
  const [state, setState] = useState<SubscriptionState | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const loadSubscription = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/subscription/current?userId=${encodeURIComponent(id)}`);
      const payload = (await response.json()) as SubscriptionState;
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setState(payload);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const timer = window.setTimeout(() => {
      loadSubscription(userId);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadSubscription, userId]);

  if (!userId) {
    return (
      <PortalFrame>
        <Panel>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950">Subscription dashboard</h1>
          <p className="mt-3 text-slate-600">Create an account or log in to manage your AIDIRAC subscription.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">Create account</Link>
            <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-sm border border-slate-300 px-4 text-sm font-semibold text-slate-900 hover:border-blue-700 hover:text-blue-700">Log in</Link>
          </div>
        </Panel>
      </PortalFrame>
    );
  }

  const subscription = state?.subscription ?? null;
  const summary = state?.summary ?? null;
  const used = summary?.tokens_used ?? 0;
  const limit = summary?.token_limit ?? subscription?.token_allowance_snapshot ?? null;

  return (
    <PortalFrame>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Customer dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Subscription</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Review your current plan, token quota, consumption, billing period, and subscription state.</p>
          </div>
          <SubscriptionStatus status={subscription?.status} />
        </div>

        {status === "loading" ? <Panel>Loading subscription details...</Panel> : null}
        {status === "error" ? <Panel><p className="text-red-600">Unable to load subscription details.</p></Panel> : null}

        {status === "ready" && subscription ? (
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Panel>
              <p className="text-sm font-semibold uppercase text-slate-500">Plan</p>
              <p className="mt-2 text-4xl font-semibold uppercase tracking-normal text-slate-950">{subscription.plan_code}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                <Detail label="Status" value={subscription.status} />
                <Detail label="Billing cycle" value={subscription.billing_cycle} />
                <Detail label="Billing period" value={`${dateFormatter.format(new Date(subscription.current_period_start))} - ${dateFormatter.format(new Date(subscription.current_period_end))}`} />
              </div>
            </Panel>
            <UsageMeter used={used} limit={limit} />
          </div>
        ) : null}

        {status === "ready" && !subscription ? (
          <Panel>
            <h2 className="text-2xl font-semibold tracking-normal text-slate-950">Choose your plan</h2>
            <p className="mt-2 text-sm text-slate-600">No active subscription was found for this account. Select a plan to start tracking quota.</p>
            <div className="mt-6">
              <PricingPortal compact onSubscribed={() => userId ? loadSubscription(userId) : undefined} />
            </div>
          </Panel>
        ) : null}
      </div>
    </PortalFrame>
  );
}

function PortalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <section className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">{children}</section>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium capitalize text-slate-950">{value}</span>
    </div>
  );
}
