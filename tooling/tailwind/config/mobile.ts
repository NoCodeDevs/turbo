import base from "./base";

import type { Config } from "tailwindcss";

export default {
  content: base.content,
  presets: [base],
  theme: {},
} satisfies Config;
