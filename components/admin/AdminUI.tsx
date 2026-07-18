export function AdminPageHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">AIDIRAC Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function KpiCard({ label, value, detail, tone = "blue" }: { label: string; value: string; detail: string; tone?: "blue" | "green" | "purple" | "amber" }) {
  const colors = { blue: "border-blue-600", green: "border-emerald-600", purple: "border-violet-600", amber: "border-amber-500" };
  return (
    <article className={`border border-slate-200 border-t-4 bg-white p-5 shadow-sm ${colors[tone]}`}>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </article>
  );
}

export function AdminPanel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const color = normalized === "active" || normalized === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : normalized === "pending" ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-slate-100 text-slate-700 ring-slate-200";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${color}`}>{status}</span>;
}

export function LoadingBlock({ label = "Loading admin data…" }: { label?: string }) {
  return <div className="border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">{label}</div>;
}

export const tableClass = "w-full min-w-[760px] border-collapse text-left text-sm";
export const thClass = "border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600";
export const tdClass = "border-b border-slate-100 px-4 py-3 text-slate-700";
