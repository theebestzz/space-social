import { Separator } from "@radix-ui/react-dropdown-menu";
import { getTranslations } from "next-intl/server";
import { SettingsForm } from "./form";
import { getUser } from "@/data/getUser";

export default async function UserSettingsPage() {
  const t = await getTranslations("site");
  const user = await getUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("layout.userMenu.settings")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("layout.userMenu.settingsSubtitle")}
        </p>
      </div>
      <Separator />
      <SettingsForm user={user} />
    </div>
  );
}
