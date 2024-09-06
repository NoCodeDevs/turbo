import { THEME_COLOR, THEME_MODE } from "@turbostarter/ui";

import { env } from "~/lib/env";

export const appConfig = {
  name: env.NEXT_PUBLIC_PRODUCT_NAME,
  title: env.NEXT_PUBLIC_SITE_TITLE,
  link: env.NEXT_PUBLIC_SITE_URL,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  theme: {
    options: {
      modes: Object.values(THEME_MODE),
      colors: Object.values(THEME_COLOR),
    },
    default: {
      mode: THEME_MODE.SYSTEM,
      color: THEME_COLOR.ORANGE,
    },
  },
} as const;
