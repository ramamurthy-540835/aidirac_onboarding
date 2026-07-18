"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type PortalUser } from "@/utils/portalAuth";
import { AdminPageHeader, AdminPanel, KpiCard, LoadingBlock, StatusBadge, tableClass, tdClass, thClass } from "./AdminUI";
import { useAdminData } from "./useAdminData";

export function BillingView() {
  const { users, plans, loading, error } = useAdminData();
  const active = users.filter((user) => user.subscription?.status === "active");
  const recurring = active.reduce((sum, user) => sum + Number(plans.find((plan) => plan.plan_code === user.subscription?.plan_code)?.monthly_price_usd ?? 0), 0);
  return <><AdminPageHeader title="Billing" description="Subscription value and billing-cycle overview. Payment-provider invoices are not connected yet." />{loading ? <LoadingBlock /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-red-700">{error}</div> : <><section className="grid gap-4 md:grid-cols-3"><KpiCard label="Monthly Recurring Value" value={`$${recurring.toFixed(2)}`} detail="Catalog price estimate" /><KpiCard label="Billable Subscriptions" value={String(active.length)} detail="Active billing records" tone="green" /><KpiCard label="Open Invoices" value="—" detail="Payment provider not connected" tone="amber" /></section><div className="mt-6"><AdminPanel title="Billing integration"><div className="border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">AIDIRAC currently tracks billing cycle and plan price in BigQuery. Stripe, invoice, tax, and payment-status APIs must be connected before money movement or invoice actions are available.</div></AdminPanel></div></>}</>;
}

export function AuditLogsView() {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => { const frame = requestAnimationFrame(() => { setUser(getCurrentUser()); setTimestamp(new Date().toLocaleString()); }); return () => cancelAnimationFrame(frame); }, []);
  return <><AdminPageHeader title="Audit Logs" description="Administrative security events with explicit source coverage." /><AdminPanel title="Audit events" description="A persistent audit_logs table and trusted proxy IP capture are not yet implemented."><div className="overflow-x-auto"><table className={tableClass}><thead><tr>{["User", "Action", "Timestamp", "IP", "Status"].map((label) => <th key={label} className={thClass}>{label}</th>)}</tr></thead><tbody><tr><td className={tdClass}>{user?.email ?? "Current administrator"}</td><td className={tdClass}>Admin console session validated</td><td className={tdClass}>{timestamp || "Current session"}</td><td className={tdClass}>Not captured</td><td className={tdClass}><StatusBadge status="success" /></td></tr></tbody></table></div><div className="mt-5 border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">Connect a write-once audit_logs table and trusted forwarding-header policy before using this view for compliance evidence.</div></AdminPanel></>;
}

export function SettingsView() {
  return <><AdminPageHeader title="Settings" description="Security and data-source configuration for the AIDIRAC administration boundary." /><div className="grid gap-6 xl:grid-cols-2"><AdminPanel title="Security controls"><dl className="space-y-4 text-sm"><Setting label="Admin request proxy" value="Enabled" tone="green" /><Setting label="JWT algorithm" value="HS256" tone="green" /><Setting label="HTTP-only session" value="Enabled" tone="green" /><Setting label="Session duration" value="8 hours" /><Setting label="Admin provisioning" value="ADMIN_EMAILS" /></dl></AdminPanel><AdminPanel title="Data connections"><dl className="space-y-4 text-sm"><Setting label="subscription_plans" value="Connected" tone="green" /><Setting label="user_subscriptions" value="Connected" tone="green" /><Setting label="token_usage" value="Connected" tone="green" /><Setting label="Central users service" value="Not connected" tone="amber" /><Setting label="Payment provider" value="Not connected" tone="amber" /><Setting label="audit_logs" value="Not connected" tone="amber" /></dl></AdminPanel><AdminPanel title="Production hardening" description="Required before internet deployment"><ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700"><li>Set a strong ADMIN_JWT_SECRET in the deployment secret manager.</li><li>Provision exact administrator addresses through ADMIN_EMAILS.</li><li>Replace browser-local user identity with a server-side identity provider.</li><li>Enable HTTPS so the secure session-cookie flag is enforced.</li></ul></AdminPanel></div></>;
}

function Setting({ label, value, tone }: { label: string; value: string; tone?: "green" | "amber" }) {
  return <div className="flex items-center justify-between border-b border-slate-100 pb-3"><dt className="text-slate-600">{label}</dt><dd className={`font-semibold ${tone === "green" ? "text-emerald-700" : tone === "amber" ? "text-amber-700" : "text-slate-900"}`}>{value}</dd></div>;
}
