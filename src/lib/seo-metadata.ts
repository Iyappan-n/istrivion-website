import type { Metadata } from "next";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "ISTRIVION Technologies",
      title: `${title} | ISTRIVION Technologies`,
      description,
      url: path,
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
      title: `${title} | ISTRIVION Technologies`,
      description,
      images: ["/istrivion-logo.png"],
    },
  };
}
