import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-web/icons";

interface MainProps {
  readonly className?: string;
  readonly filename: string;
}

export const Main = ({ className, filename }: MainProps) => {
  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <Icons.Logo className="w-20 animate-pulse text-primary" />
      <p className="text-pretty text-center leading-tight">
        Edit{" "}
        <code className="inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground">
          {filename}
        </code>{" "}
        and save to reload.
      </p>
      <a
        href="https://turbostarter.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer text-sm text-primary underline hover:no-underline"
      >
        Learn more
      </a>
    </main>
  );
};
