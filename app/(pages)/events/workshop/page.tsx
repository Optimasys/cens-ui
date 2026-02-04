"use client";

import Image from 'next/image';

export default function Workshop() {
  return (
    <>
      {/* SECTION 1 - Introduction */}
      <div className="relative w-full h-[800px] overflow-hidden text-white font-[var(--font-gretaros)]">
        
        {/* Background */}
        <Image
          src="/images/bg-workshop.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        {/* TITLE */}
        <h1
          className="
            absolute
            top-[220px]
            left-[150px]
            text-[85px]
            leading-[1.05]
            font-bold
            tracking-wide
            bg-[linear-gradient(90deg,#FFFFFF_0%,#F4E5A2_70%)]
            bg-clip-text
            text-transparent
          "
        >
          WORKSHOP
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            absolute
            top-[330px]
            left-[155px]
            w-[720px]
            text-[26px]
            leading-relaxed
            font-[var(--font-made-tommy)]
            text-justify
            text-white/95
          "
        >
          Stay tune for our update on social media
        </p>

        {/* Social Media Links */}
        <div className="absolute top-[430px] left-[155px] flex flex-col gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/civil-engineering-national-summit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="inline-block bg-gradient-to-r from-[#03695E] to-[#92B286] hover:from-[#03695E]/90 hover:to-[#92B286]/90 transition-colors rounded-full px-8 py-3 backdrop-blur-sm"
              style={{
                border: '3px solid transparent',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                backgroundImage: 'linear-gradient(90deg, #03695E, #92B286), linear-gradient(90deg, #C6A97D, #E7D6C2)'
              }}
            >
              <p className="text-white font-medium text-[20px] font-[var(--font-made-tommy)]">
                LinkedIn : Civil Engineering National Summit (CENS UI)
              </p>
            </div>
          </a>
          
          {/* Tiktok and Instagram - Side by Side */}
          <div className="flex gap-4">
            <a
              href="https://www.tiktok.com/@cens_ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="inline-block bg-gradient-to-r from-[#03695E] to-[#92B286] hover:from-[#03695E]/90 hover:to-[#92B286]/90 transition-colors rounded-full px-8 py-3 backdrop-blur-sm"
                style={{
                  border: '3px solid transparent',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  backgroundImage: 'linear-gradient(90deg, #03695E, #92B286), linear-gradient(90deg, #C6A97D, #E7D6C2)'
                }}
              >
                <p className="text-white font-medium text-[20px] font-[var(--font-made-tommy)]">
                  Tiktok : @cens_ui
                </p>
              </div>
            </a>
            
            <a
              href="https://www.instagram.com/cens.ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="inline-block bg-gradient-to-r from-[#03695E] to-[#92B286] hover:from-[#03695E]/90 hover:to-[#92B286]/90 transition-colors rounded-full px-8 py-3 backdrop-blur-sm"
                style={{
                  border: '3px solid transparent',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  backgroundImage: 'linear-gradient(90deg, #03695E, #92B286), linear-gradient(90deg, #C6A97D, #E7D6C2)'
                }}
              >
                <p className="text-white font-medium text-[20px] font-[var(--font-made-tommy)]">
                  Instagram : @cens.ui
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <Image
          src="/images/image-workshop.png"
          alt=""
          width={460}
          height={460}
          className="
            absolute
            top-[220px]
            right-[70px]
            rounded-[44px]
            object-cover
            shadow-[0_16px_40px_rgba(0,0,0,0)]
          "
        />
      </div>

      {/* SECTION 2 - Call to Action & Contact Person */}
      <div className="relative w-full h-[800px] overflow-hidden text-white font-[var(--font-gretaros)] py-16">
        
        {/* Background */}
        <Image
          src="/images/bg-workshop-2.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 
              className="
                text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px]
                font-[var(--font-gretaros)]
                font-extrabold
                leading-tight
                text-white
                mb-3
              "
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
            >
              BE PART OF THE COMPETITION
            </h2>
            <p 
              className="
                text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px]
                font-[var(--font-gretaros)]
                font-bold
                bg-[linear-gradient(90deg,#FFF6EE_40%,#F4E5A2_100%)]
                bg-clip-text
                text-transparent
              "
            >
              #YourCENSForward
            </p>
          </div>
        </div>
      </div>
    </>
  );
}