"use server";

import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/lib/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export async function newPassword(
  values: Record<string, any>,
  token?: string | null,
) {
  const t = await getTranslations("site");

  const schema = NewPasswordSchema(t);

  if (!token) {
    return { error: t("missingToken") };
  }

  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t("invalidField") };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: t("invalidToken") };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: t("tokenExpired") };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: t("emailNotFound") };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: t("passwordChanged") };
}
