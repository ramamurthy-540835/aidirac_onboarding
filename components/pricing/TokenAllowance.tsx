type TokenAllowanceProps = {
  monthlyTokenLimit: number | null;
};

const tokenFormatter = new Intl.NumberFormat("en-US");

export function TokenAllowance({ monthlyTokenLimit }: TokenAllowanceProps) {
  const value =
    monthlyTokenLimit === null
      ? "Custom"
      : tokenFormatter.format(monthlyTokenLimit);

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Monthly Tokens
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">
        {monthlyTokenLimit === null
          ? "Custom token allowance"
          : "Included every billing cycle"}
      </p>
    </div>
  );
}
