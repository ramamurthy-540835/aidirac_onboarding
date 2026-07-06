const activityItems = [
  "Planner created execution plan",
  "Coder completed implementation",
  "Reviewer approved code",
  "Tester started validation",
  "Deployment queued",
];

export function AgentActivity() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <h2 className="text-base font-semibold text-white">Activity Feed</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Recent static agent actions across the control center.
      </p>

      <div className="mt-5 space-y-3">
        {activityItems.map((item, index) => (
          <div
            key={item}
            className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-cyan-300/10 text-xs font-semibold text-cyan-200">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
