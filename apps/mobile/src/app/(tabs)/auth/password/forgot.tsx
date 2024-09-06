import { router } from "expo-router";

import { Auth } from "~/components/auth/auth";
import { pathsConfig } from "~/config/paths";
import { useAuthDeepLink } from "~/lib/hooks/use-auth-deep-link";

const ForgotPassword = () => {
  useAuthDeepLink({
    onSuccess: () => router.replace(pathsConfig.tabs.auth.updatePassword),
    path: pathsConfig.tabs.auth.forgotPassword,
  });

  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Forgot your password?"
          description="Please enter your email address and we'll send you a link to reset your password"
        />
        <Auth.ForgotPassword />
      </Auth.Layout>
    </>
  );
};

export default ForgotPassword;
