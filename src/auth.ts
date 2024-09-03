import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOauth as boolean;
        session.user.gender = token.gender as string;
        session.user.dateofbirth = token.dateofbirth as Date;
        session.user.country = token.country as string;
        session.user.state = token.state as string;
        session.user.language = token.language as string;
        session.user.skills = token.skills as string;
        session.user.bio = token.bio as string;
        session.user.coverPhoto = token.coverPhoto as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.gender = existingUser.gender;
      token.dateofbirth = existingUser.dateofbirth;
      token.country = existingUser.country;
      token.state = existingUser.state;
      token.language = existingUser.language;
      token.skills = existingUser.language;
      token.bio = existingUser.language;
      token.coverPhoto = existingUser.language;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
});
