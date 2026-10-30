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
  Sparkles,
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
    product.colorOptions?.[0] || "Standard"
  );

  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
    setIsCartOpen(true);
  };

  const primaryImage = product.images?.[0] || {
    url: "/images/categories/bamboo-cutting-boards.svg",
    alt: product.name,
  };

  return (
    <div
      className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col md:flex-row relative animate-scaleUp"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product quick view"
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Product Media Column */}
      <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-slate-100 dark:bg-slate-800">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
        />
        {product.tier === "flagship" && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-600 text-white shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" /> 3D Flagship
          </span>
        )}
      </div>

      {/* Product Info Column */}
      <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <span>SKU: {product.sku}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
              {product.name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.deal && (
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                {product.deal.badge}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>

          {/* Color / Finish */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Finish: {selectedColor}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-semibold transition ${
                      selectedColor === c
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 ring-2 ring-teal-600/30"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3 mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden shadow-sm h-11">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="px-3 h-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
                className="px-3 h-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 h-11 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                isWishlisted
                  ? "bg-rose-50 border-rose-300 text-rose-600"
                  : "border-slate-300 dark:border-slate-700 text-slate-600 hover:text-rose-600"
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
            </button>
          </div>

          <div className="pt-2 text-center">
            <Link
              href={`/p/${product.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
            >
              <span>View Full Technical Product Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useCart();

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
      aria-label="Quick View Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <QuickViewDialogContent
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
