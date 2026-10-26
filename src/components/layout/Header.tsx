"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Leaf, Sparkles, Heart, ShoppingBag } from "lucide-react";
import SearchModal from "../catalog/SearchModal";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { items, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart();
  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "All Catalog", href: "/products" },
    { label: "Sustainable Bamboo", href: "/category/sustainable-bamboo" },
    { label: "Desk Goods", href: "/category/sustainable-desk-accessories" },
    { label: "Kitchenware", href: "/category/eco-dining-kitchenware" },
    { label: "Wellness & Decor", href: "/category/bamboo-wellness-decor" },
    { label: "Guides", href: "/blog" },
    { label: "Ethos", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-emerald-800 text-white text-sm font-semibold rounded-lg shadow-xl ring-2 ring-white transition"
      >
        Skip to main content
      </a>

      {/* Top Banner: Sustainability & Free Shipping Notice */}
      <div className="bg-[#23461E] text-stone-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
        <span>100% Organically Grown Moso Bamboo • Free Pan-India Shipping on Orders Over ₹999</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1 shrink-0"
              aria-label="BambooNest - Return to homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-amber-200" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                  Bamboo<span className="text-emerald-800 dark:text-emerald-500">Nest</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-stone-500 dark:text-stone-400 font-semibold -mt-1 hidden sm:block">
                  Sustainable Living & Desk Goods
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main Navigation"
              className="hidden xl:flex items-center gap-1"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      active
                        ? "text-emerald-800 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/50"
                        : "text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-stone-100/60 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Quick Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open product search"
                className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700 rounded-full border border-stone-200 dark:border-stone-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 min-h-[44px] min-w-[44px] justify-center"
              >
                <Search className="w-4 h-4 text-emerald-800 dark:text-emerald-400" aria-hidden="true" />
                <span className="hidden md:inline font-medium">Search</span>
                <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-stone-400">
                  Ctrl+K
                </kbd>
              </button>

              {/* Wishlist Button with Live Counter */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label={`Open Wishlist, ${wishlist.length} saved items`}
                className="relative p-2.5 text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700 rounded-full border border-stone-200 dark:border-stone-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? "text-rose-600 fill-rose-600" : ""}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-md animate-scaleUp">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button with Live Counter */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open Shopping Bag, ${totalCartCount} items`}
                className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-full shadow-md hover:shadow-lg transition min-h-[44px] min-w-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-black flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                className="xl:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="xl:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-stone-900 px-4 pt-3 pb-6 animate-fadeIn"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between min-h-[44px] transition-colors ${
                      active
                        ? "text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
                        : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold rounded-xl text-sm min-h-[44px]"
              >
                <Search className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span>Search All 32 Products</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-800 text-white font-bold rounded-xl text-sm min-h-[44px] shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Shopping Bag ({totalCartCount} Items)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
