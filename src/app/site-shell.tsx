"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BrandMarquee from "./brand-marquee";
import PageTransitions from "./page-transitions";
import SiteBackground from "./site-background";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteBackground />
      <SiteHeader />
      <BrandMarquee />
      <PageTransitions>{children}</PageTransitions>
      <SiteFooter />
    </>
  );
}
