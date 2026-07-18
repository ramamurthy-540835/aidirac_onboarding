type SubscriptionStatusProps = {
  status?: string | null;
};

const labelMap: Record<string, string> = {
  active: "Active",
  pending: "Pending",
  cancelled: "Cancelled",
  expired: "Expired",
  past_due: "Past due",
};

export function SubscriptionStatus({ status }: SubscriptionStatusProps) {
  const normalized = status ?? "none";
  const tone = normalized === "active" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-amber-200";

  return (
    <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1", tone].join(" ")}>
      {labelMap[normalized] ?? "No subscription"}
    </span>
  );
}
