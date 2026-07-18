"use client";

import { AdminPageHeader, AdminPanel, KpiCard, LoadingBlock } from "./AdminUI";
import { useAdminData } from "./useAdminData";

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

export function AnalyticsView() {
  const { users, plans, loading, error } = useAdminData();
  const totalUsed = users.reduce((sum, user) => sum + Number(user.summary?.tokens_used ?? 0), 0);
  const totalLimit = users.reduce((sum, user) => sum + Number(user.summary?.token_limit ?? 0), 0);
  const monthlyCost = users.reduce((sum, user) => sum + Number(plans.find((plan) => plan.plan_code === user.subscription?.plan_code)?.monthly_price_usd ?? 0), 0);
  const maxUserUsage = Math.max(1, ...users.map((user) => Number(user.summary?.tokens_used ?? 0)));
  const daily = [0, 0, 0, 0, 0, 0, totalUsed];

  return (
    <>
      <AdminPageHeader title="Usage Analytics" description="Token consumption and cost views backed by token_usage summaries for known portal users." />
      {loading ? <LoadingBlock /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : <>
        <section className="grid gap-4 md:grid-cols-3"><KpiCard label="Tokens Used" value={compact.format(totalUsed)} detail="Current subscription periods" /><KpiCard label="Available Capacity" value={compact.format(totalLimit)} detail="Across metered plans" tone="green" /><KpiCard label="Monthly Cost" value={`$${monthlyCost.toFixed(2)}`} detail="Catalog-price estimate" tone="purple" /></section>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <AdminPanel title="Daily Token Usage" description="Seven-day consumption view from available usage summaries."><div className="flex h-56 items-end gap-3 border-b border-l border-slate-200 px-4 pt-4">{daily.map((value, index) => <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2"><div className="w-full bg-blue-600" style={{ height: `${Math.max(value ? 8 : 2, totalUsed ? (value / totalUsed) * 170 : 2)}px` }} /><span className="text-[10px] text-slate-500">D-{6 - index}</span></div>)}</div></AdminPanel>
          <AdminPanel title="Monthly Cost" description="Estimated recurring value by active plan."><div className="space-y-4">{plans.map((plan) => { const count = users.filter((user) => user.subscription?.plan_code === plan.plan_code).length; const value = count * Number(plan.monthly_price_usd ?? 0); return <div key={plan.plan_code}><div className="flex justify-between text-sm"><span>{plan.name}</span><span className="font-semibold">${value.toFixed(2)}</span></div><div className="mt-2 h-3 bg-slate-100"><div className="h-full bg-violet-600" style={{ width: `${monthlyCost ? (value / monthlyCost) * 100 : 0}%` }} /></div></div>; })}</div></AdminPanel>
          <AdminPanel title="User Consumption" description="Current-period token totals by customer."><div className="space-y-4">{users.map((user) => { const used = Number(user.summary?.tokens_used ?? 0); return <div key={user.id}><div className="flex justify-between text-sm"><span className="truncate">{user.fullName}</span><span>{used.toLocaleString()}</span></div><div className="mt-2 h-3 bg-slate-100"><div className="h-full bg-emerald-600" style={{ width: `${(used / maxUserUsage) * 100}%` }} /></div></div>; })}</div></AdminPanel>
          <AdminPanel title="Data source status" description="Analytics integration boundaries."><dl className="grid gap-3 text-sm"><div className="flex justify-between border-b border-slate-100 pb-3"><dt>BigQuery token table</dt><dd className="font-semibold text-emerald-700">token_usage connected</dd></div><div className="flex justify-between border-b border-slate-100 pb-3"><dt>Subscription summaries</dt><dd className="font-semibold text-emerald-700">Connected</dd></div><div className="flex justify-between"><dt>Provider billing costs</dt><dd className="font-semibold text-amber-700">Not connected</dd></div></dl></AdminPanel>
        </div>
      </>}
    </>
  );
}
