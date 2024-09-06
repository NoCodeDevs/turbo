import { BillingProvider } from "../types";

import { lemonSqueezyStrategy } from "./lemon-squeezy";
import { stripeStrategy } from "./stripe";

import type { BillingProviderStrategy } from "./types";

export const strategies: Record<
  BillingProvider,
  () => BillingProviderStrategy
> = {
  [BillingProvider.STRIPE]: stripeStrategy,
  [BillingProvider.LEMON_SQUEEZY]: lemonSqueezyStrategy,
};
