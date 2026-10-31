import React from "react";

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.numericPrice || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-full sm:max-w-md h-full bg-[#ECE7DE] border-l border-[#DDD6C8] shadow-2xl flex flex-col justify-between p-5 sm:p-6 md:p-8 animate-slideLeft">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#DDD6C8]">
            <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-[#141414] font-['Syne',sans-serif]">
              YOUR BAG ({cartItems.length})
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#141414] hover:opacity-70 transition-opacity cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart items list */}
          <div className="py-4 space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-[#736E67]">
                <p className="text-sm font-medium">Your bag is currently empty.</p>
                <p className="text-xs mt-1">Explore our hoodies on the moving rail.</p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-3 sm:gap-4 bg-white/70 p-3 rounded-xl border border-[#DDD6C8]"
                >
                  {item.image?.startsWith("#") ? (
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shadow-inner border border-[#DDD6C8] shrink-0 text-white p-1"
                      style={{ backgroundColor: item.image }}
                    >
                      <span className="text-[8px] font-black uppercase tracking-wider text-center leading-none">
                        3D DENIM
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.hoverImage || item.image}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#141414] truncate">{item.name}</h4>
                    <p className="text-[11px] text-[#736E67]">
                      Size: {item.size || "L"} {item.quantity && item.quantity > 1 ? `• Qty: ${item.quantity}` : ""}
                    </p>
                    <p className="text-xs font-black text-[#141414] mt-0.5">
                      {item.price} {item.quantity && item.quantity > 1 ? `(x${item.quantity})` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(idx)}
                    className="text-xs text-red-600 hover:text-red-800 p-1 cursor-pointer font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer / Checkout */}
        <div className="pt-4 border-t border-[#DDD6C8]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#736E67]">
              SUBTOTAL
            </span>
            <span className="text-lg sm:text-xl font-black text-[#141414]">${total} USD</span>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="w-full py-3 sm:py-3.5 rounded-full bg-[#141414] disabled:bg-[#999] text-white text-xs font-bold tracking-widest uppercase hover:bg-black transition-all cursor-pointer shadow-md"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
