import { FeatureList } from "@/components/pricing/FeatureList";
import { TokenAllowance } from "@/components/pricing/TokenAllowance";

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  pricingLabel: string | null;
  monthlyTokenLimit: number | null;
  features: string[];
  isEnterprise: boolean;
};

type PricingCardProps = {
  plan: PricingPlan;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
  style: "currency",
});

export function PricingCard({ plan }: PricingCardProps) {
  const priceLabel = plan.isEnterprise
    ? plan.pricingLabel ?? "Custom pricing"
    : plan.monthlyPrice === null
      ? "Price unavailable"
      : currencyFormatter.format(plan.monthlyPrice);

  return (
    <article
      className={[
        "flex h-full flex-col rounded-lg border bg-[#0d1420] p-5 shadow-2xl shadow-black/20",
        plan.isEnterprise
          ? "border-cyan-300/35 bg-cyan-300/[0.06]"
          : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {plan.description}
          </p>
        </div>
        {plan.isEnterprise ? (
          <span className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
            Enterprise
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Monthly Price
        </p>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-normal text-white">
            {priceLabel}
          </p>
          {!plan.isEnterprise && plan.monthlyPrice !== null ? (
            <p className="pb-1 text-sm text-slate-500">/ month</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <TokenAllowance monthlyTokenLimit={plan.monthlyTokenLimit} />
      </div>

      <div className="mt-6 flex-1">
        <FeatureList features={plan.features} />
      </div>

      <button
        type="button"
        className={[
          "mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg border px-4 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-cyan-300",
          plan.isEnterprise
            ? "border-white/10 bg-white/[0.04] text-slate-100 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            : "border-cyan-200/70 bg-cyan-300 text-slate-950 hover:bg-cyan-200",
        ].join(" ")}
      >
        {plan.isEnterprise ? "Contact Sales" : "Subscribe"}
      </button>
    </article>
  );
}
