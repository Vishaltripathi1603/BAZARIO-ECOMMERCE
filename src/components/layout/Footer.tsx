import React from "react";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
import Logo from "../ui/Logo";
import { SITE_CONFIG } from "@/../config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Academic Project Highlight Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {SITE_CONFIG.academicNotice}
              </p>
              <p className="text-xs text-slate-400">
                Department of Computer Science & Engineering &bull; Group SEO-027 &bull; Semester VII
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400">Pure White-Hat SEO Architecture</span>
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold transition"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>

        {/* Top Grid: 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" theme="light" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {SITE_CONFIG.tagline} A modern, high-speed multi-category marketplace prototype engineered with white-hat technical SEO, 3-tier semantic taxonomy, and authentic product discovery.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <span>Zero fabricated customer reviews or fake stars</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>26 Departments, 157 Sub-Departments, 1,099 Leaf Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Zero orphan pages &bull; All products reachable within &le; 3 clicks</span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Marketplace Lines
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/d/sustainable-bamboo"
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1.5 font-semibold text-teal-300"
                >
                  <span>Sustainable Bamboo</span>
                  <span className="text-[10px] bg-teal-900/60 text-teal-300 px-1.5 py-0.5 rounded uppercase">Flagship</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/d/sustainable-desk-accessories"
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1.5 font-semibold text-amber-300"
                >
                  <span>Desk Accessories</span>
                  <span className="text-[10px] bg-amber-950/60 text-amber-300 px-1.5 py-0.5 rounded uppercase">Flagship</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/departments"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  All 26 Departments
                </Link>
              </li>
              <li>
                <Link
                  href="/departments/all"
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1 font-semibold text-white"
                >
                  <span>A-Z Directory (1,099 Categories)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="hover:text-amber-400 transition-colors py-1 inline-block text-amber-300 font-semibold"
                >
                  Today&apos;s Flash Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Guides */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Buying & Care Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  All Buying Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/why-choose-bamboo-over-plastic"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Bamboo vs. Plastic
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-set-up-an-eco-friendly-home-office"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Eco Home Office Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-care-for-bamboo-products"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Bamboo Care & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical SEO & Compliance */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Technical SEO
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Project Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/credits"
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1 font-semibold text-teal-300"
                >
                  <span>Image Credits &amp; Licenses</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="hover:text-teal-400 transition-colors py-1 inline-block"
                >
                  Your Account Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  prefetch={false}
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1"
                >
                  <span>Split XML Sitemap</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/robots.txt"
                  prefetch={false}
                  className="hover:text-teal-400 transition-colors py-1 inline-flex items-center gap-1"
                >
                  <span>Robots.txt</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/this-page-does-not-exist"
                  className="hover:text-teal-400 transition-colors py-1 inline-block text-slate-500"
                >
                  Custom 404 Route
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Metadata & Academic Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>
              <strong>Project:</strong> {SITE_CONFIG.name} Marketplace &bull; B.Tech CSE Sem VII, Group SEO-027
            </span>
          </div>
          <p className="text-center md:text-right">
            White-Hat Architecture: SSG Pre-rendering &bull; Semantic Schema &bull; Zero Fabricated Reviews &bull; Accessible WCAG AA
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Academic Prototype Storefront. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
