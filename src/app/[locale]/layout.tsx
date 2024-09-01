import type { Metadata } from "next";

import { SiteLayout } from "@/app/_components/site/layout/site-layout";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import { Providers } from "@/app/[locale]/providers";
import { defaultLocale } from "@/i18n/config";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Space Social",
  description: "Space Social",
};

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  unstable_setRequestLocale(params.locale);

  const messages = await getMessages();

  return (
    <html lang={params.locale || defaultLocale} suppressHydrationWarning={true}>
      <body className={cn(poppins.className)}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Providers>
            <SiteLayout>
              <main className="container">{children}</main>
            </SiteLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
