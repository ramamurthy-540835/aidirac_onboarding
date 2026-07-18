"use client";

import { AdminPageHeader, AdminPanel, KpiCard, LoadingBlock, StatusBadge, tableClass, tdClass, thClass } from "./AdminUI";
import { useAdminData } from "./useAdminData";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

export function DashboardView() {
  const { users, plans, loading, error } = useAdminData();
  const active = users.filter((user) => user.subscription?.status === "active");
  const monthlyRevenue = active.reduce((total, user) => {
    const plan = plans.find((item) => item.plan_code === user.subscription?.plan_code);
    return total + Number(plan?.monthly_price_usd ?? 0);
  }, 0);
  const tokensUsed = users.reduce((total, user) => total + Number(user.summary?.tokens_used ?? 0), 0);

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Operational overview of customer subscriptions, plan inventory, revenue, and governed token usage." action={<span className="text-xs font-medium text-slate-500">BigQuery subscription control plane</span>} />
      {loading ? <LoadingBlock /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <KpiCard label="Total Users" value={String(users.length)} detail="Known portal users" />
            <KpiCard label="Active Subscriptions" value={String(active.length)} detail="Current active records" tone="green" />
            <KpiCard label="Monthly Revenue" value={currency.format(monthlyRevenue)} detail="Plan-price estimate" tone="purple" />
            <KpiCard label="Token Consumption" value={compact.format(tokensUsed)} detail="Current billing periods" tone="amber" />
            <KpiCard label="Active Plans" value={String(plans.filter((plan) => plan.is_active).length)} detail="Selectable plan catalog" />
          </section>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <AdminPanel title="Recent subscriptions" description="Latest customer records available to this admin browser.">
              <div className="overflow-x-auto">
                <table className={tableClass}>
                  <thead><tr><th className={thClass}>User</th><th className={thClass}>Plan</th><th className={thClass}>Status</th><th className={thClass}>Period end</th></tr></thead>
                  <tbody>{users.slice(0, 6).map((user) => <tr key={user.id}><td className={tdClass}><p className="font-medium text-slate-950">{user.fullName}</p><p className="text-xs text-slate-500">{user.email}</p></td><td className={`${tdClass} uppercase`}>{user.subscription?.plan_code ?? "—"}</td><td className={tdClass}><StatusBadge status={user.subscription?.status ?? "none"} /></td><td className={tdClass}>{user.subscription ? new Date(user.subscription.current_period_end).toLocaleDateString() : "—"}</td></tr>)}</tbody>
                </table>
              </div>
            </AdminPanel>
            <AdminPanel title="Plan distribution" description="Current plan assignment by known portal user.">
              <div className="space-y-4">{plans.map((plan) => {
                const count = users.filter((user) => user.subscription?.plan_code === plan.plan_code).length;
                const percent = users.length ? Math.round((count / users.length) * 100) : 0;
                return <div key={plan.plan_code}><div className="flex justify-between text-sm"><span className="font-medium text-slate-700">{plan.name}</span><span className="text-slate-500">{count}</span></div><div className="mt-2 h-2 bg-slate-100"><div className="h-full bg-blue-600" style={{ width: `${percent}%` }} /></div></div>;
              })}</div>
            </AdminPanel>
          </div>
        </>
      )}
    </>
  );
}
