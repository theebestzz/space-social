import { SiteLogo } from "@/app/_components/site/utils/site-logo";
import { SiteNavbar } from "@/app/_components/site/layout/site-navbar";
import { SiteMobileMenu } from "@/app/_components/site/layout/site-mobile-menu";
import { Link } from "@/i18n/navigation";
import { getNavLinks } from "@/data/links";

export async function SiteHeader() {
  const links = await getNavLinks();

  return (
    <header>
      <div className="relative flex items-center justify-between lg:justify-center">
        <Link href="/">
          <SiteLogo />
        </Link>
        <div className="block lg:hidden">
          <SiteMobileMenu links={links} />
        </div>
      </div>
      <div className="hidden lg:block">
        <SiteNavbar links={links} />
      </div>
    </header>
  );
}
