import { NavLink } from "@/types/types";
import { getTranslations } from "next-intl/server";
import { UserCog2 } from "lucide-react";

export async function getNavLinks(): Promise<NavLink[]> {
  const t = await getTranslations("site.layout.header.navbar");
  return [
    {
      id: 1,
      title: t("home"),
      href: "/",
    },
    {
      id: 2,
      title: t("about"),
      href: "/about",
    },
    {
      id: 3,
      title: t("social"),
      href: "/social",
    },
    {
      id: 4,
      title: t("news"),
      href: "/news",
    },
    {
      id: 5,
      title: t("contact"),
      href: "/contact",
    },
  ];
}

export function getHamburgerLinks() {
  return [
    {
      title: "Cosmos",
      subLinks: [
        {
          label: "Concept",
          href: "/about",
        },
        {
          label: "Exploration",
          href: "/exploration",
        },
      ],
    },
    {
      title: "Space",
      subLinks: [
        {
          label: "Mission",
          href: "/mission",
        },
        {
          label: "Technology",
          href: "/technology",
        },
      ],
    },
    {
      title: "Earth",
      subLinks: [
        {
          label: "Climate",
          href: "/climate",
        },
        {
          label: "Biodiversity",
          href: "/biodiversity",
        },
      ],
    },
    {
      title: "Test",
      subLinks: [
        {
          label: "test2",
          href: "/climate",
        },
        {
          label: "test3",
          href: "/biodiversity",
        },
      ],
    },
  ];
}
