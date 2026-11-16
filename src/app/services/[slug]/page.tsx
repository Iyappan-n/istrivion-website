import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo-metadata";
import { services } from "../../services-data";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata(
    service.title,
    service.description,
    `/services/${service.slug}`,
  );
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent text-[#73777D]">
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D71920]">
            OUR SERVICES
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-[#73777D] sm:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#73777D] sm:text-lg sm:leading-8">
            {service.description}
          </p>
          <div className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#73777D] sm:text-3xl">
              What We Offer
            </h2>
            <ul data-scroll-stagger className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  data-scroll-reveal
                  className="flex items-start gap-3 rounded-xl border border-[#A7A9AC]/30 bg-white/80 px-5 py-4 leading-7 text-[#73777D]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D71920]"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {service.keyFeatures && (
            <div className="mt-12 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#73777D] sm:text-3xl">
                Key Features
              </h2>
              <ul data-scroll-stagger className="mt-6 grid gap-4 sm:grid-cols-3">
                {service.keyFeatures.map((feature) => (
                  <li
                    key={feature}
                    data-scroll-reveal
                    className="rounded-xl border border-[#A7A9AC]/30 bg-white/80 px-5 py-5 font-semibold leading-7 text-[#73777D]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {service.process && (
            <div className="mt-12 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#73777D] sm:text-3xl">
                Our Working Process
              </h2>
              <ol data-scroll-stagger className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.process.map((step, index) => (
                  <li
                    key={step}
                    data-scroll-reveal
                    className="flex items-start gap-4 rounded-xl border border-[#A7A9AC]/30 bg-white/80 px-5 py-4 leading-7 text-[#73777D]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D71920]/[0.08] text-sm font-bold text-[#D71920]">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className="inline-flex min-h-11 items-center rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#AC1018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 sm:px-8 sm:py-4"
            >
              Discuss Your Project ↗
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center rounded-full border border-[#73777D]/30 px-6 py-3 text-sm font-bold text-[#73777D] transition-colors hover:border-[#D71920] hover:bg-[#D71920]/[0.05] hover:text-[#D71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F5] sm:px-8 sm:py-4"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
