"use client";

import { memo } from "react";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";

import { useAuthFormStore } from "~/components/auth/form/store";
import { loginWithOAuth } from "~/lib/actions";
import { onPromise } from "~/utils";

import type { AUTH_PROVIDER } from "@turbostarter/auth";
import type { SVGProps } from "react";

interface SocialProvidersProps {
  readonly providers: SOCIAL_PROVIDER[];
}

const ICONS: Record<SOCIAL_PROVIDER, React.FC<SVGProps<SVGElement>>> = {
  [SOCIAL_PROVIDER.GITHUB]: Icons.Github,
  [SOCIAL_PROVIDER.GOOGLE]: Icons.Google,
};

const SocialProvider = ({
  provider,
  isSubmitting,
  onClick,
  actualProvider,
}: {
  provider: SOCIAL_PROVIDER;
  isSubmitting: boolean;
  onClick: () => Promise<void>;
  actualProvider: AUTH_PROVIDER;
}) => {
  const Icon = ICONS[provider];

  return (
    <Button
      key={provider}
      variant="outline"
      type="button"
      size="lg"
      className="inline-flex w-full justify-center gap-2.5"
      disabled={isSubmitting}
      onClick={onPromise(onClick)}
    >
      {isSubmitting && actualProvider === provider ? (
        <Icons.Loader2 className="animate-spin" />
      ) : (
        <>
          <span className="sr-only">Sign in with {provider}</span>
          <div className="h-6 w-6 dark:brightness-125">
            <Icon />
          </div>
          <span>
            Sign in with <span className="capitalize">{provider}</span>
          </span>
        </>
      )}
    </Button>
  );
};

export const SocialProviders = memo<SocialProvidersProps>(({ providers }) => {
  const {
    provider: actualProvider,
    setProvider,
    isSubmitting,
    setIsSubmitting,
  } = useAuthFormStore();

  const handleSignIn = async (provider: SOCIAL_PROVIDER) => {
    setProvider(provider);
    setIsSubmitting(true);

    await loginWithOAuth(provider);

    setIsSubmitting(false);
  };

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-2">
      {Object.values(providers).map((provider) => (
        <SocialProvider
          key={provider}
          provider={provider}
          isSubmitting={isSubmitting}
          onClick={() => handleSignIn(provider)}
          actualProvider={actualProvider}
        />
      ))}
    </div>
  );
});

SocialProviders.displayName = "SocialProviders";
