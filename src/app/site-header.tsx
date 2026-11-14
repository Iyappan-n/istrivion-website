"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    href: "/",
    label: "Home",
    icon: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-7h6v7" />
      </>
    ),
  },
  {
    href: "/services",
    label: "Services",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    href: "/work",
    label: "Our Work",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11 0v2h4v-2" />
      </>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    ),
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/services"
      ? pathname === href || pathname.startsWith("/services/")
      : pathname === href;
  const linkClassName = (href: string) =>
    `flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-4 lg:py-3 lg:text-base ${
      isActive(href)
        ? "bg-[#D71920]/[0.07] text-[#D71920]"
        : "text-[#73777D] hover:bg-[#D71920]/[0.05] hover:text-[#D71920]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F5F5F5]/90 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 py-3 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/istrivion-logo.png"
              alt="ISTRIVION Technologies"
              width={230}
              height={77}
              priority
              className="h-auto w-[min(140px,40vw)] object-contain sm:w-[min(210px,52vw)]"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={linkClassName(item.href)}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#D71920] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#AC1018] sm:px-5 sm:py-3 sm:text-sm"
            >
              Let&apos;s Talk ↗
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#73777D]/20 text-[#73777D] transition hover:border-[#D71920] hover:text-[#D71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] sm:hidden"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {mobileMenuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="-mx-1 mt-2 hidden gap-1 overflow-x-auto pb-1 sm:flex lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClassName(item.href)}
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
              {item.label}
            </Link>
          ))}
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="mt-3 grid gap-1 border-t border-[#73777D]/15 pt-3 sm:hidden"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`${linkClassName(item.href)} min-h-11 w-full`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
