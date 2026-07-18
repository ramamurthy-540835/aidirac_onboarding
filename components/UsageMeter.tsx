type UsageMeterProps = {
  used: number;
  limit: number | null;
};

const compactFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});

export function UsageMeter({ used, limit }: UsageMeterProps) {
  const unlimited = limit === null;
  const percent = unlimited || limit === 0 ? 0 : Math.min((used / limit) * 100, 100);
  const remaining = unlimited ? null : Math.max(limit - used, 0);

  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">Token usage</p>
          <p className="mt-1 text-sm text-slate-600">
            {unlimited ? "Custom enterprise allowance" : `${compactFormatter.format(remaining ?? 0)} tokens remaining`}
          </p>
        </div>
        <p className="text-sm font-medium text-slate-700">
          {unlimited ? "Custom" : `${Math.round(percent)}%`}
        </p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-blue-700" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <Metric label="Used" value={compactFormatter.format(used)} />
        <Metric label="Limit" value={unlimited ? "Custom" : compactFormatter.format(limit)} />
        <Metric label="Remaining" value={unlimited ? "Custom" : compactFormatter.format(remaining ?? 0)} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-950">{value}</p>
    </div>
  );
}
