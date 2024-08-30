"use client";

import * as React from "react";
import * as z from "zod";

import { Link, useRouter } from "@/i18n/navigation";

import { LoaderCircle } from "lucide-react";

import { useTranslations } from "next-intl";

import { login } from "@/server/login";

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/schemas";
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
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations("site");
  const schema = LoginSchema(t);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? (t("auth.login.oAuthAccountNotLinked") as string)
      : "";

  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");

    setIsPending(true);

    try {
      const data = await login(values);
      if (data?.error) {
        setError(data.error);
      } else if (data?.success) {
        setSuccess(data.success);
        toast.success(data.success);
        router.refresh();
        form.reset();
      } else if (data?.twoFactor) {
        setShowTwoFactor(true);
      }
    } catch (err) {
      setError(t("error.default") as string);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerLabel={t("auth.login.title")}
      backButtonLabel={t("auth.login.account")}
      backButtonHref="/register"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.login.code")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        autoFocus
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.forms.email")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="example@example.com"
                          type="email"
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
                      <FormLabel>{t("auth.forms.password")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="px-0 font-normal"
                      >
                        <Link href="/reset">{t("auth.login.forgot")}</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
              </>
            ) : (
              <span>
                {showTwoFactor ? (
                  <span>{t("auth.login.confirm")}</span>
                ) : (
                  <span>{t("auth.login.button")}</span>
                )}
              </span>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
