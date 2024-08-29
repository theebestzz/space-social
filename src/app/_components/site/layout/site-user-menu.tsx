"use client";

import { type PointerEvent, useState } from "react";

import { Link } from "@/i18n/navigation";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { LogoutButton } from "../../auth/logout-button";
import { LogOut, UserCog2 } from "lucide-react";
import { CgProfile } from "react-icons/cg";

interface SiteUserMenuProps {
  user: any;
}

export function SiteUserMenu({ user }: SiteUserMenuProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const t = useTranslations("site");

  function openDropdown() {
    setOpen(() => true);
  }

  function closeDropdown(element: PointerEvent<HTMLElement>) {
    const target = element.relatedTarget as Element;

    if ("closest" in target && target.closest("[role=menu]")) return;

    setOpen(() => false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          aria-expanded={open}
          className="group pointer-events-auto relative flex w-fit gap-1 px-2 py-4 hover:no-underline"
          onClick={() => isMobile && openDropdown()}
          onPointerEnter={() => !isMobile && openDropdown()}
          onPointerLeave={(event) => !isMobile && closeDropdown(event)}
        >
          <Avatar>
            {user?.image && <AvatarImage src={user?.image} />}
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="pointer-events-auto absolute z-10 block h-14 w-full" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex min-w-72 flex-col"
        align="center"
        role="menu"
        onPointerLeave={closeDropdown}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div>
          <DropdownMenuLabel className="text-center text-base capitalize">
            👋 {t("layout.userMenu.welcome")}, {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="text-base">
            <Link
              href="/profile"
              className="lex !hover:bg-sky-700 !hover:text-white w-full cursor-pointer items-center gap-2"
            >
              <CgProfile className="size-7" /> {t("layout.userMenu.profile")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-base">
            <Link
              href="/settings"
              className="lex !hover:bg-sky-700 !hover:text-white w-full cursor-pointer items-center gap-2"
            >
              <UserCog2 className="size-7" /> {t("layout.userMenu.settings")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="text-base">
            <LogoutButton className="flex w-full cursor-pointer items-center gap-2 hover:bg-sky-700 hover:text-white">
              <LogOut className="size-7" /> {t("layout.userMenu.logout")}
            </LogoutButton>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
