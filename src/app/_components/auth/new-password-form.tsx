"use client";

import * as React from "react";
import * as z from "zod";

import { LoaderCircle } from "lucide-react";

import { useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

import { newPassword } from "@/server/new-password";

import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormError } from "@/app/_components/auth/form-error";
import { FormSuccess } from "@/app/_components/auth/form-success";

import { CardWrapper } from "@/app/_components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function NewPasswordForm() {
  const t = useTranslations("site");

  const schema = NewPasswordSchema(t);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={t("auth.newPassword.title")}
      backButtonLabel={t("auth.newPassword.back")}
      backButtonHref="/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.forms.password")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <span>
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              <span>{t("auth.newPassword.button")}</span>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
