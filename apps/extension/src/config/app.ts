import { THEME_COLOR, THEME_MODE } from "@turbostarter/ui";

export const appConfig = {
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
