import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Heart, ShoppingBag, Check } from "lucide-react";

import hoodie1 from "../assets/Gemini_Generated_Image_s0vbt1s0vbt1s0vb-removebg-preview.png";
import sweatshirt from "../assets/Gemini_Generated_Image_hgd7x5hgd7x5hgd7-removebg-preview.png";
import tshirt from "../assets/Gemini_Generated_Image_vilkr5vilkr5vilk-removebg-preview.png";
import hoodie2 from "../assets/Gemini_Generated_Image_1es1fu1es1fu1es1-removebg-preview.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRESH_DROPS = [
  {
    id: "drop-essentials-hoodie",
    name: "NEXORA Essentials Hoodie",
    price: "$89.00",
    numericPrice: 89,
    image: hoodie1,
    color: "Washed Black",
    size: "L",
  },
  {
    id: "drop-oversized-sweatshirt",
    name: "NEXORA Oversized Sweatshirt",
    price: "$79.00",
    numericPrice: 79,
    image: sweatshirt,
    color: "Pitch Black",
    size: "L",
  },
  {
    id: "drop-signature-tee",
    name: "NEXORA Signature Tee",
    price: "$49.00",
    numericPrice: 49,
    image: tshirt,
    color: "Matte Black",
    size: "L",
  },
  {
    id: "drop-minimal-hoodie",
    name: "NEXORA Minimal Hoodie",
    price: "$89.00",
    numericPrice: 89,
    image: hoodie2,
    color: "Onyx Black",
    size: "L",
  },
];

export default function FreshDropsSection({ onAddToCart }) {
  const sectionRef = useRef(null);
  const [wishlist, setWishlist] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (item) => {
    onAddToCart?.(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  // Entrance animation with ScrollTrigger
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

      tl.from(".drops-left-col", {
        x: -25,
        opacity: 0,
        duration: 0.9,
        clearProps: "all",
      }).from(
        ".drop-card-item",
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
      id="drops"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-[#ECE7DE] text-[#141414] overflow-hidden border-t border-[#DDD6C8]"
    >
      <div className="max-w-[1560px] mx-auto">
        {/* 
          =============================================================
          MAIN ROW: LEFT TITLE (~25%) + RIGHT 4 PRODUCT CARDS (~75%)
          Exact composition matching reference screenshot
          =============================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* LEFT COLUMN: TITLE & SHOP ALL CTA */}
          <div className="drops-left-col lg:col-span-4 xl:col-span-3 flex flex-col justify-center">
            <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#78746D] uppercase mb-2 select-none">
              NEW ARRIVALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] xl:text-[38px] 2xl:text-[44px] font-black font-sans tracking-[-0.035em] leading-[0.98] uppercase text-[#141414] select-none">
              <span className="block whitespace-nowrap">FRESH DROPS.</span>
              <span className="block whitespace-nowrap">BOLD LOOKS.</span>
            </h2>

            <p className="text-xs sm:text-[13px] md:text-sm text-[#4E4B45] font-normal mt-3 sm:mt-3.5 leading-normal max-w-sm">
              Be the first to own the latest from NEXORA.
            </p>

            <div className="mt-5 sm:mt-6">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#141414] hover:bg-black text-white text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer w-fit select-none"
              >
                <span>SHOP ALL</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 PRODUCT CARDS */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
              {FRESH_DROPS.map((item) => {
                const isWished = wishlist[item.id];
                const isAdded = addedIds[item.id];

                return (
                  <div
                    key={item.id}
                    className="drop-card-item group relative w-full rounded-2xl sm:rounded-[22px] overflow-hidden p-3 sm:p-4 bg-[#F2ECE1]/70 hover:bg-[#F2ECE1] border border-[#DDD6C8]/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                  >
                    {/* Top Right Wishlist Heart */}
                    <div className="flex justify-end z-10">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(item.id)}
                        aria-label="Wishlist"
                        className="p-1 rounded-full text-[#8C867E] hover:text-[#141414] transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isWished
                              ? "fill-red-500 text-red-500 scale-110"
                              : "stroke-[1.8] hover:scale-110"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Center Cutout Garment Image */}
                    <div className="relative w-full aspect-[4/4.5] flex items-center justify-center my-2 sm:my-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
                        loading="eager"
                      />
                    </div>

                    {/* Bottom Metadata & Add to Cart Action */}
                    <div className="flex items-end justify-between gap-2 pt-2 border-t border-[#DDD6C8]/40">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] sm:text-xs font-bold text-[#141414] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs font-semibold text-[#66625B] mt-0.5">
                          {item.price}
                        </p>
                      </div>

                      {/* Quick Add Bag Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        aria-label={`Add ${item.name} to bag`}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-sm ${
                          isAdded
                            ? "bg-emerald-600 text-white scale-110"
                            : "bg-[#141414]/10 hover:bg-[#141414] text-[#141414] hover:text-white"
                        }`}
                      >
                        {isAdded ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                        )}
                      </button>
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

