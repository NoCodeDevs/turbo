/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { NODE_ENV } from "@turbostarter/shared/constants";

export const env = createEnv({
  shared: {
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  },
  clientPrefix: "PLASMO_PUBLIC_",
  client: {
    PLASMO_PUBLIC_AUTH_COOKIE_NAME: z.string(),
    PLASMO_PUBLIC_SITE_URL: z.string().url(),
    PLASMO_PUBLIC_SUPABASE_URL: z.string().url(),
    PLASMO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    PLASMO_PUBLIC_AUTH_COOKIE_NAME: process.env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    PLASMO_PUBLIC_SITE_URL: process.env.PLASMO_PUBLIC_SITE_URL,
    PLASMO_PUBLIC_SUPABASE_URL: process.env.PLASMO_PUBLIC_SUPABASE_URL,
    PLASMO_PUBLIC_SUPABASE_ANON_KEY:
      process.env.PLASMO_PUBLIC_SUPABASE_ANON_KEY,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
