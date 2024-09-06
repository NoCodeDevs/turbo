import { Suspense } from "react";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@turbostarter/ui-web/tabs";

import { MagicLinkLoginForm } from "./magic-link";
import { PasswordLoginForm } from "./password";

import type { LoginOption } from "~/lib/constants";

const LOGIN_OPTIONS_DETAILS = {
  [AUTH_PROVIDER.PASSWORD]: {
    component: PasswordLoginForm,
    label: "Password",
  },
  [AUTH_PROVIDER.MAGIC_LINK]: {
    component: MagicLinkLoginForm,
    label: "Magic Link",
  },
} as const;

interface LoginFormProps {
  readonly options: LoginOption[];
}

export const LoginForm = ({ options }: LoginFormProps) => {
  const [mainOption] = options;

  if (!options.length || !mainOption) {
    return null;
  }

  if (options.length === 1) {
    const Component = LOGIN_OPTIONS_DETAILS[mainOption].component;
    return <Component />;
  }

  return (
    <Tabs
      defaultValue={mainOption}
      className="flex w-full flex-col items-center justify-center gap-2"
    >
      <TabsList className="w-full">
        {options.map((provider) => (
          <TabsTrigger key={provider} value={provider} className="w-full">
            {LOGIN_OPTIONS_DETAILS[provider].label}
          </TabsTrigger>
        ))}
      </TabsList>

      {options.map((provider) => {
        const Component = LOGIN_OPTIONS_DETAILS[provider].component;
        return (
          <TabsContent key={provider} value={provider} className="w-full">
            <Suspense>
              <Component />
            </Suspense>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
