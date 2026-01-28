'use client';

import Link from 'next/link';
import Image from 'next/image';

interface TimelineSectionProps {
  title: string;
  date: string;
  description: string;
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
    <div className="relative mb-12">
      {/* Background card */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-700 to-neutral-500 rounded-[48px] shadow-lg border border-amber-300 backdrop-blur-[10px] opacity-75" />

      <div className="relative z-10 flex items-start gap-8 p-8">
        {/* Left: Image */}
        <div className="flex-shrink-0">
          <div className="relative w-64 h-44 rounded-[32px] overflow-hidden">
            <Image
              src={`/images/${imageName}`}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-grow pt-4">
          <h3 className="text-4xl font-bold text-white mb-4 tracking-wider font-['MADE_TOMMY']">
            {title}
          </h3>
          <p className="text-xl text-white mb-4 font-['MADE_TOMMY']">{date}</p>
          <p className="text-xl text-white mb-6 text-justify font-['MADE_TOMMY'] leading-relaxed">
            {description}
          </p>

          {/* Buttons for competition section */}
          {buttons && (
            <div className="flex gap-4">
              {buttons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className="px-6 py-2 bg-gradient-to-b from-neutral-500 to-emerald-700 rounded-full border border-neutral-500 text-white text-sm font-bold hover:opacity-90 transition font-['MADE_TOMMY']"
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const timelineData: TimelineSectionProps[] = [
    {
      title: 'Roadshow',
      date: 'February - March 2026',
      description:
        'A series of publication events conducted to promote our Competition. Campus Roadshow designed to reach a large national audience will visit many universities over Indonesia.',
      imageName: 'timeline-roadshow.png',
    },
    {
      title: 'Competition',
      date: 'February - May 2026',
      description:
        'A series of competitions including Innovative Essay Competition and National Tender Competition based on The 23rd CENS UI theme.',
      imageName: 'timeline-competition.png',
      buttons: [
        {
          label: 'Innovative Essay Competition',
          href: '/competitions/innovative-essay',
        },
        {
          label: 'National Tender Competition',
          href: '/competitions/national-tender',
        },
      ],
    },
    {
      title: 'Workshop',
      date: 'March 2026',
      description:
        'A collaborative training experience providing participants with practical skills and knowledge in software operation and is open to the public.',
      imageName: 'timeline-workshop.png',
    },
    {
      title: 'Bootcamp',
      date: 'April 2026',
      description:
        'A selection process for the Top 20 IEC Finalists to provide insights regarding essay topics through case studies and 1-on-1 mentoring with partners.',
      imageName: 'timeline-bootcamp.png',
    },
    {
      title: 'Welcoming Night',
      date: '10 May 2026',
      description:
        'A session involves the top 5 finalists from both competition categories as a form of appreciation and welcome reception upon their arrival.',
      imageName: 'timeline-welcoming-night.png',
    },
    {
      title: 'Final Presentation',
      date: '11 May 2026',
      description:
        'A designated session where the top 5 finalist teams showcase their projects to the panel of judges.',
      imageName: 'timeline-final-presentation.png',
    },
    {
      title: 'Company Visit',
      date: '12 May 2026',
      description:
        'An interactive experience allowing participants to enhance their knowledge through hands-on company observations.',
      imageName: 'timeline-company-visit.png',
    },
    {
      title: 'National Summit',
      date: '13 May 2026',
      description:
        'The culminating closing event of The 23rd CENS UI, gathering students, stakeholders, professionals, and NGOs within the civil and environmental field to share insights regarding the grand theme.',
      imageName: 'timeline-national-summit.png',
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/timeline-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-l from-stone-200 to-sky-500 opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-sky-500 via-orange-200 to-sky-500 opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="
            text-center
            text-2xl md:text-4xl lg:text-5xl
            font-extrabold
            font-[var(--font-gretaros)]
            tracking-[10px]
            mb-3
            bg-[radial-gradient(53.96%_79.16%_at_67.53%_15.27%,#FFFFFF_0%,#F4E5A2_100%)]
            bg-clip-text text-transparent
            [filter:drop-shadow(0px_3.9px_4.6px_rgba(0,0,0,0.25))]
          ">
            EVENT&apos;S TIMELINE
          </h1>
        </div>

        {/* Timeline sections */}
        <div className="space-y-8">
          {timelineData.map((section) => (
            <TimelineSection key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}