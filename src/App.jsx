import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import Navbar from "./components/Navbar";
import BackgroundWatermarks from "./components/BackgroundWatermarks";
import HeroHeader from "./components/HeroHeader";
import ClothingRail from "./components/ClothingRail";
import BottomBar from "./components/BottomBar";
import ProductDrawer from "./components/ProductDrawer";
import CartDrawer from "./components/CartDrawer";
import NextGenerationComfort from "./components/NextGenerationComfort";
import ShopByCategory from "./components/ShopByCategory";
import FreshDropsSection from "./components/FreshDropsSection";
import BuiltForTheUncommon from "./components/BuiltForTheUncommon";
import CraftsmanshipSection from "./components/CraftsmanshipSection";
import CustomerReviewsSection from "./components/CustomerReviewsSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { PRODUCTS } from "./data/products";

export default function App() {
  const mainRef = useRef(null);
  const clothingRailRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      size: "L",
    },
  ]);

  // Initial Page Load GSAP Choreography (runs once preloader curtains open)
  useGSAP(
    () => {
      if (!isLoaded) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Reveal Navbar from top
      tl.from(".hero-nav", {
        y: -30,
        opacity: 0,
        duration: 1,
      });

      // 2. Reveal Background Watermarks with subtle scale & fade
      tl.from(
        [".watermark-left", ".watermark-right"],
        {
          opacity: 0,
          scale: 0.95,
          duration: 1.4,
          stagger: 0.15,
        },
        "-=0.7"
      );

      // 3. Staggered reveal for Hero Header elements
      tl.from(
        ".hero-tag",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.9"
      )
        .from(
          ".hero-title",
          {
            y: 40,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.7"
        )
        .from(
          ".hero-desc",
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.8"
        )
        .from(
          ".hero-ctas",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.7"
        );

      // 4. Smooth reveal of the clothing rail and suspended hoodies
      tl.from(
        ".clothing-rail-section",
        {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // 5. Reveal bottom controls
      tl.from(
        ".hero-bottom",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.8"
      );
    },
    { dependencies: [isLoaded], scope: mainRef }
  );

  const handleAddToCart = (product, size) => {
    setCartItems((prev) => [...prev, { ...product, size }]);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrevSlide = () => {
    clothingRailRef.current?.prev();
  };

  const handleNextSlide = () => {
    clothingRailRef.current?.next();
  };

  const handleSelectSlide = (idx) => {
    clothingRailRef.current?.goTo(idx);
  };

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#ECE7DE] text-[#141414] overflow-x-hidden"
    >
      {/* Luxury Cinematic Preloader Screen */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Background Subtle Typography Watermarks */}
      <BackgroundWatermarks />

      {/* Top Navigation */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Top Hero Section */}
      <HeroHeader
        onExploreClick={() => clothingRailRef.current?.next()}
        onShopClick={() => setSelectedProduct(PRODUCTS[activeSlide])}
      />

      {/* Center Section: Interactive Clothing Rail Slider with Hoodies */}
      <ClothingRail
        ref={clothingRailRef}
        activeIndex={activeSlide}
        onSlideChange={setActiveSlide}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Bottom Section with Slide Controls & Dots */}
      <BottomBar
        currentSlide={activeSlide}
        totalSlides={PRODUCTS.length}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onSelectSlide={handleSelectSlide}
      />

      {/* Second Section: The Next Generation of Comfort */}
      <NextGenerationComfort
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Third Section: Shop By Category — Find Your Style */}
      <ShopByCategory />

      {/* Fourth Section: New Arrivals — Fresh Drops. Bold Looks. */}
      <FreshDropsSection onAddToCart={handleAddToCart} />

      {/* Fifth Section: Built For The Uncommon Banner */}
      <BuiltForTheUncommon />

      {/* Sixth Section: Craftsmanship — Premium By Design */}
      <CraftsmanshipSection />

      {/* Seventh Section: Customer Reviews & Newsletter */}
      <CustomerReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Product Quick View Modal */}
      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </main>
  );
}
