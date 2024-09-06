import * as React from "react";

import { buttonVariants } from "./button";
import { Icons } from "./icons";

export const BuiltWith = () => {
  return (
    <a
      className={buttonVariants({
        variant: "outline",
        className: "cursor-pointer font-sans",
      })}
      href="https://www.turbostarter.dev"
      target="_blank"
    >
      Built with{" "}
      <div className="flex shrink-0 items-center gap-1.5">
        <Icons.Logo className="ml-1.5 h-4 text-primary" />
        <Icons.LogoText className="h-2.5 text-foreground" />
      </div>
    </a>
  );
};
