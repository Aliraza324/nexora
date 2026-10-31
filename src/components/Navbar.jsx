import React, { useState } from "react";

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="hero-nav relative z-40 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-5 sm:pt-7 md:pt-8 pb-3 sm:pb-4 flex items-center justify-between text-[#141414]">
      {/* Brand Logo & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        {/* Hamburger Toggle (Mobile only) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-1.5 text-[#141414] hover:opacity-75 transition-opacity cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <a
          href="#"
          className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.25em] sm:tracking-[0.28em] font-['Syne',sans-serif] hover:opacity-80 transition-opacity"
        >
          NEXORA
        </a>
      </div>

      {/* Center Navigation Links (Tablet & Desktop) */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs lg:text-sm font-medium tracking-wide">
        <a href="#home" className="relative text-[#141414] py-1 transition-colors group">
          Home
          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#141414] rounded-full" />
        </a>
        <a href="#shop" className="text-[#68645E] hover:text-[#141414] transition-colors py-1">
          Shop
        </a>
        <a href="#collections" className="text-[#68645E] hover:text-[#141414] transition-colors py-1">
          Collections
        </a>
        <a href="#about" className="text-[#68645E] hover:text-[#141414] transition-colors py-1">
          About
        </a>
        <a href="#contact" className="text-[#68645E] hover:text-[#141414] transition-colors py-1">
          Contact
        </a>
      </nav>

      {/* Right Icons: Search, User, Bag */}
      <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6">
        {/* Search Button */}
        <button
          type="button"
          aria-label="Search collection"
          className="p-1 text-[#222] hover:text-black hover:scale-105 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
        </button>

        {/* User Account */}
        <button
          type="button"
          aria-label="User account"
          className="hidden xs:inline-block p-1 text-[#222] hover:text-black hover:scale-105 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path strokeLinecap="round" d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
          </svg>
        </button>

        {/* Shopping Bag with Badge */}
        <button
          type="button"
          onClick={onOpenCart}
          aria-label="Shopping bag"
          className="relative p-1 text-[#222] hover:text-black hover:scale-105 transition-all cursor-pointer group"
        >
          <svg className="w-5 h-5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l1.2 13H4.8L6 7Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#141414] text-white text-[10px] font-semibold flex items-center justify-center group-hover:scale-110 transition-transform">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#ECE7DE]/95 backdrop-blur-md border-b border-[#DDD6C8] px-6 py-5 flex flex-col gap-4 shadow-xl md:hidden z-50 animate-fadeIn">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#141414] py-1 border-b border-[#DDD6C8]/60"
          >
            Home
          </a>
          <a
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#68645E] hover:text-[#141414] py-1 border-b border-[#DDD6C8]/60"
          >
            Shop
          </a>
          <a
            href="#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#68645E] hover:text-[#141414] py-1 border-b border-[#DDD6C8]/60"
          >
            Collections
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#68645E] hover:text-[#141414] py-1 border-b border-[#DDD6C8]/60"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#68645E] hover:text-[#141414] py-1"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
