"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePasswordSchema } from "@turbostarter/auth";
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

import { pathsConfig } from "~/config/paths";
import { updatePassword } from "~/lib/actions";
import { onPromise } from "~/utils";

import type { UpdatePasswordData } from "@turbostarter/auth";

export const UpdatePasswordForm = memo(() => {
  const router = useRouter();
  const form = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordData) => {
    const loadingToast = toast.loading("Updating password...");
    const { error } = await updatePassword(data);

    if (error) {
      return toast.error(error, { id: loadingToast });
    }

    toast.success("Success! Now you can login with your new password!", {
      id: loadingToast,
    });

    router.replace(pathsConfig.auth.login);
  };

  return (
    <Form {...form} key="idle">
      <motion.form
        onSubmit={onPromise(form.handleSubmit(onSubmit))}
        className="space-y-6"
        exit={{ opacity: 0 }}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={form.formState.isSubmitting}
                  autoComplete="new-password"
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Icons.Loader2 className="animate-spin" />
          ) : (
            "Update password"
          )}
        </Button>
      </motion.form>
    </Form>
  );
});

UpdatePasswordForm.displayName = "UpdatePasswordForm";
