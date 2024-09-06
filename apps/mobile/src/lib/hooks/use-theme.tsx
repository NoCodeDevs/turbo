import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

import { THEME_MODE } from "@turbostarter/ui";
import { useColorScheme } from "@turbostarter/ui-mobile";

import type { ThemeMode } from "@turbostarter/ui";

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loaded, setLoaded] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>(colorScheme);

  const setupTheme = useCallback(async () => {
    const storedTheme = await AsyncStorage.getItem("theme");

    if (storedTheme === THEME_MODE.SYSTEM) {
      setTheme(storedTheme);
      setLoaded(true);
      return;
    }

    if (!storedTheme) {
      await AsyncStorage.setItem("theme", THEME_MODE.SYSTEM);
      setTheme(THEME_MODE.SYSTEM);
      setLoaded(true);
      return;
    }

    const colorTheme =
      storedTheme === THEME_MODE.DARK ? THEME_MODE.DARK : THEME_MODE.LIGHT;

    if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);
      setTheme(colorTheme);
      setLoaded(true);
      return;
    }
    setLoaded(true);
  }, [colorScheme, setColorScheme]);

  const changeTheme = useCallback(
    async (theme: ThemeMode) => {
      setTheme(theme);
      setColorScheme(theme);
      await AsyncStorage.setItem("theme", theme);
    },
    [setColorScheme],
  );

  const isDark =
    theme === THEME_MODE.DARK ||
    (theme === THEME_MODE.SYSTEM && colorScheme === THEME_MODE.DARK);

  return {
    setupTheme,
    changeTheme,
    loaded,
    theme,
    isDark,
  };
};
