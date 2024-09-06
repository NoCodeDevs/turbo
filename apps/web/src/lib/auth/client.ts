import { createBrowserClient } from "@turbostarter/auth";

import { env } from "~/lib/env";

export const auth = () => {
  return createBrowserClient({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
};
