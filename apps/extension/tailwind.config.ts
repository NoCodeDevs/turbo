import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@turbostarter/tailwind-config/mobile";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...fontFamily.sans],
        mono: ["DM Mono", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
