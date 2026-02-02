"use client";

import { useState, useRef } from "react";
import { TestimonialSlider } from "@/components/TestimonialSlider";



{/*Data*/}
const aboutItems = [
  {
    key: "cens",
    label: "CENS UI",
    content: (
      <p className="text-white text-lg leading-relaxed text-justify font-[var(--font-made-tommy)]">
        <span className="font-bold">
          The Civil Engineering National Summit (CENS)
        </span>{" "}
        is a prestigious event that has stood the test of time as a leading civil
        engineering competition in Indonesia. For years, CENS has brought together
        students, stakeholders, professionals, and non-governmental (NGOs) within the
        civil and environmental sectors from across the nation to tackle pressing
        national issues in the field of infrastructure development.
      </p>
    ),
  },
  {
    key: "track",
    label: "Track Record",
    content: (
      <div className="flex flex-col gap-6">
        {/* PARTICIPANTS */}
        <div className="relative h-28 md:h-32 rounded-sm overflow-hidden backdrop-blur-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)]">
          <img
            src="/images/participants.png"
            alt="Participants"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)] opacity-0" />
          <div className="relative z-10 h-full flex items-center px-8 gap-6 text-white">
            <span className="text-5xl font-bold tabular-nums inline-block w-[140px] text-right">2000+</span>
            <span className="text-xl md:text-2xl">
              Participants attended National Summit
            </span>
          </div>
        </div>

        {/* TEAMS */}
        <div className="relative h-28 md:h-32 rounded-sm overflow-hidden backdrop-blur-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)]">
          <img
            src="/images/teams.png"
            alt="Teams"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)] opacity-0" />
          <div className="relative z-10 h-full flex items-center px-8 gap-6 text-white">
            <span className="text-5xl font-bold tabular-nums inline-block w-[140px] text-right">300+</span>
            <span className="text-xl md:text-2xl">
              Teams that participated in competitions
            </span>
          </div>
        </div>

        {/* UNIVERSITIES */}
        <div className="relative h-28 md:h-32 rounded-sm overflow-hidden backdrop-blur-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)]">
          <img
            src="/images/universities.png"
            alt="Universities"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)] opacity-0" />
          <div className="relative z-10 h-full flex items-center px-8 gap-6 text-white">
            <span className="text-5xl font-bold tabular-nums inline-block w-[140px] text-right">100+</span>
            <span className="text-xl md:text-2xl">
              Universities that were publicized about CENS UI
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "testimony",
    label: "What they say about CENS UI",
    content: (<TestimonialSlider />),
  },
] as const;

{/*TYPES*/}
type AboutKey = "cens" | "track" | "testimony";

{/*COMPONENT*/}
export function AboutBar() {
  const [open, setOpen] = useState<AboutKey | null>(null);

  const sectionRefs = useRef<Record<AboutKey, HTMLDivElement | null>>({
    cens: null,
    track: null,
    testimony: null,
  });

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

  const scrollToSection = (el: HTMLElement) => {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const safeOffset = navbarHeight + 32;

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

  const toggle = (key: AboutKey) => {
    setOpen((prev) => (prev === key ? null : key));

    if (open !== key) {
      setTimeout(() => {
        const el = sectionRefs.current[key];
        if (el) scrollToSection(el);
      }, 520);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {aboutItems.map((item) => {
        const isOpen = open === item.key;

        return (
          <div key={item.key} className="relative">
            {/* LEFT VERTICAL BAR */}
            <div
              className={`absolute left-0 top-0 w-2 transition-all duration-500 ${
                isOpen ? "h-full bg-[#03695E]" : "h-[96px] bg-[#03695E]/70"
              }`}
            />

            {/* BAR */}
            {!isOpen && (
              <button
                onClick={() => toggle(item.key)}
                type="button"
                className="group relative block w-full text-left transition-all duration-500"
              >
                <div className="ml-6 px-10 py-8 rounded-sm text-white text-3xl md:text-4xl font-bold font-[var(--font-made-tommy)] tracking-wide shadow-[4px_4px_6px_rgba(0,0,0,0.25)] backdrop-blur-md bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)] opacity-75 group-hover:opacity-90">
                  {item.label}
                </div>
              </button>
            )}

            {/* DROPDOWN */}
            <div
              ref={(el) => {sectionRefs.current[item.key] = el;}}
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-[1000px] mt-6" : "max-h-0"
                }`}
            >
              <div className="ml-6 pl-6">
                <h3 className="mb-4 text-3xl md:text-4xl font-bold [font-family:var(--font-gretaros)] tracking-[0.14em] uppercase text-white"
                    style={{
                    textShadow: `
                        0px -0.5px 0px rgba(255,255,255,0.18),
                        0px 1px 2px rgba(0,0,0,0.18)
                    `,
                    }}
                >
                  {item.label}
                </h3>

                {item.key === "testimony" ? (
                item.content
                ) : item.key === "track" ? (
                item.content
                ) : (
                <div className="px-10 py-8 rounded-sm text-white backdrop-blur-md shadow-[4px_4px_6px_rgba(0,0,0,0.25)] bg-[linear-gradient(90deg,#03695E_0%,#92B286_50%,#F4E5A2_100%)] opacity-75">
                    {item.content}
                </div>
                )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
