import { getUser } from "@/data/getUser";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getTranslations } from "next-intl/server";
import { ProfileForm } from "./form";

export default async function UserAccountPage() {
  const t = await getTranslations("site");
  const user = await getUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("layout.userMenu.profile")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("layout.userMenu.accountSubtitle")}
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
