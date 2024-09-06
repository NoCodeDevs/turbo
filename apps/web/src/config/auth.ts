import { SOCIAL_PROVIDER, authConfigSchema } from "@turbostarter/auth";

import { env } from "~/lib/env";

import type { AuthConfig } from "@turbostarter/auth";

export const authConfig = authConfigSchema.parse({
  providers: {
    password: env.NEXT_PUBLIC_AUTH_PASSWORD === true,
    magicLink: env.NEXT_PUBLIC_AUTH_MAGIC_LINK === true,
    oAuth: [SOCIAL_PROVIDER.GOOGLE, SOCIAL_PROVIDER.GITHUB],
  },
}) satisfies AuthConfig;
