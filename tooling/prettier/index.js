import { fileURLToPath } from "url";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
const config = {
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: fileURLToPath(
    new URL("../../tooling/tailwind/config/web.ts", import.meta.url),
  ),
  tailwindFunctions: ["cn", "cva"],
  overrides: [
    {
      files: "*.json.hbs",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.js.hbs",
      options: {
        parser: "babel",
      },
    },
  ],
};

export default config;
