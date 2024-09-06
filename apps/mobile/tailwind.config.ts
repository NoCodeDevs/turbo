import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import { hairlineWidth } from "nativewind/theme";

import baseConfig from "@turbostarter/tailwind-config/mobile";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  darkMode: "class",
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DMSans_400Regular"],
        mono: ["DMMono_400Regular"],
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
} satisfies Config;
