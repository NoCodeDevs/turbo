import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { passwordLoginSchema } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { login } from "~/lib/actions/auth";
import { api } from "~/lib/api/trpc";

import type { PasswordLoginData } from "@turbostarter/auth";

export const PasswordLoginForm = memo(() => {
  const form = useForm<PasswordLoginData>({
    resolver: zodResolver(passwordLoginSchema),
  });

  const utils = api.useUtils();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PasswordLoginData) =>
      login({ data, option: AUTH_PROVIDER.PASSWORD }),
    onSuccess: async () => {
      await utils.user.get.invalidate();
      router.navigate(pathsConfig.tabs.settings);
      form.reset();
    },
    onError: (error) => {
      return Alert.alert("Something went wrong!", error.message);
    },
  });

  const onSubmit = (data: PasswordLoginData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <View className="gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormInput
                label="Email"
                autoCapitalize="none"
                autoComplete="email"
                {...field}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <View className="flex-row items-center justify-between">
                <FormLabel nativeID="password">Password</FormLabel>

                <Link
                  href={pathsConfig.tabs.auth.forgotPassword}
                  className="text-muted-foreground underline"
                >
                  Forgot password?
                </Link>
              </View>
              <FormInput secureTextEntry autoComplete="password" {...field} />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>Sign in</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <View className="flex-row">
            <Text className="text-sm text-muted-foreground">
              Don&apos;t have an account yet?
            </Text>
            <Link
              href={pathsConfig.tabs.auth.register}
              className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
            >
              Sign up!
            </Link>
          </View>
        </View>
      </View>
    </Form>
  );
});

PasswordLoginForm.displayName = "PasswordLoginForm";
