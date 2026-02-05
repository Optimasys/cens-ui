"use client";
import Image from "next/image";

export default function CenscussionHero() {
  return (
    <>
      {/* ================================================= */}
      {/* ================= HERO SECTION ================== */}
      {/* ================================================= */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">

        {/* Background HERO */}
        <Image
          src="/images/bg-censcussion.png"
          alt="background"
          fill
          priority
          className="object-cover"
        />

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col md:block">

          {/* TEXT */}
          <div className="text-white md:pr-[520px]">

            {/* TITLE */}
            <div className="relative w-fit">
              <h1
                className="
                  font-gretaros
                  text-[42px]
                  sm:text-[50px]
                  md:text-[100px]
                  leading-none
                  font-extrabold
                  bg-gradient-to-r
                  from-white
                  to-[#F4E5A2]
                  bg-clip-text
                  text-transparent
                  drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]
                "
              >
                CENSCUSSION
              </h1>

              <Image
                src="/images/censcussion-star.png"
                alt="star"
                width={110}
                height={110}
                className="absolute -top-4 -right-10 md:-top-6 md:-right-16 pointer-events-none"
              />
            </div>

            {/* PARAGRAPH */}
            <p
              className="
                font-tommy
                mt-8
                text-[16px]
                sm:text-[20px]
                md:text-[26px]
                leading-[1.7]
                max-w-full
                md:max-w-[900px]
                drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]
              "
            >
              CENScussion is a segment where top 10 delegates from Innovative Essay
              Competition participate in a discussion to come up with the solutions to the
              given case study. The five teams with the most outstanding performance will
              advance to the final presentation.
            </p>
          </div>


          {/* IMAGE MOBILE */}
          <div className="mt-10 flex justify-center md:hidden">
            <div className="overflow-hidden shadow-2xl w-[85%]">
              <Image
                src="/images/censcussion-1.png"
                alt="discussion"
                width={420}
                height={300}
                className="object-cover w-full"
              />
            </div>
          </div>

          {/* IMAGE DESKTOP */}
          <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2">
            <div className="overflow-hidden shadow-2xl w-[420px]">
              <Image
                src="/images/censcussion-1.png"
                alt="discussion"
                width={420}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* SMOOTH FADE SECTION */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#2f7fa3]" />
      </section>



      {/* ================================================= */}
      {/* ================ SECOND SECTION ================= */}
      {/* ================================================= */}

      <section className="relative w-full py-32 overflow-hidden">

        {/* Background */}
        <Image
          src="/images/bg-cens2.png"
          alt="background2"
          fill
          className="object-cover"
        />

        {/* Blend transisi dari hero */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#2f7fa3] to-transparent z-[1]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT CARD */}
            <div className="relative rounded-[20px] p-10 md:p-12 text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] bg-gradient-to-br from-white/20 via-white/15 to-white/10 overflow-visible backdrop-blur-[1px]">
              {/* Green gradient overlay from top */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#03695E]/100 via-[#4A9A7E]/30 to-[#6EAF5F]/10 pointer-events-none rounded-[20px]" />
              
              <div className="relative z-10">
                {/* Box with gradient */}
                <div className="relative -ml-10 md:-ml-12 w-[85%] md:w-[75%] mb-10 px-6 py-3 shadow-xl bg-gradient-to-r from-[#6EAF5F] via-[#398C5F] to-[#03695E] flex items-center justify-center">
                  <h3 className="font-extrabold text-xl md:text-2xl">Who can participate</h3>
                  {/* Star */}
                  <Image
                    src="/images/censcussion-star.png"
                    alt="star"
                    width={40}
                    height={40}
                    className="absolute -top-2 -right-6 pointer-events-none opacity-90 drop-shadow-lg"
                  />
                </div>

                <p className="text-xl md:text-2xl leading-relaxed font-normal drop-shadow-md">
                  The top 20 finalists of Innovative Essay Competition (IEC).
                </p>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="relative rounded-[20px] p-10 md:p-12 text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] md:mt-16 bg-gradient-to-br from-white/20 via-white/15 to-white/10 overflow-visible backdrop-blur-[1px]">
              {/* Green gradient overlay from top */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#03695E]/100 via-[#4A9A7E]/30 to-[#6EAF5F]/10 pointer-events-none rounded-[20px]" />
              
              <div className="relative z-10">
                {/* Box with gradient */}
                <div className="relative -ml-10 md:-ml-12 w-[85%] md:w-[75%] mb-10 px-6 py-3 shadow-xl bg-gradient-to-r from-[#6EAF5F] via-[#398C5F] to-[#03695E] flex items-center justify-center">
                  <h3 className="font-extrabold text-xl md:text-2xl">Date and Location</h3>
                  {/* Star */}
                  <Image
                    src="/images/censcussion-star.png"
                    alt="star"
                    width={40}
                    height={40}
                    className="absolute -top-2 -right-6 pointer-events-none opacity-90 drop-shadow-lg"
                  />
                </div>

                <div className="space-y-3 text-xl md:text-2xl font-normal drop-shadow-md">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/schedule-icon.png"
                      alt="calendar"
                      width={40}
                      height={40}
                      className="flex-shrink-0"
                    />
                    <p className="leading-[40px]">18 April 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/location-icon.png"
                      alt="location"
                      width={40}
                      height={40}
                      className="flex-shrink-0"
                    />
                    <p className="leading-[40px]">Zoom</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SMOOTH FADE SECTION */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#6BB5B5]" />
      </section>



      {/* ================================================= */}
      {/* ================= CTA SECTION =================== */}
      {/* ================================================= */}

      <section className="relative w-full py-32 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/bg-cens3.png"
          alt="background3"
          fill
          className="object-cover"
        />

        {/* Blend transisi dari section sebelumnya - warna hijau */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#6BB5B5] to-transparent z-[1]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          
          {/* CTA TITLE */}
          <h2 className="text-white font-gretaros text-[40px] md:text-[60px] lg:text-[70px] font-extrabold leading-tight mb-6 drop-shadow-xl">
            BE PART OF THE COMPETITION
          </h2>

          {/* HASHTAG */}
          <p className="text-transparent bg-gradient-to-r from-[#FFF6EE] to-[#F4E5A2] bg-clip-text font-tommy text-[32px] md:text-[48px] lg:text-[56px] font-bold mb-20 drop-shadow-lg">
            #YourCENSForward
          </p>

          {/* CONTACT PERSON */}
          <div className="text-white mt-70">
            <h3 className="text-[28px] md:text-[36px] font-bold mb-4 drop-shadow-md">
              Contact Person
            </h3>
            <p className="text-[22px] md:text-[28px] font-semibold mb-2">
              Ridwan Azhar Keanhu
            </p>
            <p className="text-[20px] md:text-[24px] font-medium">
              081295682771
            </p>
          </div>

        </div>
      </section>

    </>
  );
}