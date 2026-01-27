"use client";

import Image from "next/image";
import { useState } from "react";

const carouselImages = [
  "/images/carousel-home-1.png",
  "/images/carousel-home-2.png",
  "/images/carousel-home-3.png",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Custom Gradient Overlays */}
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(1deg,#E6E9D8_-54.65%,#219ACC_99.39%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(333deg,#219ACC_8.55%,#F4E5A2_71.14%,#219ACC_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-12 md:py-20">
        {/* Logo */}
        <div className="mb-0">
          <Image
            src="/images/logo.png"
            alt="THE 23rd CENSU"
            width={574}
            height={323}
            className="w-72 md:w-[420px] lg:w-[520px] h-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1
          className="
            text-center
            text-2xl md:text-4xl lg:text-5xl
            font-extrabold
            font-[var(--font-gretaros)]
            tracking-[10px]
            mb-3
            bg-[radial-gradient(53.96%_79.16%_at_67.53%_15.27%,#FFFFFF_0%,#F4E5A2_100%)]
            bg-clip-text text-transparent
            [filter:drop-shadow(0px_3.9px_4.6px_rgba(0,0,0,0.25))]
          "
        >
          REBUILT TO ADVANCE:
        </h1>

        <h2 className="max-w-5xl text-center text-white text-xl md:text-3xl lg:text-4xl font-bold font-[var(--font-made-tommy)] tracking-[0.2em] mb-40 md:mb-48 px-4">
          The Civil Engineering World of Disaster Management for Vulnerable
          Communities
        </h2>

        {/* Activities */}
        <h3
          className="
            text-center
            text-2xl md:text-4xl lg:text-5xl
            font-extrabold
            font-[var(--font-gretaros)]
            tracking-[10px]
            mb-12
            bg-[radial-gradient(53.96%_79.16%_at_67.53%_15.27%,#FFFFFF_0%,#F4E5A2_100%)]
            bg-clip-text text-transparent
            [filter:drop-shadow(0px_3.9px_4.6px_rgba(0,0,0,0.25))]
          "
        >
          A GLIMPSE OF OUR ACTIVITIES
        </h3>

        {/* Carousel */}
        <div className="relative w-full max-w-5xl flex items-center justify-center px-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 md:-left-10 z-20 hover:scale-110 transition-transform"
          >
            <svg
              className="w-10 h-10 md:w-14 md:h-14 text-emerald-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={6}
              strokeLinecap="square"
              viewBox="0 0 24 24"
            >
              <path strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Wrapper (overflow visible) */}
          <div className="relative w-full max-w-4xl mx-10 md:mx-20">
            {/* Frame (clipped) */}
            <div className="h-64 md:h-80 lg:h-96 bg-zinc-200 rounded-[42px] md:rounded-[78px] shadow-xl border-[4px] border-emerald-700 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselImages.map((src, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <Image
                      src={src}
                      alt={`Activity ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ornament - Two Rings (NOT CLIPPED) */}
            <div className="absolute -left-28 -bottom-28 w-60 h-60 pointer-events-none z-20">
              <Image
                src="/images/ornament-two-rings.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-2 md:-right-10 z-20 hover:scale-110 transition-transform"
          >
            <svg
              className="w-10 h-10 md:w-14 md:h-14 text-emerald-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={6}
              strokeLinecap="square"
              viewBox="0 0 24 24"
            >
              <path strokeLinejoin="miter" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-3 mt-8">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 md:w-5 md:h-5 border-[5px] border-emerald-700 transition-all ${
                currentSlide === index
                  ? "bg-emerald-700 scale-110"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ornament - Plusses */}
      <div className="absolute bottom-24 right-6 w-32 h-24 md:w-48 md:h-32 pointer-events-none">
        <Image
          src="/images/ornament-plusses.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
