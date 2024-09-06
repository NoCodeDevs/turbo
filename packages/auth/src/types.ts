import { isAuthApiError } from "@supabase/supabase-js";
import { z } from "zod";

import type {
  CookieMethodsBrowser,
  CookieMethodsServer,
  CookieOptionsWithName,
} from "@supabase/ssr";
import type {
  SupabaseClientOptions as SupabaseClientOptionsType,
  EmailOtpType,
  User,
  AuthApiError,
  Session,
} from "@supabase/supabase-js";
import type { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

type AuthClientOptions = SupabaseClientOptionsType<"public"> & {
  cookieOptions?: CookieOptionsWithName;
};

type AuthBrowserClientOptions = AuthClientOptions & {
  cookies: CookieMethodsBrowser;
};

type AuthServerClientOptions = AuthClientOptions & {
  cookies: CookieMethodsServer;
};

interface AuthClientConfig {
  url: string;
  key: string;
}

type AuthClient = SupabaseAuthClient;

const SOCIAL_PROVIDER = {
  GOOGLE: "google",
  GITHUB: "github",
} as const;

type SOCIAL_PROVIDER = (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

const AUTH_PROVIDER = {
  ...SOCIAL_PROVIDER,
  PASSWORD: "password",
  MAGIC_LINK: "magicLink",
} as const;

type AUTH_PROVIDER = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];

const authConfigSchema = z.object({
  providers: z.object({
    [AUTH_PROVIDER.PASSWORD]: z.boolean(),
    [AUTH_PROVIDER.MAGIC_LINK]: z.boolean(),
    oAuth: z.array(z.nativeEnum(SOCIAL_PROVIDER)),
  }),
});

type AuthConfig = z.infer<typeof authConfigSchema>;

export type {
  AuthClient,
  AuthClientConfig,
  AuthClientOptions,
  AuthBrowserClientOptions,
  AuthServerClientOptions,
  EmailOtpType,
  User,
  AuthConfig,
  AuthApiError,
  Session,
};

export { authConfigSchema, SOCIAL_PROVIDER, AUTH_PROVIDER, isAuthApiError };
