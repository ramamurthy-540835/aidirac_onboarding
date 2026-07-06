import { AgentStatus } from "@/components/agents/AgentStatus";

const executionDetails = [
  ["Current Agent", "Tester Agent"],
  ["Execution Status", "Running"],
  ["Estimated Duration", "04 min 30 sec"],
  ["Last Result", "Reviewer approved code and validation started"],
];

export function AgentExecutionPanel() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">
            Execution Panel
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Current static execution state for PRISM agents.
          </p>
        </div>
        <AgentStatus status="Running" tone="running" />
      </div>

      <dl className="mt-5 grid gap-3">
        {executionDetails.map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {label}
            </dt>
            <dd className="mt-2 text-sm font-medium leading-6 text-slate-200">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
