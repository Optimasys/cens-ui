"use client";

import type { NextPage } from "next";
import { Span } from "next/dist/trace";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const IEC: NextPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<1 | 2>(1);

  const openModal = (theme: 1 | 2) => {
    setSelectedTheme(theme);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      {/* SECTION 1 - Introduction */}
      <div className="relative w-full h-[800px] overflow-hidden text-white font-[var(--font-gretaros)]">
        
        {/* Background */}
        <Image
          src="/images/iec-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(230,233,216,0.65)_2%,rgba(33,154,204,0.8)_65%,rgba(3,105,94,0.8)_100%)]
          "
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
          <span className="block">
            INNOVATIVE ESSAY
          </span>

          <span className="flex items-center gap-3">
            COMPETITION
            <Image
              src="/images/group-icon.png"
              alt=""
              width={120}
              height={100}
              className="-translate-y-5 -translate-x-16"
            />
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            absolute
            top-[430px]
            left-[155px]
            w-[720px]
            text-[26px]
            leading-relaxed
            font-[var(--font-made-tommy)]
            text-justify
            text-white/95
          "
        >
          The Innovative Essay Competition (IEC) is an essay competition for
          undergraduate students that aims to encourage innovative ideas in
          developing resilient infrastructure for disaster mitigation and
          post-disaster recovery in vulnerable communities, based on a scientific
          and evidence-based approach.
        </p>

        {/* RIGHT IMAGE */}
        <Image
          src="/images/iec-image.png"
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

      {/* SECTION 2 - Competition Schedule */}
      <div className="relative w-full h-[800px] text-white overflow-hidden py-12 sm:py-16 lg:py-20">
        
        {/* Single Background Image */}
        <Image
          src="/images/iec2-bg.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(256.92deg,#60ab72,rgba(33,154,204,0.8)_52.75%,#adccb0_97.36%)]
            opacity-95
          "
        />

        {/* Decorative Icon - Bottom Left */}
        <div className="absolute bottom-1 left- z-10">
          <Image
            src="/images/icon-iec2.png"
            alt=""
            width={280}
            height={80}
            className="w-[200px] sm:w-[240px] lg:w-[280px] h-auto opacity-70"
          />
        </div>

        {/* Content Container */}
          
        {/* Header Section - Arrow + Title in one row */}
        <div className="bg-gradient-to-r from-[#03695E]/70 to-[#2C5A5A]/0 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-8 mb-12 sm:mb-16 flex items-center justify-center gap-3 sm:gap-6">
          {/* Arrow Logo */}
          <Image 
            src="/images/arrow.png"
            alt="Logo"
            width={120}
            height={42}
            className="w-[60px] sm:w-[80px] lg:w-[120px] h-auto flex-shrink-0"
          />
          
          {/* Title */}
          <h2 
            className="
              text-[32px] sm:text-[48px] md:text-[60px] lg:text-[80px]
              font-[var(--font-gretaros)]
              font-extrabold
              text-white
              leading-tight
              tracking-wide
            "
            style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
          >
            COMPETITION SCHEDULE
          </h2>
        </div>

        {/* Timeline Image - Desktop Only */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex justify-center items-center mb-12">
            <Image
              src="/images/timeline-competition-iec.png"
              alt="Competition Timeline"
              width={1500}
              height={500}
              className="w-full max-w-full h-auto"
            />
          </div>

          {/* Mobile/Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-6 sm:space-y-8 max-w-2xl mx-auto">
            
            {/* Open Registration */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(3, 105, 94, 0.3) 48.31%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    9 February-13 March 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Open Registration &<br/>Essay Submission
                  </div>
                </div>
              </div>
            </div>

            {/* Top 20 Announcement */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(3, 105, 94, 0.3) 48.31%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    13 April 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Top 10<br/>Announcement
                  </div>
                </div>
              </div>
            </div>

            {/* Bootcamp */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(44, 113, 94, 0.21) 25.96%, rgba(3, 105, 94, 0.3) 48.31%, rgba(26, 110, 94, 0.25) 66.83%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    18 April 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    CENScussion
                  </div>
                </div>
              </div>
            </div>

            {/* Top 5 Announcement */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(3, 105, 94, 0.3) 48.31%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    20 April 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Top 5<br/>Announcement
                  </div>
                </div>
              </div>
            </div>

            {/* Infographic Submission */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(44, 113, 94, 0.21) 25.96%, rgba(3, 105, 94, 0.3) 48.31%, rgba(26, 110, 94, 0.25) 66.83%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    21-28 April 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Infographic<br/>Submission
                  </div>
                </div>
              </div>
            </div>

            {/* Final Presentation */}
            <div className="w-full">
              <div 
                className="relative px-6 py-6 sm:px-8 sm:py-8 rounded-[60px] sm:rounded-[80px]"
                style={{
                  boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(7px)',
                  background: 'linear-gradient(90deg, rgba(142, 133, 94, 0), rgba(3, 105, 94, 0.3) 48.31%, rgba(143, 135, 95, 0)) padding-box, linear-gradient(90deg, #c6a97d, #e7d6c2) border-box',
                  border: '3px solid transparent'
                }}
              >
                <div className="text-center">
                  <div className="text-[18px] sm:text-[22px] text-white font-medium mb-2">
                    11 May 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Final Presentation
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 3 - Prizes */}
      <div className="relative w-full h-[800px] text-white overflow-hidden py-12 sm:py-16 lg:py-20">
        
        {/* Background Image */}
        <Image
          src="/images/iec3-bg.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(256.92deg,#60ab72,rgba(33,154,204,0.8)_52.75%,#adccb0_97.36%)]
            opacity-95
          "
        />
          {/* Decorative Icon - Top Left */}
        <div className="absolute top-0 left-0 z-10">
          <Image
            src="/images/icon-iec3,1.png"
            alt=""
            width={280}
            height={40}
            className="w-[200px] sm:w-[240px] lg:w-[280px] h-auto opacity-70"
          />
        </div>
          {/* Decorative Icon - Bottom Right */}
        <div className="absolute bottom-8 right-1 z-10">
          <Image
            src="/images/icon-iec3.png"
            alt=""
            width={280}
            height={80}
            className="w-[200px] sm:w-[240px] lg:w-[180px] h-auto opacity-70"
          />
        </div>

          {/* Header Section - Arrow + Title in one row */}
          <div className="bg-gradient-to-l from-[#03695E]/70 to-[#2C5A5A]/0 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-8 mb-12 sm:mb-16 flex items-center justify-center gap-3 sm:gap-6">
            
            {/* Title */}
            <h2 
              className="
              text-[32px] sm:text-[48px] md:text-[60px] lg:text-[80px]
              font-[var(--font-gretaros)]
              font-extrabold
              leading-tight
              tracking-wide
              bg-[linear-gradient(90deg,#FFFFFF_30%,#F4E5A2_100%)]
              bg-clip-text
              text-transparent
            "
            style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0)' }}
            >
              PRIZES
            </h2>

            {/* Arrow Logo - Now on the right */}
            <Image 
              src="/images/arrow-left.png"
              alt="Logo"
              width={120}
              height={42}
              className="w-[60px] sm:w-[80px] lg:w-[120px] h-auto flex-shrink-0"
            />
            
          </div>

        {/* Prizes Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop: Prize Image */}
          <div className="hidden lg:flex justify-center items-center">
            <Image
              src="/images/prize-iec.png"
              alt="Competition Prizes"
              width={1200}
              height={400}
              className="w-full max-w-5xl h-auto"
            />
          </div>

          {/* Mobile/Tablet: Prize Cards */}
          <div className="lg:hidden flex flex-col items-center gap-8 sm:gap-10">
            
            {/* 1st Place */}
            <div className="relative w-full max-w-md">
              <div className="relative bg-gradient-to-br from-[#3a8f7f] to-[#82b896] rounded-3xl p-8 transform hover:scale-105 transition-transform duration-300">
                {/* Decorative Lines */}
                <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-r from-transparent to-[#f4e5a2]" 
                     style={{ 
                       clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                       transform: 'translateY(-8px) rotate(45deg) translateX(20px)'
                     }}
                />
                
                <div className="text-center">
                  <div className="text-6xl sm:text-7xl font-bold text-white mb-2">
                    1<sup className="text-4xl">st</sup>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    PLACE
                  </div>
                  <div className="bg-[#2a6f62] py-3 px-6 rounded-2xl">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      Rp 5.000.000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd and 3rd Place - Side by Side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
              
              {/* 2nd Place */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-[#3a8f7f] to-[#82b896] rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
                  {/* Decorative Lines */}
                  <div className="absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-transparent to-[#f4e5a2]" 
                       style={{ 
                         clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                         transform: 'translateY(-8px) rotate(45deg) translateX(-10px)'
                       }}
                  />
                  
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                      2<sup className="text-3xl">nd</sup>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      PLACE
                    </div>
                    <div className="bg-[#2a6f62] py-2 px-4 rounded-2xl">
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        Rp 3.000.000
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-[#3a8f7f] to-[#82b896] rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
                  {/* Decorative Lines */}
                  <div className="absolute top-0 right-0 w-20 h-1 bg-gradient-to-r from-transparent to-[#f4e5a2]" 
                       style={{ 
                         clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                         transform: 'translateY(-8px) rotate(45deg) translateX(10px)'
                       }}
                  />
                  
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                      3<sup className="text-3xl">rd</sup>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      PLACE
                    </div>
                    <div className="bg-[#2a6f62] py-2 px-4 rounded-2xl">
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        Rp 2.000.000
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SECTION 4 - Sub Theme */}
      <div className="relative w-full min-h-[800px] text-white overflow-hidden py-12 sm:py-16 lg:py-20">
        
        {/* Background Image */}
        <Image
          src="/images/iec4-bg.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay - Blue and White dominant */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(123,197,197,0.7)_0%,rgba(91,168,166,0.5)_150%,rgba(230,233,216,0.75)_150%)]
          "
        />

        {/* Header Section - Title only (no arrow) */}
        <div className="bg-[#5BA8A6]/0 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-8 mb-12 sm:mb-16 flex items-center justify-center">
          
          {/* Title */}
          <h2 
            className="
              text-[32px] sm:text-[48px] md:text-[60px] lg:text-[80px]
              font-[var(--font-gretaros)]
              font-extrabold
              leading-tight
              tracking-wide
              bg-[linear-gradient(90deg,#FFFFFF_30%,#F4E5A2_100%)]
              bg-clip-text
              text-transparent
            "
            style={{ textShadow: '0px 4px 8px rgba(0, 0, 0, 0)' }}
          >
            SUB THEME
          </h2>
          
        </div>

        {/* Sub Theme Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Two Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1 - Development of Resilient Infrastructure */}
            <div className="relative group">
              <div className="relative bg-[#2a6f62] rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02]">
                
                {/* Image */}
                <div className="relative w-full h-[280px] sm:h-[320px]">
                  <Image
                    src="/images/learn-more1.png"
                    alt="Development of Resilient Infrastructure"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10">
                  <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-white text-center mb-6 leading-tight">
                    Development of Resilient Infrastructure for Disaster Prevention in Vulnerable Area
                  </h3>

                  {/* Learn More Button */}
                  <div className="flex justify-center">
                    <button 
                      onClick={() => openModal(1)}
                      className="bg-gradient-to-b from-[#6EAF5F] to-[#03695E] hover:from-[#4a9694] hover:to-[#3a7c7c] text-white font-bold py-3 px-8 rounded-full text-[18px] transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Learn More
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2 - Reconstruction of Disaster Affected Communities */}
            <div className="relative group">
              <div className="relative bg-[#2a6f62] rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02]">
                
                {/* Image */}
                <div className="relative w-full h-[280px] sm:h-[320px]">
                  <Image
                    src="/images/learn-more2.png"
                    alt="Reconstruction of Disaster Affected Communities"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10">
                  <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-white text-center mb-6 leading-tight">
                    Reconstruction of Disaster Affected Communities Infrastructure for the Short and Long-Term Resiliency
                  </h3>

                  {/* Learn More Button */}
                  <div className="flex justify-center">
                    <button 
                      onClick={() => openModal(2)}
                      className="bg-gradient-to-b from-[#6EAF5F] to-[#03695E] hover:from-[#4a9694] hover:to-[#3a7c7c] hover:bg-[#4a9694] text-white font-bold py-3 px-8 rounded-full text-[18px] transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Learn More
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modal - Question to Consider */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-[#03695E] to-[#6EAF5F] rounded-[32px] shadow-2xl">
            
            {/* Background Image - Different for each theme */}
            <div className="absolute inset-0">
              <Image
                src={selectedTheme === 1 ? "/images/Chamber_01-bg.png" : "/images/Chamber_2-bg.png"}
                alt=""
                fill
                className="object-cover"
              />
              {/* Gradient Overlay - Updated colors */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,105,94,1)_0%,rgba(110,175,95,0.68)_68%,rgba(110,175,95,0.3)_100%)]" />
            </div>

            {/* Content Wrapper - Scrollable */}
            <div className="relative max-h-[90vh] overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="sticky top-6 right-6 ml-auto mr-6 mt-6 z-10 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="p-8 sm:p-12 lg:p-16 pt-4">
                
                {/* Title */}
                <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-[var(--font-gretaros)] font-extrabold text-white mb-1">
                  QUESTION TO <span className="
                    font-[var(--font-gretaros)]
                    font-extrabold
                    leading-tight
                    tracking-wide
                    bg-[linear-gradient(90deg,#FFFFFF_5%,#F4E5A2_100%)]
                    bg-clip-text
                    text-transparent">CONSIDER</span>
                </h2>

                {/* Theme Number and Title */}
                <div className="mb-1">
                  <div className="flex items-start gap-4 mb-1">
                    <span className="text-[60px] sm:text-[80px] font-[var(--font-gretaros)] font-bold text-[#f4e5a2] leading-none">
                      {selectedTheme === 1 ? "01" : "02"}
                    </span>
                    <h3 className="text-[20px] sm:text-[24px] lg:text-[28px] font-[var(--font-made-tommy)] text-[#f4e5a2] mt-3 leading-tight">
                      {selectedTheme === 1 
                        ? "Development of Resilient Infrastructure for Disaster Prevention in Vulnerable Area"
                        : "Reconstruction of Disaster Affected Communities Infrastructure for the Short and Long-Term Resiliency"
                      }
                    </h3>
                  </div>
                </div>

                {/* Case Study Box */}
                <div className="my-4 mx-auto max-w-[90%] sm:max-w-[80%]">
                  <div
                    className="rounded-full px-6 py-2 text-center"
                    style={{
                      background: 'linear-gradient(90deg, rgba(3, 105, 94, 0.55) 0%, rgba(110, 175, 95, 0.5) 50%, rgba(255, 225, 129, 0.45) 100%)',
                    }}
                  >
                    <p className="text-[#f4e5a2] text-[15px] sm:text-[17px] lg:text-[18px] font-bold font-[var(--font-made-tommy)] text-center">
                      {selectedTheme === 1
                        ? "Case Study: Disaster Prevention in Coastal Communities of North Jakarta"
                        : "Case Study: Reconstruction of Infrastructure in Disaster-Affected Areas of Central Java"
                      }
                    </p>
                  </div>
                </div>

                {/* Questions List */}
                <ul className="space-y-4 text-white text-[18px] sm:text-[20px] lg:text-[22px] leading-relaxed">
                  {selectedTheme === 1 ? (
                    <>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>What type of solution in the existing or soon to be built infrastructures is going to be implemented to prevent further disasters, primarily flooding? </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1">•</span>
                        <span>How can we implement the resilience and sustainability aspect in tackling the problems (e.g., nature integration, less waste, etc.)?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>How can we increase community engagement in disaster prevention?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>What are the stakeholders involved and how will they coordinate in disaster prevention?</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>Which types of infrastructure should be prioritized to meet the most urgent needs of disaster affected communities?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>What reconstruction strategies can effectively involve communities while meeting technical and safety standards?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>How can reconstruction be carried out at low cost while ensuring long term resiliency?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#f4e5a2] mt-1 font-[var(--font-made-tommy)]">•</span>
                        <span>What design measures can help rebuild infrastructure better withstand future disasters?</span>
                      </li>
                    </>
                  )}
                </ul>

                {/* Footnote */}
                <p className="mt-6 text-[#f4e5a2] text-[13px] sm:text-[14px] italic font-[var(--font-made-tommy)] underline underline-offset-[3px]">
                  *A more detailed information will be provided in the guidebook
                </p>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECTION 5 - Participation Guide */}
      <div className="relative w-full min-h-[900px] text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        
        {/* Background Image */}
        <Image
          src="/images/iec5-bg.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(91,168,166,1)_28%,rgba(110,175,95,0.5)_50%,rgba(110,175,95,1)_100%)]
          "
        />

        {/* Decorative Icon - Top Right (Zigzag) */}
        <div className="absolute top-0 right-0 z-10">
          <Image
            src="/images/icon-iec5-1.png"
            alt=""
            width={420}
            height={160}
            className="w-[280px] sm:w-[360px] lg:w-[420px] h-auto opacity-100"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title */}
          <h2 
            className="
              text-[36px] sm:text-[52px] md:text-[64px] lg:text-[80px]
              font-[var(--font-gretaros)]
              font-extrabold
              text-center
              mb-8
              leading-tight
              tracking-wide
              bg-[linear-gradient(90deg,#FFFFFF_30%,#F4E5A2_100%)]
              bg-clip-text
              text-transparent
            "
          >
            <span >PARTICIPATION </span>
            <span >GUIDE</span>
          </h2>
          
          {/* Guidebook Button */}
          <div className="flex mb-12">
            <a 
              href="https://drive.google.com/drive/folders/1BdF5RLX2vk7P4bujBfCji1ood-N5wr3I?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-4
                bg-gradient-to-b from-[#70B069] to-[#03695E]
                hover:from-[#5fa858] hover:to-[#025a51]
                text-white font-bold
                py-5 px-16
                rounded-full
                text-[24px] sm:text-[28px] lg:text-[32px]
                transition-all duration-300
                hover:scale-105
                shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                border-[3px] border-[#f4e5a2]
              "
            >
              <span className="font-[var(--font-gretaros)] tracking-wider">GUIDEBOOK</span>
              <svg 
                className="w-7 h-7 sm:w-8 sm:h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                />
              </svg>
            </a>
          </div>

          {/* Main Content - How to Register & Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 max-w-6xl mx-auto">
            
            {/* Left Side - How to Register */}
            <div>
              <h3 className="text-[40px] sm:text-[50px] font-[var(--font-gretaros)] font-bold text-[#F4E5A2] mb-8">
                How to Register
              </h3>
              
              <div className="space-y-6">
                {/* Timeline Item 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Registration for the Innovative Essay Competition and payment of the registration fee for <span className="font-bold">Early Bird</span> will be conducted from <span className="font-bold">February 9th to February 12th, 2026.</span>
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Registration for the Innovative Essay Competition and payment of the registration fee for <span className="font-bold">Normal Registration</span> will be conducted from <span className="font-bold">February 13th to February 23th, 2026.</span>
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants are required to register online by completing the registration form through (www.cens-ui.id) which includes uploading <span className="font-bold">a scanned student ID and proof of payment.</span>
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify mb-4">
                      Participants must submit their essay and pay the registration fee of <span className="font-bold">IDR 75,000 per team (early bird)</span> or <span className="font-bold">IDR 100,000 per team (Normal Registration)</span>. If the essay passes the Top 10 Selection, participants must pay an <span className="font-bold"> additional CENScussion registration fee of IDR 80,000</span> per team. Payments may be made via E-Wallet (GoPay) or bank transfer to the following account:
                    </p>
                    <div className="flex flex-row gap-12 items-start">
                      {/* E-Wallet */}
                      <div className="flex-1">
                        <h4 className="font-extrabold text-white mb-1 text-[19px] font-[var(--font-made-tommy)]">E-Wallet (GoPay)</h4>
                        <p className="text-white text-[19px] font-[var(--font-made-tommy)]">
                          Account Name: <br/>Siti Hanifah Zadine<br/>
                          Phone Number: 087872885464
                        </p>
                      </div>
                      
                      {/* Bank Transfer */}
                      <div className="flex-1">
                        <h4 className="font-extrabold text-white mb-1 text-[19px] font-[var(--font-made-tommy)]">Bank Transfer (BCA)</h4>
                        <p className="text-white text-[19px] font-[var(--font-made-tommy)]">
                          Account Name: <br/>Siti Hanifah Zadine<br/>
                          Account Number: 5657031548
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Requirements */}
            <div>
              <h3 className="text-[32px] sm:text-[50px] font-[var(--font-gretaros)] font-bold text-[#F4E5A2] mb-8">
                Requirements
              </h3>
              
              <div className="space-y-6">
                {/* Requirement Item 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants must be active undergraduate or Diploma 3/4 (D3/D4) students.
                    </p>
                  </div>
                </div>

                {/* Requirement Item 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Each participant is only allowed to join one team.
                    </p>
                  </div>
                </div>

                {/* Requirement Item 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Each team must consist of three members, including one team leader, all from the same university.
                    </p>
                  </div>
                </div>

                {/* Requirement Item 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants may come from any major; however, at least one team member must be from Civil Engineering, Environmental Engineering, Architecture, or Planology.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* FAQ Section */}
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Side - FAQ Title */}
              <div className="text-center lg:text-left">
                <h3 
                  className="
                    text-[36px] sm:text-[48px] lg:text-[64px] xl:text-[72px]
                    font-[var(--font-gretaros)]
                    font-extrabold
                    text-white
                    leading-[1.1]
                    text-center
                  "
                  style={{ textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
                >
                  FREQUENTLY<br/>
                  ASKED<br/>
                  QUESTION
                </h3>
              </div>

              {/* Right Side - FAQ Card */}
              <div className="bg-gradient-to-t from-[#70B069] to-[#03695E] backdrop-blur-sm rounded-[40px] p-8 border-2 border-[#f4e5a2] max-w-3xl">
                <div className="space-y-1">
                
                  {/* FAQ 1 */}
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-[var(--font-made-tommy)] text-[17px] font-normal list-none py-4 text-justify">
                      <span className="pr-4 group-open:underline group-open:decoration-[#f4e5a2] group-open:underline-offset-[4px] group-open:decoration-2 transition-all duration-300">Who is eligible to compete?</span>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/50 rounded">
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <p className="pb-4 text-white/90 text-[15px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants can be from any major. However, one of the members must come from civil engineering, environmental engineering, architecture or planology majors. Also, participants must be active undergraduate or diploma (D3/D4) students.
                    </p>
                  </details>

                  {/* FAQ 2 */}
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-[var(--font-made-tommy)] text-[17px] font-normal list-none py-4 border-t border-white/20 text-justify">
                      <span className="pr-4 group-open:underline group-open:decoration-[#f4e5a2] group-open:underline-offset-[4px] group-open:decoration-2 transition-all duration-300">What should I do when I haven't reached my confirmation email, even though it's been more than 1x24 hours?</span>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/50 rounded">
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <p className="pb-4 text-white/90 text-[15px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                     Participants can inform out contact person, Rian +6281381200497 on WhatsApp.
                    </p>
                  </details>

                  {/* FAQ 3 */}
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-[var(--font-made-tommy)] text-[17px] font-normal list-none py-4 border-t border-white/20 text-justify">
                      <span className="pr-4 group-open:underline group-open:decoration-[#f4e5a2] group-open:underline-offset-[4px] group-open:decoration-2 transition-all duration-300">What should I do when I have sent the registration form with the wrong data?</span>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/50 rounded">
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <p className="pb-4 text-white/90 text-[15px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants can inform our contact person and send the correct data.
                    </p>
                  </details>

                  {/* FAQ 4 */}
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-[var(--font-made-tommy)] text-[17px] font-normal list-none py-4 border-t border-white/20 text-justify">
                      <span className="pr-4 group-open:underline group-open:decoration-[#f4e5a2] group-open:underline-offset-[4px] group-open:decoration-2 transition-all duration-300">What is Aanwijzing?</span>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/50 rounded">
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <p className="pb-4 text-white/90 text-[15px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Aanwijzing is a process to provide bidders with additional information about the project, clarify any uncertainties, and to ensure that bidders have a clear understanding of the project and the requirements.
                    </p>
                  </details>

                  {/* FAQ 5 */}
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-white font-[var(--font-made-tommy)] text-[17px] font-normal list-none py-4 border-t border-white/20 text-justify">
                      <span className="pr-4 group-open:underline group-open:decoration-[#f4e5a2] group-open:underline-offset-[4px] group-open:decoration-2 transition-all duration-300">Where will the final presentation take place?</span>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/50 rounded">
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <p className="pb-4 text-white/90 text-[15px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      The final presentation will be held on May 11th, 2026 at the Faculty of Engineering Universitas Indonesia.
                    </p>
                  </details>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Decorative Icon - Bottom (Dots) with Gradient */}
        <div className="absolute -bottom-10 -right-30 z-10">
          <div
            style={{
              background: 'linear-gradient(90deg, #6EAF5F 0%, #F4E5A2 48%, #63B4CF 100%)',
              WebkitMaskImage: 'url(/images/vector-iec5.png)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: '100%',
              maskImage: 'url(/images/vector-iec5.png)',
              maskRepeat: 'no-repeat',
              maskSize: '100%',
              opacity: 0.15,
            }}
            className="w-[280px] sm:w-[360px] lg:w-[1100px] h-auto"
          >
            <Image
              src="/images/vector-iec5.png"
              alt=""
              width={1100}
              height={900}
              className="w-[280px] sm:w-[360px] lg:w-[1100px] h-auto invisible"
            />
          </div>
        </div>

      </div>

      {/* SECTION 6 - Call to Action (Register & Submission) */}
      <div className="relative w-full min-h-[700px] text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        
        {/* Background Image */}
        <Image
          src="/images/iec6-bg.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(180deg,rgba(110,175,95,0.94)_0%,rgba(91,168,166,0.85)_50%,rgba(91,168,166,1)_100%)]"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              className="
                text-[36px] sm:text-[48px] md:text-[56px] lg:text-[72px]
                font-[var(--font-gretaros)]
                font-extrabold
                leading-tight
                mb-4
              "
              style={{ textShadow: '0px 4px 8px rgba(0, 0, 0, 0)' }}
            >
              <span className="text-white">BE PART OF THE COMPETITION</span>
              <br/>
              <span className="
                bg-[linear-gradient(90deg,#FFFFFF_20%,#F4E5A2_100%)]
                bg-clip-text
                text-transparent
              ">
                #YourCENSForward
              </span>
            </h2>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            
            {/* Register Now Button */}
            <button
              onClick={() => router.push('/competitions/innovative-essay/register')}
              className="
                w-full sm:w-auto
                bg-[#03695E]
                hover:bg-[#025a51]
                text-[#F4E5A2]
                font-bold
                py-6 px-12 sm:px-16 lg:px-20
                rounded-full
                text-[28px] sm:text-[32px] lg:text-[40px]
                font-[var(--font-gretaros)]
                transition-all duration-300
                hover:scale-105
                shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                border-[3px] border-[#f4e5a2]
                text-center
                tracking-wide
              "
            >
              REGISTER NOW
            </button>

            {/* Submission Button */}
            <button
              onClick={() => router.push('/competitions/innovative-essay/submission')}
              className="
                w-full sm:w-auto
                bg-[#03695E]
                hover:bg-[#025a51]
                text-[#F4E5A2]
                font-bold
                py-6 px-12 sm:px-16 lg:px-20
                rounded-full
                text-[28px] sm:text-[32px] lg:text-[40px]
                font-[var(--font-gretaros)]
                transition-all duration-300
                hover:scale-105
                shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                border-[3px] border-[#f4e5a2]
                text-center
                tracking-wide
              "
            >
              SUBMISSION
            </button>

          </div>

        </div>

      </div>

      {/* SECTION 7 - Contact */}
      <div className="relative w-full min-h-[170px] text-white overflow-hidden bg-gradient-to-t from-[#A6C6DB] to-[#5BA8A6]">

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Section */}
          <div className="relative">
            {/* Decorative Icon - Bottom Left */}
            <div className="absolute -left-38 top-6 ">
              <Image
                src="/images/iec6-image.png"
                alt=""
                width={280}
                height={80}
                className="w-[200px] sm:w-[240px] lg:w-[180px] h-auto opacity-70"
              />
            </div>

              
              {/* Contact Person Info */}
              <div className="text-center">
                <h3 className="text-white text-[24px] sm:text-[30px] font-bold mb-2 font-[var(--font-gretaros)]">
                  Contact Person
                </h3>
                <p className="text-white text-[20px] sm:text-[30px] font-medium mb-2 font-[var(--font-made-tommy)]">
                  Olyvia
                </p>
                <a 
                  href="https://wa.me/6288224221378"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-[18px] sm:text-[30px] font-[var(--font-made-tommy)] hover:text-white transition-colors duration-300 underline"
                >
                  https://wa.me/6288224221378
                </a>
              </div>

            </div>
          </div>

        </div>
    </>
    
  );
};

export default IEC;