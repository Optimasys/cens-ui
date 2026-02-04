"use client";

import Image from "next/image";
import { AboutBar } from "@/components/AboutBar";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 -z-10 h-full">
        <Image
          src="/images/About Us.png"
          alt="About CENS UI Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-24">
        <AboutBar />
      </div>

    </div>
  );
}
