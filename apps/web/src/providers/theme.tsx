"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { memo, useEffect } from "react";

import { appConfig } from "~/config/app";

import type { ThemeConfig } from "@turbostarter/ui";

const configAtom = atomWithStorage<Omit<ThemeConfig, "mode">>(
  "config",
  appConfig.theme.default,
);

export function useThemeConfig() {
  return useAtom(configAtom);
}

interface ThemeProviderProps {
  readonly children: React.ReactNode;
}

const ThemeConfigProvider = () => {
  const [themeConfig] = useThemeConfig();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeConfig.color);
  }, [themeConfig.color]);

  return null;
};

export const ThemeProvider = memo<ThemeProviderProps>(({ children }) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={appConfig.theme.default.mode}
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ThemeConfigProvider />
    </NextThemeProvider>
  );
});

ThemeProvider.displayName = "ThemeProvider";
