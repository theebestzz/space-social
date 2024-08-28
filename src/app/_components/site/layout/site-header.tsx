import Link from "next/link";

import { SiteLogo } from "@/app/_components/site/utils/site-logo";
import { SiteNavbar } from "@/app/_components/site/layout/site-navbar";
import { SiteMobileMenu } from "@/app/_components/site/layout/site-mobile-menu";

export function SiteHeader() {
  return (
    <header>
      <div className="relative flex items-center justify-between lg:justify-center">
        <Link href="/">
          <SiteLogo />
        </Link>
        <div className="block lg:hidden">
          <SiteMobileMenu />
        </div>
      </div>
      <div className="hidden lg:block">
        <SiteNavbar />
      </div>
    </header>
  );
}
