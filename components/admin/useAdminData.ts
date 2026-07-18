"use client";

import { useCallback, useEffect, useState } from "react";
import { getPortalUsers, type PortalUser } from "@/utils/portalAuth";
import type { SubscriptionPlan, UsageSummary, UserSubscription } from "@/utils/subscriptionTypes";

export type AdminUserRecord = PortalUser & {
  subscription: UserSubscription | null;
  summary: UsageSummary | null;
};

export function useAdminData() {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const portalUsers = getPortalUsers();
      const [planResponse, userRecords] = await Promise.all([
        fetch("/api/admin/plans", { cache: "no-store" }),
        Promise.all(portalUsers.map(async (user) => {
          const response = await fetch(`/api/subscription/current?userId=${encodeURIComponent(user.id)}`, { cache: "no-store" });
          const payload = response.ok ? await response.json() as { subscription: UserSubscription | null; summary: UsageSummary | null } : { subscription: null, summary: null };
          return { ...user, subscription: payload.subscription, summary: payload.summary };
        })),
      ]);
      if (!planResponse.ok) throw new Error("Unable to load plan catalog");
      setPlans(await planResponse.json() as SubscriptionPlan[]);
      setUsers(userRecords);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => void load());
    return () => window.cancelAnimationFrame(frame);
  }, [load]);

  return { users, plans, loading, error, reload: load };
}
