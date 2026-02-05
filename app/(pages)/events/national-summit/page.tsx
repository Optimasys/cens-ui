"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NationalSummit() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-05-13T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => num.toString().padStart(2, "0");

  return (
    <>
      {/* SECTION 1: COUNTDOWN */}
      <section className="relative w-full min-h-screen overflow-hidden py-16 md:py-24">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/summit-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 py-6 md:py-10">
          {/* Header */}
          <header className="text-center mb-10 md:mb-14">
            {/* Top Border */}
            <div className="h-1 max-w-6xl mx-auto bg-[linear-gradient(90deg,_#FFE48E_0%,_#DFBB4C_46.15%,_#F7DC86_100%)] shadow-[1px_1px_4px_0_#F4E5A2] mb-5 md:mb-7" />

            {/* Event Label */}
            <p className="text-rose-50 text-xl md:text-3xl font-light font-[var(--font-made-tommy)] drop-shadow-[0_7px_4px_rgba(0,0,0,0.31)] mb-5 md:mb-7">
              The 23<sup>rd</sup> CENS
            </p>

            {/* Main Title */}
            <div className="relative inline-block px-10 md:px-14 py-7 md:py-10 mb-5 md:mb-7 max-w-full">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(110,175,95,0.40)_-19.78%,_rgba(3,105,94,0.80)_48.38%,_rgba(110,175,95,0.40)_121.32%)] rounded-[100px] shadow-[10px_10px_16px_0_rgba(0,0,0,0.25)] border-[3px] border-[#C6A97D] [backdrop-filter:blur(3.5px)]" />
              <div className="relative z-10 space-y-2 md:space-y-3">
                <h1 className="bg-[linear-gradient(90deg,_#FFF_0%,_#F4E5A2_79.7%)] bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-extrabold font-[var(--font-gretaros)] uppercase tracking-wide drop-shadow-[3px_7px_4px_rgba(0,0,0,0.41)]">
                  National Summit
                </h1>
                <p className="bg-[linear-gradient(90deg,_#FFF_0%,_#F4E5A2_79.7%)] bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl font-extrabold font-[var(--font-gretaros)] drop-shadow-[3px_7px_4px_rgba(0,0,0,0.41)]">
                  2026
                </p>
              </div>
            </div>

            {/* Coming Soon */}
            <p className="bg-[radial-gradient(91.95%_148.48%_at_31.91%_75.75%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-xl md:text-3xl lg:text-4xl font-light font-[var(--font-made-tommy)] tracking-[4px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] mb-5 md:mb-7">
              Coming Soon | 13 May 2026
            </p>

            {/* Bottom Border */}
            <div className="h-1 max-w-6xl mx-auto bg-[linear-gradient(90deg,_#FFE48E_0%,_#DFBB4C_46.15%,_#F7DC86_100%)] shadow-[1px_1px_4px_0_#F4E5A2]" />
          </header>

          {/* Theme */}
          <div className="text-center mb-14 md:mb-20 max-w-6xl mx-auto">
            <h2 className="bg-[radial-gradient(53.96%_79.16%_at_67.53%_15.27%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-3xl md:text-5xl lg:text-5xl font-extrabold font-[var(--font-gretaros)] tracking-[10px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)]  mb-4 md:mb-6">
              REBUILT TO ADVANCE:
            </h2>
            <p className="text-white text-xl md:text-3xl lg:text-4xl font-bold font-[var(--font-made-tommy)] tracking-[4px] [text-shadow:_0_7px_4px_rgba(0,0,0,0.25)] leading-tight">
              The Civil Engineering World of Disaster
              <br />
              Management for Vulnerable Communities
            </p>
          </div>

          {/* Countdown */}
          <div className="relative max-w-5xl mx-auto">
            {/* Star Decoration */}
            <div className="flex justify-center mb-8 md:mb-12">
              <Image
                src="/images/summit-star.png"
                alt=""
                width={800}
                height={130}
                className="w-[600px] md:w-[800px] h-auto"
              />
            </div>

            {/* Title */}
            <h3 className="text-center bg-[radial-gradient(91.95%_148.48%_at_31.91%_75.75%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl font-bold font-[var(--font-made-tommy)] tracking-[5px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] mb-10 md:mb-14">
              Bring #YourCENSForward in
            </h3>

            {/* Days */}
            <div className="relative text-center mb-10 md:mb-14">
              {/* Glow Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[400px] md:h-[800px] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(110,175,95,0.70)_0%,_rgba(110,175,95,0.00)_100%)] rounded-full -z-10" />

              {/* Days Counter */}
              <div className="flex items-start justify-center gap-4 md:gap-6">
                <div className="bg-[radial-gradient(91.95%_148.48%_at_31.91%_75.75%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-[120px] md:text-[180px] lg:text-[200px] font-[var(--font-made-tommy)] leading-none tracking-[5px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] ">
                  {formatNumber(timeLeft.days)}
                </div>
                <div className="bg-[radial-gradient(91.95%_148.48%_at_31.91%_75.75%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-[var(--font-made-tommy)] tracking-[5px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)]  mt-4 md:mt-6">
                  Days
                </div>
              </div>
            </div>

            {/* Hours Minutes Seconds */}
            <div className="flex justify-center">
              <div className="bg-[linear-gradient(90deg,_rgba(110,175,95,0.40)_-19.78%,_rgba(3,105,94,0.80)_48.38%,_rgba(110,175,95,0.40)_121.32%)] rounded-[60px] md:rounded-[100px] shadow-[10px_10px_16px_0_rgba(0,0,0,0.25)] border-2 md:border-[3px] border-[#C6A97D] [backdrop-filter:blur(3.5px)] px-6 md:px-10 py-5 md:py-7 inline-block">
                <div className="flex items-baseline justify-center gap-4 md:gap-8 whitespace-nowrap">
                  {/* Hours */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-4xl md:text-6xl lg:text-7xl font-[var(--font-made-tommy)] leading-none tracking-[2px]">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-white text-lg md:text-2xl lg:text-3xl font-light font-[var(--font-made-tommy)]">
                      Hours
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-4xl md:text-6xl lg:text-7xl font-[var(--font-made-tommy)] leading-none tracking-[2px]">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-white text-lg md:text-2xl lg:text-3xl font-light font-[var(--font-made-tommy)]">
                      Minutes
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-4xl md:text-6xl lg:text-7xl font-[var(--font-made-tommy)] leading-none tracking-[2px]">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="text-white text-lg md:text-2xl lg:text-3xl font-light font-[var(--font-made-tommy)]">
                      Seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PARTNERS */}
      <section className="relative w-full min-h-screen py-20 md:py-32">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/summit-bg-2.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="bg-[radial-gradient(84.73%_79.16%_at_67.53%_15.27%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-extrabold font-[var(--font-gretaros)] tracking-[14px] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] mb-16 md:mb-24">
            OUR PARTNERS
          </h2>

          {/* Sponsors */}
          <div className="mb-20 md:mb-32">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
              <Image
                src="/images/summit-star-2.png"
                alt=""
                width={100}
                height={100}
                className="w-16 md:w-24 lg:w-28"
              />
              <div className="relative flex-1 max-w-3xl">
                {/* Gradient line with center fade */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#F4E5A2] via-transparent to-[#F4E5A2]" />
                </div>
                <h3 className="relative bg-[radial-gradient(84.73%_79.16%_at_67.53%_15.27%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-extrabold font-[var(--font-gretaros)] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] whitespace-nowrap inline-block px-6 md:px-8">
                  SPONSORS
                </h3>
              </div>
              <Image
                src="/images/summit-star-2.png"
                alt=""
                width={100}
                height={100}
                className="w-16 md:w-24 lg:w-28"
              />
            </div>
            <p className="text-white/90 text-xl md:text-2xl font-[var(--font-made-tommy)]">
              To be announced
            </p>
          </div>

          {/* Media Partners */}
          <div>
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
              <Image
                src="/images/summit-star-2.png"
                alt=""
                width={100}
                height={100}
                className="w-16 md:w-24 lg:w-28"
              />
              <div className="relative flex-1 max-w-3xl">
                {/* Gradient line with center fade */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#F4E5A2] via-transparent to-[#F4E5A2]" />
                </div>
                <h3 className="relative bg-[radial-gradient(84.73%_79.16%_at_67.53%_15.27%,_#FFF_0%,_#F4E5A2_100%)] bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-extrabold font-[var(--font-gretaros)] drop-shadow-[0_6px_7px_rgba(0,0,0,0.25)] whitespace-nowrap inline-block px-6 md:px-8">
                  MEDIA PARTNERS
                </h3>
              </div>
              <Image
                src="/images/summit-star-2.png"
                alt=""
                width={100}
                height={100}
                className="w-16 md:w-24 lg:w-28"
              />
            </div>
            <p className="text-white/90 text-xl md:text-2xl font-[var(--font-made-tommy)]">
              To be announced
            </p>
          </div>
        </div>
      </section>
    </>
  );
}