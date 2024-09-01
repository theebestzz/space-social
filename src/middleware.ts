import createIntlMiddleware from "next-intl/middleware";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { localePrefix, defaultLocale, locales, pathnames } from "@/i18n/config";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

// Middleware'ları başlatma
const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

export async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  const token = await getToken({
    req,
    salt: "",
    secret: "",
  });
  const isLoggedIn = !!token;

  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callBackUrl += nextUrl.search;
    }

    const encodedCallBackUrl = encodeURIComponent(callBackUrl);

    return NextResponse.redirect(
      new URL(`/login/?callBackUrl=${encodedCallBackUrl}`, nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
