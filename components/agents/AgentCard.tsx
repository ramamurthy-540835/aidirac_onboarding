import { AgentStatus } from "@/components/agents/AgentStatus";

export type AgentCardData = {
  name: string;
  description: string;
  status: string;
  statusTone: "idle" | "running" | "complete" | "waiting" | "stopped";
  lastRun: string;
  assignedTasks: string;
  modelUsed: string;
};

type AgentCardProps = {
  agent: AgentCardData;
};

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {agent.description}
          </p>
        </div>
        <AgentStatus status={agent.status} tone={agent.statusTone} />
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="text-slate-500">Last Run</dt>
          <dd className="font-medium text-slate-200">{agent.lastRun}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="text-slate-500">Assigned Tasks</dt>
          <dd className="font-medium text-slate-200">{agent.assignedTasks}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="text-slate-500">Model Used</dt>
          <dd className="font-mono text-xs font-medium text-cyan-200">
            {agent.modelUsed}
          </dd>
        </div>
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          aria-label={`Run ${agent.name}`}
          className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
        >
          Run
        </button>
        <button
          type="button"
          aria-label={`Stop ${agent.name}`}
          className="rounded-md border border-rose-300/25 bg-rose-300/10 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-300/20"
        >
          Stop
        </button>
      </div>
    </article>
  );
}
