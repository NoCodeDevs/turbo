/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
});
