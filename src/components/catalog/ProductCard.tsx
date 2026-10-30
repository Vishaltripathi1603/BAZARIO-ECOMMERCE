"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Heart, Eye, ShoppingBag, Sparkles, Tag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart, setIsCartOpen } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const primaryImage = product.images?.[0] || {
    url: "/images/categories/bamboo-cutting-boards.svg",
    alt: product.name,
  };

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden block">
        <Link
          href={`/p/${product.slug}`}
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.tier === "flagship" && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-600 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>3D Flagship</span>
            </span>
          )}
          {product.deal && (
            <span className="px-2 py-0.5 text-xs font-black rounded-full bg-amber-500 text-slate-950 shadow-sm">
              {product.deal.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button (Tap target >= 44x44px) */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute top-2.5 right-2.5 z-20 w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 shadow-md backdrop-blur-sm flex items-center justify-center transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "text-rose-600 fill-rose-600" : ""
            }`}
          />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <button
            type="button"
            onClick={handleQuickView}
            className="pointer-events-auto px-4 py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition-all active:scale-95 min-h-[38px]"
          >
            <Eye className="w-3.5 h-3.5 text-teal-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Brand & Subcategory Tag */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-teal-700 dark:text-teal-400 truncate max-w-[140px]">
              {product.brand}
            </span>
            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md truncate max-w-[140px]">
              {product.subcategory}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            <Link
              href={`/p/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
            >
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price and Cart Action */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-teal-700 dark:text-teal-400 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>In Stock &bull; Free Delivery</span>
            </div>
          </div>

          {/* Add to Bag Button (Touch target >= 44x44px) */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to shopping bag`}
            className="w-11 h-11 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
