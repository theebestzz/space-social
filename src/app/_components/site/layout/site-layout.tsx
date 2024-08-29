import { SiteHeader } from "./site-header";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:container max-lg:px-5">
      <SiteHeader />
      {children}
    </div>
  );
}
