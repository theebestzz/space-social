"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { getTranslations } from "next-intl/server";

export async function newVerification(token: string) {
  const t = await getTranslations("site");

  const existingToken = await getVerificationTokenByToken(token);

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

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: t("emailVerified") };
}
