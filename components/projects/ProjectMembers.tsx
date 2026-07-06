const members = [
  ["Maya Chen", "Owner"],
  ["Arjun Mehta", "Developer"],
  ["Nora Patel", "Reviewer"],
  ["PRISM Runtime", "AI Agent"],
];

export function ProjectMembers() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <h2 className="text-base font-semibold text-white">Project Members</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Mock team and agent assignments for the selected project.
      </p>

      <div className="mt-5 space-y-3">
        {members.map(([name, role]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <span className="text-sm font-medium text-slate-200">{name}</span>
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300">
              {role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
