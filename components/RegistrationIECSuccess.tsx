'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function RegistrationIECSuccess() {
  const router = useRouter();

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-8 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/images/bg-register.png)',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#219ACC] via-[#F4E5A2] to-[#219ACC] opacity-80 pointer-events-none" />
      
      {/* Success Card */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-[#E6E9D8] rounded-[40px] shadow-2xl p-12 lg:p-20 text-center">
          <h1 className="text-[48px] lg:text-[64px] font-bold text-[#0D6B6B] mb-8 font-[var(--font-gretaros)] leading-tight">
            Registration<br/>Successful
          </h1>
          
          <button
            onClick={() => router.push('/competitions/innovative-essay')}
            className="text-[#0D6B6B] text-[18px] lg:text-[20px] font-semibold underline hover:text-[#5BA8A6] transition-colors font-[var(--font-gretaros)]"
          >
            Back to Competition Page
          </button>
        </div>

        {/* Decorative Elements - Optional mountains */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between pointer-events-none opacity-70">
          <div className="w-32 h-32 lg:w-48 lg:h-48">
            {/* Add mountain SVG or image here if needed */}
          </div>
          <div className="w-32 h-32 lg:w-48 lg:h-48">
            {/* Add mountain SVG or image here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}