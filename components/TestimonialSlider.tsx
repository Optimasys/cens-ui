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
  const data = testimonials[index];

  const next = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative mt-1 ml-6 pl-6">

      {/* SLIDER AREA */}
      <div className="relative flex items-center gap-8 pt-10 pb-40 overflow-visible">


        {/* PREV */}
       <button
        onClick={prev}
        className="
            z-20
            mr-10
            w-14
            aspect-square
            flex-shrink-0
            rounded-full
            bg-[#C5D99D]
            flex items-center justify-center
            shadow-lg
        "
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        </button>

        {/* MAIN CONTENT */}
        <div className="relative w-full">

          <div className="relative ml-10 bg-[#03695E]/30 backdrop-blur-[3px] border border-white/10 shadow-xl p-10 text-white">

            {/* RIBBON */}
            <div
                className="
                absolute
                top-3
                left-20
                pl-26
                pr-10
                px-30
                py-3
                bg-[#03695E]
                font-extrabold
                text-4xl
                shadow-md
                z-20
                "
                style={{
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                }}
            >
                {data.name}
            </div>

            {/* TEXT WRAPPER */}
            <div className="pl-40 pt-10">
                <p className="text-lg leading-relaxed opacity-95">
                “{data.quote}”
                </p>
            </div>

        </div>

          {/* AVATAR*/}
          <div className="absolute -left-8 top-[-30px] w-65 h-65 z-10">
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
        <button
        onClick={prev}
        className="
            z-20
            mr-10
            w-14
            aspect-square
            flex-shrink-0
            rounded-full
            bg-[#C5D99D]
            flex items-center justify-center
            shadow-lg
        "
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        </button>
      </div>
    </div>
  );
}
