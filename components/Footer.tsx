import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative w-full min-h-[24rem] md:h-96 overflow-hidden">
      {/* ================= Background Image ================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ================= Gradient Overlays (BOTTOM → TOP) ================= */}
      <div className="absolute inset-0 bg-[linear-gradient(132deg,rgba(244,229,162,0.9)_23.96%,rgba(110,175,95,0.9)_51.23%,rgba(166,198,219,0.9)_78.5%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#32A0CE_0%,rgba(166,198,219,0)_107.21%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(213deg,rgba(3,105,94,0.5)_19.63%,rgba(166,198,219,0)_83.94%)]" />

      {/* ================= ORNAMENT LAYERS ================= */}

      {/* Ornament Rings - Bottom Left */}
      <div className="pointer-events-none absolute -bottom-40 -left-28 
                      w-[520px] h-[520px] opacity-80
                      scale-75 md:scale-100">
        <Image
          src="/images/ornament-rings.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Ornament Dots - Near Media Partners */}
      <div className="pointer-events-none absolute 
                      top-10 right-0 md:top-8 md:right-0
                      w-40 h-40 md:w-56 md:h-56
                      opacity-20 hidden sm:block">
        <Image
          src="/images/ornament-dots.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* ================= Content ================= */}
      <div className="relative z-10 h-full px-6 lg:px-16 py-8">
        {/* Sponsors and Media Partners Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Sponsors Card */}
          <div className="relative w-full md:w-72 h-36 bg-white rounded-xl shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] border border-white/60 flex items-center justify-center">
            <h3 className="absolute top-3 left-1/2 -translate-x-1/2 text-emerald-700 text-xl font-medium font-[var(--font-made-tommy)] [text-shadow:_0px_0px_7px_rgb(0_0_0_/_0.15)]">
              Sponsors
            </h3>
            <p className="text-gray-500 text-sm font-medium font-[var(--font-made-tommy)]">
              To Be Announced
            </p>
          </div>

          {/* Media Partners Card */}
          <div className="relative w-full md:w-72 h-36 bg-white rounded-xl shadow-[0px_0_9px_0px_rgba(0,0,0,0.25)] border border-white/60 flex items-center justify-center">
            <h3 className="absolute top-3 left-1/2 -translate-x-1/2 text-emerald-700 text-xl font-medium font-[var(--font-made-tommy)] [text-shadow:_0px_0px_7px_rgb(0_0_0_/_0.15)]">
              Media Partners
            </h3>
            <p className="text-gray-500 text-sm font-medium font-[var(--font-made-tommy)]">
              To Be Announced
            </p>
          </div>
        </div>

        {/* ================= Bottom Section ================= */}
        <div className="relative md:absolute md:bottom-2 md:left-6 md:right-6 lg:left-16 lg:right-16 flex flex-col gap-6 md:gap-0 mt-12 md:mt-0">

          {/* Row 1 - Social Media */}
          <div className="flex justify-center md:translate-y-12">
            <div className="flex items-center gap-6 md:gap-10">
              <SocialLink
                href="https://www.instagram.com/hipercensi"
                label="Instagram"
              />
              <SocialLink
                href="https://www.linkedin.com/company/civil-engineering-national-summit/"
                label="LinkedIn"
              />
              <SocialLink
                href="https://www.tiktok.com/@cens_ui"
                label="TikTok"
              />
            </div>
          </div>

          {/* Row 2 - Copyright + Logo */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 text-center md:text-left">
            <p className="text-white text-base font-normal font-[var(--font-made-tommy)] leading-5">
              © 2026 CENS UI
            </p>

            <Image
              src="/images/logo.png"
              alt="CENS Logo"
              width={193}
              height={109}
              className="w-24 md:w-32 lg:w-48 h-auto drop-shadow-[0px_2.6px_2.6px_rgba(255,255,255,0.25)]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white text-lg md:text-xl font-medium font-[var(--font-made-tommy)] leading-7 hover:opacity-80 transition-opacity"
    >
      {label}
    </Link>
  );
}