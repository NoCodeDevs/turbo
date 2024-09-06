import * as React from "react";
import { Text as RNText } from "react-native";

import { cn } from "@turbostarter/ui";

import * as Slot from "../primitives/slot";

import type { SlottableTextProps, TextRef } from "../primitives/types";

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "web:select-text font-sans text-base text-foreground",
          textClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext };
