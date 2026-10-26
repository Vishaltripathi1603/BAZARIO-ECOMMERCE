"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
} from "lucide-react";

function QuickViewDialogContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions[0] || "Natural Moso"
  );

  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div
      className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col md:flex-row relative animate-scaleUp"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product quick view"
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Product Media Column */}
      <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-stone-100 dark:bg-stone-800">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 dark:bg-stone-900/90 text-emerald-800 dark:text-emerald-400 shadow-sm border border-stone-200/80">
            {product.subcategory}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm border border-stone-200/80 text-[11px] text-stone-600 dark:text-stone-300 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="truncate">{product.materials}</span>
        </div>
      </div>

      {/* Product Info & Controls Column */}
      <div className="p-6 sm:p-8 md:w-1/2 overflow-y-auto flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              SKU: {product.sku}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              In Stock
            </span>
          </div>

          <h2
            id="quick-view-title"
            className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white leading-tight"
          >
            {product.name}
          </h2>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              (Inclusive of all taxes)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>

          {/* Color Selector */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                Finish: <span className="text-stone-900 dark:text-white normal-case">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition min-h-[36px] ${
                      selectedColor === c
                        ? "border-emerald-800 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-300 ring-2 ring-emerald-800/20"
                        : "border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`p-3 rounded-xl border transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isWishlisted
                    ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400"
                    : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400 hover:text-rose-600"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg hover:shadow-xl transition min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
          </button>

          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition"
          >
            <span>View Full Specifications & Ethos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-1">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3" /> Free Shipping ₹999+
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 1-Year Craft Warranty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useCart();

  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <QuickViewDialogContent
        key={quickViewProduct.id}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
