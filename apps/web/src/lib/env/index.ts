/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

import { env as apiEnv } from "@turbostarter/api/env";
import { NODE_ENV } from "@turbostarter/shared/constants";

export const env = createEnv({
  extends: [vercel(), apiEnv],
  shared: {
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {},

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),

    NEXT_PUBLIC_AUTH_PASSWORD: z.coerce.boolean().optional(),
    NEXT_PUBLIC_AUTH_MAGIC_LINK: z.coerce.boolean().optional(),

    NEXT_PUBLIC_PRODUCT_NAME: z.string(),
    NEXT_PUBLIC_SITE_TITLE: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_DESCRIPTION: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    NEXT_PUBLIC_AUTH_PASSWORD: !!process.env.NEXT_PUBLIC_AUTH_PASSWORD,
    NEXT_PUBLIC_AUTH_MAGIC_LINK: !!process.env.NEXT_PUBLIC_AUTH_MAGIC_LINK,

    NEXT_PUBLIC_PRODUCT_NAME: process.env.NEXT_PUBLIC_PRODUCT_NAME,
    NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});

const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl;

if (!publicUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL variables!",
  );
}

/* Force type inference to string */
const _publicUrl = publicUrl;
export { _publicUrl as publicUrl };
