"use client";

import { FormEvent, useState } from "react";
import type { SubscriptionPlan } from "@/utils/subscriptionTypes";
import { AdminPageHeader, AdminPanel, LoadingBlock, StatusBadge, tableClass, tdClass, thClass } from "./AdminUI";
import { useAdminData } from "./useAdminData";

type FormPlan = { planCode: string; name: string; price: string; tokenLimit: string; active: boolean };
const emptyForm: FormPlan = { planCode: "", name: "", price: "", tokenLimit: "", active: true };

export function PlansView() {
  const { plans, loading, error, reload } = useAdminData();
  const [form, setForm] = useState<FormPlan>(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  function edit(plan: SubscriptionPlan) {
    setEditing(plan.plan_code);
    setForm({ planCode: plan.plan_code, name: plan.name, price: plan.monthly_price_usd === null ? "" : String(plan.monthly_price_usd), tokenLimit: plan.monthly_token_limit === null ? "" : String(plan.monthly_token_limit), active: plan.is_active });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      plan_code: form.planCode.trim().toLowerCase(),
      name: form.name.trim(),
      description: `${form.name.trim()} subscription plan managed through AIDIRAC Admin.`,
      monthly_price_usd: form.price ? Number(form.price) : null,
      monthly_token_limit: form.tokenLimit ? Number(form.tokenLimit) : null,
      features: [`${form.name.trim()} access`],
      pricing_label: form.price ? null : "Contact Sales",
      is_active: form.active,
      display_order: editing ? plans.find((plan) => plan.plan_code === editing)?.display_order ?? plans.length + 1 : plans.length + 1,
    };
    const response = await fetch(editing ? `/api/admin/plans/${encodeURIComponent(editing)}` : "/api/admin/plans", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setNotice(response.ok ? `Plan ${editing ? "updated" : "created"}.` : (await response.json().catch(() => null))?.detail ?? "Unable to save plan.");
    if (response.ok) { setForm(emptyForm); setEditing(null); await reload(); }
    setSaving(false);
  }

  async function toggle(plan: SubscriptionPlan) {
    const response = await fetch(`/api/admin/plans/${encodeURIComponent(plan.plan_code)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active: !plan.is_active }) });
    setNotice(response.ok ? `${plan.name} ${plan.is_active ? "deactivated" : "activated"}.` : "Unable to change plan status.");
    if (response.ok) await reload();
  }

  return (
    <>
      <AdminPageHeader title="Plan Management" description="Create, edit, and deactivate plans connected to the BigQuery subscription_plans table." action={<button onClick={() => { setEditing(null); setForm(emptyForm); }} className="h-10 bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">New plan</button>} />
      {notice ? <div className="mb-4 border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">{notice}</div> : null}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        {loading ? <LoadingBlock /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : (
          <AdminPanel title="Plan catalog" description="Deactivation is the safe delete operation because subscriptions retain plan history.">
            <div className="overflow-x-auto"><table className={tableClass}><thead><tr>{["Plan Code", "Name", "Price", "Monthly Token Limit", "Active Flag", "Actions"].map((label) => <th key={label} className={thClass}>{label}</th>)}</tr></thead><tbody>{plans.map((plan) => <tr key={plan.plan_code}><td className={`${tdClass} font-mono text-xs`}>{plan.plan_code}</td><td className={`${tdClass} font-medium text-slate-950`}>{plan.name}</td><td className={tdClass}>{plan.monthly_price_usd === null ? plan.pricing_label : `$${Number(plan.monthly_price_usd).toFixed(2)}`}</td><td className={tdClass}>{plan.monthly_token_limit === null ? "Custom" : Number(plan.monthly_token_limit).toLocaleString()}</td><td className={tdClass}><StatusBadge status={plan.is_active ? "active" : "inactive"} /></td><td className={tdClass}><div className="flex gap-3"><button onClick={() => edit(plan)} className="text-xs font-semibold text-blue-700">Edit</button><button onClick={() => void toggle(plan)} className={`text-xs font-semibold ${plan.is_active ? "text-red-700" : "text-emerald-700"}`}>{plan.is_active ? "Deactivate" : "Activate"}</button></div></td></tr>)}</tbody></table></div>
          </AdminPanel>
        )}
        <AdminPanel title={editing ? `Edit ${editing}` : "Create plan"} description="Changes are written through the subscription backend.">
          <form onSubmit={submit} className="space-y-4">
            <AdminField label="Plan Code"><input required disabled={Boolean(editing)} value={form.planCode} onChange={(event) => setForm({ ...form, planCode: event.target.value })} className="h-10 w-full border border-slate-300 px-3 disabled:bg-slate-100" /></AdminField>
            <AdminField label="Name"><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-10 w-full border border-slate-300 px-3" /></AdminField>
            <AdminField label="Monthly Price (USD)"><input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="h-10 w-full border border-slate-300 px-3" placeholder="Blank for custom" /></AdminField>
            <AdminField label="Monthly Token Limit"><input type="number" min="0" value={form.tokenLimit} onChange={(event) => setForm({ ...form, tokenLimit: event.target.value })} className="h-10 w-full border border-slate-300 px-3" placeholder="Blank for custom" /></AdminField>
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} className="size-4" />Active Flag</label>
            <button disabled={saving} className="h-10 w-full bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-slate-400">{saving ? "Saving…" : editing ? "Update plan" : "Create plan"}</button>
          </form>
        </AdminPanel>
      </div>
    </>
  );
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-sm font-medium text-slate-700">{label}{children}</label>;
}
