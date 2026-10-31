import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Diamond, Feather, Layers } from "lucide-react";
import fabricImage from "../assets/kj8t20_optimized.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIGHLIGHTS = [
  {
    id: "premium-cotton",
    icon: Diamond,
    line1: "Premium",
    line2: "Cotton Blend",
  },
  {
    id: "ultra-soft",
    icon: Feather,
    line1: "Ultra Soft",
    line2: "Feel",
  },
  {
    id: "long-lasting",
    icon: Layers,
    line1: "Long-Lasting",
    line2: "Quality",
  },
];

export default function CraftsmanshipSection({ onLearnMore }) {
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
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".craft-left", {
        x: -25,
        opacity: 0,
        duration: 0.9,
        clearProps: "all",
      })
        .from(
          ".craft-image-card",
          {
            scale: 0.96,
            opacity: 0,
            y: 20,
            duration: 1,
            clearProps: "all",
          },
          "-=0.6"
        )
        .from(
          ".craft-feature-item",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            clearProps: "all",
          },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-[#ECE7DE] text-[#141414] overflow-hidden border-t border-[#DDD6C8]"
    >
      <div className="max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* ========================================================= */}
          {/* 1. LEFT COLUMN: CRAFTSMANSHIP & CALL TO ACTION (~3 cols)  */}
          {/* ========================================================= */}
          <div className="craft-left lg:col-span-3 flex flex-col justify-center">
            <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#78746D] uppercase mb-2 select-none">
              CRAFTSMANSHIP
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[38px] xl:text-[44px] font-black font-sans tracking-[-0.035em] leading-[0.98] uppercase text-[#141414] select-none">
              <span className="block whitespace-nowrap">PREMIUM</span>
              <span className="block whitespace-nowrap mt-0.5">BY DESIGN</span>
            </h2>

            <p className="text-xs sm:text-[13px] md:text-sm text-[#4E4B45] font-normal mt-3 sm:mt-3.5 leading-normal max-w-xs">
              Engineered for comfort. Built to last.
            </p>

            <div className="mt-5 sm:mt-6">
              <a
                href="#story"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#141414]/35 hover:border-[#141414] bg-transparent hover:bg-[#141414] text-[#141414] hover:text-white text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer w-fit select-none group"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER COLUMN: WIDE MACRO FABRIC CARD (~5 cols)        */}
          {/* ========================================================= */}
          <div className="craft-image-card lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/7] rounded-2xl sm:rounded-[22px] overflow-hidden shadow-lg border border-[#DDD6C8] bg-[#121212] group">
              <img
                src={fabricImage}
                alt="NEXORA Premium Fabric Craftsmanship with Embroidered N"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle inner shadow highlight */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-[22px] pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. RIGHT COLUMN: 3 FEATURE BADGES WITH DIVIDERS (~4 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 flex items-center justify-between sm:justify-around py-4 lg:py-0">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`craft-feature-item flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-4 ${
                    index !== 0 ? "border-l border-[#DDD6C8]" : ""
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#141414] mb-2 sm:mb-2.5 transition-transform duration-300 hover:scale-110">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#141414] leading-tight select-none">
                    <span className="block">{item.line1}</span>
                    <span className="block mt-0.5">{item.line2}</span>
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

