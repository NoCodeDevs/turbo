import { memo } from "react";

import { LoginForm } from "./form/login/form";
import { ForgotPasswordForm } from "./form/password/forgot";
import { UpdatePasswordForm } from "./form/password/update";
import { RegisterForm } from "./form/register-form";
import { SocialProviders } from "./form/social-providers";
import { AuthDivider } from "./layout/auth-divider";
import { AuthHeader } from "./layout/auth-header";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

const AuthLayout = memo<AuthLayoutProps>(({ children }) => {
  return (
    <div className="grow">
      <div className="flex flex-1 flex-col justify-start lg:flex-none">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
});

AuthLayout.displayName = "AuthLayout";

export const Auth = {
  Layout: AuthLayout,
  Header: AuthHeader,
  Providers: SocialProviders,
  Divider: AuthDivider,
  Login: LoginForm,
  Register: RegisterForm,
  ForgotPassword: ForgotPasswordForm,
  UpdatePassword: UpdatePasswordForm,
};
