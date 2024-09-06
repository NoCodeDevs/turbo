import { config } from "./config";
import { getCustomerByUserId } from "./lib/customer";
import { strategies } from "./providers";

const { webhookHandler, checkout, getBillingPortal } =
  strategies[config.provider]();

export { webhookHandler, getCustomerByUserId, checkout, getBillingPortal };

export * from "./lib/schema";
