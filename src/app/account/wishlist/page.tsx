"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/lib/data";
import { formatINR } from "@/lib/format";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  Package,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AccountWishlistPage() {
  const { wishlist, toggleWishlist, addToCart, addToast } = useCart();
  const allProducts = useMemo(() => getAllProducts(), []);

  const wishlistProducts = useMemo(() => {
    return allProducts.filter((p) => wishlist.includes(p.id) || wishlist.includes(p.slug));
  }, [wishlist, allProducts]);

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
    addToast("Moved to Shopping Bag", `${product.name} is ready for checkout.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
            aria-label="Back to Account"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Your Wishlist</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                {wishlistProducts.length} items
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Save your favourite items across all 26 departments and buy them anytime
            </p>
          </div>
        </div>

        {wishlistProducts.length > 0 && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition w-fit"
          >
            <span>Continue Shopping</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-16 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4 bg-white dark:bg-slate-900">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Your wishlist is currently empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Tap the heart icon on any product in our catalog to bookmark it for later.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Discover Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlistProducts.map((product) => {
            const firstImg = product.images?.[0];
            const primaryImageUrl =
              typeof firstImg === "string"
                ? firstImg
                : firstImg?.url || product.image || "";
            const originalPrice = product.originalPrice || product.compareAtPrice;

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {primaryImageUrl ? (
                      <img
                        src={primaryImageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Package className="w-10 h-10" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition shadow-xs"
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {product.tier === "flagship" && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-600 text-white shadow-xs">
                        <Sparkles className="w-2.5 h-2.5" /> Flagship
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      {product.departmentSlug?.replace(/-/g, " ")}
                    </span>
                    <Link
                      href={`/p/${product.slug}`}
                      className="block text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-teal-600 transition"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {formatINR(product.price)}
                      </span>
                      {originalPrice && originalPrice > product.price && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatINR(originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
