"use client";

import { useEffect, useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import type { SubscriptionPlan } from "@/utils/subscriptionTypes";

type PricingPortalProps = {
  compact?: boolean;
  onSubscribed?: () => void;
};

export function PricingPortal({ compact = false, onSubscribed }: PricingPortalProps) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

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
          setStatus("error");
          return;
        }

        setPlans(payload.filter((plan) => plan.is_active).sort((left, right) => left.display_order - right.display_order));
        setStatus("ready");
      } catch {
        if (active) {
          setStatus("error");
        }
      }
    }

    loadPlans();
    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return <div className="rounded-sm border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading subscription plans...</div>;
  }

  if (status === "error") {
    return <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-sm text-red-700">Unable to load subscription plans.</div>;
  }

  return (
    <div className={["grid gap-5", compact ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"].join(" ")}>
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} onSubscribed={onSubscribed} />
      ))}
    </div>
  );
}
