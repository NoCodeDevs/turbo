"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_PROVIDER, passwordLoginSchema } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-web/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import { Input } from "@turbostarter/ui-web/input";

import { useAuthFormStore } from "~/components/auth/form/store";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { login } from "~/lib/actions";
import { onPromise } from "~/utils";

import type { PasswordLoginData } from "@turbostarter/auth";

export const PasswordLoginForm = memo(() => {
  const searchParams = useSearchParams();
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const router = useRouter();
  const form = useForm<PasswordLoginData>({
    resolver: zodResolver(passwordLoginSchema),
  });

  const redirectTo = searchParams.get("redirectTo") ?? "/";

  const onSubmit = async (data: PasswordLoginData) => {
    setProvider(AUTH_PROVIDER.PASSWORD);
    setIsSubmitting(true);

    const loadingToast = toast.loading("Signing in...");
    const { error } = await login({ data, option: AUTH_PROVIDER.PASSWORD });

    if (error) {
      setIsSubmitting(false);
      return toast.error(`${error}!`, { id: loadingToast });
    }

    toast.success("Signed in!", { id: loadingToast });
    setIsSubmitting(false);
    router.replace(redirectTo);
    return router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between">
                <FormLabel>Password</FormLabel>
                <TurboLink
                  href={pathsConfig.auth.forgotPassword}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                  Forgot password?
                </TurboLink>
              </div>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting && provider === AUTH_PROVIDER.PASSWORD ? (
            <Icons.Loader2 className="animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="flex items-center justify-center pt-2">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?
            <TurboLink
              href={pathsConfig.auth.register}
              className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
            >
              Sign up!
            </TurboLink>
          </div>
        </div>
      </form>
    </Form>
  );
});

PasswordLoginForm.displayName = "PasswordLoginForm";
