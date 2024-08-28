"use client";

import Link from "next/link";

import { CgMenuRight } from "react-icons/cg";
import { User2, UserPlus2 } from "lucide-react";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

import { getNavLinks } from "@/data/links";

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

export function SiteMobileMenu() {
  const links = getNavLinks();
  return (
    <div className="relative">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="text-black dark:text-white">
            <CgMenuRight className="size-6" />
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
            <div>
              <DrawerFooter className="flex flex-row items-center justify-center gap-5">
                <DrawerClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-1"
                  >
                    <Link href="/auth/login">
                      <User2 />
                      Login
                    </Link>
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-1"
                  >
                    <Link href="/auth/register">
                      <UserPlus2 />
                      Register
                    </Link>
                  </Button>
                </DrawerClose>
              </DrawerFooter>
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
