import { StatusBadge } from "@/components/workspace/StatusBadge";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  status?: string;
};

export function MetricCard({ label, value, detail, status }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        {status ? <StatusBadge label={status} tone="info" /> : null}
      </div>
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}
