import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo-metadata";
import HeroEcosystem from "./hero-ecosystem";

export const metadata: Metadata = {
  ...createPageMetadata(
    "Digital Experiences & Technology Solutions",
    "Discover ISTRIVION Technologies and our digital experiences, websites and applications created through technology and thoughtful design.",
    "/",
  ),
  title: {
    absolute: "Digital Experiences & Technology Solutions | ISTRIVION Technologies",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-transparent text-[#73777D]">
      <section
        id="home"
        className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 max-[639px]:min-h-0 max-[639px]:flex-col max-[639px]:items-stretch max-[639px]:px-5 max-[639px]:py-14 lg:px-10"
      >
        <div className="relative z-10 w-full max-w-4xl">
          <div className="hero-stagger hero-stagger-1 mb-8 flex items-center gap-1 sm:gap-3">
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 bg-[#D71920] sm:w-10"
            />
            <p className="text-xs font-bold tracking-[0.3em] text-[#D71920] max-[639px]:tracking-[0.16em]">
              INNOVATION • SMART • TECHNOLOGY
            </p>
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0 bg-[#D71920] sm:w-10"
            />
          </div>

          <h1 className="text-[clamp(2.5rem,11vw,3rem)] font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
            <span className="hero-stagger hero-stagger-2 inline-block">
              Build Digital
            </span>
            <br />
            <span className="hero-stagger hero-stagger-3 inline-block">
              Experiences.
            </span>
            <br />
            <span className="hero-stagger hero-stagger-4 inline-block text-[#D71920]">
              Create Possibilities.
            </span>
          </h1>

          <p className="hero-stagger hero-stagger-5 mt-8 max-w-2xl text-base leading-8 text-[#666] sm:text-lg">
            We turn ideas into meaningful digital experiences through
            technology, creativity and thoughtful design.
          </p>

          <div className="hero-stagger hero-stagger-6 mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="group inline-flex min-h-11 items-center rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#AC1018] sm:px-8 sm:py-4"
            >
              Explore Our Services{" "}
              <span
                aria-hidden="true"
                className="text-white transition-colors group-hover:text-white"
              >
                ↗
              </span>
            </Link>
            <Link
              href="/about"
              className="group inline-flex min-h-11 items-center rounded-full border border-[#24272B]/20 px-6 py-3 text-sm font-bold transition hover:border-[#D71920] hover:text-[#D71920] sm:px-8 sm:py-4"
            >
              Discover ISTRIVION{" "}
              <span
                aria-hidden="true"
                className="text-[#73777D] transition-colors group-hover:text-[#D71920]"
              >
                ↗
              </span>
            </Link>
          </div>

          <p className="hero-stagger hero-stagger-7 mt-16 text-sm font-medium italic tracking-wide text-[#888]">
            Build Digital Experiences. Creating Possibilities.
          </p>
        </div>
        <HeroEcosystem />
      </section>
    </main>
  );
}
