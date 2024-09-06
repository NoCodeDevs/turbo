import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@turbostarter/api";
import { NODE_ENV } from "@turbostarter/shared/constants";

import { auth } from "~/lib/auth/server";
import { env } from "~/lib/env";

import type { NextRequest } from "next/server";

const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
};

const handler = async (req: NextRequest) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        headers: req.headers,
        auth: auth(),
      }),
    onError:
      env.NODE_ENV === NODE_ENV.DEVELOPMENT
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ error }) => console.error(error),
  });

  setCorsHeaders(response);
  return response;
};

export { handler as GET, handler as POST };
