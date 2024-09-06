import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { HeaderControls } from "./controls";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <TurboLink
        href={pathsConfig.index}
        className="flex shrink-0 items-center gap-3.5"
      >
        <Icons.Logo className="h-9 text-primary" />
        <Icons.LogoText className="h-4 text-foreground" />
      </TurboLink>

      <HeaderControls />
    </header>
  );
};
