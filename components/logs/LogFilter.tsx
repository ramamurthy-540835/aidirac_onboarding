import { LogStatusBadge } from "@/components/logs/LogStatusBadge";

const filters = ["All", "Users", "Agents", "Projects", "Workspaces", "Audit"];

export function LogFilter() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">Log Filters</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Frontend-only search and filter controls for mock PRISM logs.
          </p>
        </div>
        <LogStatusBadge label="Static data" tone="info" />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label className="block">
          <span className="sr-only">Search logs</span>
          <input
            type="search"
            placeholder="Search logs by user, agent, project, action, or event"
            className="h-11 w-full rounded-md border border-white/10 bg-[#080b12] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
          />
        </label>
        <label className="block">
          <span className="sr-only">Filter logs by time range</span>
          <select className="h-11 w-full rounded-md border border-white/10 bg-[#080b12] px-4 text-sm font-medium text-slate-300 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 lg:w-auto">
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            aria-pressed={index === 0}
            className={[
              "rounded-md border px-3 py-2 text-sm font-medium transition",
              index === 0
                ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/25 hover:text-cyan-100",
            ].join(" ")}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}
