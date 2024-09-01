import * as z from "zod";
import { useTranslations } from "next-intl";
import { UserRole } from "@prisma/client";

export const LoginSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z.string().email({
      message: t("auth.forms.emailRequired"),
    }),
    password: z.string().min(1, {
      message: t("auth.forms.passwordRequired"),
    }),
    code: z.optional(z.string(), {
      message: t("auth.forms.codeRequired"),
    }),
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

export const SettingsSchema = (t: ReturnType<typeof useTranslations>) => {
  return z
    .object({
      name: z.optional(
        z.string().min(1, { message: t("auth.forms.nameRequired") }),
      ),
      isTwoFactorEnabled: z.optional(z.boolean()),
      role: z.enum([UserRole.ADMIN, UserRole.USER]),
      email: z.optional(
        z.string().email({ message: t("auth.forms.emailRequired") }),
      ),
      password: z.optional(
        z.string().min(6, { message: t("auth.forms.passwordRequired") }),
      ),
      newPassword: z.optional(
        z.string().min(6, { message: t("auth.forms.passwordAtLeast") }),
      ),
    })
    .refine(
      (data) => {
        if (data.password && !data.newPassword) {
          return false;
        }

        return true;
      },
      {
        message: t("auth.forms.newPasswordRequired"),
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.newPassword && !data.password) {
          return false;
        }

        return true;
      },
      {
        message: t("auth.forms.passwordRequired"),
        path: ["password"],
      },
    );
};
