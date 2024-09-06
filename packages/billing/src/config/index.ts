import { BillingModel, BillingProvider, BillingStatus } from "../types";

import { discounts, plans } from "./plans";
import { billingConfigSchema } from "./schema";

import type { BillingConfig } from "../types";

export const config = billingConfigSchema.parse({
  provider: BillingProvider.STRIPE,
  model: BillingModel.RECURRING,
  currency: "usd",
  plans,
  discounts,
}) satisfies BillingConfig;

export const ACTIVE_BILLING_STATUSES: BillingStatus[] = [
  BillingStatus.ACTIVE,
  BillingStatus.TRIALING,
];

export * from "./features";
