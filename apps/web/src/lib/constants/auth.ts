import { AUTH_PROVIDER } from "@turbostarter/auth";

export const LOGIN_OPTIONS = [AUTH_PROVIDER.PASSWORD, AUTH_PROVIDER.MAGIC_LINK];

export type LoginOption = (typeof LOGIN_OPTIONS)[number];
