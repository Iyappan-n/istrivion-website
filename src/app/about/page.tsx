import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata = createPageMetadata(
  "About",
  "Learn about ISTRIVION Technologies, a digital solutions brand bringing ideas to life through technology, design and innovation.",
  "/about",
);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#73777D]">
      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-[#D71920]">
              ABOUT ISTRIVION
            </p>
            <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl">
              Ideas deserve to become something extraordinary.
            </h1>
          </div>
          <div>
            <p className="text-base leading-8 text-[#666] sm:text-lg sm:leading-9">
              ISTRIVION Technologies is a digital solutions brand focused on
              bringing ideas to life through technology, design and innovation.
              We aim to create useful, engaging and purposeful digital
              experiences for businesses and individuals.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center border-b-2 border-[#D71920] pb-2 text-sm font-bold hover:text-[#D71920]"
            >
              Start a conversation ↗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
