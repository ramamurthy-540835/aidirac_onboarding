import { LogStatusBadge } from "@/components/logs/LogStatusBadge";

const details = [
  ["Selected Log", "Audit #A-204"],
  ["Source", "PRISM frontend mock stream"],
  ["Retention", "30 days placeholder"],
  ["Export", "Disabled in frontend-only mode"],
];

export function LogDetails() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">Log Details</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Static details panel for selected log context.
          </p>
        </div>
        <LogStatusBadge label="Preview" tone="neutral" />
      </div>

      <dl className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
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
