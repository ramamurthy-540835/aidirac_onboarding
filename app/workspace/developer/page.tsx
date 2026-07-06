import { ChatPanel } from "@/components/workspace/ChatPanel";
import { CodeEditorPlaceholder } from "@/components/workspace/CodeEditorPlaceholder";
import { DagViewerPlaceholder } from "@/components/workspace/DagViewerPlaceholder";
import { DeploymentPanel } from "@/components/workspace/DeploymentPanel";
import { LogsPanel } from "@/components/workspace/LogsPanel";
import { MetricCard } from "@/components/workspace/MetricCard";
import { StatusBadge } from "@/components/workspace/StatusBadge";
import { TaskRunnerPanel } from "@/components/workspace/TaskRunnerPanel";
import { PageHeader } from "@/components/ui/PageHeader";

const metrics = [
  ["Runs today", "27", "Mock task executions in this workspace", "Healthy"],
  ["Open changes", "8", "Placeholder files requiring review", "Review"],
  ["Deploy target", "Staging", "Current static release destination", "Pending"],
];

export default function DeveloperWorkspacePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Developer Workspace"
        title="Build and operate PRISM AI tasks"
        description="Technical cockpit with chat, code, DAG, task, log, and deployment surfaces using static Phase 4 data."
        action={<StatusBadge label="No backend" tone="neutral" />}
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
        <ChatPanel />
        <TaskRunnerPanel />
        <CodeEditorPlaceholder />
        <LogsPanel />
        <DagViewerPlaceholder />
        <DeploymentPanel />
      </section>
    </div>
  );
}
