"use client";

import { useState } from "react";
import { AdminPageHeader, AdminPanel, LoadingBlock, StatusBadge, tableClass, tdClass, thClass } from "./AdminUI";
import { useAdminData } from "./useAdminData";

export function SubscriptionsView() {
  const { users, plans, loading, error, reload } = useAdminData();
  const [notice, setNotice] = useState("");

  async function changePlan(userId: string, planCode: string) {
    const response = await fetch("/api/subscription/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, planCode, billingCycle: "monthly" }) });
    setNotice(response.ok ? `Subscription changed to ${planCode.toUpperCase()}.` : "Unable to change subscription.");
    if (response.ok) await reload();
  }

  async function cancel(userId: string) {
    const response = await fetch(`/api/admin/subscriptions/${encodeURIComponent(userId)}/cancel`, { method: "PATCH" });
    setNotice(response.ok ? "Subscription cancelled." : "Unable to cancel subscription.");
    if (response.ok) await reload();
  }

  return (
    <>
      <AdminPageHeader title="Subscription Management" description="Upgrade, downgrade, and cancel customer subscriptions stored in the BigQuery user_subscriptions table." />
      {notice ? <div className="mb-4 border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">{notice}</div> : null}
      {loading ? <LoadingBlock /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : (
        <AdminPanel title="Subscriptions">
          <div className="overflow-x-auto"><table className={tableClass}>
            <thead><tr>{["User", "Plan", "Billing Cycle", "Start Date", "End Date", "Status", "Actions"].map((label) => <th key={label} className={thClass}>{label}</th>)}</tr></thead>
            <tbody>{users.filter((user) => user.subscription).map((user) => {
              const subscription = user.subscription!;
              const currentIndex = plans.findIndex((plan) => plan.plan_code === subscription.plan_code);
              return <tr key={user.id}><td className={tdClass}><p className="font-medium text-slate-950">{user.fullName}</p><p className="text-xs text-slate-500">{user.email}</p></td><td className={`${tdClass} uppercase`}>{subscription.plan_code}</td><td className={`${tdClass} capitalize`}>{subscription.billing_cycle}</td><td className={tdClass}>{new Date(subscription.current_period_start).toLocaleDateString()}</td><td className={tdClass}>{new Date(subscription.current_period_end).toLocaleDateString()}</td><td className={tdClass}><StatusBadge status={subscription.status} /></td><td className={tdClass}><div className="flex gap-2"><button disabled={currentIndex >= plans.length - 1} onClick={() => void changePlan(user.id, plans[currentIndex + 1]?.plan_code)} className="text-xs font-semibold text-blue-700 disabled:text-slate-300">Upgrade</button><button disabled={currentIndex <= 0} onClick={() => void changePlan(user.id, plans[currentIndex - 1]?.plan_code)} className="text-xs font-semibold text-violet-700 disabled:text-slate-300">Downgrade</button><button onClick={() => void cancel(user.id)} className="text-xs font-semibold text-red-700">Cancel</button></div></td></tr>;
            })}</tbody>
          </table></div>
        </AdminPanel>
      )}
    </>
  );
}
