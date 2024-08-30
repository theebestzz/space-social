import { getUser } from "@/data/getUser";
import { redirect } from "@/i18n/navigation";

interface XLayoutProps {
  children: React.ReactNode;
}

export default async function XLayout({ children }: XLayoutProps) {
  const user = await getUser();

  if (!user) redirect("/login");

  return <>{children}</>;
}
