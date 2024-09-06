import * as React from "react";
import { forwardRef, memo } from "react";

import { THEME_COLOR, THEME_MODE } from "@turbostarter/ui";
import { cn } from "@turbostarter/ui";

import { Button } from "./button";
import { Icons } from "./icons";
import { Label } from "./label";

import type { ThemeConfig, ThemeOptions } from "@turbostarter/ui";

interface ThemeCustomizerProps {
  readonly config: ThemeConfig;
  readonly defaultConfig?: ThemeConfig;
  readonly onChange: (config: ThemeConfig) => void;
  readonly options: ThemeOptions;
}

const MODE_ICONS = {
  [THEME_MODE.LIGHT]: Icons.Sun,
  [THEME_MODE.DARK]: Icons.Moon,
  [THEME_MODE.SYSTEM]: Icons.SunMoon,
} as const;

export const ThemeStatus = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button variant="outline" className="rounded-full" ref={ref} {...props}>
      <span className="sr-only">Customize theme</span>
      <div className="flex items-center justify-center gap-2">
        <div className="size-4 rounded-full bg-primary"></div>
        <Icons.Sun className="size-[1.2rem] dark:hidden" />
        <Icons.Moon className="hidden size-[1.2rem] dark:block" />
      </div>
    </Button>
  );
});

export const ThemeCustomizer = memo<ThemeCustomizerProps>(
  ({ config, defaultConfig, onChange, options }) => {
    return (
      <>
        <div className="flex items-start">
          <div className="space-y-1 pr-2">
            <div className="font-semibold leading-none tracking-tight">
              Customize
            </div>
            <div className="text-xs text-muted-foreground">
              Pick a style and color for your app.
            </div>
          </div>
          {defaultConfig && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-[0.5rem]"
              onClick={() => {
                onChange(defaultConfig);
              }}
            >
              <Icons.Undo2 className="size-4" />
              <span className="sr-only">Reset</span>
            </Button>
          )}
        </div>
        <div className="mt-2 flex flex-1 flex-col items-center space-y-4 md:space-y-6">
          <div className="w-full space-y-1.5">
            <Label className="text-xs">Color</Label>
            <div className="flex flex-wrap gap-2">
              {options.colors
                .filter((color) => Object.values(THEME_COLOR).includes(color))
                .map((color) => {
                  const isActive = config.color === color;

                  return (
                    <Button
                      variant={"outline"}
                      size="sm"
                      key={color}
                      onClick={() => onChange({ ...config, color })}
                      className={cn(
                        "grow basis-[85px] justify-start text-xs capitalize",
                        isActive && "border-2 border-primary",
                      )}
                    >
                      <span
                        data-theme={color}
                        className={cn(
                          "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-white bg-primary",
                        )}
                      >
                        {isActive && (
                          <Icons.Check className="size-3 text-white" />
                        )}
                      </span>
                      {color}
                    </Button>
                  );
                })}
            </div>
          </div>
          <div className="w-full space-y-1.5">
            <Label className="text-xs">Mode</Label>
            <div className="flex flex-wrap gap-2">
              {options.modes.map((mode) => {
                const isActive = config.mode === mode;
                const Icon = MODE_ICONS[mode];

                return (
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => onChange({ ...config, mode })}
                    className={cn(
                      "grow basis-[85px] justify-start text-xs capitalize",
                      isActive && "border-2 border-primary",
                    )}
                  >
                    <Icon className="mr-1 size-5 shrink-0 -translate-x-1" />
                    {mode}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  },
);

ThemeCustomizer.displayName = "ThemeCustomizer";
