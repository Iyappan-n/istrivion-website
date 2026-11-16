import ContactForm from "./contact-form";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Tell ISTRIVION Technologies about your project or idea and explore a suitable digital solution with our team.",
  "/contact",
);

type ContactPageProps = {
  searchParams: Promise<{ service?: string; subject?: string }>;
};

const availableServices = [
  "Web Development",
  "App Development",
  "E-Commerce Solutions",
  "UI/UX Design & Branding",
  "Portfolio & Personal Websites",
  "Custom Digital Experiences",
  "Logo Design & Brand Identity",
  "AI Animation & Video Creation",
  "College Projects & Academic Solutions",
  "R&D and Prototype Development",
  "Other",
];

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service, subject } = await searchParams;
  const selectedService =
    availableServices.find((serviceOption) => serviceOption === service) ?? "";

  return (
    <main className="min-h-screen bg-transparent text-[#73777D]">
      <section className="bg-[#D71920] px-5 py-16 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.3em] text-white/70">
            HAVE A PROJECT IN MIND?
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-6xl">
            Let&apos;s build something meaningful together.
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/80">
            Tell us about your idea. Let&apos;s explore what we can create
            together.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)] lg:items-start">
          <div data-scroll-reveal className="rounded-2xl border border-[#A7A9AC]/40 bg-white p-5 shadow-[0_8px_30px_rgba(115,119,125,0.08)] sm:p-10">
            <h2 className="text-2xl font-bold text-[#73777D]">
              Send an enquiry
            </h2>
            <p className="mt-2 leading-7 text-[#73777D]">
              Share a few details about your project. We review enquiries and
              follow up as availability allows.
            </p>
            <ContactForm
              selectedService={selectedService}
              subject={subject ?? ""}
              services={availableServices}
            />
          </div>

          <aside className="grid gap-5">
            <section data-scroll-reveal className="rounded-2xl border border-[#A7A9AC]/40 bg-white p-5 shadow-[0_8px_30px_rgba(115,119,125,0.06)] sm:p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#D71920]/[0.06] text-[#D71920]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-4.1A8.4 8.4 0 1 1 21 11.5Z" />
                  <path d="M8.5 9.5c.6 2 2 3.4 4 4" />
                </svg>
              </span>
              <h2 className="mt-5 text-xl font-bold text-[#73777D]">
                Business WhatsApp
              </h2>
              <p className="mt-2 leading-7 text-[#73777D]">
                WhatsApp contact details will be added here once the official
                business number is configured.
              </p>
              <p className="mt-4 inline-flex rounded-full bg-[#F5F5F5] px-4 py-2 text-sm font-semibold text-[#73777D]">
                WhatsApp link: [business link to be added]
              </p>
            </section>

            <section data-scroll-reveal className="rounded-2xl border border-[#A7A9AC]/40 bg-white p-5 shadow-[0_8px_30px_rgba(115,119,125,0.06)] sm:p-8">
              <h2 className="text-xl font-bold text-[#73777D]">
                What happens next?
              </h2>
              <p className="mt-2 leading-7 text-[#73777D]">
                We review each enquiry and follow up as soon as we can.
                Response timing may vary depending on the project details and
                our availability.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
