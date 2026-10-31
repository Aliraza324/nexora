import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import comfortModelImg from "../assets/Gemini_Generated_Image_6itaie6itaie6ita.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NextGenerationComfort() {
  const sectionRef = useRef(null);

  // Smooth entrance animation on scroll
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".comfort-tag", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".comfort-title",
          {
            y: 35,
            opacity: 0,
            duration: 1.0,
          },
          "-=0.6"
        )
        .from(
          ".comfort-desc",
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          ".comfort-btn-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.7"
        )
        .from(
          ".comfort-image-card",
          {
            y: 35,
            opacity: 0,
            scale: 0.98,
            duration: 1.1,
          },
          "-=0.8"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-20 bg-[#ECE7DE] text-[#141414] overflow-hidden border-t border-[#DDD6C8]"
    >
      {/* 
        =============================================================
        MAIN 2-COLUMN LAYOUT (EXACT MATCH WITH USER'S DESIGN)
        =============================================================
      */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN: OUR STORY + Heading + Body + LEARN MORE Button */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Top Label */}
          <span className="comfort-tag block text-xs sm:text-[13px] font-bold tracking-[0.24em] text-[#141414] uppercase mb-3 sm:mb-4 select-none">
            OUR STORY
          </span>

          {/* Bold Display Heading */}
          <h2 className="comfort-title font-sans font-black text-[#141414] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[58px] tracking-[-0.03em] leading-[1.02] uppercase select-none">
            <span className="block">THE NEXT</span>
            <span className="block">GENERATION</span>
            <span className="block whitespace-nowrap">OF COMFORT</span>
          </h2>

          {/* Editorial Body Text */}
          <p className="comfort-desc text-xs sm:text-sm md:text-[15px] lg:text-[16px] text-[#2A2A2A] leading-relaxed max-w-lg font-normal mt-5 sm:mt-6 tracking-normal">
            NEXORA defines a new standard where premium materiality meets
            unconventional silhouettes. Our philosophy is rooted in the
            architecture of movement, creating foundational pieces for the
            modern wanderer. We don't just dress the body; we craft the
            atmosphere. Explore the art of ease.
          </p>

          {/* Capsule Button: LEARN MORE -> */}
          <div className="comfort-btn-wrap mt-6 sm:mt-8">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>LEARN MORE</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Rounded Editorial Image Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="comfort-image-card relative w-full max-w-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#DDD6C8]/60 bg-[#D8D2C6]">
            <img
              src={comfortModelImg}
              alt="NEXORA — Our Story & The Next Generation of Comfort"
              className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-102"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* 
        =============================================================
        BOTTOM SUBTLE BACKGROUND WATERMARK
        =============================================================
      */}
      <div className="absolute -bottom-8 sm:-bottom-14 left-0 right-0 flex justify-center pointer-events-none select-none opacity-[0.038] overflow-hidden">
        <span className="text-[22vw] font-black font-sans tracking-[-0.04em] text-[#141414] whitespace-nowrap">
          NEXORA
        </span>
      </div>
    </section>
  );
}
