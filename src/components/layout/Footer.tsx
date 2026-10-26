import React from "react";
import Link from "next/link";
import { Leaf, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
              aria-label="BambooNest - Home"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5 text-amber-200" aria-hidden="true" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Bamboo<span className="text-emerald-400">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Sustainable bamboo for the way you work and live. Handcrafted, renewable home goods and ergonomic desk accessories designed to replace single-use plastics and elevate mindful productivity.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Certified responsibly harvested non-panda Moso bamboo</span>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Catalog
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  All 32 Products
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sustainable-bamboo"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Sustainable Bamboo
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sustainable-desk-accessories"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Desk Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/eco-dining-kitchenware"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Dining & Kitchenware
                </Link>
              </li>
              <li>
                <Link
                  href="/category/bamboo-wellness-decor"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Wellness & Living Decor
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
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  All Buying Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/why-choose-bamboo-over-plastic"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Bamboo vs. Plastic
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-set-up-an-eco-friendly-home-office"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Eco Home Office Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-care-for-bamboo-products"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Bamboo Care & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical & Ethics */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              About & Trust
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Sustainability Promise
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  prefetch={false}
                  className="hover:text-emerald-400 transition-colors py-1 inline-flex items-center gap-1"
                >
                  XML Sitemap <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/robots.txt"
                  prefetch={false}
                  className="hover:text-emerald-400 transition-colors py-1 inline-flex items-center gap-1"
                >
                  Robots.txt <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/this-page-does-not-exist"
                  className="hover:text-emerald-400 transition-colors py-1 inline-block text-stone-500"
                >
                  Custom 404 Check
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Metadata & Academic Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>
              <strong>Project:</strong> E-commerce SEO Prototype (B.Tech CSE Sem VII, Group SEO-027)
            </span>
          </div>
          <p className="text-center md:text-right">
            White-Hat Architecture: SSG Pre-rendering • Semantic Schema • Zero Fabricated Reviews • Accessible WCAG AA
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-stone-800/60 text-center text-[11px] text-stone-500">
          &copy; 2026 BambooNest Storefront Prototype. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
