import { NextResponse } from "next/server";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";
import { publicUrl } from "~/lib/env";

import type { EmailOtpType } from "@turbostarter/auth";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = searchParams.get("next") ?? publicUrl;

  if (!token_hash || !type) {
    return NextResponse.redirect(redirectTo);
  }

  const { data, error } = await auth().verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    const redirectBaseUrl = new URL(redirectTo);
    return NextResponse.redirect(
      `${redirectBaseUrl.protocol}//${redirectBaseUrl.host}${pathsConfig.auth.error}?code=${error.code}`,
    );
  }

  if (data.session) {
    return NextResponse.redirect(
      `${redirectTo}?access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}`,
    );
  }
}
