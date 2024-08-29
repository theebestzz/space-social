import { Link } from "@/i18n/navigation";
import { getNavLinks } from "@/data/links";
import { getUser } from "@/data/getUser";

import { SiteLogo } from "@/app/_components/site/utils/site-logo";
import { SiteNavbar } from "@/app/_components/site/layout/site-navbar";
import { SiteMobileMenu } from "@/app/_components/site/layout/site-mobile-menu";

export async function SiteHeader() {
  const links = await getNavLinks();
  const user = await getUser();
  return (
    <header>
      <div className="relative flex items-center justify-between lg:justify-center">
        <div className="lg:hidden">
          <SiteMobileMenu links={links} />
        </div>
        <Link href="/">
          <SiteLogo className="h-[5rem] w-[10rem] lg:h-[8rem] lg:w-[16rem]" />
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          Profile menu ve giriş menü
        </div>
      </div>
      <div className="hidden lg:block">
        <SiteNavbar links={links} user={user} />
      </div>
    </header>
  );
}
