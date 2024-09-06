import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { magicLinkLoginSchema } from "@turbostarter/auth";
import { Button } from "@turbostarter/ui-mobile/button";
import {
  Form,
  FormField,
  FormInput,
  FormItem,
} from "@turbostarter/ui-mobile/form";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";
import { login } from "~/lib/actions/auth";

import type { MagicLinkLoginData } from "@turbostarter/auth";

export const MagicLinkLoginForm = memo(() => {
  const form = useForm<MagicLinkLoginData>({
    resolver: zodResolver(magicLinkLoginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: MagicLinkLoginData) =>
      login({ data, option: AUTH_PROVIDER.MAGIC_LINK }),
    onSuccess: () => {
      Alert.alert(
        "Magic link sent!",
        "Please check your email to login with the magic link.",
      );
      form.reset();
    },
    onError: (error) => {
      Alert.alert("Something went wrong!", error.message);
    },
  });

  const onSubmit = (data: MagicLinkLoginData) => {
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

        <Button
          className="w-full"
          size="lg"
          onPress={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <Icons.Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Text>Send magic link</Text>
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

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
