"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Bell, Cog, LogOut, MessageCircleMore, User2 } from "lucide-react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CgProfile } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LogoutButton } from "../../auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SiteMobileMenuProps {
  user: any;
}

export function SiteMobileUserMenu({ user }: SiteMobileMenuProps) {
  const t = useTranslations("site");
  return (
    <div className="relative">
      <Drawer>
        <DrawerTrigger asChild className="cursor-pointer">
          <Avatar>
            {user?.image ? (
              <AvatarImage src={user?.image} />
            ) : (
              <AvatarFallback className="bg-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </DrawerTrigger>{" "}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="mt-3 text-xl capitalize">
              👋 {t("layout.userMenu.hello")}, {user?.name}
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="mt-5 flex flex-col justify-between">
            <DrawerClose asChild>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded px-2 py-4 hover:bg-primary-foreground"
              >
                <CgProfile className="size-7" /> {t("layout.userMenu.profile")}
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/messages"
                className="flex items-center gap-2 rounded px-2 py-4 hover:bg-primary-foreground"
              >
                <MessageCircleMore className="size-7" />{" "}
                {t("layout.userMenu.messages")}
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/friends"
                className="flex items-center gap-2 rounded px-2 py-4 hover:bg-primary-foreground"
              >
                <LiaUserFriendsSolid className="size-7" />{" "}
                {t("layout.userMenu.friends")}
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/notifications"
                className="flex items-center gap-2 rounded px-2 py-4 hover:bg-primary-foreground"
              >
                <Bell className="size-7" /> {t("layout.userMenu.notifications")}
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded px-2 py-4 hover:bg-primary-foreground"
              >
                <Cog className="size-7" /> {t("layout.userMenu.settings")}
              </Link>
            </DrawerClose>
            <DropdownMenuSeparator />
            <LogoutButton>
              <DrawerClose asChild>
                <span className="flex cursor-pointer items-center gap-2 rounded px-2 py-4 duration-200 hover:bg-destructive hover:text-white">
                  <LogOut className="size-7" /> {t("layout.userMenu.logout")}
                </span>
              </DrawerClose>
            </LogoutButton>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
