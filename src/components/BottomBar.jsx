import React from "react";

export default function BottomBar({
  onPrev,
  onNext,
  currentSlide = 0,
  totalSlides = 6,
  onSelectSlide,
}) {
  const currentFormatted = String(currentSlide + 1).padStart(2, "0");
  const totalFormatted = String(totalSlides).padStart(2, "0");

  return (
    <div className="hero-bottom hidden sm:flex relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-2 pb-5 sm:pb-6 items-center justify-between text-[#141414] gap-2">
      {/* Left: Featured Collection */}
      <div className="flex flex-col items-start min-w-[120px] sm:min-w-0">
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#78746D] mb-0.5 sm:mb-1">
          FEATURED COLLECTION
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-wider uppercase text-[#141414] whitespace-nowrap">
            HOODIES & SWEATSHIRTS
          </span>
          <span className="hidden sm:inline-block w-6 md:w-8 h-[1.5px] bg-[#141414]" />
        </div>
      </div>

      {/* Center: Slide Dots & Hint */}
      <div className="flex flex-col items-center">
        {/* Slide Dots for the Hoodies */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSlide?.(idx)}
              aria-label={`Go to hoodie ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? "w-5 sm:w-7 h-1.5 bg-[#141414]"
                  : "w-1.5 h-1.5 bg-[#141414]/25 hover:bg-[#141414]/60"
              }`}
            />
          ))}
        </div>

        <span className="hidden sm:inline-block text-[8.5px] md:text-[10px] font-semibold tracking-[0.25em] md:tracking-[0.28em] uppercase text-[#6C6760]">
          DRAG • SWIPE • KEYBOARD ARROWS
        </span>
      </div>

      {/* Right: Slide Pagination & Arrow Controls */}
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
        {/* Slide Numbers */}
        <div className="text-xs sm:text-sm font-bold tracking-widest text-[#141414] whitespace-nowrap">
          <span>{currentFormatted}</span>
          <span className="mx-1 sm:mx-2 text-[#9A968F] font-normal">—</span>
          <span className="text-[#86827B]">{totalFormatted}</span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous hoodie"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#141414]/30 flex items-center justify-center text-[#141414] hover:border-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next hoodie"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#141414]/30 flex items-center justify-center text-[#141414] hover:border-[#141414] hover:bg-[#141414] hover:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
