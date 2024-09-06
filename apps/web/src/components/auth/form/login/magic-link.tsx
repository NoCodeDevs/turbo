"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AUTH_PROVIDER, magicLinkLoginSchema } from "@turbostarter/auth";
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
import { login } from "~/lib/actions";
import { onPromise } from "~/utils";

import type { MagicLinkLoginData } from "@turbostarter/auth";

type LoginStatus = "pending" | "success" | "error" | "idle";

export const MagicLinkLoginForm = memo(() => {
  const { provider, setProvider, isSubmitting, setIsSubmitting } =
    useAuthFormStore();
  const [status, setStatus] = useState<LoginStatus>("idle");

  const form = useForm<MagicLinkLoginData>({
    resolver: zodResolver(magicLinkLoginSchema),
  });

  useEffect(() => {
    setIsSubmitting(status === "pending");
  }, [status, setIsSubmitting]);

  const onSubmit = async (data: MagicLinkLoginData) => {
    setProvider(AUTH_PROVIDER.MAGIC_LINK);
    setStatus("pending");

    const loadingToast = toast.loading("Sending link...");
    const { error } = await login({ data, option: AUTH_PROVIDER.MAGIC_LINK });

    if (error) {
      setStatus("error");
      return toast.error(`${error}!`, { id: loadingToast });
    }

    toast.success("Success! Now check your inbox!", {
      id: loadingToast,
    });
    setStatus("success");
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          className="mt-6 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="success"
        >
          <Icons.CheckCircle2
            className="h-20 w-20 text-success"
            strokeWidth={1.2}
          />
          <h2 className="text-center text-2xl font-semibold">Success!</h2>
          <p className="text-center">
            Email with a magic link has been sent to your inbox. Click it to
            login!
          </p>
        </motion.div>
      ) : (
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

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting && provider === AUTH_PROVIDER.MAGIC_LINK ? (
                <Icons.Loader2 className="animate-spin" />
              ) : (
                "Send magic link"
              )}
            </Button>

            <div className="flex items-center justify-center pt-2">
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account yet?
                <TurboLink
                  href="/auth/register"
                  className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
                >
                  Sign up!
                </TurboLink>
              </div>
            </div>
          </form>
        </Form>
      )}
    </AnimatePresence>
  );
});

MagicLinkLoginForm.displayName = "MagicLinkLoginForm";
