import { BuiltWith } from "@turbostarter/ui-web/built-with";

import { appConfig } from "~/config/app";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
      <p className="text-center text-muted-foreground sm:text-left">
        &copy; {new Date().getFullYear()} {appConfig.name}. All rights reserved.
      </p>
      <BuiltWith />
    </footer>
  );
};
