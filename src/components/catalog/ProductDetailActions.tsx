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
    product.colorOptions[0] || "Natural Moso"
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
      {/* Finish / Color Variant Selector */}
      {product.colorOptions && product.colorOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
              Selected Finish:
            </span>
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              {selectedColor}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.colorOptions.map((c) => {
              const isSelected = selectedColor === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition min-h-[44px] flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                    isSelected
                      ? "border-emerald-800 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-800/20 shadow-sm"
                      : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400 bg-white dark:bg-stone-800"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />}
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Wishlist Bar */}
      <div className="flex items-center gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
            Quantity
          </span>
          <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-850 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease item quantity"
              className="p-3 text-stone-600 dark:text-stone-300 hover:text-stone-900 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-bold text-base text-stone-900 dark:text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase item quantity"
              className="p-3 text-stone-600 dark:text-stone-300 hover:text-stone-900 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wishlist Heart Button */}
        <div className="space-y-1.5 flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
            Save For Later
          </span>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isWishlisted ? "Remove from saved favorites" : "Save to favorites"}
            className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 min-h-[46px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              isWishlisted
                ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400"
                : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-200 hover:border-rose-300 hover:text-rose-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
          </button>
        </div>
      </div>

      {/* Main Buy Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2 min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 active:scale-[0.99]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 active:scale-[0.99]"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Instant Checkout</span>
        </button>
      </div>

      {/* Free Shipping Highlight Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-300">
        <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          <strong>Free Pan-India Delivery:</strong> Orders with this item qualify for zero-cost climate-neutral doorstep courier shipping.
        </span>
      </div>

      {/* Promo Code Hint */}
      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>
          Use code <strong className="text-stone-800 dark:text-stone-200 font-mono">BAMBOO10</strong> at checkout for 10% off your entire order.
        </span>
      </div>
    </div>
  );
}
