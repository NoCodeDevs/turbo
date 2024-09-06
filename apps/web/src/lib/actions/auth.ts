import { AUTH_PROVIDER } from "@turbostarter/auth";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/client";

import type { SOCIAL_PROVIDER } from "@turbostarter/auth";
import type {
  ForgotPasswordData,
  MagicLinkLoginData,
  PasswordLoginData,
  RegisterData,
  UpdatePasswordData,
} from "@turbostarter/auth";
import type { LoginOption } from "~/lib/constants";

type LoginPayload =
  | {
      option: Extract<LoginOption, "password">;
      data: PasswordLoginData;
    }
  | {
      option: Extract<LoginOption, "magicLink">;
      data: MagicLinkLoginData;
    };

export const login = async ({ data, option }: LoginPayload) => {
  if (option === AUTH_PROVIDER.PASSWORD) {
    const { error } = await auth().signInWithPassword(data);

    return { error: error?.message ?? null };
  }

  const { error } = await auth().signInWithOtp({
    ...data,
    options: {
      emailRedirectTo: `${location.origin}${pathsConfig.auth.login}`,
    },
  });

  return { error: error?.message ?? null };
};

export const loginWithOAuth = (provider: SOCIAL_PROVIDER) => {
  return auth().signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}${pathsConfig.api.auth.callback}`,
    },
  });
};

export const register = async (input: RegisterData) => {
  const { error } = await auth().signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: `${location.origin}${pathsConfig.auth.login}`,
    },
  });

  return { error: error?.message ?? null };
};

export const logout = async () => {
  await auth().signOut();
};

export const forgotPassword = async (input: ForgotPasswordData) => {
  const { error } = await auth().resetPasswordForEmail(input.email, {
    redirectTo: `${location.origin}${pathsConfig.auth.updatePassword}`,
  });

  return { error: error?.message ?? null };
};

export const updatePassword = async (input: UpdatePasswordData) => {
  const { error } = await auth().updateUser(input);

  return { error: error?.message ?? null };
};
