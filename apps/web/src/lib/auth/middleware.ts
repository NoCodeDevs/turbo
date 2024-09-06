import { NextResponse } from "next/server";

import { createServerClient } from "@turbostarter/auth";

import { env } from "~/lib/env";

import type { NextRequest } from "next/server";

export const createClient = (request: NextRequest) => {
  let response = NextResponse.next({
    request,
  });

  const auth = createServerClient(
    {
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  return { auth, response };
};
