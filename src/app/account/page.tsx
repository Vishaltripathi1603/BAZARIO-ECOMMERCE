"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Package,
  Shield,
  MapPin,
  Heart,
  User,
  CreditCard,
  Bell,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function AccountHubPage() {
  const { user, profile, signOut } = useAuth();

  const greetingName = profile?.first_name || user?.email?.split("@")[0] || "Shopper";

  const accountCards = [
    {
      title: "Your Orders",
      description: "Track deliveries, review past purchases, or reorder items",
      href: "/account/orders",
      icon: Package,
      badge: null,
    },
    {
      title: "Login & Security",
      description: "Edit password, email address, and security sessions",
      href: "/account/security",
      icon: Shield,
      badge: null,
    },
    {
      title: "Your Addresses",
      description: "Edit and manage saved pan-India delivery destinations",
      href: "/account/addresses",
      icon: MapPin,
      badge: null,
    },
    {
      title: "Your Wishlist",
      description: "Explore bookmarked products across all 26 departments",
      href: "/account/wishlist",
      icon: Heart,
      badge: null,
    },
    {
      title: "Profile & Preferences",
      description: "Manage phone number, avatar, and dark mode theme",
      href: "/account/profile",
      icon: User,
      badge: "Customizable",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white border border-teal-500/20 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 font-black text-xl flex items-center justify-center shrink-0">
            {greetingName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Hello, {greetingName}
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500 text-slate-950">
                <Sparkles className="w-3 h-3" /> Verified Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Account: {user?.email || "Authenticated Shopper"} &bull; Row Level Security Enabled
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700 w-fit"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Amazon-Style Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-500 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {card.title}
                  </h2>
                  {card.badge && (
                    <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0 mt-3" />
            </Link>
          );
        })}
      </div>

      {/* Academic Privacy & Security Assurance */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>
          <strong>Data Privacy:</strong> All orders, addresses, and wishlist items are isolated to your account via Supabase Row Level Security (RLS).
        </span>
        <Link
          href="/about"
          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline shrink-0"
        >
          View Architecture Docs &rarr;
        </Link>
      </div>
    </div>
  );
}
