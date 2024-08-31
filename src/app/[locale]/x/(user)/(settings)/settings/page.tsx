import { getUser } from "@/data/getUser";
import { getUserById } from "@/data/user";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getTranslations } from "next-intl/server";
import { SettingsForm } from "./form";

export default async function UserSettingsPage() {
  const t = await getTranslations("site");
  const user = await getUser();
  const userId = await getUserById(user?.id);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("layout.userMenu.settings")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("layout.userMenu.settingsSubtitle")}
        </p>
      </div>
      <Separator />
      <SettingsForm user={userId} />
    </div>
  );
}
