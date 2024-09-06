import { memo } from "react";

import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TRPCReactProvider>
  );
});

Providers.displayName = "Providers";
