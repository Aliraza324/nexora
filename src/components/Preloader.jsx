import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        onComplete?.();
        return;
      }

      const counterObj = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // 1. Initial reveal of brand letters & bottom elements
      tl.from(".loader-char", {
        y: 60,
        opacity: 0,
        rotateX: -45,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      })
        .from(
          ".loader-tag",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".loader-meta",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        );

      // 2. Animate counter 0 -> 100 & progress bar
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.round(counterObj.value);
            setPercent(current);
            if (counterRef.current) {
              counterRef.current.textContent = String(current).padStart(2, "0");
            }
          },
        },
        "-=0.3"
      ).to(
        ".loader-progress",
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      );

      // 3. Brief suspense pause at 100%
      tl.to({}, { duration: 0.2 });

      // 4. Letters fly up & exit
      tl.to(".loader-char", {
        y: -50,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.in",
      })
        .to(
          [".loader-tag", ".loader-progress-wrap", ".loader-counter", ".loader-meta"],
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.4"
        )
        // 5. Cinematic Curtain Wipe (Sliding up)
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete: () => {
            onComplete?.();
          },
        });
    },
    { scope: containerRef }
  );

  const brandName = "NEXORA";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0B0B0B] text-[#ECE7DE] p-6 sm:p-10 md:p-14 select-none overflow-hidden"
    >
      {/* Top Header: Brand Category & Status */}
      <div className="loader-meta flex items-center justify-between text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#88837A]">
        <span>EST. 2026</span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CURATING ARCHIVE</span>
        </span>
      </div>

      {/* Center: Brand Typography, Counter & Progress */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Brand Name with Staggered Letters */}
        <h1 className="flex overflow-hidden text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-sans uppercase tracking-[0.28em] text-[#ECE7DE] leading-none mb-3 sm:mb-4">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="loader-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="loader-tag text-xs sm:text-sm font-medium tracking-[0.35em] text-[#9A958C] uppercase mb-8 sm:mb-10 text-center">
          WEAR YOUR ATTITUDE
        </p>

        {/* Progress Bar (Thin, Minimalist Luxury) */}
        <div className="loader-progress-wrap relative w-44 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="loader-progress absolute top-0 left-0 h-full w-0 bg-[#ECE7DE] rounded-full shadow-[0_0_8px_rgba(236,231,222,0.6)]" />
        </div>

        {/* Numeric Counter */}
        <div className="loader-counter text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#ECE7DE]/80">
          <span ref={counterRef}>00</span>
          <span>%</span>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="loader-meta flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#736F67] gap-2">
        <span>COLLECTION 01 • HEAVYWEIGHT FLEECE</span>
        <span>ALL RIGHTS RESERVED © 2026</span>
      </div>
    </div>
  );
}

