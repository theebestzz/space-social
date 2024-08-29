import * as z from "zod";
import { useTranslations } from "next-intl";

export const LoginSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email({
      message: t("auth.forms.emailRequired"),
    }),
    password: z.string().min(1, {
      message: t("auth.forms.passwordRequired"),
    }),
    code: z.optional(z.string()),
  });

export const RegisterSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z.string().min(1, {
      message: t("auth.forms.nameRequired"),
    }),
    email: z.string().email({
      message: t("auth.forms.emailRequired"),
    }),
    password: z.string().min(6, {
      message: t("auth.forms.passwordAtLeast"),
    }),
  });

export const ResetSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email({
      message: t("auth.forms.emailRequired"),
    }),
  });

export const NewPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    password: z.string().min(6, {
      message: t("auth.forms.passwordAtLeast"),
    }),
  });
