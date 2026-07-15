import { LoadingBlock } from "@/components/ui/LoadingBlock";
import { PageHeader } from "@/components/ui/PageHeader";

export default function PricingLoading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="AIDIRAC Subscriptions"
        title="Pricing"
        description="Loading active plans, token allowances, and workspace subscription options."
      />
      <LoadingBlock label="Loading pricing plans" />
    </div>
  );
}
