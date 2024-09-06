const TABS_PREFIX = "(tabs)";
const AUTH_PREFIX = "/auth";

const pathsConfig = {
  index: "/",
  tabs: {
    auth: {
      login: `/${TABS_PREFIX}${AUTH_PREFIX}/login`,
      register: `/${TABS_PREFIX}${AUTH_PREFIX}/register`,
      forgotPassword: `/${TABS_PREFIX}${AUTH_PREFIX}/password/forgot`,
      updatePassword: `/${TABS_PREFIX}${AUTH_PREFIX}/password/update`,
      error: `/${TABS_PREFIX}${AUTH_PREFIX}/error`,
    },
    billing: `/${TABS_PREFIX}/billing`,
    blog: `/${TABS_PREFIX}/blog`,
    settings: `/${TABS_PREFIX}/settings`,
  },
} as const;

export { pathsConfig, TABS_PREFIX };
