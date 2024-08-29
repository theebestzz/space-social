"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/schemas";

import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getTranslations } from "next-intl/server";

export const register = async (values: Record<string, any>) => {
  const t = await getTranslations("site");

  const schema = RegisterSchema(t);

  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t("invalidField") };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: t("emailAlreadyInUse"),
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: t("verifyEmail"), // Başarı mesajını çeviriyoruz
  };
};
