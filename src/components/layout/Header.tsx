"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  Percent,
  Compass,
  BookOpen,
  Info,
  ChevronDown,
} from "lucide-react";
import Logo from "../ui/Logo";
import SearchAutosuggest from "./SearchAutosuggest";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "../ui/ThemeToggle";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { SITE_CONFIG } from "@/../config/site";
import {
  User as UserIcon,
  LogOut,
  MapPin,
  Package as PackageIcon,
  ShieldCheck,
} from "lucide-react";

// Import department data for immediate menu rendering
import departmentsData from "../../../data/departments.json";
import subdepartmentsData from "../../../data/subdepartments.json";
import { Department, SubDepartment } from "@/lib/types";

const departments = departmentsData as Department[];
const subDepartments = subdepartmentsData as SubDepartment[];

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { user, profile, signOut } = useAuth();
  const { items, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart();
  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Close account menu on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    if (isAccountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountMenuOpen]);

  // Close account menu on route change
  React.useEffect(() => {
    setIsAccountMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const displayName = profile?.first_name || (user?.email ? user.email.split("@")[0] : null);

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-teal-800 text-white text-sm font-semibold rounded-lg shadow-xl ring-2 ring-white transition"
      >
        Skip to main content
      </a>

      {/* Top Banner: Academic SEO Project Notice */}
      <aside
        aria-label="Academic project disclaimer and shipping notice"
        className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 font-medium tracking-wide border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-amber-300 font-semibold">{SITE_CONFIG.academicNotice}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Free Pan-India Delivery on &ge; ₹999</span>
            <span>&bull;</span>
            <span>Use code <strong className="text-teal-400">BAZARIO10</strong> for 10% off</span>
          </div>
        </div>
      </aside>

      {/* Main Primary Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-4">
            {/* Logo */}
            <Logo variant="full" />

            {/* Central Search Autosuggest (Desktop & Tablet) */}
            <div className="hidden md:block flex-1 max-w-2xl mx-2">
              <SearchAutosuggest departments={departments} />
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Amazon-style Account & Lists Dropdown */}
              <div className="relative hidden sm:block" ref={accountRef}>
                <button
                  type="button"
                  id="account-menu-button"
                  onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                  onMouseEnter={() => setIsAccountMenuOpen(true)}
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="true"
                  className="flex flex-col items-start px-2.5 py-1 rounded-xl hover:ring-1 hover:ring-teal-500/50 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight truncate max-w-[120px]">
                    {user ? `Hello, ${displayName}` : "Hello, sign in"}
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-0.5 leading-tight">
                    <span>Account &amp; Lists</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </button>

                {isAccountMenuOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="account-menu-button"
                    onMouseLeave={() => setIsAccountMenuOpen(false)}
                    className="absolute right-0 mt-1 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-3 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    {!user ? (
                      <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-center space-y-2">
                        <Link
                          href="/signin"
                          className="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition"
                        >
                          Sign In
                        </Link>
                        <p className="text-[11px] text-slate-500">
                          New customer?{" "}
                          <Link
                            href="/signup"
                            className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                          >
                            Start here.
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 tracking-wider">
                          Signed in as
                        </p>
                        <p className="font-bold text-slate-900 dark:text-white truncate">
                          {user.email}
                        </p>
                      </div>
                    )}

                    <div className="py-2">
                      <div className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Your Account
                      </div>

                      <Link
                        href="/account"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>Your Account Hub</span>
                      </Link>

                      <Link
                        href="/account/orders"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                      >
                        <PackageIcon className="w-3.5 h-3.5" />
                        <span>Your Orders</span>
                      </Link>

                      <Link
                        href="/account/wishlist"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Your Wishlist ({wishlist.length})</span>
                      </Link>

                      <Link
                        href="/account/addresses"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Your Addresses</span>
                      </Link>

                      <Link
                        href="/account/security"
                        role="menuitem"
                        className="flex items-center gap-2.5 px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Login &amp; Security</span>
                      </Link>
                    </div>

                    {user && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button with Live Counter */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label={`Open Wishlist, ${wishlist.length} saved items`}
                className="relative p-2.5 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.length > 0 ? "text-rose-600 fill-rose-600" : ""
                  }`}
                />
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
                className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md hover:shadow-lg transition min-h-[44px] min-w-[44px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Phone view) */}
          <div className="md:hidden pb-3">
            <SearchAutosuggest departments={departments} />
          </div>
        </div>

        {/* Secondary Navigation Strip (Amazon-style department bar) */}
        <div className="bg-slate-800 text-slate-200 border-t border-slate-700/80 text-xs font-semibold overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 h-11">
            {/* Mega Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-500 transition shrink-0 min-h-[36px]"
              aria-label="Open All Departments Mega Menu"
            >
              <Menu className="w-4 h-4" />
              <span>All Departments</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Quick Department & Special Links */}
            <nav aria-label="Secondary Navigation" className="flex items-center gap-1 shrink-0">
              <Link
                href="/d/sustainable-bamboo"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 min-h-[36px] ${
                  isActive("/d/sustainable-bamboo")
                    ? "bg-slate-700 text-teal-300 font-bold"
                    : "hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sustainable Bamboo</span>
              </Link>

              <Link
                href="/d/sustainable-desk-accessories"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 min-h-[36px] ${
                  isActive("/d/sustainable-desk-accessories")
                    ? "bg-slate-700 text-teal-300 font-bold"
                    : "hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Desk Accessories</span>
              </Link>

              <Link
                href="/deals"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 min-h-[36px] ${
                  isActive("/deals")
                    ? "bg-amber-400 text-slate-950 font-black"
                    : "text-amber-300 hover:bg-slate-700/60 hover:text-amber-200"
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Today&apos;s Deals</span>
              </Link>

              <Link
                href="/departments/all"
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 min-h-[36px] ${
                  isActive("/departments/all")
                    ? "bg-slate-700 text-teal-300 font-bold"
                    : "hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-teal-400" />
                <span>A-Z Directory</span>
              </Link>

              <Link
                href="/blog"
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition min-h-[36px] ${
                  isActive("/blog")
                    ? "bg-slate-700 text-teal-300 font-bold"
                    : "hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Editorial Guides</span>
              </Link>

              <Link
                href="/about"
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition min-h-[36px] ${
                  isActive("/about")
                    ? "bg-slate-700 text-teal-300 font-bold"
                    : "hover:bg-slate-700/60 hover:text-white"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Academic Ethos</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 animate-fadeIn"
          >
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMegaMenuOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-teal-600 text-white font-bold rounded-xl text-sm min-h-[44px] shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  <span>Browse All 26 Departments</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <nav aria-label="Mobile Secondary Links" className="flex flex-col gap-1">
              <Link
                href="/d/sustainable-bamboo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Sustainable Bamboo (Flagship)
              </Link>
              <Link
                href="/d/sustainable-desk-accessories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Desk Accessories (Flagship)
              </Link>
              <Link
                href="/deals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Today&apos;s Flash Deals
              </Link>
              <Link
                href="/departments/all"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                A-Z Directory (1,099 Categories)
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Editorial Guides
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] flex items-center"
              >
                Academic Project Ethos
              </Link>
            </nav>

            {/* Mobile Account Section */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">
                        Signed in as
                      </p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                        {user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-teal-600" />
                      <span>Account</span>
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2"
                    >
                      <PackageIcon className="w-3.5 h-3.5 text-teal-600" />
                      <span>Orders</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-center text-xs font-bold transition shadow-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-center text-xs font-bold transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Accessible Slide-out Mega Menu */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        departments={departments}
        subDepartments={subDepartments}
      />
    </>
  );
}
