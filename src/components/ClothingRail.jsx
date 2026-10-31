import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRODUCTS } from "../data/products";

const ClothingRail = forwardRef(function ClothingRail(
  { onSelectProduct, activeIndex = 0, onSlideChange },
  ref
) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const hoodieRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const dragDistRef = useRef(0);
  const lastVelocityRef = useRef(0);
  const lastTimeRef = useRef(0);

  hoodieRefs.current = [];
  const addToHoodieRefs = (el) => {
    if (el && !hoodieRefs.current.includes(el)) {
      hoodieRefs.current.push(el);
    }
  };

  const getItemWidth = () => {
    if (typeof window === "undefined") return 300;
    if (window.innerWidth < 480) return 210;
    if (window.innerWidth < 768) return 250;
    if (window.innerWidth < 1024) return 280;
    return 320;
  };

  const slideTo = (index, immediate = false) => {
    const total = PRODUCTS.length;
    const targetIdx = (index + total) % total;
    setCurrentIndex(targetIdx);
    onSlideChange?.(targetIdx);

    const stride = getItemWidth();
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const targetX = containerWidth / 2 - targetIdx * stride - stride / 2;

    currentXRef.current = targetX;

    gsap.to(trackRef.current, {
      x: targetX,
      duration: immediate ? 0 : 0.85,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Subtle pendular garment swing on slide
    hoodieRefs.current.forEach((el) => {
      if (!el) return;
      const swingDirection = targetIdx > currentIndex ? 1 : -1;
      gsap.to(el, {
        rotation: swingDirection * 2.5,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(el, {
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
          });
        },
      });
    });
  };

  useImperativeHandle(ref, () => ({
    next: () => slideTo(currentIndex + 1),
    prev: () => slideTo(currentIndex - 1),
    goTo: (idx) => slideTo(idx),
  }));

  // Initial positioning & natural boutique atmospheric breathing
  useGSAP(
    () => {
      slideTo(0, true);

      hoodieRefs.current.forEach((el, index) => {
        if (!el) return;
        const swingAmp = 0.8 + (index % 3) * 0.25;
        const swingDuration = 2.8 + (index % 4) * 0.3;
        const delay = (index * 0.2) % 1.2;

        // Gentle breathing pendular sway
        gsap.to(el, {
          rotation: swingAmp,
          duration: swingDuration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay,
          transformOrigin: "50% 12px",
        });

        // Subtle atmospheric vertical breathing
        gsap.to(el, {
          y: -3,
          duration: 3.2 + (index % 3) * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay + 0.3,
        });
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const handleResize = () => slideTo(currentIndex, true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Keypad & Keyboard Controls: ArrowLeft, ArrowRight, NumPad 4, NumPad 6, Enter, Numbers 1-6
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.key === "ArrowRight" || e.code === "Numpad6" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        slideTo(currentIndex + 1);
      } else if (e.key === "ArrowLeft" || e.code === "Numpad4" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        slideTo(currentIndex - 1);
      } else if (e.key === "Enter" || e.code === "Numpad5" || e.key === " ") {
        e.preventDefault();
        onSelectProduct?.(PRODUCTS[currentIndex]);
      } else if (e.code.startsWith("Digit") || e.code.startsWith("Numpad")) {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= PRODUCTS.length) {
          e.preventDefault();
          slideTo(num - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onSelectProduct]);

  // Pointer Grab Handlers (Mouse & Touch Dragging)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsGrabbing(true);
    dragDistRef.current = 0;
    startXRef.current = e.clientX || e.touches?.[0]?.clientX || 0;
    lastTimeRef.current = performance.now();
    lastVelocityRef.current = 0;
    gsap.killTweensOf(trackRef.current);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = clientX - startXRef.current;
    const now = performance.now();
    const dt = now - lastTimeRef.current;

    if (dt > 0) {
      lastVelocityRef.current = deltaX / dt;
    }

    lastTimeRef.current = now;
    dragDistRef.current += Math.abs(deltaX);
    startXRef.current = clientX;
    currentXRef.current += deltaX;

    gsap.set(trackRef.current, { x: currentXRef.current });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    const stride = getItemWidth();
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const projectedX = currentXRef.current + lastVelocityRef.current * 180;
    let targetIdx = Math.round(
      (containerWidth / 2 - projectedX - stride / 2) / stride
    );

    targetIdx = Math.max(0, Math.min(PRODUCTS.length - 1, targetIdx));
    slideTo(targetIdx);
  };

  const handleClickProduct = (product, idx) => {
    if (dragDistRef.current < 6) {
      if (currentIndex !== idx) {
        slideTo(idx);
      } else {
        onSelectProduct?.(product);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`clothing-rail-section relative z-30 w-full overflow-hidden select-none py-1 my-auto transition-cursor ${
        isGrabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      tabIndex={0}
      role="region"
      aria-label="Clothing Rail Slider (grab to drag or use keypad arrows to navigate)"
    >
      {/* 
        ===================================================================
        THE METALLIC CLOTHING ROD (Full Viewport Width)
        Cylindrical brushed chrome rail spanning the screen
        ===================================================================
      */}
      <div className="absolute top-[28px] md:top-[32px] lg:top-[36px] left-0 w-full z-10 pointer-events-none">
        {/* Soft shadow cast on the cream wall behind the rod */}
        <div className="absolute -top-1 left-0 w-full h-[22px] bg-gradient-to-b from-black/25 via-black/8 to-transparent blur-[4px] opacity-70 transform translate-y-2" />

        {/* Chrome Metallic Cylindrical Rod */}
        <div className="relative w-full h-[15px] md:h-[16px] metallic-rail rounded-none shadow-[0_4px_8px_rgba(0,0,0,0.18)]">
          <div className="absolute top-[2px] left-0 w-full h-[2px] bg-white/95 blur-[0.2px]" />
          <div className="absolute inset-0 metallic-rail-highlight opacity-60" />
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/50" />
        </div>
      </div>

      {/* 
        ===================================================================
        SLIDER TRACK (Draggable & Keypad Navigable)
        Hoodies suspended cleanly along the clothing rod
        ===================================================================
      */}
      <div
        ref={trackRef}
        className="flex items-start will-change-transform pt-[34px] md:pt-[38px] lg:pt-[42px] pb-6"
        style={{ touchAction: "pan-y" }}
      >
        {PRODUCTS.map((product, idx) => {
          const isActive = currentIndex === idx;
          const isHovered = hoveredProduct?.id === product.id;

          return (
            <div
              key={product.id}
              ref={addToHoodieRefs}
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleClickProduct(product, idx)}
              className="flex-shrink-0 relative mx-2 sm:mx-4 md:mx-6 group flex flex-col items-center transition-all duration-300"
              style={{
                width: "clamp(195px, 32vw, 290px)",
                willChange: "transform",
                transformOrigin: "50% 12px",
              }}
            >
              {/* 
                ===========================================================
                THE STREETWEAR HOODIE
                Responsive top offset: moved down on small screens so the
                hoodie hangs naturally below the rail without clipping
                ===========================================================
              */}
              <div
                className={`relative z-20 w-full transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top -top-[22px] sm:-top-7 md:-top-9 lg:-top-[42px] ${
                  isActive
                    ? "scale-[1.05] -translate-y-1.5 drop-shadow-[0_24px_32px_rgba(30,25,20,0.24)]"
                    : isHovered
                    ? "scale-[1.03] -translate-y-1 drop-shadow-[0_18px_24px_rgba(30,25,20,0.18)]"
                    : "opacity-85 scale-95 drop-shadow-[0_10px_16px_rgba(30,25,20,0.10)]"
                }`}
              >
                {/* Default View (cc.png) - Smoothly Cross-fading */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading={idx < 3 ? "eager" : "lazy"}
                  draggable={false}
                  className={`w-full h-auto object-contain block select-none pointer-events-auto transform-gpu filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.06)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered && product.hoverImage ? "opacity-0 scale-[1.01]" : "opacity-100 scale-100"
                  }`}
                />

                {/* On-Hover View (ee.png) - Smoothly Fading & Zooming In */}
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} Front View`}
                    loading="eager"
                    draggable={false}
                    className={`absolute inset-0 w-full h-full object-contain block select-none pointer-events-none transform-gpu filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.06)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
                      isHovered
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-[0.985] pointer-events-none"
                    }`}
                  />
                )}
              </div>

              {/* Floating Product Name & Price Tag */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                  isActive || isHovered
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-2.5 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414] text-white shadow-xl backdrop-blur-md">
                  <span className="text-[11px] font-semibold tracking-wide">
                    {product.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[11px] font-bold text-[#E5DFD5]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Side Navigation Chevrons */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          slideTo(currentIndex - 1);
        }}
        aria-label="Previous hoodie (or press Left Arrow / NumPad 4)"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#141414] shadow-lg border border-[#DDD6C8] items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          slideTo(currentIndex + 1);
        }}
        aria-label="Next hoodie (or press Right Arrow / NumPad 6)"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#141414] shadow-lg border border-[#DDD6C8] items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Ambient Room Studio Floor Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] studio-floor-shadow pointer-events-none" />
    </div>
  );
});

export default ClothingRail;
