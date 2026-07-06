import { DashboardCard } from "@/components/workspace/DashboardCard";
import { MetricCard } from "@/components/workspace/MetricCard";
import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

const workspaceRoutes = [
  {
    title: "Developer Workspace",
    description:
      "Build, inspect, run, and deploy PRISM AI workflows from a technical cockpit.",
    href: "/workspace/developer",
    marker: "DV",
  },
  {
    title: "Business Workspace",
    description:
      "Design automations, review analytics, and package operational reports.",
    href: "/workspace/business",
    marker: "BZ",
  },
  {
    title: "Admin Workspace",
    description:
      "Manage organization controls, roles, model routing, billing, and audit views.",
    href: "/workspace/admin",
    marker: "AD",
  },
];

const metrics = [
  ["Active workflows", "18", "Static count across PRISM mock workspaces"],
  ["Automation health", "96%", "Projected success rate for current routes"],
  ["Governance checks", "42", "Pending and complete control checks"],
];

export default function WorkspacePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="PRISM Workspace"
        title="Main AI workspace dashboard"
        description="Frontend-only Phase 4 workspace hub for developer, business, and admin operating modes after onboarding."
        action={<StatusBadge label="Phase 4 mock" tone="info" />}
      />

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map(([label, value, detail]) => (
          <MetricCard
            key={label}
            label={label}
            value={value}
            detail={detail}
          />
        ))}
      </section>

      {workspaceRoutes.length === 0 ? (
        <EmptyState
          title="No workspaces available"
          description="Workspace dashboards will appear here when routes are configured."
        />
      ) : (
      <section className="grid gap-4 lg:grid-cols-3">
        {workspaceRoutes.map((route) => (
          <DashboardCard
            key={route.href}
            title={route.title}
            description={route.description}
            href={route.href}
            marker={route.marker}
            status="Open"
          />
        ))}
      </section>
      )}

      <Panel
        title="Workspace Architecture"
        description="Static platform map for the PRISM AI Workspace Platform."
      >
        <div className="grid gap-3 md:grid-cols-4">
          {["Access", "Workspace", "AI Runtime", "Governance"].map((layer) => (
            <div
              key={layer}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-sm font-semibold text-white">{layer}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Mock frontend layer prepared for later integration.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
