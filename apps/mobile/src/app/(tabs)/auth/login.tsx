import { router } from "expo-router";

import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth";
import { pathsConfig } from "~/config/paths";
import { LOGIN_OPTIONS } from "~/lib/constants";
import { useAuthDeepLink } from "~/lib/hooks/use-auth-deep-link";

import type { LoginOption } from "~/lib/constants";

const LoginPage = () => {
  useAuthDeepLink({
    onSuccess: () => router.replace(pathsConfig.tabs.settings),
    path: pathsConfig.tabs.auth.login,
  });

  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <Auth.Layout>
      <Auth.Header
        title="Welcome back! 👋"
        description="Enter your email below to login to your account "
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
        <Auth.Divider />
      )}
      <Auth.Login options={options} />
    </Auth.Layout>
  );
};

export default LoginPage;
