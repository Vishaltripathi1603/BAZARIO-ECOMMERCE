"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Zap,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorOptions?.[0] || "Standard"
  );

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Finish / Variant Selector */}
      {product.colorOptions && product.colorOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Selected Finish:
            </span>
            <span className="font-semibold text-teal-700 dark:text-teal-400">
              {selectedColor}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.colorOptions.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all min-h-[44px] ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 ring-2 ring-teal-600/30 font-bold"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Cart Buttons */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden shadow-sm h-12">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="px-3.5 h-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center min-w-[44px]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-bold text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
              className="px-3.5 h-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center min-w-[44px]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 h-12 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Shopping Bag</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
              isWishlisted
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-600"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-600 hover:border-rose-300"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-rose-600 text-rose-600" : ""
              }`}
            />
          </button>
        </div>

        {/* Instant Buy Now Button */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Buy Now &bull; Instant Academic Checkout</span>
        </button>
      </div>

      {/* Trust & Delivery Micro-Badges */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-teal-600" />
          <span>Free Pan-India Delivery on &ge; ₹999</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Academic Prototype Demo</span>
        </div>
      </div>
    </div>
  );
}
