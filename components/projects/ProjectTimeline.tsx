const timeline = [
  ["10:05", "Planner Agent created execution plan"],
  ["10:18", "Coder Agent completed workspace UI scaffold"],
  ["10:29", "Reviewer Agent marked implementation ready"],
  ["10:41", "Tester Agent started build validation"],
];

export function ProjectTimeline() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <h2 className="text-base font-semibold text-white">Project Timeline</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Static recent activity across active project work.
      </p>

      <div className="mt-5 space-y-3">
        {timeline.map(([time, activity]) => (
          <div
            key={`${time}-${activity}`}
            className="grid grid-cols-[4.5rem_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {time}
            </span>
            <p className="text-sm leading-6 text-slate-300">{activity}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
