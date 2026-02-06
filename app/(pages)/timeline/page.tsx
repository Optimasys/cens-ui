"use client";

import Image from "next/image";
import Link from "next/link";

interface TimelineSectionProps {
  title: string;
  date: string;
  description: string | string[];
  imageName: string;
  buttons?: Array<{ label: string; href: string }>;
}

function TimelineSection({
  title,
  date,
  description,
  imageName,
  buttons,
}: TimelineSectionProps) {
  return (
    <div className="relative mb-16 sm:mb-20 md:mb-24">
      {/* Card background */}
      <div
        className="
          absolute inset-0
          rounded-[75px]
          border border-[#E8C24A]
          bg-[linear-gradient(123deg,#03695E_-20.88%,#6EAF5F_66.12%)]
          opacity-45
          shadow-[4px_4px_5px_rgba(0,0,0,0.25)]
          backdrop-blur-[16px]
        "
      />

      <div className="relative z-10 px-6 py-8 sm:px-10 md:px-12 lg:px-14 md:py-10">
        {/* Header (centered) */}
        <div className="text-center mb-6 sm:mb-8">
          <h3
            className="
              text-2xl sm:text-3xl md:text-4xl text-white
              font-extrabold
              font-[var(--font-made-tommy)]
              tracking-[0.15em] sm:tracking-[0.25em]
              mb-2
              [filter:drop-shadow(0_4px_4px_rgba(0,0,0,0.25))]
            "
          >
            {title}
          </h3>

          <p
            className="
              text-base sm:text-lg md:text-xl text-white
              font-[var(--font-made-tommy)]
              font-light
              [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.25))]
              mb-4
            "
          >
            {date}
          </p>

          {/* Yellow divider (long & centered) */}
          <div className="mx-auto w-full max-w-[1000px] h-[7px] sm:h-[9px] bg-[#F4E5A2]" />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
          {/* Image */}
          <div className="relative w-full sm:w-64 md:w-80 h-40 sm:h-48 md:h-52 rounded-[32px] overflow-hidden flex-shrink-0 bg-transparent">
            <Image
              src={`/images/${imageName}`}
              alt={title}
              fill
              className="object-contain"
            />
          </div>

          {/* Description + Buttons */}
          <div className="flex-1 w-full">
            {Array.isArray(description) ? (
              <>
                {description.map((para, index) => (
                  <div key={index}>
                    <p
                      className="
                        text-base sm:text-lg md:text-xl text-white
                        font-[var(--font-made-tommy)]
                        font-light
                        leading-relaxed
                        text-justify
                        mb-4 md:mb-6
                        [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.25))]
                      "
                    >
                      {para}
                    </p>
                    {index < description.length - 1 && <div className="h-2" />}
                  </div>
                ))}
                <div className="mb-6 md:mb-8" />
              </>
            ) : (
              <p
                className="
                  text-base sm:text-lg md:text-xl text-white
                  font-[var(--font-made-tommy)]
                  font-light
                  leading-relaxed
                  text-justify
                  mb-6 md:mb-8
                  [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.25))]
                "
              >
                {description}
              </p>
            )}

            {buttons && (
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {buttons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className="
                    px-5 sm:px-7 py-2 sm:py-2.5
                    rounded-[100px]
                    text-white text-xs sm:text-sm
                    font-[var(--font-made-tommy)]
                    font-medium
                    shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                    transition hover:opacity-90

                    border-[2.5px] border-transparent
                    bg-[linear-gradient(180deg,#70B069_0%,#03695E_100%),linear-gradient(90deg,#6EAF5F_0%,#F4E5A2_100%)]
                    bg-origin-border
                    bg-clip-padding bg-clip-border
                  "
                >
                  {button.label}
                </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const timelineData: TimelineSectionProps[] = [
    {
      title: "Roadshow",
      date: "February – March 2026",
      description: [
        "A series of publication events conducted to promote our Competition.",
        "Campus Roadshow designed to reach a large national audience will visit many universities over Indonesia.",
      ],
      imageName: "timeline-roadshow.png",
    },
    {
      title: "Competition",
      date: "February – May 2026",
      description:
        "A series of competitions including Innovative Essay Competition and National Tender Competition based on The 23rd CENS UI theme.",
      imageName: "timeline-competition.png",
      buttons: [
        {
          label: "Innovative Essay Competition",
          href: "/competitions/innovative-essay",
        },
        {
          label: "National Tender Competition",
          href: "/competitions/national-tender",
        },
      ],
    },
    {
      title: "Workshop",
      date: "March 2026",
      description:
        "A collaborative training experience providing participants with practical skills and knowledge in software operation and is open to the public.",
      imageName: "timeline-workshop.png",
    },
    {
      title: "CENScussion",
      date: "April 2026",
      description:
        "CENScussion is a segment where top 10 delegates from Innovative Essay Competition participate in a discussion to come up with the solutions to the given case study. The five teams with the most outstanding performance will advance to the final presentation.",
      imageName: "timeline-bootcamp.png",
    },
    {
      title: "Welcoming Night",
      date: "10 May 2026",
      description:
        "A session involves the top 5 finalists from both competition categories as a form of appreciation and welcome reception upon their arrival.",
      imageName: "timeline-welcoming-night.png",
    },
    {
      title: "Final Presentation",
      date: "11 May 2026",
      description:
        "A designated session where the top 5 finalist teams showcase their projects to the panel of judges.",
      imageName: "timeline-final-presentation.png",
    },
    {
      title: "Company Visit",
      date: "12 May 2026",
      description:
        "An interactive experience allowing participants to enhance their knowledge through hands-on company observations.",
      imageName: "timeline-company-visit.png",
    },
    {
      title: "National Summit",
      date: "13 May 2026",
      description:
        "The culminating closing event of The 23rd CENS UI, gathering students, stakeholders, professionals, and NGOs within the civil and environmental field to share insights regarding the grand theme.",
      imageName: "timeline-national-summit.png",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/timeline-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(1deg,#E6E9D8_-54.65%,#219ACC_99.39%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(333deg,#219ACC_8.55%,#F4E5A2_71.14%,#219ACC_100%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <h1
          className="
            text-center
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold
            font-[var(--font-gretaros)]
            tracking-[10px]
            mb-14 sm:mb-20 md:mb-24
            bg-[radial-gradient(53.96%_79.16%_at_67.53%_15.27%,#FFFFFF_0%,#F4E5A2_100%)]
            bg-clip-text text-transparent
            [filter:drop-shadow(0px_3.9px_4.6px_rgba(0,0,0,0.25))]
          "
        >
          EVENT&apos;S TIMELINE
        </h1>

        <div className="space-y-16 sm:space-y-20 md:space-y-28">
          {timelineData.map((section) => (
            <TimelineSection key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}