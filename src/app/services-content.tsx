import Link from "next/link";
import { services } from "./services-data";

export default function ServicesContent() {
  return (
    <main className="min-h-screen bg-transparent text-[#73777D]">
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D71920]">
            OUR SERVICES
          </p>
          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-[#73777D] sm:text-5xl">
              What We Create
            </h1>
            <p className="max-w-xl leading-7 text-[#73777D]">
              From business websites to personal surprises, we create
              thoughtful digital services that bring ideas to life.
            </p>
          </div>

          <div data-scroll-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                data-scroll-reveal
                className="group flex h-full flex-col rounded-2xl border border-[#A7A9AC]/40 bg-white p-6 shadow-[0_8px_30px_rgba(115,119,125,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D71920]/40 hover:shadow-[0_18px_40px_rgba(215,25,32,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F5] sm:p-8 sm:pb-9"
              >
                <article className="flex h-full flex-col">
                  <span className="service-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D71920]/[0.04] text-[#73777D] transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3 group-hover:scale-105 group-hover:bg-[#D71920]/[0.07] group-hover:text-[#D71920]">
                    <svg
                      aria-hidden="true"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {service.icon === "web" && (
                        <>
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path d="M3 9h18M7 6.5h.01M10 6.5h.01m1 6.5-2 2 2 2m4-4 2 2-2 2" />
                        </>
                      )}
                      {service.icon === "app" && (
                        <>
                          <rect x="7" y="2.5" width="10" height="19" rx="2" />
                          <path d="M10 5.5h4m-3 13h2" />
                        </>
                      )}
                      {service.icon === "commerce" && (
                        <>
                          <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
                          <circle cx="10" cy="20" r="1" />
                          <circle cx="18" cy="20" r="1" />
                        </>
                      )}
                      {service.icon === "design" && (
                        <>
                          <path d="m14 6 4 4M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
                          <path d="M13 20h8" />
                        </>
                      )}
                      {service.icon === "portfolio" && (
                        <>
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <circle cx="9" cy="10" r="2" />
                          <path d="m5 17 4-4 3 3 3-4 4 5" />
                        </>
                      )}
                      {service.icon === "experience" && (
                        <>
                          <path d="M12 21s-8-4.4-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.6-8 11-8 11Z" />
                          <path d="m12 9 .7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7L12 9Z" />
                        </>
                      )}
                      {service.icon === "branding" && (
                        <>
                          <path d="M12 3 14.4 9.6 21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />
                          <path d="m19 3 .8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3Z" />
                        </>
                      )}
                      {service.icon === "video" && (
                        <>
                          <rect x="3" y="6" width="13" height="12" rx="2" />
                          <path d="m16 10 5-3v10l-5-3M8 9l1.2 2L8 13l2.3-.6L12 14l-.3-2.3L13 10l-2.3.2L9.5 8 9 10.3 7 11Z" />
                        </>
                      )}
                      {service.icon === "academic" && (
                        <>
                          <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                          <path d="M6 11v5c3.5 2.7 8.5 2.7 12 0v-5M22 9v6" />
                        </>
                      )}
                      {service.icon === "research" && (
                        <>
                          <path d="M9 3h6m-5 0v7l-5.5 9.2A1.8 1.8 0 0 0 6 22h12a1.8 1.8 0 0 0 1.5-2.8L14 10V3" />
                          <path d="M7.5 17h9M10 14h4" />
                        </>
                      )}
                    </svg>
                  </span>
                  <h2 className="mt-7 text-xl font-bold leading-snug text-[#73777D] transition-colors duration-300 group-hover:text-[#D71920]">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#73777D]">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-[#73777D] transition-colors duration-300 group-hover:text-[#D71920]">
                    Explore Service
                  </span>
                </article>
              </Link>
            ))}

            <section data-scroll-reveal className="flex h-full flex-col justify-between rounded-2xl border border-[#A7A9AC]/40 bg-white p-6 shadow-[0_8px_30px_rgba(115,119,125,0.06)] sm:p-8 lg:col-span-2">
              <div className="max-w-3xl">
              <h2 className="text-3xl font-bold leading-tight text-[#73777D] sm:text-4xl">
                Have Something Different in Mind?
              </h2>
              <p className="mt-4 leading-7 text-[#73777D]">
                Not every idea fits into a predefined service. Whether you have
                a unique business requirement, a creative concept or a
                challenging technology idea, tell us what you need. Our team
                will review your requirements and explore a suitable solution.
              </p>
              </div>
              <Link
                href="/contact?service=Other&subject=Custom%20Project%20%2F%20Requirement"
                className="mt-7 inline-flex min-h-11 w-fit shrink-0 items-center rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#AC1018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 sm:px-8 sm:py-4"
              >
                Discuss Your Idea
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
