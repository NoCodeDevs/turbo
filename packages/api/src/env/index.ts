import { createEnv } from "@t3-oss/env-core";

import { env as billingEnv } from "@turbostarter/billing/env";

export const env = createEnv({
  extends: [billingEnv],
  runtimeEnv: process.env,
  server: {},
});
