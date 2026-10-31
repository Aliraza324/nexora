import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import bgBanner from "../assets/b9942af8-5bcc-417b-aac4-ebe3b1fc2287.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BuiltForTheUncommon({ onExplore }) {
  const sectionRef = useRef(null);

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
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".uncommon-bg", {
        scale: 1.05,
        duration: 1.4,
        ease: "power2.out",
        clearProps: "all",
      })
        .from(
          ".uncommon-title span",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            clearProps: "all",
          },
          "-=1.0"
        )
        .from(
          ".uncommon-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.6"
        )
        .from(
          ".uncommon-btn",
          {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="uncommon"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#121212] text-white min-h-[340px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[480px] flex items-center px-6 sm:px-12 md:px-16 lg:px-20"
    >
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgBanner}
          alt="Built For The Uncommon - NEXORA"
          className="uncommon-bg w-full h-full object-cover object-right md:object-center"
          loading="lazy"
        />
        {/* Subtle gradient to preserve text readability over the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent sm:via-black/20" />
      </div>

      {/* Left Side Content Only */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto py-12 sm:py-16 md:py-20">
        <div className="max-w-md sm:max-w-lg lg:max-w-xl flex flex-col items-start">
          {/* Main Title: 2 lines */}
          <h2 className="uncommon-title text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-black font-sans uppercase tracking-[-0.035em] leading-[0.96] text-white select-none">
            <span className="block">BUILT FOR</span>
            <span className="block mt-1 sm:mt-2">THE UNCOMMON</span>
          </h2>

          {/* Subtitle Description */}
          <p className="uncommon-desc text-xs sm:text-sm md:text-base text-white/80 font-normal mt-3 sm:mt-4 leading-relaxed max-w-sm select-none">
            Step into a world where comfort meets confidence.
          </p>

          {/* Capsule Button: EXPLORE MORE → */}
          <div className="uncommon-btn mt-5 sm:mt-7">
            <a
              href="#collections"
              onClick={onExplore}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/60 hover:border-white bg-transparent hover:bg-white text-white hover:text-[#121212] text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer select-none group"
            >
              <span>EXPLORE MORE</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

