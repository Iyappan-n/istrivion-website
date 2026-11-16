import type { MetadataRoute } from "next";
import { services } from "./services-data";

const siteUrl = "https://istrivion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPaths = ["/", "/about", "/services", "/work", "/contact"];

  return [
    ...publicPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...services.map((service) => ({
      url: new URL(`/services/${service.slug}`, siteUrl).toString(),
    })),
  ];
}
