import { checkout, getBillingPortal } from "./checkout";
import { setup } from "./client";
import { webhookHandler } from "./webhook";

export const lemonSqueezyStrategy = () => {
  setup();

  return {
    webhookHandler,
    checkout,
    getBillingPortal,
  };
};
