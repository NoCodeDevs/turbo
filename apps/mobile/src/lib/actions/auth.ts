import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

import { AUTH_PROVIDER } from "@turbostarter/auth";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth";

import type {
  SOCIAL_PROVIDER,
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

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const redirectTo = makeRedirectUri({
    path: pathsConfig.tabs.auth.login,
  });

  const { error } = await auth().signInWithOtp({
    ...data,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const register = async (input: RegisterData) => {
  const redirectTo = makeRedirectUri({
    path: pathsConfig.tabs.auth.login,
  });

  const { error } = await auth().signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  const { error } = await auth().signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode ?? params.error) {
    throw new Error(errorCode ?? params.error);
  }

  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) {
    return;
  }

  const { data, error } = await auth().setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    throw error;
  }

  return data.session;
};

export const loginWithOAuth = async (provider: SOCIAL_PROVIDER) => {
  const redirectTo = makeRedirectUri();

  const { data, error } = await auth().signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw error;
  }

  const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (res.type === "success") {
    const { url } = res;
    return createSessionFromUrl(url);
  }
};

export const forgotPassword = async (input: ForgotPasswordData) => {
  const redirectTo = makeRedirectUri({
    path: pathsConfig.tabs.auth.forgotPassword,
  });

  const { error } = await auth().resetPasswordForEmail(input.email, {
    redirectTo,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const updatePassword = async (input: UpdatePasswordData) => {
  const { error } = await auth().updateUser(input);

  if (error) {
    throw new Error(error.message);
  }
};
