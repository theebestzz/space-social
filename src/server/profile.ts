"use server";

import { getUser } from "@/data/getUser";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function profile(values: Record<string, any>) {
  const t = await getTranslations("site");

  const user = await getUser();

  if (!user) {
    return { error: t("unauthorized") };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: t("unauthorized") };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  revalidateTag("profile");

  return { success: t("updated") };
}
