import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { HeaderControls } from "~/components/common/layout/header/controls";
import { TurboLink } from "~/components/common/turbo-link";
import { HOME_LINKS } from "~/lib/constants";

const HomePage = () => {
  return (
    <main className="flex w-full grow flex-col items-center justify-between gap-20">
      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row-reverse">
        <HeaderControls />
        <p className="w-full rounded-md border border-input bg-muted/25 px-6 py-3 text-center md:w-fit">
          Edit{" "}
          <code className="rounded-md bg-muted px-2 py-0.5 font-mono">
            app/page.tsx
          </code>{" "}
          and save to reload.
        </p>
      </div>
      <Icons.Logo className="h-36 animate-pulse text-primary" />
      <div className="grid grid-cols-1 items-stretch justify-center gap-3 sm:grid-cols-2 md:grid-cols-3">
        {HOME_LINKS.map((link) => (
          <TurboLink
            href={link.href}
            className="group w-full cursor-pointer"
            key={link.title}
          >
            <Card className="h-full transition-colors group-hover:bg-muted">
              <CardHeader>
                <CardTitle className="text-balance">
                  {link.title}
                  <Icons.ArrowRight className="ml-1 inline-block size-5 transition-transform group-hover:translate-x-1.5" />
                </CardTitle>
                <CardDescription className="text-pretty">
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </TurboLink>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
