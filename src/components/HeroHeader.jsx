import React from "react";

export default function HeroHeader({ onExploreClick, onShopClick }) {
  return (
    <div className="hero-header relative z-20 flex flex-col items-center text-center px-4 sm:px-6 pt-2 sm:pt-4 md:pt-6 pb-2 sm:pb-4">
      {/* Category Tag */}
      <span className="hero-tag inline-block text-[9.5px] sm:text-[11px] md:text-xs font-bold tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#141414] mb-2 sm:mb-3 md:mb-4">
        PREMIUM STREETWEAR COLLECTION
      </span>

      {/* Main Bold Headline */}
      <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[76px] font-black tracking-[-0.03em] leading-[1.08] sm:leading-[1.04] text-[#141414] font-['Syne',sans-serif] mb-2.5 sm:mb-3 md:mb-4">
        WEAR YOUR ATTITUDE.
      </h1>

      {/* Subtitle / Description */}
      <p className="hero-desc text-xs sm:text-sm md:text-base text-[#64605A] max-w-sm sm:max-w-md md:max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-7 font-normal px-2">
        Premium quality hoodies for those who move different.
        <br className="hidden sm:inline" /> Comfort meets style in every stitch.
      </p>

      {/* CTA Buttons */}
      <div className="hero-ctas flex flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-none">
        {/* Primary CTA */}
        <button
          type="button"
          onClick={onExploreClick}
          className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-[#141414] text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#252525] hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-lg cursor-pointer whitespace-nowrap"
        >
          <span>EXPLORE COLLECTION</span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Secondary CTA */}
        <button
          type="button"
          onClick={onShopClick}
          className="inline-flex items-center justify-center px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full border border-[#141414]/80 text-[#141414] text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#141414] hover:text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
