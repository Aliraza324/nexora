import React, { useState } from "react";

export default function ProductDrawer({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("L");
  const sizes = ["S", "M", "L", "XL"];

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#ECE7DE] border border-[#DDD6C8] rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col md:flex-row gap-5 md:gap-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Product Image on studio pedestal */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#E5DFD5]/70 rounded-xl p-4 sm:p-6 relative">
          <span className="absolute top-3 left-3 text-[9px] sm:text-[10px] font-bold tracking-widest px-2.5 py-1 bg-[#141414] text-white rounded-full">
            {product.badge}
          </span>
          <img
            src={product.hoverImage || product.image}
            alt={product.name}
            className="w-36 sm:w-44 md:w-52 h-auto object-contain filter drop-shadow-[0_15px_20px_rgba(30,25,20,0.2)]"
          />
          <span className="mt-3 text-[10px] sm:text-[11px] font-medium text-[#736E67] tracking-wider uppercase text-center">
            {product.weight} • {product.material}
          </span>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#736E67]">
              {product.tag}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#141414] font-['Syne',sans-serif] mt-1 mb-1.5 sm:mb-2">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl sm:text-2xl font-black text-[#141414]">{product.price}</span>
              <span className="text-xs text-[#736E67]">USD • In Stock</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C5750] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#141414]">
                  SELECT SIZE
                </span>
                <span className="text-[11px] text-[#736E67] underline cursor-pointer">Size Guide</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#141414] text-white shadow-md scale-102"
                        : "bg-white/80 border border-[#DDD6C8] text-[#141414] hover:border-[#141414]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Bag Button */}
          <div>
            <button
              type="button"
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full py-3 sm:py-3.5 rounded-full bg-[#141414] text-white text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg"
            >
              ADD TO BAG • {product.price}
            </button>
            <p className="text-[10px] sm:text-[11px] text-center text-[#736E67] mt-2">
              Free worldwide shipping on orders over $250
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
