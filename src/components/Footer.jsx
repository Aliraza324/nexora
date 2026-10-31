import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#0D0D0D] text-white pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-6 sm:px-10 md:px-14 lg:px-20 border-t border-white/10 select-none">
      <div className="max-w-[1560px] mx-auto">
        {/* ========================================================= */}
        {/* TOP ROW: BRAND + SHOP + CARE + SOCIAL + PAYMENTS          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 lg:pb-16 border-b border-white/10">
          {/* 1. BRAND COLUMN (~2.5 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start lg:pr-8 lg:border-r lg:border-white/10">
            <a
              href="#"
              className="text-2xl sm:text-[26px] font-black tracking-[0.22em] font-sans text-white uppercase hover:opacity-90 transition-opacity"
            >
              NEXORA
            </a>
            <p className="text-xs sm:text-[13px] text-white/55 font-normal mt-3 leading-normal">
              Wear Your Attitude.
            </p>
          </div>

          {/* 2. SHOP COLUMN (~2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/60">
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  Hoodies
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  T-Shirts
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  Sweatshirts
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* 3. CUSTOMER CARE COLUMN (~2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/60">
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* 4. FOLLOW US COLUMN (~2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col lg:border-r lg:border-white/10 lg:pr-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-3.5 text-white/70">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:text-white hover:scale-110 transition-all"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-currentColor stroke-2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:text-white hover:scale-110 transition-all"
              >
                <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:text-white hover:scale-110 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:text-white hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.84 3.5 2.62 1.46-.07 2.76-1.1 3.09-2.52.12-.49.16-1 .15-1.5V.02z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-7 h-7 flex items-center justify-center rounded-md hover:text-white hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 5. PAYMENT METHODS COLUMN (~3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider mb-4">
              Payment Methods
            </h4>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* VISA */}
              <span className="font-sans font-black italic tracking-tighter text-white text-base sm:text-lg select-none">
                VISA
              </span>

              {/* Mastercard interlocking circles */}
              <div className="flex items-center -space-x-2 select-none">
                <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
                <div className="w-5 h-5 rounded-full bg-[#F79E1B]/90" />
              </div>

              {/* Apple Pay */}
              <div className="flex items-center gap-1 text-white select-none">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.74-11.64-14.1-6.19-9.76-11.13-21.2-14.83-34.32-3.7-13.11-5.55-25.26-5.55-36.45 0-14.55 3.65-26.68 10.95-36.38 7.3-9.7 16.59-14.65 27.87-14.86 4.9 0 10.37 1.34 16.42 4.02 6.05 2.68 10.02 4.08 11.9 4.22 2.37-.28 6.64-1.74 12.82-4.37 6.18-2.63 11.51-3.84 15.99-3.64 12.01.63 21.64 4.89 28.89 12.79-10.45 6.33-15.54 15.14-15.28 26.43.26 8.79 3.73 16.14 10.41 22.06 6.68 5.92 14.45 9.4 23.32 10.45-2.03 6.1-4.42 12.07-7.18 17.91zM119.22 31.84c0-7.23 2.63-14.12 7.89-20.67 5.26-6.55 11.75-10.61 19.47-12.17.21 1.25.32 2.37.32 3.36 0 7.12-2.73 14.12-8.19 21-5.46 6.88-12.11 10.82-19.95 11.83.1-1.07.16-2.2.16-3.35z" />
                </svg>
                <span className="text-xs font-semibold tracking-tight">Pay</span>
              </div>

              {/* Google Pay */}
              <div className="flex items-center gap-1 text-white select-none">
                <span className="font-bold text-xs">G</span>
                <span className="text-xs font-semibold tracking-tight">Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM ROW: COPYRIGHT + LEGAL POLICIES                   */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 NEXORA. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xs flex-wrap justify-center">
            <a
              href="#privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-white/30">|</span>
            <a
              href="#terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-white/30">|</span>
            <a
              href="#cookies"
              className="hover:text-white transition-colors"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

