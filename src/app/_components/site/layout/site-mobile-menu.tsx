"use client";

import { useState } from "react";

import { Link } from "@/i18n/navigation";

import { NavLink } from "@/types/types";

import { SiteLogo } from "@/app/_components/site/utils/site-logo";

import { CgMenuLeft } from "react-icons/cg";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

interface SiteMobileUserMenuProps {
  links: NavLink[];
}

export function SiteMobileMenu({ links }: SiteMobileUserMenuProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <Avatar>
          <AvatarFallback className="bg-primary-foreground">
            <CgMenuLeft className="size-7" />
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <SiteLogo className="mx-2 w-[12rem]" />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div>
          {links.map((link) => (
            <Link
              key={link.id}
              onClick={() => setSheetOpen(false)}
              href={link.href}
              className="flex items-center gap-2 rounded px-2 py-4 text-xl hover:bg-primary-foreground"
            >
              {link.title}
            </Link>
          ))}
          <div className="mt-5 flex items-center justify-center gap-5">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
