"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { labels } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronDown, Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const locales = Object.entries(labels);

export function PreferencesForm() {
  const t = useTranslations("site");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const currentLocale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  function changeLocale(locale: string) {
    router.replace(pathname, {
      locale,
    });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="font-semibold">{t("language")}</div>
        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={open}
              className="group pointer-events-auto relative flex w-full justify-between gap-1 px-2 lg:w-[28rem]"
            >
              <Image
                src={labels[currentLocale].flag}
                alt={currentLocale}
                title={currentLocale}
                width={25}
                height={25}
              />
              {labels[currentLocale].name}

              <ChevronDown className="size-3 transition duration-300 group-aria-[expanded=true]:rotate-180" />

              <span className="pointer-events-auto absolute z-10 block h-14 w-full" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="flex w-[28rem] flex-col items-center"
            align="end"
            role="menu"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <div className="w-full">
              {locales.map(([locale, { name, flag }]) => (
                <DropdownMenuItem
                  key={locale}
                  onClick={() => changeLocale(locale)}
                  disabled={currentLocale === locale}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Image
                    src={flag}
                    alt={`${name} flag`}
                    width={25}
                    height={25}
                  />
                  {name}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-1">
        <div className="font-semibold">{t("theme.theme")}</div>
        <div className="grid w-full max-w-2xl grid-cols-2 gap-8 pt-2 lg:max-w-md">
          <div
            className="cursor-pointer border-primary"
            onClick={() => setTheme("light")}
          >
            <div className="items-center rounded-md border-2 border-muted p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </div>
          <div
            className="cursor-pointer border-primary"
            onClick={() => setTheme("dark")}
          >
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
