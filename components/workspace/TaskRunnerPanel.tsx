import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";

const tasks = [
  ["Generate plan", "Complete", "success"],
  ["Validate policy", "Running", "warning"],
  ["Package artifact", "Queued", "neutral"],
] as const;

export function TaskRunnerPanel() {
  return (
    <Panel title="Task Runner" description="Mock execution queue for PRISM jobs.">
      <div className="space-y-3">
        {tasks.map(([task, status, tone]) => (
          <div
            key={task}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="text-sm font-medium text-slate-200">{task}</span>
            <StatusBadge label={status} tone={tone} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
