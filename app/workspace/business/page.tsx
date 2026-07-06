import { DashboardCard } from "@/components/workspace/DashboardCard";
import { MetricCard } from "@/components/workspace/MetricCard";
import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";
import { PageHeader } from "@/components/ui/PageHeader";

const metrics = [
  ["Automations", "34", "Mock active business automations", "Tracked"],
  ["Reports", "12", "Static monthly report packages", "Ready"],
  ["Conversion lift", "18%", "Placeholder analytics improvement", "Mock"],
];

const workflowStages = ["Trigger", "Qualify", "Approve", "Notify"];
const automationItems = [
  "Lead scoring assistant",
  "Invoice exception routing",
  "Customer success summary",
];
const reportItems = ["Executive brief", "Operations pack", "Risk review"];

export default function BusinessWorkspacePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Business Workspace"
        title="Automate and measure business workflows"
        description="Frontend-only business operating layer for workflows, AI automation, analytics, reports, and overview signals."
        action={<StatusBadge label="Static data" tone="info" />}
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

      <section className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Workflow Builder"
          description="Static builder preview for business process design."
          className="lg:col-span-2"
        >
          <div className="grid gap-3 sm:grid-cols-4">
            {workflowStages.map((stage, index) => (
              <div
                key={stage}
                className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-sm font-semibold text-white">{stage}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="AI Automation" description="Suggested automation catalog.">
          <div className="space-y-3">
            {automationItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm font-medium text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Analytics"
          description="Mock trend view for operational performance."
          className="lg:col-span-2"
        >
          <div className="flex h-48 items-end gap-3 rounded-lg border border-white/10 bg-[#080b12] p-4">
            {[46, 68, 58, 82, 74, 92].map((height, index) => (
              <div
                key={`${height}-${index}`}
                className="flex flex-1 items-end rounded-t-md bg-cyan-300/20"
                style={{ height: `${height}%` }}
              >
                <span className="sr-only">Mock analytics bar {index + 1}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Reports" description="Prepared static report outputs.">
          <div className="space-y-3">
            {reportItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <span className="text-sm font-medium text-slate-200">
                  {item}
                </span>
                <StatusBadge label="Ready" tone="success" />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Revenue operations", "Customer experience", "Risk and compliance"].map(
          (area) => (
            <DashboardCard
              key={area}
              title={area}
              description="Business overview placeholder prepared for future data-backed workspace modules."
              marker={area
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
              status="Overview"
            />
          ),
        )}
      </section>
    </div>
  );
}
