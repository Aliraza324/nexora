import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Layers,
  Sparkles,
  Shirt,
  Crown,
} from "lucide-react";

import hoodieImg from "../assets/Gemini_Generated_Image_mh6qbomh6qbomh6q.jpg";
import tshirtImg from "../assets/Gemini_Generated_Image_vwg0uyvwg0uyvwg0.jpg";
import sweatshirtImg from "../assets/Gemini_Generated_Image_bs1cnkbs1cnkbs1c.jpg";
import accessoryImg from "../assets/Gemini_Generated_Image_416a4s416a4s416a.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    id: "hoodies",
    name: "Hoodies",
    image: hoodieImg,
    icon: Sparkles,
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    image: tshirtImg,
    icon: Shirt,
  },
  {
    id: "sweatshirts",
    name: "Sweatshirts",
    image: sweatshirtImg,
    icon: Layers,
  },
  {
    id: "accessories",
    name: "Accessories",
    image: accessoryImg,
    icon: Crown,
  },
];

export default function ShopByCategory({ onSelectCategory }) {
  const sectionRef = useRef(null);

  // Smooth staggered entrance animation with ScrollTrigger
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

      tl.from(".category-left-col", {
        x: -25,
        opacity: 0,
        duration: 0.9,
        clearProps: "all",
      }).from(
        ".category-card-item",
        {
          y: 30,
          opacity: 0,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.1,
          clearProps: "all",
        },
        "-=0.5"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-[#ECE7DE] text-[#141414] overflow-hidden border-t border-[#DDD6C8]"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* 
          =============================================================
          TOP BAR: BROWSE ALL ON THE FAR RIGHT
          =============================================================
        */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <a
            href="#collections"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase text-[#141414] hover:opacity-70 transition-opacity select-none group"
          >
            <span>BROWSE ALL</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* 
          =============================================================
          MAIN ROW: LEFT TITLE (~25%) + RIGHT 4 CARDS (~75%)
          =============================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* LEFT TITLE COLUMN */}
          <div className="category-left-col lg:col-span-3 flex flex-col justify-center">
            <span className="block text-xs sm:text-[13px] font-bold tracking-[0.24em] text-[#78746D] uppercase mb-2 sm:mb-3 select-none">
              SHOP BY CATEGORY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px] font-black font-sans tracking-[-0.03em] leading-[0.98] uppercase text-[#141414] select-none">
              <span className="block">FIND YOUR</span>
              <span className="block">STYLE</span>
            </h2>
          </div>

          {/* RIGHT COLUMN: 4 CARDS ROW */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;

                return (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory?.(cat.id)}
                    className="category-card-item group relative w-full aspect-[3/3.8] sm:aspect-[3/3.8] rounded-2xl sm:rounded-[22px] overflow-hidden shadow-md hover:shadow-xl border border-[#DDD6C8]/70 bg-[#D8D2C6] transition-all duration-500 cursor-pointer"
                  >
                    {/* Background Editorial Photography */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
                      loading="eager"
                    />

                    {/* Subtle Ambient Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

                    {/* Bottom Floating Pill (Icon in circle + Label + Arrow) */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                      <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-102">
                        {/* Circle Icon Outline */}
                        <div className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                          <Icon className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                        </div>

                        {/* Category Name */}
                        <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white whitespace-nowrap">
                          {cat.name}
                        </span>

                        {/* Arrow Right */}
                        <ArrowRight className="w-3 h-3 text-white/80 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
