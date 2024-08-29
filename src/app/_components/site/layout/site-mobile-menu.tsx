"use client";

import { NavLink } from "@/types/types";

import { Link } from "@/i18n/navigation";

import { CgMenuLeft } from "react-icons/cg";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SiteMobileMenuProps {
  links: NavLink[];
}

export function SiteMobileMenu({ links }: SiteMobileMenuProps) {
  return (
    <div className="relative">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="link" className="px-0 text-black dark:text-white">
            <CgMenuLeft className="size-8" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col justify-between">
            <div>
              {links.map((link) => (
                <DrawerFooter
                  key={link.title}
                  className="flex flex-col justify-center gap-2"
                >
                  <DrawerClose asChild>
                    <Link
                      href={link.href}
                      className="rounded p-2 text-xl font-bold duration-200 hover:bg-primary-foreground dark:hover:bg-primary-foreground"
                    >
                      {link.title}
                    </Link>
                  </DrawerClose>
                </DrawerFooter>
              ))}
            </div>
            <div className="flex items-center justify-center gap-5">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
