"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/lib/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getTranslations } from "next-intl/server";

export async function reset(values: Record<string, any>) {
  const t = await getTranslations("site");

  const schema = ResetSchema(t);

  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t("invalidField") };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: t("emailNotFound") };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: t("resetEmailSent") };
}
