import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { SiteDesktopMenu } from "@/app/_components/site/layout/site-desktop-menu";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { NavLink } from "@/types/types";

interface SiteNavbarProps {
  links: NavLink[];
}

export function SiteNavbar({ links }: SiteNavbarProps) {
  return (
    <nav className="flex items-center justify-between rounded-full bg-white px-5 py-4 shadow-2xl shadow-purple-50 backdrop-blur-sm dark:bg-primary-foreground/25 dark:shadow-none">
      <SiteDesktopMenu />

      <div className="flex items-center justify-center gap-4">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              raleway.className,
              "group relative w-max text-xl capitalize hover:text-purple-400",
            )}
          >
            <span>{link.title}</span>
            <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-purple-400"></span>
            <span className="absolute -bottom-1 right-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-purple-400"></span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <Button asChild variant="link">
          <Link href="/login">
            <User2 />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
