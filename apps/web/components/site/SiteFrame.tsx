import type { ReactNode } from "react";
import Header from "../../app/Header";
import SiteFooter from "./SiteFooter";

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="pageAtmosphere contentPage">
      <Header />
      <div data-header-spacer="1" style={{ height: 57 }} aria-hidden="true" />
      {children}
      <SiteFooter />
      <div className="footerEnd" />
    </main>
  );
}
