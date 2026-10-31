import React from "react";

export default function BackgroundWatermarks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 right-0 h-[100vh] z-0 overflow-hidden select-none"
    >
      {/* Left Watermark: STREET WEAR (Hero Only) */}
      <div className="watermark-left absolute top-[16%] left-3 md:left-8 lg:left-12 flex flex-col leading-[0.82] font-black tracking-tighter text-[#141414]/[0.045] font-['Syne',sans-serif]">
        <span className="text-[13vw] lg:text-[11vw]">STREET</span>
        <span className="text-[13vw] lg:text-[11vw]">WEAR</span>
      </div>

      {/* Right Watermark: EST. 2020 (Hero Only) */}
      <div className="watermark-right absolute top-[18%] right-3 md:right-8 lg:right-12 flex flex-col items-end leading-[0.82] font-black tracking-tighter text-[#141414]/[0.04] font-['Syne',sans-serif]">
        <span className="text-[11vw] lg:text-[9.5vw]">EST.</span>
        <span className="text-[11vw] lg:text-[9.5vw]">2020</span>
      </div>
    </div>
  );
}
