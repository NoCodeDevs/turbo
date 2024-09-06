import type { CheckoutInput, GetBillingPortalInput } from "../lib/schema";
import type { User } from "@turbostarter/auth";

export interface BillingProviderStrategy {
  webhookHandler: (req: Request) => Promise<Response>;
  checkout: (
    input: CheckoutInput & { user: User },
  ) => Promise<{ url: string | null }>;
  getBillingPortal: (
    input: GetBillingPortalInput & { user: User },
  ) => Promise<{ url: string }>;
}
