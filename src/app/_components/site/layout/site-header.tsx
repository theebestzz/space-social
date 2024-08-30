"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { SiteLogo } from "@/app/_components/site/utils/site-logo";
import { SiteNavbar } from "@/app/_components/site/layout/site-navbar";
import { SiteMobileMenu } from "@/app/_components/site/layout/site-mobile-menu";
import { SiteMobileUserMenu } from "@/app/_components/site/layout/site-mobile-user-menu";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { xPage } from "@/routes";

export function SiteHeader({ links, user }: any) {
  const pathname = usePathname();
  const t = useTranslations("site");

  if ((pathname as string).startsWith(xPage)) return null;
  return (
    <header>
      <div className="relative flex items-center justify-between lg:justify-center">
        <div className="flex items-center gap-2">
          <div className="block lg:hidden">
            <SiteMobileMenu links={links} />
          </div>
          <Link href="/">
            <SiteLogo className="h-[5rem] w-[12rem] lg:h-[8rem] lg:w-[16rem]" />
          </Link>
        </div>
        <div className="block lg:hidden">
          {user ? (
            <SiteMobileUserMenu user={user} />
          ) : (
            <Button asChild variant="secondary">
              <Link href="/login">
                <User2 className="mr-2 size-5" />
                {t("auth.login.button")}
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="hidden lg:block">
        <SiteNavbar links={links} user={user} />
      </div>
    </header>
  );
}
