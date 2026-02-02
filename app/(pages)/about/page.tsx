"use client";

import Image from "next/image";
import { AboutBar } from "@/components/AboutBar";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/About-us.png"
          alt="About CENS UI Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        <AboutBar />
      </div>
    </div>
  );
}
