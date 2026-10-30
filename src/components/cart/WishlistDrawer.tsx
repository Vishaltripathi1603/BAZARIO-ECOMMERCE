"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/lib/data";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useCart();

  if (!isWishlistOpen) return null;

  const allProducts = getAllProducts();
  const bookmarkedItems = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Favorites & Wishlist"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Saved Favorites
              </h2>
              <p className="text-xs text-slate-500">
                {bookmarkedItems.length} {bookmarkedItems.length === 1 ? "item saved" : "items saved"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
          {bookmarkedItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-slate-800 flex items-center justify-center mx-auto text-rose-400">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No items saved yet
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any product across our 26 departments to bookmark it for later.
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  onClick={() => setIsWishlistOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition min-h-[44px]"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            bookmarkedItems.map((product) => (
              <div
                key={product.id}
                className="pt-4 first:pt-0 flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                  <Image
                    src={product.images?.[0]?.url || "/images/categories/bamboo-cutting-boards.svg"}
                    alt={product.images?.[0]?.alt || product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Move to Bag */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wide truncate block">
                    {product.brand} &bull; {product.subcategory}
                  </span>
                  <Link
                    href={`/p/${product.slug}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-sm font-bold text-slate-900 dark:text-white truncate block hover:text-teal-600 transition"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-bold hover:bg-teal-800 transition min-h-[32px]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition min-h-[32px] min-w-[32px] flex items-center justify-center"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
