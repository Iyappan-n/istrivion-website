import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "Our Work",
  "Discover the ISTRIVION approach to understanding ideas, creating digital solutions and transforming them into purposeful experiences.",
  "/work",
);

const approach = [
  [
    "01",
    "Understand",
    "We begin by understanding your idea, goals and challenges.",
  ],
  [
    "02",
    "Create",
    "We combine creativity and technology to shape the right solution.",
  ],
  [
    "03",
    "Transform",
    "We turn the solution into an experience ready for the real world.",
  ],
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#73777D]">
      <section className="border-y border-black/10 px-5 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D71920]">
            OUR APPROACH
          </p>
          <h1 className="mt-5 max-w-2xl text-3xl font-black sm:text-5xl">
            Think beyond ordinary. Create with purpose.
          </h1>
          <div data-scroll-stagger className="mt-12 grid gap-8 md:grid-cols-3">
            {approach.map(([number, title, description]) => (
              <div
                key={number}
                data-scroll-reveal
                className="work-step-card rounded-xl border-t-2 border-[#D71920] bg-white/80 p-5 pt-4 shadow-[0_8px_30px_rgba(115,119,125,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(215,25,32,0.1)] sm:p-6 sm:pt-5"
              >
                <p className="work-step-number text-sm text-[#D71920]">{number}</p>
                <h2 className="mt-5 text-2xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-[#777]">{description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-12 inline-flex min-h-11 items-center border-b-2 border-[#D71920] pb-2 text-sm font-bold transition hover:text-[#D71920]"
          >
            Start a conversation ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
