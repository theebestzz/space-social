import { getUser } from "@/data/getUser";

import { redirect } from "@/i18n/navigation";

import { Navbar } from "@/app/[locale]/x/_components/social/navbar";

interface XLayoutProps {
  children: React.ReactNode;
}

export default async function XLayout({ children }: XLayoutProps) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <div>
      <Navbar user={user} />
      <div className="border-t lg:container max-lg:px-2">{children}</div>
    </div>
  );
}
