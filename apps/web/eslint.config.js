import baseConfig, {
  restrictEnvAccess,
} from "@turbostarter/eslint-config/base";
import nextConfig from "@turbostarter/eslint-config/next";
import reactConfig from "@turbostarter/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...restrictEnvAccess,
];
