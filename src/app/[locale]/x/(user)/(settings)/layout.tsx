import { SidebarNav } from "@/app/[locale]/x/_components/social/sidebar-nav";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getSideBarLinks } from "@/data/links";
import { getTranslations } from "next-intl/server";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: SettingsLayoutProps) {
  const links = await getSideBarLinks();
  const t = await getTranslations("site");
  return (
    <>
      <div className="block space-y-6 py-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("layout.userMenu.settings")}
          </h2>
          <p className="text-muted-foreground">
            {t("layout.userMenu.subtitle")}
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={links} />
          </aside>
          <div className="w-full flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
