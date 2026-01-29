"use client";

import { useState, useRef } from "react";

/* ===============================
   DATA (JANGAN DIUBAH)
================================ */
const aboutItems = [
  {
    key: "cens",
    label: "CENS UI",
    content: (
      <p className="text-white text-lg leading-relaxed text-justify">
        The Civil Engineering National Summit (CENS) is a prestigious event that
        has stood the test of time as a leading civil engineering competition in
        Indonesia. For years, CENS has brought together students, stakeholders,
        professionals, and non-governmental organizations (NGOs) from across the
        nation to tackle pressing national issues in infrastructure development.
      </p>
    ),
  },
  {
    key: "track",
    label: "Track Record",
    content: (
      <ul className="text-white text-lg space-y-2">
        <li>• 2000+ Participants attended National Summit</li>
        <li>• 300+ Teams participated in competitions</li>
        <li>• 100+ Universities involved nationwide</li>
      </ul>
    ),
  },
  {
    key: "testimony",
    label: "What they say about CENS UI",
    content: (
      <p className="text-white text-lg italic leading-relaxed">
        “CENS UI is a meaningful platform that brings real impact to future
        infrastructure development in Indonesia.”
      </p>
    ),
  },
] as const;

/* ===============================
   TYPES
================================ */
type AboutKey = "cens" | "track" | "testimony";

/* ===============================
   COMPONENT
================================ */
export function AboutBar() {
  const [open, setOpen] = useState<AboutKey | null>(null);

  /* 🔑 scroll HARUS ke container dropdown, bukan ke title */
  const sectionRefs = useRef<Record<AboutKey, HTMLDivElement | null>>({
    cens: null,
    track: null,
    testimony: null,
  });

  /* ===============================
     APPLE-LIKE SMOOTH SCROLL
  ================================ */
  const smoothScrollTo = (targetY: number, duration = 900) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * easeInOut(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  /* ===============================
     SCROLL DENGAN OFFSET NAVBAR
  ================================ */
  const scrollToSection = (el: HTMLElement) => {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar
      ? navbar.getBoundingClientRect().height
      : 0;

    const safeOffset = navbarHeight + 32;

    /* tunggu layout settle (PENTING) */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset -
          safeOffset;

        smoothScrollTo(y);
      });
    });
  };

  /* ===============================
     TOGGLE
  ================================ */
  const toggle = (key: AboutKey) => {
    setOpen((prev) => (prev === key ? null : key));

    if (open !== key) {
      setTimeout(() => {
        const el = sectionRefs.current[key];
        if (el) scrollToSection(el);
      }, 520); // sinkron animasi BAR + dropdown
    }
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="flex flex-col gap-10">
      {aboutItems.map((item) => {
        const isOpen = open === item.key;

        return (
          <div key={item.key} className="relative">
            {/* LEFT VERTICAL BAR */}
            <div
              className={`absolute left-0 top-0 w-2 transition-all duration-500
                ${
                  isOpen
                    ? "h-full bg-[#03695E]"
                    : "h-[96px] bg-[#03695E]/70"
                }
              `}
            />

            {/* BAR (HILANG SAAT OPEN) */}
            {!isOpen && (
              <button
                onClick={() => toggle(item.key)}
                type="button"
                className="
                  group relative block w-full text-left
                  transition-all duration-500
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                "
              >
                <div
                  className="
                    ml-6
                    px-10 py-8
                    rounded-sm
                    text-white
                    text-3xl md:text-4xl
                    font-bold
                    font-[var(--font-made-tommy)]
                    tracking-wide
                    shadow-[4px_4px_6px_rgba(0,0,0,0.25)]
                    backdrop-blur-md
                    bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)]
                    opacity-75
                    group-hover:opacity-90
                    transition-all
                  "
                >
                  {item.label}
                </div>
              </button>
            )}

            {/* DROPDOWN */}
            <div
              ref={(el) => {
                sectionRefs.current[item.key] = el;
              }}
              className={`
                overflow-hidden
                transition-all
                duration-500
                delay-[120ms]
                ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isOpen ? "max-h-[900px] mt-6" : "max-h-0"}
              `}
            >
              <div
                className={`
                  ml-6 pl-6
                  transition-all
                  duration-500
                  delay-[120ms]
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }
                `}
              >
                {/* TITLE */}
                <h3
                  className="
                    mb-4
                    text-3xl md:text-4xl
                    font-bold
                    font-[var(--font-made-tommy)]
                    text-white
                    tracking-wide
                  "
                >
                  {item.label}
                </h3>

                {/* CONTENT BOX */}
                <div
                  className="
                    px-10 py-8
                    rounded-sm
                    text-white
                    backdrop-blur-md
                    shadow-[4px_4px_6px_rgba(0,0,0,0.25)]
                    bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)]
                    opacity-75
                  "
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
