import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

import { NODE_ENV } from "@turbostarter/shared/constants";

import type { AppRouter } from "@turbostarter/api";

import { auth } from "~lib/auth";
import { env } from "~lib/env";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@turbostarter/api";

const getBaseUrl = () => {
  return env.PLASMO_PUBLIC_SITE_URL;
};

export const TRPCProvider = (props: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "extension-react");

            const { data } = await auth().getSession();
            const token = data.session?.access_token;
            if (token) {
              headers.set("authorization", token);
            }

            return Object.fromEntries(headers);
          },
        }),
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === NODE_ENV.DEVELOPMENT ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
};
