import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 bg-[#17191D] px-6 py-10 text-white lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <Image
          src="/istrivion-logo.png"
          alt="ISTRIVION Technologies"
          width={180}
          height={60}
          className="h-[60px] w-[180px] object-contain"
        />
        <p className="text-sm text-[#9E9E9E]">
          Build Digital Experiences. Creating Possibilities.
        </p>
        <p className="text-xs text-[#9E9E9E]">
          © {new Date().getFullYear()} ISTRIVION Technologies.
        </p>
      </div>
    </footer>
  );
}
