"use client";

import { CgMenuLeft } from "react-icons/cg";

import { getHamburgerLinks } from "@/data/links";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

export function SiteDesktopMenu() {
  const links = getHamburgerLinks();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <CgMenuLeft className="size-8" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="min-w-full">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-10 grid grid-cols-4 place-content-center place-items-center gap-4">
          {links.map((link) => (
            <div key={link.title} className="flex flex-col gap-2">
              <span className="text-3xl font-bold">{link.title}</span>
              <div className="flex flex-col gap-3">
                {link.subLinks.map((subLink) => (
                  <SheetClose asChild key={subLink.href}>
                    <Link
                      href={subLink.href}
                      className="group relative w-max text-lg font-light hover:text-purple-400"
                    >
                      <span>{subLink.label}</span>
                      <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-purple-400"></span>
                      <span className="absolute -bottom-1 right-1/2 h-[2px] w-0 bg-white transition-all group-hover:w-1/2 group-hover:bg-purple-400"></span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
