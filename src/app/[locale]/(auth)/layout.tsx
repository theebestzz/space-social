import { getUser } from "@/data/getUser";
import { redirect } from "@/i18n/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <div className="flex h-[45rem] items-center justify-center">{children}</div>
  );
}
