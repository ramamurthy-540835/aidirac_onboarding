import { DashboardCard } from "@/components/workspace/DashboardCard";
import { MetricCard } from "@/components/workspace/MetricCard";
import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";

const metrics = [
  ["Users", "128", "Static users across the organization", "Synced"],
  ["Roles", "9", "Mock RBAC role definitions", "Active"],
  ["Model routes", "6", "Placeholder routing policies", "Draft"],
];

const managementCards = [
  ["User Management", "Invite, review, and suspend workspace members.", "UM", "Static"],
  [
    "Organization Management",
    "Manage tenant profile and workspace limits.",
    "OM",
    "Static",
  ],
  ["Role Management", "Configure role permissions and access scopes.", "RM", "Static"],
  ["Model Routing", "Assign model routes for workload categories.", "MR", "Static"],
  [
    "BigQuery Logs",
    "Placeholder audit destination for future data export.",
    "BQ",
    "Placeholder",
  ],
  ["Billing", "Placeholder billing overview and plan state.", "BL", "Placeholder"],
];

const modelRoutes = [
  ["Code tasks", "prism-code-fast", "Active"],
  ["Business analysis", "prism-reason-balanced", "Active"],
  ["Admin review", "prism-governance-safe", "Draft"],
];

export default function AdminWorkspacePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Admin Workspace"
        title="Govern PRISM workspace operations"
        description="Administrative dashboard for users, organizations, roles, model routing, BigQuery log placeholders, and billing placeholders."
        action={<StatusBadge label="Governance mock" tone="info" />}
      />

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map(([label, value, detail, status]) => (
          <MetricCard
            key={label}
            label={label}
            value={value}
            detail={detail}
            status={status}
          />
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {managementCards.map(([title, description, marker, status]) => (
          <DashboardCard
            key={title}
            title={title}
            description={description}
            marker={marker}
            status={status}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Model Routing"
          description="Static routing table for future AI workload policies."
          className="lg:col-span-2"
        >
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-3 bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>Workload</span>
              <span>Route</span>
              <span>Status</span>
            </div>
            {modelRoutes.map(([workload, route, status]) => (
              <div
                key={workload}
                className="grid grid-cols-3 border-t border-white/10 px-4 py-3 text-sm"
              >
                <span className="text-slate-200">{workload}</span>
                <span className="font-mono text-slate-400">{route}</span>
                <span className="text-cyan-200">{status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Billing" description="No billing integration in Phase 4.">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-2xl font-semibold text-white">$0.00</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Placeholder balance for frontend-only workspace validation.
            </p>
          </div>
        </Panel>
      </section>
    </div>
  );
}
