import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import { DMSans_400Regular, useFonts } from "@expo-google-fonts/dm-sans";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Application from "expo-application";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header } from "~/components/common/layout/header";
import { TABS_PREFIX } from "~/config/paths";
import { TRPCProvider } from "~/lib/api/trpc";
import { useTheme } from "~/lib/hooks/use-theme";
import "~/styles/globals.css";
import { isAndroid } from "~/utils/device";

void SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => {
  const { isDark } = useTheme();

  if (isAndroid) {
    void NavigationBar.setPositionAsync("absolute");
    void NavigationBar.setBackgroundColorAsync("transparent");
    void NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }

  return (
    <TRPCProvider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              header: () => (
                <Header title={Application.applicationName ?? ""} />
              ),
            }}
          >
            <Stack.Screen name={TABS_PREFIX} options={{ headerShown: false }} />

            <Stack.Screen name="index" />
          </Stack>
          <StatusBar barStyle="light-content" />
        </SafeAreaProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
};

const RootLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    DMMono_400Regular,
    DMSans_400Regular,
  });

  const { loaded: themeLoaded, setupTheme } = useTheme();

  const loaded = fontsLoaded && themeLoaded;
  const error = fontsError;

  useEffect(() => {
    void setupTheme();
  }, [setupTheme]);

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
};

export default RootLayout;
