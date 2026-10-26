"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shipping,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    applyPromoCode,
    promoCode,
    promoError,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromoCode(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#FBF9F5] dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                Your Shopping Bag
              </h2>
              <p className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? "sustainable item" : "sustainable items"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {amountNeededForFreeShipping === 0
                ? "You unlocked Free Pan-India Delivery!"
                : `Add ₹${amountNeededForFreeShipping} more for Free Shipping`}
            </span>
            <span className="font-bold text-emerald-800 dark:text-emerald-400">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full bg-emerald-200/60 dark:bg-emerald-900/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 dark:divide-stone-800 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                Your shopping bag is empty
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                Explore our handcrafted bamboo tableware, desk risers, and home decor to begin your sustainable journey.
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition min-h-[44px]"
                >
                  <span>Browse All 32 Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="pt-4 first:pt-0 flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <div className="relative w-18 h-18 shrink-0 rounded-xl bg-stone-100 dark:bg-stone-800 overflow-hidden border border-stone-200 dark:border-stone-700">
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.images[0].alt}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Variant: {item.selectedColor}
                  </p>
                  <p className="text-sm font-black text-stone-900 dark:text-white mt-1">
                    ₹{item.product.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="inline-flex items-center rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                        className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-l-lg min-h-[32px] min-w-[32px] flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                        className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-r-lg min-h-[32px] min-w-[32px] flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Coupon code (e.g. BAMBOO10)"
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition min-h-[36px]"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-[11px] text-red-600">{promoError}</p>
              )}
              {promoCode && (
                <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Coupon &ldquo;{promoCode}&rdquo; active!
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Eco Promo Discount</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pan-India Shipping</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <span>Proceed to Eco Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
