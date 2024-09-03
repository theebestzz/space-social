import { SiteLogo } from "@/app/_components/site/utils/site-logo";
import { GiFeather } from "react-icons/gi";
import { SiteUserMenu } from "@/app/_components/site/layout/site-user-menu";
import { Link } from "@/i18n/navigation";
import { SiteMobileUserMenu } from "@/app/_components/site/layout/site-mobile-user-menu";
import { useTranslations } from "next-intl";

interface NavbarProps {
  user: any;
}

export function Navbar({ user }: NavbarProps) {
  const t = useTranslations("site");
  return (
    <header className="w-full lg:container max-lg:px-2">
      <nav className="flex items-center justify-between">
        <Link href="/x">
          <SiteLogo className="h-[3rem] w-[12rem]" />{" "}
        </Link>
        <div className="flex items-center gap-2 lg:gap-5">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-full bg-cyan-400 px-2 py-1 font-light shadow-[0_4px_14px_0_rgb(6,182,212,39%)] transition duration-200 ease-linear hover:scale-105 hover:bg-cyan-500 hover:shadow-[0_6px_20px_rgba(6,182,212,23%)]"
          >
            <GiFeather className="size-5 text-white" />{" "}
            <span className="text-sm text-white">
              {t("layout.userMenu.share")}
            </span>
          </Link>
          <div className="block lg:hidden">
            <SiteMobileUserMenu user={user} />
          </div>
          <div className="hidden lg:block">
            <SiteUserMenu user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
}
