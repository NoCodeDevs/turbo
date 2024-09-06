import { fileURLToPath } from "url";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/lib/env");

const INTERNAL_PACKAGES = [
  "@turbostarter/api",
  "@turbostarter/auth",
  "@turbostarter/billing",
  "@turbostarter/db",
  "@turbostarter/shared",
  "@turbostarter/ui",
  "@turbostarter/ui-web",
];

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: INTERNAL_PACKAGES,

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
