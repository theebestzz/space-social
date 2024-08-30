"use client";

import { type PointerEvent, useState } from "react";

import { Link } from "@/i18n/navigation";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { Bell, LogOut, MessageCircleMore, UserCog2 } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { useTranslations } from "next-intl";

import { LogoutButton } from "@/app/_components/auth/logout-button";

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
import Image from "next/image";
import { LiaUserFriendsSolid } from "react-icons/lia";

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

  const menuItemClass =
    "flex w-full cursor-pointer select-none items-center gap-2 group-hover:text-cyan-500 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

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
            {user?.image ? (
              <AvatarImage src={user?.image} />
            ) : (
              <AvatarFallback className="bg-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
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
            👋 {t("layout.userMenu.hello")}, {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="group">
            <DropdownMenuItem asChild>
              <Link href="/profile" className={menuItemClass}>
                <CgProfile className="size-7 group-hover:text-cyan-500" />{" "}
                {t("layout.userMenu.profile")}
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="group">
            <DropdownMenuItem asChild>
              <Link href="/messages" className={menuItemClass}>
                <MessageCircleMore className="size-7" />{" "}
                {t("layout.userMenu.messages")}
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="group">
            <DropdownMenuItem asChild>
              <Link href="/friends" className={menuItemClass}>
                <LiaUserFriendsSolid className="size-7" />{" "}
                {t("layout.userMenu.friends")}
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="group">
            <DropdownMenuItem asChild>
              <Link href="/notifications" className={menuItemClass}>
                <Bell className="size-7" /> {t("layout.userMenu.notifications")}
              </Link>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <div className="group">
            <DropdownMenuItem asChild>
              <Link href="/settings" className={menuItemClass}>
                <UserCog2 className="size-7" /> {t("layout.userMenu.settings")}
              </Link>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <div className="group">
            <DropdownMenuItem className="p-0">
              <LogoutButton className={menuItemClass}>
                <LogOut className="size-7" /> {t("layout.userMenu.logout")}
              </LogoutButton>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
