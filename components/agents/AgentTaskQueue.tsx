import { AgentStatus } from "@/components/agents/AgentStatus";

const queuedTasks = [
  ["Task #101", "Waiting", "waiting"],
  ["Task #102", "Running", "running"],
  ["Task #103", "Completed", "complete"],
] as const;

export function AgentTaskQueue() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <h2 className="text-base font-semibold text-white">Task Queue</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Mock queued work for the multi-agent runtime.
      </p>

      <div className="mt-5 space-y-3">
        {queuedTasks.map(([task, status, tone]) => (
          <div
            key={task}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="text-sm font-medium text-slate-200">{task}</span>
            <AgentStatus status={status} tone={tone} />
          </div>
        ))}
      </div>
    </section>
  );
}
