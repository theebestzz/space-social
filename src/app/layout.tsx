import "@/styles/globals.css";

import type { Metadata } from "next";

import { SiteLayout } from "@/app/_components/site/layout/site-layout";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Space Social",
  description: "Space Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className)}>
        <Providers>
          <SiteLayout>
            <main>{children}</main>
          </SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
