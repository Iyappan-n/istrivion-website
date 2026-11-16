import ServicesContent from "../services-content";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "Services",
  "Explore ISTRIVION Technologies services, including websites, applications, e-commerce, design, branding and custom digital solutions.",
  "/services",
);

export default function ServicesPage() {
  return <ServicesContent />;
}
