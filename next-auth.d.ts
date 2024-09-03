import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  gender: string;
  dateofbirth: Date;
  country: string;
  state: string;
  language: string;
  skills: string;
  bio: string;
  coverPhoto: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
