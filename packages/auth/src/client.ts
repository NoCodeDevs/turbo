import {
  createBrowserClient as createBrowserSupabaseClient,
  createServerClient as createServerSupabaseClient,
} from "@supabase/ssr";
import { createClient as createClientSupabase } from "@supabase/supabase-js";

import type {
  AuthBrowserClientOptions,
  AuthClient,
  AuthClientConfig,
  AuthClientOptions,
  AuthServerClientOptions,
} from "./types";

const createBrowserClient = (
  config: AuthClientConfig,
  options?: AuthBrowserClientOptions,
): AuthClient => {
  return createBrowserSupabaseClient(config.url, config.key, options).auth;
};

const createServerClient = (
  config: AuthClientConfig,
  options: AuthServerClientOptions,
): AuthClient => {
  return createServerSupabaseClient(config.url, config.key, options).auth;
};

const createClient = (
  config: AuthClientConfig,
  options?: AuthClientOptions,
) => {
  return createClientSupabase(config.url, config.key, options).auth;
};

export { createBrowserClient, createServerClient, createClient };
