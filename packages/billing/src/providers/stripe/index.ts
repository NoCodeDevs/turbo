import { checkout, getBillingPortal } from "./checkout";
import { webhookHandler } from "./webhook";

export const stripeStrategy = () => ({
  webhookHandler,
  checkout,
  // getPlans,
  getBillingPortal,
});
