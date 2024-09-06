import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="mt-4 text-4xl font-bold">Not found!</h1>
        <p className="text-pretty text-center text-lg leading-tight">
          Edit{" "}
          <code className="mt-4 inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground">
            src/app/not-found.tsx
          </code>{" "}
          and save to reload.
        </p>
        <TurboLink
          href={pathsConfig.index}
          className="mt-6 inline-block text-primary underline hover:no-underline"
        >
          Go back home
        </TurboLink>
      </div>
    </main>
  );
}
