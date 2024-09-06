export const THEME_MODE = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
} as const;

export const THEME_COLOR = {
  ORANGE: "orange",
  ROSE: "rose",
  RED: "red",
  YELLOW: "yellow",
  GRAY: "gray",
  STONE: "stone",
  GREEN: "green",
  BLUE: "blue",
  VIOLET: "violet",
} as const;

export type ThemeColor = (typeof THEME_COLOR)[keyof typeof THEME_COLOR];
export type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE];

export interface ThemeConfig {
  mode: ThemeMode;
  color: ThemeColor;
}

export interface ThemeOptions {
  modes: ThemeMode[];
  colors: ThemeColor[];
}

export const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
