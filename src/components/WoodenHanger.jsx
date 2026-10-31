import React from "react";

/**
 * Luxury Wooden Hanger with Dark Gunmetal Hook
 * Engineered with physically accurate 3D layering:
 * - The wooden hanger body sits INSIDE the hoodie (supporting the shoulders).
 * - The curved steel hook loops OVER the chrome rod in front.
 */
export default function WoodenHanger({ className = "", showHookOnly = false, showWoodOnly = false }) {
  return (
    <div
      className={`relative flex flex-col items-center pointer-events-none select-none ${className}`}
      style={{ width: "160px", height: "105px" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 105"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_8px_rgba(20,15,10,0.3)]"
      >
        <defs>
          {/* Solid Carved Teak / Walnut Gradient */}
          <linearGradient id="naturalWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C89265" />
            <stop offset="20%" stopColor="#A0663E" />
            <stop offset="60%" stopColor="#764323" />
            <stop offset="85%" stopColor="#552E16" />
            <stop offset="100%" stopColor="#3A1C0A" />
          </linearGradient>

          {/* Top Shoulder Bevel (Keylight reflection) */}
          <linearGradient id="woodBevel" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E2AE84" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#B3784C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#784220" stopOpacity="0.2" />
          </linearGradient>

          {/* Brushed Gunmetal Hook Gradient */}
          <linearGradient id="hookSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181A" />
            <stop offset="35%" stopColor="#5E6064" />
            <stop offset="55%" stopColor="#E5E7EB" />
            <stop offset="75%" stopColor="#4B4C50" />
            <stop offset="100%" stopColor="#141416" />
          </linearGradient>

          {/* Polished Brass Swivel Neck */}
          <linearGradient id="swivelBrass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E4C1E" />
            <stop offset="45%" stopColor="#FDE08A" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#452D10" />
          </linearGradient>
        </defs>

        {/* 
          =============================================================
          1. CARVED SOLID WOODEN HANGER BODY
          Positioned to slip directly inside the hoodie shoulders
          =============================================================
        */}
        {!showHookOnly && (
          <g id="hanger-wood-body">
            {/* Cast Shadow beneath wood */}
            <path
              d="M 80 54 L 115 69 L 148 81 C 142 86, 132 86, 118 81 L 80 67 L 42 81 C 28 86, 18 86, 12 81 L 45 69 Z"
              fill="#0A0603"
              opacity="0.35"
              filter="blur(2px)"
            />

            {/* Solid Contoured Wooden Hanger */}
            <path
              d="M 80 53
                 C 86 53, 98 55.5, 114 62
                 C 130 68.5, 145 75.5, 153 81.5
                 C 155 83.5, 153 86.5, 147 87.5
                 C 140 88.5, 130 86.5, 120 82
                 L 80 67
                 L 40 82
                 C 30 86.5, 20 88.5, 13 87.5
                 C 7 86.5, 5 83.5, 7 81.5
                 C 15 75.5, 30 68.5, 46 62
                 C 62 55.5, 74 53, 80 53 Z"
              fill="url(#naturalWood)"
              stroke="#281307"
              strokeWidth="0.8"
            />

            {/* Top Shoulder Edge Bevel */}
            <path
              d="M 80 54 
                 C 86 54, 98 56.5, 114 62.5 
                 C 129 68.5, 144 75.5, 152 81.5 
                 M 80 54 
                 C 74 54, 62 56.5, 46 62.5 
                 C 31 68.5, 16 75.5, 8 81.5"
              fill="none"
              stroke="url(#woodBevel)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Center Chisel Peak Highlight */}
            <path
              d="M 80 54.5 L 80 66.5"
              stroke="#E8B892"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Natural Wood Grain Lines */}
            <path
              d="M 52 65 C 68 60, 92 60, 108 65"
              fill="none"
              stroke="#2A1408"
              strokeWidth="0.7"
              opacity="0.3"
            />
            <path
              d="M 36 74 C 52 68, 72 66, 80 66 C 88 66, 108 68, 124 74"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              opacity="0.16"
            />
          </g>
        )}

        {/* 
          =============================================================
          2. DARK STEEL HOOK LOOPING OVER THE CHROME ROD
          Rod height is 16px. The hook loops cleanly around the rod.
          =============================================================
        */}
        {!showWoodOnly && (
          <g id="hanger-steel-hook">
            {/* Polished Brass Swivel Neck Collar */}
            <rect
              x="77.5"
              y="50.5"
              width="5"
              height="6"
              rx="1.2"
              fill="url(#swivelBrass)"
              stroke="#3B260B"
              strokeWidth="0.5"
            />
            <ellipse cx="80" cy="50.7" rx="2.5" ry="0.8" fill="#FEF3C7" opacity="0.9" />

            {/* Curved Steel Hook Stem and Rod Loop */}
            <path
              d="M 80 54 L 80 37 C 80 27, 85 21, 90 15 C 94 10, 91 3, 81 3 C 73 3, 70 9, 70 17"
              fill="none"
              stroke="url(#hookSteel)"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hook Chrome Highlight Reflection */}
            <path
              d="M 80.5 52 L 80.5 37 C 80.5 28, 85.3 22, 89.8 16 C 93 11.5, 90.5 4.5, 81.5 4.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.0"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Hook Protective Ball End */}
            <circle cx="70" cy="17.5" r="2.3" fill="url(#hookSteel)" stroke="#0E0E10" strokeWidth="0.5" />
            <circle cx="69.4" cy="16.8" r="0.8" fill="#FFFFFF" opacity="0.85" />
          </g>
        )}
      </svg>
    </div>
  );
}
