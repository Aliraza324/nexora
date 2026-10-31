import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Send,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVIEWS = [
  {
    id: "review-1",
    name: "Ahmed Raza",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    fallbackInitial: "AR",
    quote:
      "“NEXORA hoodies are next level. Super comfy and premium quality!”",
    stars: 5,
  },
  {
    id: "review-2",
    name: "Sara Khan",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    fallbackInitial: "SK",
    quote:
      "“Finally a brand that understands modern streetwear. Highly recommended!”",
    stars: 5,
  },
  {
    id: "review-3",
    name: "Usman Tariq",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    fallbackInitial: "UT",
    quote:
      "“Amazing quality and fast delivery. Will definitely shop again!”",
    stars: 5,
  },
  {
    id: "review-4",
    name: "Ayesha Malik",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    fallbackInitial: "AM",
    quote:
      "“The heavyweight cotton drape is unmatched. Best oversized fit I have found!”",
    stars: 5,
  },
  {
    id: "review-5",
    name: "Hamza Sheikh",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    fallbackInitial: "HS",
    quote:
      "“Minimalist aesthetic done right. Stitching and fabric feel strictly luxury.”",
    stars: 5,
  },
];

export default function CustomerReviewsSection() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [likes, setLikes] = useState({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

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

      tl.from(".reviews-header", {
        x: -25,
        opacity: 0,
        duration: 0.9,
        clearProps: "all",
      })
        .from(
          ".review-slide-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            clearProps: "all",
          },
          "-=0.5"
        )
        .from(
          ".newsletter-banner",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            clearProps: "all",
          },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-20 bg-[#ECE7DE] text-[#141414] overflow-hidden border-t border-[#DDD6C8]"
    >
      <div className="max-w-[1560px] mx-auto flex flex-col gap-10 sm:gap-14 lg:gap-16">
        {/* ============================================================== */}
        {/* TOP ROW: LEFT TITLE + RIGHT REVIEWS SLIDER                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* LEFT COLUMN: TITLE & SLIDER CONTROLS (~3.5 cols) */}
          <div className="reviews-header lg:col-span-4 xl:col-span-3 flex flex-col justify-center">
            <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#78746D] uppercase mb-2 select-none">
              OUR CUSTOMERS
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-black font-sans tracking-[-0.035em] leading-[0.98] uppercase text-[#141414] select-none">
              <span className="block whitespace-nowrap">REAL WORDS.</span>
              <span className="block whitespace-nowrap mt-0.5">REAL PEOPLE.</span>
            </h2>

            <p className="text-xs sm:text-[13px] md:text-sm text-[#4E4B45] font-normal mt-3 sm:mt-3.5 leading-normal max-w-xs">
              Trusted by thousands of fashion lovers worldwide.
            </p>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2.5 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous Reviews"
                className="w-10 h-10 rounded-full border border-[#141414]/30 hover:border-[#141414] bg-[#F2ECE1]/60 hover:bg-[#141414] text-[#141414] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next Reviews"
                className="w-10 h-10 rounded-full border border-[#141414]/30 hover:border-[#141414] bg-[#F2ECE1]/60 hover:bg-[#141414] text-[#141414] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: REVIEWS SLIDER (~8.5 cols) */}
          <div className="lg:col-span-8 xl:col-span-9 relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-2 pt-1 px-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {REVIEWS.map((review) => {
                const isLiked = likes[review.id];
                return (
                  <div
                    key={review.id}
                    className="review-slide-card shrink-0 w-[270px] sm:w-[290px] md:w-[310px] snap-start rounded-2xl sm:rounded-[22px] p-5 sm:p-6 bg-[#F2ECE1]/70 hover:bg-[#F2ECE1] border border-[#DDD6C8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Row: Avatar & Heart Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-black/15 bg-[#DDD6C8] shrink-0">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleLike(review.id)}
                        aria-label="Like Review"
                        className="p-1 rounded-full text-[#8C867E] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isLiked
                              ? "fill-red-500 text-red-500 scale-110"
                              : "stroke-[1.8] hover:scale-110"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs sm:text-[13px] text-[#2C2925] font-normal leading-relaxed my-4 line-clamp-3 select-none">
                      {review.quote}
                    </p>

                    {/* Bottom Row: Name with Blue Verified Badge & 5 Gold Stars */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-xs sm:text-[13px] font-bold text-[#141414]">
                          {review.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#1D9BF0] text-white" />
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(review.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-[#F59E0B] stroke-[#F59E0B]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ROW: NEWSLETTER "STAY IN THE LOOP" CAPSULE BANNER       */}
        {/* ============================================================== */}
        <div className="newsletter-banner relative w-full rounded-2xl sm:rounded-full bg-[#E0D9CB] border border-[#D0C8B8] px-6 sm:px-10 py-5 sm:py-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
            {/* Left Info: Paper Airplane Icon + Texts */}
            <div className="flex items-center gap-3.5 sm:gap-4 w-full lg:w-auto">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ECE7DE] flex items-center justify-center text-[#141414] shrink-0 shadow-xs">
                <Send className="w-5 h-5 stroke-[2] -rotate-12 translate-x-0.5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black tracking-tight uppercase text-[#141414]">
                  STAY IN THE LOOP
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555048] font-normal mt-0.5">
                  Get exclusive drops, early access and special offers.
                </p>
              </div>
            </div>

            {/* Right: Email Input & Subscribe Button */}
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 w-full lg:w-auto max-w-md lg:max-w-none justify-end"
            >
              <div className="relative flex-1 lg:w-72">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#ECE7DE]/90 border border-[#C8C0AF] focus:border-[#141414] rounded-full px-5 py-2.5 sm:py-3 text-xs sm:text-[13px] text-[#141414] placeholder-[#807B72] outline-none transition-colors shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#141414] hover:bg-black text-white text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
                    <span>JOINED!</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

