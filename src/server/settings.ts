"use server";

import bcrypt from "bcryptjs";

import { getUser } from "@/data/getUser";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function settings(values: Record<string, any>) {
  const t = await getTranslations("site");

  const user = await getUser();

  if (!user) {
    return { error: t("unauthorized") };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: t("unauthorized") };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: t("emailAlreadyInUse") };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: t("verifyEmail") };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordMatch) {
      return { error: t("invalidCrendentials") };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  revalidateTag("settings");

  return { success: t("updated") };
}
