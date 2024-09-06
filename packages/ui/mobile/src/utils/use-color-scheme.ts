/* eslint-disable @typescript-eslint/unbound-method */
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { THEME_MODE } from "@turbostarter/ui";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? THEME_MODE.DARK,
    isDarkColorScheme: colorScheme === THEME_MODE.DARK,
    setColorScheme,
    toggleColorScheme,
  };
}
