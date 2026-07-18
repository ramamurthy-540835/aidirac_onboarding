export type SubscriptionPlan = {
  id: number;
  plan_code: string;
  name: string;
  description: string;
  monthly_price_usd: string | number | null;
  monthly_token_limit: number | null;
  features: string[];
  pricing_label: string | null;
  is_active: boolean;
  display_order: number;
};

export type UserSubscription = {
  id: number;
  user_id: string;
  plan_code: string;
  status: string;
  billing_cycle: string;
  token_allowance_snapshot: number | null;
  current_period_start: string;
  current_period_end: string;
};

export type UsageSummary = {
  user_id: string;
  plan_code: string;
  token_limit: number | null;
  tokens_used: number;
  tokens_remaining: number | null;
  usage_percent: number | null;
  period_start: string;
  period_end: string;
  unlimited: boolean;
};
