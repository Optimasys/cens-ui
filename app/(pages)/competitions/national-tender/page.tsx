// import { IECRegisterForm } from '@/components/IECRegisterForm';

// export default function NationalTender() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//       <h1 className="text-4xl font-bold mb-4">National Tender Competition</h1>

//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-4">About This Competition</h2>
//         <p className="text-gray-600 mb-6">
//           Competition description and details coming soon...
//         </p>
//       </div>

//       <IECRegisterForm competitionType="national-tender" />
//     </div>
//   );
// }

"use client";

import type { NextPage } from "next";
import { Span } from "next/dist/trace";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NTC: NextPage = () => {
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
      <div className="relative max-w-full h-[800px] overflow-hidden text-white font-[var(--font-gretaros)]">

  {/* {/ Background /} */}
  <Image
    src="/images/ntc-bg1.svg"
    alt=""
    fill
    priority
    className="object-cover"
  />

  {/* {/ WRAPPER /} */}
  <div className="absolute inset-0 flex items-start justify-start pl-[130px] pr-[100px] pt-[155px]">
    <div className="flex items-start gap-[90px] max-w-[1600px] w-full">

      {/* {/ TITLE /} */}
      <h1
        className="
          text-[85px]
          leading-[1.05]
          font-bold
          tracking-wide
          bg-[linear-gradient(90deg,#F4E5A2_0%,#FFFFFF_90%)]
          bg-clip-text
          text-transparent
          drop-shadow-[4px_6px_4px_rgba(0,0,0,0.4)]
          flex-shrink-0
          min-w-[480px]
        "
      >
        <span className="block">NATIONAL</span>
        <span className="block">TENDER</span>
        <span className="block">COMPETITION</span>
      </h1>

      {/* {/ DESCRIPTION */}
      <p
        className="
          flex-1
          max-w-[650px]
          text-[24px]
          leading-[1.6]
          font-normal
          text-justify
          text-white
          pt-[20px]
          drop-shadow-[2px_4px_2px_rgba(0,0,0,0.55)]
        "
      >
        A national level tender project competition for D3/D4/S1 students from
        across Indonesia. This competition is a place to train student's abilities
        in estimating building construction projects that also seeks innovation in
        construction costs and its method from the given study case.
      </p>
    </div>
  </div>

</div>

      {/* SECTION 2 - QUOTE */}
      <div className="relative max-w-full h-[950px] overflow-hidden text-white font-[var(--font-gretaros)]">
        {/* Background */}
        <Image
          src="/images/ntc-bg2.svg"
          alt=""
          fill
          className="object-cover"
        />

        <h2 className="
          absolute top-1/2 left-1/2
          transform -translate-x-1/2 -translate-y-1/2 -translate-y-[160px]
          text-center
          max-w-[1100px]
          w-full
          px-4
          text-[40px] sm:text-[50px] md:text-[60px] lg:text-[60px]
          font-bold
        ">
          "RESILIENT BRIDGE INFRASTRUCTURE FOR RESTORING CONNECTIVITY IN
           DISASTER-AFFECTED COMMUNITIES"
        </h2>
      </div>

      {/* SECTION 3 - Competition Schedule */}
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
              src="/images/timeline-competition-ntc.svg"
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
                    9-23 February 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Open Registration
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
                    4 March 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Case Release
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
                    4-8 March 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Aanwijzing
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
                    9 March-13 April 2026
                  </div>
                  <div 
                    className="text-[24px] sm:text-[32px] text-[#f4e5a2] font-['MADE_TOMMY'] font-medium leading-tight"
                    style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  >
                    Proposal Submission
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
                    27 April 2026
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

      {/* SECTION 4 - Prizes */}
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
              src="/images/prizes-ntc.svg"
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
                      Rp 7.000.000
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
                        Rp 5.000.000
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
                        Rp 3.000.000
                      </div>
                    </div>
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
                <p className="mt-6 text-[#ffffff] text-[13px] sm:text-[14px] font-[var(--font-made-tommy)] underline underline-offset-[3px]">
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
          src="/images/new-iec5-bg.png"
          alt=""
          fill
          className="object-cover"
        />

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
              href="https://drive.google.com/file/d/1l8wG49QX-nQMXFLCXClHvhGg1Olfosel/view"
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
                      Registration for the National Tender Competition and payment of the registration fee for <span className="font-bold">Early Bird</span> will be conducted from <span className="font-bold">February 9th, 2026 to February 12th, 2026.</span>
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
                      Registration for the National Tender Competition and payment of the registration fee for <span className="font-bold">Normal Registration</span> will be conducted from <span className="font-bold">February 13th to February 23th, 2026.</span>
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
                      Participants must register online and complete the registration form through www.cens-ui.id, including a scanned student ID and payment receipt.
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
                      Participants are required to pay the registration fee of <span className="font-bold">IDR 275,000 per team for Early Bird</span> or <span className="font-bold">IDR 300,000 per team for Normal Registration</span> to the following account:
                    </p>
                    <div className="flex flex-row gap-6 items-start">
                      {/* E-Wallet */}
                      <div className="flex-1">
                        <h4 className="font-extrabold text-white mb-1 text-[19px] font-[var(--font-made-tommy)]">E-Wallet (GoPay)</h4>
                        <p className="text-white text-[14px] font-[var(--font-made-tommy)]">
                          Account Name: Siti Hanifah Zadine<br/>
                          Phone Number: 087872885464
                        </p>
                      </div>
                      
                      {/* Bank Transfer */}
                      <div className="flex-1">
                        <h4 className="font-extrabold text-white mb-1 text-[19px] font-[var(--font-made-tommy)]">Bank Transfer (BCA)</h4>
                        <p className="text-white text-[14px] font-[var(--font-made-tommy)]">
                          Account Name: Siti Hanifah Zadine<br/>
                          Account Number: 5657031548
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 mt-1">
                    <div className="w-6 h-6 bg-[#6EAF5F] rounded-sm"></div>
                    <div className="w-1 h-full bg-radial from-[#03695E] to-[#6EAF5F] ml-[10px] mt-2"></div>
                  </div>
                  <div>
                    <p className="text-white text-[16px] sm:text-[19px] leading-relaxed font-[var(--font-made-tommy)] text-justify">
                      Participants will have the right to ask questions that are not related to the competition project documents during the <span className="font-bold">Aanwijzing</span> session on <span className="font-bold">March 4th–8th, 2026</span>.
                    </p>
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
                      Each person can only be in one team (are not allowed to be in two or more teams).
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
                      Participants must join a team of 3 members including one team leader from the same university.
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
                      Participants can be from any major. However, one of the members must come from civil engineering, environmental engineering, and/or architecture or planology majors.
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
                      Participants must be active undergraduate or diploma 3/4 (D3/D4) students.
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
                     Participants can inform our contact person, Rian +6281381200497 on WhatsApp.
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

      </div>

      {/* SECTION 6 - Call to Action (Register & Submission) */}
      <div className="relative w-full min-h-[700px] text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        
        {/* Background Image */}
        <Image
          src="/images/iec6-bg2.png"
          alt=""
          fill
          className="object-cover"
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
              onClick={() => router.push('/competitions/national-tender/register')}
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
              onClick={() => router.push('/competitions/national-tender/submission')}
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

export default NTC;