import { THEME_MODE, cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { useTheme } from "~/lib/hooks/use-theme";

const MODE_ICONS = {
  [THEME_MODE.LIGHT]: Icons.Sun,
  [THEME_MODE.DARK]: Icons.Moon,
  [THEME_MODE.SYSTEM]: Icons.SunMoon,
} as const;

export const ThemeSettings = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>

        <CardDescription>Change the look and feel of the app</CardDescription>
      </CardHeader>

      <CardContent className="flex-row gap-2">
        {Object.values(THEME_MODE).map((mode) => {
          const isActive = mode === theme;
          const Icon = MODE_ICONS[mode];

          return (
            <Button
              variant="outline"
              key={mode}
              className={cn(
                "native:h-20 grow items-center justify-center gap-1",
                { "border-foreground": isActive },
              )}
              onPress={() => changeTheme(mode)}
            >
              <Icon className="mr-1 size-5 shrink-0 text-foreground" />
              <Text className="capitalize">{mode}</Text>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
