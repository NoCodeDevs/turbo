import { THEME_STORAGE_KEY, setupThemeStorage } from "~lib/storage/theme";

export * from "./theme";

export const STORAGE_KEY = {
  THEME: THEME_STORAGE_KEY,
} as const;

export const setupStorage = async () => {
  await setupThemeStorage();
};
