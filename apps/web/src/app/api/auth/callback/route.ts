import { NextResponse } from "next/server";

import { isAuthApiError } from "@turbostarter/auth";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";
import { publicUrl } from "~/lib/env";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("next") ?? publicUrl;

  if (code) {
    try {
      const { error } = await auth().exchangeCodeForSession(code);

      if (error) {
        return NextResponse.redirect(
          `${origin}${pathsConfig.auth.error}?code=${error.code}`,
        );
      }
    } catch (error) {
      if (isAuthApiError(error)) {
        return NextResponse.redirect(
          `${origin}${pathsConfig.auth.error}?code=${error.code}`,
        );
      }

      return NextResponse.redirect(`${origin}${pathsConfig.auth.error}`);
    }
  }

  return NextResponse.redirect(redirectTo);
}
