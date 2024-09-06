import { createClient } from "@turbostarter/auth";

import { env } from "~/lib/env";

export const auth = () => {
  return createClient({
    url: env.PLASMO_PUBLIC_SUPABASE_URL,
    key: env.PLASMO_PUBLIC_SUPABASE_ANON_KEY,
  });
};
