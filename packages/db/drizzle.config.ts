import { defineConfig } from "drizzle-kit";

import { env } from "./src/env";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: ["public"],
});
