import { EmptyState } from "@/components/ui/EmptyState";
import { PricingCard, type PricingPlan } from "@/components/pricing/PricingCard";

type PricingGridProps = {
  plans: PricingPlan[];
};

export function PricingGrid({ plans }: PricingGridProps) {
  if (plans.length === 0) {
    return (
      <EmptyState
        title="No active subscription plans"
        description="The subscription API returned no active plans for this workspace."
      />
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </section>
  );
}
