import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "./site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://istrivion.vercel.app"),
  title: {
    default: "Digital Experiences & Technology Solutions",
    template: "%s | ISTRIVION Technologies",
  },
  description:
    "ISTRIVION Technologies creates digital experiences, websites and applications through technology, creativity and thoughtful design.",
  verification: {
    google: "X2KUWYdSWN0xBhjZx0tTXi-C4HJZEtyPuQWp5xelkmU",
  },
  icons: {
    icon: "/istrivion-ist-mark.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ISTRIVION Technologies",
    title: "Digital Experiences & Technology Solutions",
    description:
      "ISTRIVION Technologies creates digital experiences, websites and applications through technology, creativity and thoughtful design.",
    images: [
      {
        url: "/istrivion-logo.png",
        width: 865,
        height: 289,
        alt: "ISTRIVION Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Experiences & Technology Solutions",
    description:
      "ISTRIVION Technologies creates digital experiences, websites and applications through technology, creativity and thoughtful design.",
    images: ["/istrivion-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ISTRIVION Technologies",
    url: "https://istrivion.vercel.app",
    logo: "https://istrivion.vercel.app/istrivion-logo.png",
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative isolate flex min-h-full flex-col bg-[#F5F5F5]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
