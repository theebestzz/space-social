import { Separator } from "@radix-ui/react-dropdown-menu";
import { PreferencesForm } from "./form";
import { getTranslations } from "next-intl/server";

export default async function UserPreferencesPage() {
  const t = await getTranslations("site");
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          {t("layout.userMenu.preferences")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("layout.userMenu.preferencesSubtitle")}
        </p>
      </div>
      <Separator />
      <PreferencesForm />
    </div>
  );
}
