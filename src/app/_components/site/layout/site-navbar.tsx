import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { NavLink } from "@/types/types";

import { User2 } from "lucide-react";

import { SiteUserMenu } from "@/app/_components/site/layout/site-user-menu";
import { SiteDesktopMenu } from "@/app/_components/site/layout/site-desktop-menu";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

import { Button } from "@/components/ui/button";

interface SiteNavbarProps {
  links: NavLink[];
  user: any;
}

export function SiteNavbar({ links, user }: SiteNavbarProps) {
  return (
    <nav className="flex items-center justify-between rounded-full bg-white px-5 py-4 shadow-2xl shadow-black/5 backdrop-blur-sm dark:bg-primary-foreground/25 dark:shadow-none">
      <SiteDesktopMenu />

      <div className="ml-14 flex items-center justify-center gap-4">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              raleway.className,
              "group relative w-max text-xl capitalize hover:text-cyan-400",
            )}
          >
            <span>{link.title}</span>
            <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-cyan-400"></span>
            <span className="absolute -bottom-1 right-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-cyan-400"></span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
        {user ? (
          <SiteUserMenu user={user} />
        ) : (
          <Button asChild variant="ghost">
            <Link href="/login">
              <User2 />
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
