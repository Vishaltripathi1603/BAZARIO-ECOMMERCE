import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/../config/site";

interface LogoProps {
  variant?: "full" | "icon" | "compact";
  className?: string;
  theme?: "light" | "dark" | "auto";
}

export default function Logo({
  variant = "full",
  className = "",
  theme = "auto",
}: LogoProps) {
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl p-1 transition ${className}`}
      aria-label={`${SITE_CONFIG.name} — Return to homepage`}
    >
      {/* Original Geometric Marketplace Icon */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          aria-hidden="true"
        >
          {/* Marketplace Prism Facets */}
          <path
            d="M16 4L27 10V22L16 28L5 22V10L16 4Z"
            stroke="#5EEAD4"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M16 4V28"
            stroke="#2DD4BF"
            strokeWidth="1.25"
            strokeDasharray="2 2"
          />
          <path
            d="M5 10L16 16L27 10"
            stroke="#99F6E4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Dynamic delivery swoosh */}
          <path
            d="M10 20C13 23 19 23 22 17"
            stroke="#F59E0B"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <circle cx="22" cy="17" r="1.5" fill="#F59E0B" />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`text-2xl font-black tracking-tight font-sans ${
                isLight
                  ? "text-white"
                  : isDark
                  ? "text-slate-900"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              Baza<span className="text-teal-600 dark:text-teal-400">rio</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-0.5 mt-2 animate-pulse" />
          </div>

          {variant === "full" && (
            <span
              className={`text-[9px] tracking-widest uppercase font-bold -mt-1 hidden sm:block ${
                isLight
                  ? "text-teal-200"
                  : isDark
                  ? "text-slate-500"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Marketplace
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
