import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Search } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Browse our sustainable bamboo categories or return home.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8 animate-fadeIn">
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-400 mx-auto shadow-inner">
        <Compass className="w-10 h-10 animate-pulse" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          404 Error • Path Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Let&apos;s Get You Back to Sustainable Living
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
          The page or product link you requested may have been moved or updated. Explore our core bamboo collections below:
        </p>
      </div>

      {/* Direct Category Recovery Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
        <Link
          href="/category/sustainable-bamboo"
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-emerald-700 transition group"
        >
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
            Kitchen & Bathroom
          </span>
          <h2 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
            Sustainable Bamboo Collection
          </h2>
          <span className="text-xs text-stone-500 flex items-center gap-1 mt-2">
            Browse 8 Products <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/category/sustainable-desk-accessories"
          className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-emerald-700 transition group"
        >
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
            Home Office Ergonomics
          </span>
          <h2 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
            Desk Accessories Collection
          </h2>
          <span className="text-xs text-stone-500 flex items-center gap-1 mt-2">
            Browse 8 Products <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Return Home Button */}
      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-800 text-white font-bold text-sm rounded-xl hover:bg-emerald-900 transition shadow-lg min-h-[44px]"
        >
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-sm rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition min-h-[44px]"
        >
          <Search className="w-4 h-4" />
          <span>Browse All 16 Products</span>
        </Link>
      </div>
    </div>
  );
}
