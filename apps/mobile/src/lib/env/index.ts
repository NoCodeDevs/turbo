/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { NODE_ENV } from "@turbostarter/shared/constants";

export const env = createEnv({
  shared: {
    APP_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  },
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
    EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),

    EXPO_PUBLIC_AUTH_PASSWORD: z.coerce.boolean().optional(),
    EXPO_PUBLIC_AUTH_MAGIC_LINK: z.coerce.boolean().optional(),

    EXPO_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

    EXPO_PUBLIC_AUTH_PASSWORD: !!process.env.EXPO_PUBLIC_AUTH_PASSWORD,
    EXPO_PUBLIC_AUTH_MAGIC_LINK: !!process.env.EXPO_PUBLIC_AUTH_MAGIC_LINK,

    EXPO_PUBLIC_SITE_URL: process.env.EXPO_PUBLIC_SITE_URL,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
