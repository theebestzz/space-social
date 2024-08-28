"use client";

import { type PointerEvent, useState, useMemo } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ChevronDown, Languages } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themes = useMemo(() => {
    return [
      { label: "English", value: "dark" },
      { label: "Türkçe", value: "light" },
    ];
  }, []);

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
          className="group pointer-events-auto relative flex w-fit gap-1 px-2 py-4"
          onClick={() => isMobile && openDropdown()}
          onPointerEnter={() => !isMobile && openDropdown()}
          onPointerLeave={(event) => !isMobile && closeDropdown(event)}
        >
          <Languages className="size-6 rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
          <Languages className="hidden size-6 rotate-90 scale-0 transition-all dark:flex dark:rotate-0 dark:scale-100" />
          <ChevronDown className="size-3 transition duration-300 group-aria-[expanded=true]:rotate-180" />

          <span className="sr-only">Toggle theme</span>
          <span className="pointer-events-auto absolute z-10 block h-14 w-full" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex flex-col items-center"
        align="center"
        role="menu"
        onPointerLeave={closeDropdown}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="w-full">
          {themes.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              disabled={theme === value}
              className="cursor-pointer"
            >
              {label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
