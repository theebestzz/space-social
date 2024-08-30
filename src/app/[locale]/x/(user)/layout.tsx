import { getUser } from "@/data/getUser";
import { redirect } from "@/i18n/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
