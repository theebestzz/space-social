import { SiteHeader } from "./site-header";
import { getNavLinks } from "@/data/links";
import { getUser } from "@/data/getUser";

interface Props {
  children: React.ReactNode;
}

export async function SiteLayout({ children }: Props) {
  const links = await getNavLinks();
  const user = await getUser();
  return (
    <div className="lg:container max-lg:px-5">
      <SiteHeader links={links} user={user} />
      {children}
    </div>
  );
}
