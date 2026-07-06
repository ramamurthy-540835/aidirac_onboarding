import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";

const environments = [
  ["Preview", "Live", "success"],
  ["Staging", "Pending", "warning"],
  ["Production", "Locked", "neutral"],
] as const;

export function DeploymentPanel() {
  return (
    <Panel title="Deployment Panel" description="Mock release state by environment.">
      <div className="space-y-3">
        {environments.map(([environment, status, tone]) => (
          <div
            key={environment}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="text-sm font-medium text-slate-200">
              {environment}
            </span>
            <StatusBadge label={status} tone={tone} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
