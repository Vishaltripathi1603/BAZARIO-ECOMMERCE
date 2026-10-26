"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, AlertCircle, Heart, Eye, ShoppingBag } from "lucide-react";
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

  return (
    <article className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 dark:bg-stone-800 overflow-hidden block">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 shadow-sm backdrop-blur-sm border border-stone-200/60 dark:border-stone-700/60">
            {product.subcategory}
          </span>
        </div>

        {/* Top Right Actions: Wishlist Heart & Stock Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition min-h-[38px] min-w-[38px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              isWishlisted
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                : "bg-white/90 text-stone-600 hover:text-rose-600 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:text-rose-400"
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Floating Quick Action Overlay on Card Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            aria-label={`Quick view ${product.name}`}
            className="flex-1 py-2 px-3 rounded-xl bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 text-xs font-bold shadow-lg hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center gap-1.5 min-h-[40px] transition backdrop-blur-md"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} directly to shopping bag`}
            className="py-2 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-1 min-h-[40px] transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>+ Bag</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Stock & Material Header */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0"></span>
              <span className="truncate max-w-[140px]">{product.materials}</span>
            </span>

            {product.inStock ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <AlertCircle className="w-3 h-3" />
                Restocking
              </span>
            )}
          </div>

          {/* Primary Keyword / Product Name Heading */}
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
            <Link
              href={`/products/${product.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
            >
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Call To Action */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
              Price (INR)
            </span>
            <span className="text-lg font-black text-stone-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to shopping bag`}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-xl bg-emerald-800 text-white min-h-[44px] min-w-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <Link
              href={`/products/${product.slug}`}
              aria-label={`View details and specifications for ${product.name}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-emerald-800 hover:text-white dark:hover:bg-emerald-700 dark:hover:text-white transition-all min-h-[44px] min-w-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
