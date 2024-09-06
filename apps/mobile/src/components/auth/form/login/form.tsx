import { Suspense, useState } from "react";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@turbostarter/ui-mobile/tabs";
import { Text } from "@turbostarter/ui-mobile/text";

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

  const [value, setValue] = useState(mainOption);

  if (!options.length || !value) {
    return null;
  }

  if (options.length === 1) {
    const Component = LOGIN_OPTIONS_DETAILS[value].component;
    return <Component />;
  }

  return (
    <Tabs
      value={value}
      onValueChange={(val) => setValue(val as LoginOption)}
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <TabsList className="w-full flex-row">
        {options.map((provider) => (
          <TabsTrigger key={provider} value={provider} className="grow">
            <Text>{LOGIN_OPTIONS_DETAILS[provider].label}</Text>
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
