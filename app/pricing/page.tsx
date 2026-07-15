import type { Metadata } from "next";
import { connection } from "next/server";
import { PricingGrid } from "@/components/pricing/PricingGrid";
import type { PricingPlan } from "@/components/pricing/PricingCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { PanelShell } from "@/components/ui/PanelShell";

export const metadata: Metadata = {
  title: "Pricing | AIDIRAC Access Layer",
  description:
    "AIDIRAC subscription plans and token allowances for the PRISM AI Workspace Platform.",
};

type PlanRecord = Record<string, unknown>;

type PlansResult =
  | { plans: PricingPlan[]; status: "success" }
  | { message: string; status: "error" };

function getString(record: PlanRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function getNumber(record: PlanRecord, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function getBoolean(record: PlanRecord, keys: string[]): boolean | null {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "boolean") {
      return value;
    }
  }

  return null;
}

function normalizeFeatures(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((feature) => {
      if (typeof feature === "string") {
        return feature.trim();
      }

      if (feature && typeof feature === "object") {
        return getString(feature as PlanRecord, [
          "name",
          "label",
          "title",
          "description",
        ]);
      }

      return null;
    })
    .filter((feature): feature is string => Boolean(feature));
}

function normalizePlan(record: PlanRecord, index: number): PricingPlan & {
  displayOrder: number;
  isActive: boolean;
} {
  const name = getString(record, ["name", "plan_name", "title"]) ?? "Plan";
  const monthlyTokenLimit = getNumber(record, [
    "monthly_token_limit",
    "monthlyTokenLimit",
    "token_limit",
  ]);
  const isEnterprise =
    name.toLowerCase() === "enterprise" ||
    getString(record, ["slug", "code"])?.toLowerCase() === "enterprise";

  return {
    description:
      getString(record, ["description", "summary"]) ??
      "Subscription plan details are managed by the AIDIRAC subscription service.",
    displayOrder:
      getNumber(record, ["display_order", "displayOrder", "order"]) ?? index,
    features: normalizeFeatures(record.features),
    id:
      getString(record, ["id", "slug", "code"]) ??
      `${name.toLowerCase().replace(/\s+/g, "-")}-${index}`,
    isActive: getBoolean(record, ["is_active", "active"]) ?? true,
    isEnterprise,
    monthlyPrice: getNumber(record, [
      "monthly_price_usd",
      "monthly_price",
      "price_usd",
      "price",
    ]),
    monthlyTokenLimit,
    name,
    pricingLabel: getString(record, ["pricing_label", "pricingLabel"]),
  };
}

async function getSubscriptionPlans(): Promise<PlansResult> {
  await connection();

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL ?? "http://127.0.0.1:8000";
  const endpoint = new URL("/api/subscription-plans", apiBaseUrl);

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        message: `Subscription API returned ${response.status}.`,
        status: "error",
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return {
        message: "Subscription API returned an unexpected response shape.",
        status: "error",
      };
    }

    const plans = data
      .filter(
        (item): item is PlanRecord => Boolean(item) && typeof item === "object",
      )
      .map(normalizePlan)
      .filter((plan) => plan.isActive)
      .sort((left, right) => left.displayOrder - right.displayOrder)
      .map(({ displayOrder, isActive, ...plan }) => plan);

    return { plans, status: "success" };
  } catch {
    return {
      message:
        "Unable to reach the subscription API. Confirm the backend is running at the configured URL.",
      status: "error",
    };
  }
}

export default async function PricingPage() {
  const result = await getSubscriptionPlans();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="AIDIRAC Subscriptions"
        title="Pricing"
        description="Choose a PRISM workspace subscription based on monthly token needs, active plan features, and support requirements."
      />

      {result.status === "error" ? (
        <PanelShell title="Pricing plans unavailable">
          <p className="text-sm leading-6 text-slate-400">{result.message}</p>
          <p className="mt-3 text-xs text-slate-500">
            Endpoint:{" "}
            {process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL ??
              "http://127.0.0.1:8000"}
            /api/subscription-plans
          </p>
        </PanelShell>
      ) : (
        <PricingGrid plans={result.plans} />
      )}
    </div>
  );
}
