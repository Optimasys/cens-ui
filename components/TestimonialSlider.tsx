"use client";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Khartik Kharkal",
    quote:
      "It was a super interesting event and we are honored to be there. We were discussing the possibility of implementing the compact city concept from many points of view.",
    image: "/images/khartik-kharkal-v2.png",
  },
  {
    name: "Sandiaga Uno",
    quote:
      "I am very grateful to Cens UI. resilient City is a concept that will be a focus for future development in Jakarta.",
    image: "/images/sandiaga-uno.png",
  },
  {
    name: "Silvia Halim",
    quote:
      "I am proud of UI students who are ready to consider significant issues like Resilient City and invite people to exchange ideas.",
    image: "/images/silvia-halim.png",
  },
  {
    name: "Ming Zhang",
    quote:
      "We often held this event and understand how difficult it is, but this event is a success so I congratulate them.",
    image: "/images/ming-zhang-v2.png",
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const data = testimonials[index];

  const next = () => {
    if (index < testimonials.length - 1) {
      setDirection("right");
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection("left");
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative mt-1 ml-6 pl-6 max-md:ml-3 max-md:pl-3">

      {/* FLEX CONTAINER */}
      <div
        className="
          relative
          flex items-center gap-8

          flex items-center gap-8 max-md:gap-4
          max-md:gap-4

          pt-10 pb-20
          max-md:py-8
        "
      >

        {/* PREV */}
        {index > 0 && (
          <button
            onClick={prev}
            className="z-20 mr-10 max-md:mr-0 w-14 max-md:w-10 aspect-square rounded-full bg-[#C5D99D] flex items-center justify-center shadow-lg"
          >
            <svg className="w-7 max-md:w-5 h-7 max-md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* MAIN */}
        <div
          key={index}
          className={`
            relative w-full
            transition-all duration-500 ease-out
            ${
              direction === "right"
                ? "translate-x-8 opacity-0 animate-[fadeRight_.5s_forwards]"
                : "-translate-x-8 opacity-0 animate-[fadeLeft_.5s_forwards]"
            }
          `}
        >

          {/* CARD */}
          <div
            className="
              relative
              ml-10
              max-md:ml-0

              bg-[#03695E]/30
              backdrop-blur-[3px]
              border border-white/10
              shadow-xl

              px-10
              py-6

              max-md:px-4
              max-md:py-4

              text-white
            "
          >

            {/* RIBBON */}
            <div
              className="
                absolute
                top-3
                left-20

                max-md:left-23
                max-md:top-3

                pl-26 pr-10
                max-md:px-4

                py-3 max-md:py-2

                bg-[#03695E]
                font-extrabold
                text-4xl
                max-md:text-base

                shadow-md
                z-20
              "
              style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
              }}
            >
              {data.name}
            </div>

            {/* TEXT */}
            <div className="pl-40 max-md:pl-20 pt-13 max-md:pt-10">
              <p className="text-lg max-md:text-sm leading-relaxed opacity-95">
                “{data.quote}”
              </p>
            </div>
          </div>

          {/* AVATAR */}
          <div
            className="
              absolute
              -left-8 
              top-[-30px]
              w-65 h-65

              max-md:absolute
              max-md:left-2
              max-md:top-1/2
              max-md:-translate-y-1/2
              max-md:mb-3
              max-md:w-20
              max-md:h-20

              z-10
            "
          >
            <div className="absolute inset-0 rounded-full border-4 border-[#C5D99D]" />
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* NEXT */}
        {index < testimonials.length - 1 && (
          <button
            onClick={next}
            className="z-20 ml-10 max-md:ml-0 w-14 max-md:w-10 aspect-square rounded-full bg-[#C5D99D] flex items-center justify-center shadow-lg"
          >
            <svg className="w-7 max-md:w-5 h-7 max-md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
