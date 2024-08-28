import { SiteHeader } from "./site-header";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <SiteHeader />
      {children}
    </div>
  );
}
