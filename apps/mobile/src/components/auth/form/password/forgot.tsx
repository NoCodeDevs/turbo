import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { forgotPasswordSchema } from "@turbostarter/auth";
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
import { forgotPassword } from "~/lib/actions/auth";

import type { ForgotPasswordData } from "@turbostarter/auth";

export const ForgotPasswordForm = memo(() => {
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      Alert.alert(
        "Reset link sent!",
        "Please check your email to reset your password.",
      );
      form.reset();
    },
    onError: (error) => {
      Alert.alert("Something went wrong!", error.message);
    },
  });
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordData) => {
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
            <Text>Send reset link</Text>
          )}
        </Button>

        <View className="items-center justify-center pt-2">
          <Link
            href={pathsConfig.tabs.auth.login}
            className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
          >
            Back to sign in
          </Link>
        </View>
      </View>
    </Form>
  );
});

ForgotPasswordForm.displayName = "ForgotPasswordForm";
