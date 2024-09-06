import Stripe from "stripe";

import { env } from "../../env";
import { BillingProvider } from "../../types";

let stripeInstance: Stripe | null = null;

export const stripe = () => {
  if (env.BILLING_PROVIDER !== BillingProvider.STRIPE) {
    throw new Error("Invalid billing provider!");
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(env.STRIPE_SECRET_KEY);
  }

  return stripeInstance;
};
