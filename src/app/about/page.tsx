import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  Leaf,
  ShieldCheck,
  TreePine,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability Promise & Craft",
  description:
    "Learn about BambooNest's ethical sourcing of mature Moso bamboo, non-toxic botanical finishes, and engineering standards for renewable living.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  openGraph: {
    title: "Sustainability Promise & Craft | BambooNest",
    description:
      "Learn about BambooNest's ethical sourcing of mature Moso bamboo, non-toxic botanical finishes, and engineering standards for renewable living.",
    url: getCanonicalUrl("/about"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: "About & Sustainability", url: "/about" }]} />

      {/* Header */}
      <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>Our Ethical Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Our Sustainability Promise & Renewable Bamboo Craft
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Founded with a clear architectural mandate: replace single-use plastics and chemical-treated hardwoods with rapidly renewable, precision-crafted Moso bamboo goods designed for mindful households and productive home offices.
        </p>
      </header>

      {/* Academic Prototype Disclosure Block */}
      <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          <Cpu className="w-4 h-4" />
          <span>Academic Project Context</span>
        </div>
        <h2 className="text-lg font-bold text-stone-900 dark:text-white">
          B.Tech CSE Sem VII — Technical Group SEO-027
        </h2>
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          This platform is an engineering prototype specifically built to address search visibility, faceted indexation traps, crawl budget optimization, and semantic schema modeling for small e-commerce catalogs. Every product description is 100% freshly written with zero duplicated text, and no fraudulent reviews or fictitious ratings have been injected into schema markup.
        </p>
      </div>

      {/* 4 Core Sourcing Pillars */}
      <section aria-labelledby="pillars-heading" className="space-y-6">
        <h2 id="pillars-heading" className="text-2xl font-bold text-stone-900 dark:text-white">
          Our Four Pillars of Responsible Craft
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Cyclical Thinning Harvests
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We exclusively harvest mature 4-to-5-year-old culms from certified groves. The subterranean root rhizomes are left fully intact, preventing soil erosion and allowing new shoots to erupt without replanting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Food-Safe Botanical Finishes
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Every cutting board, utensil, and desk mat is treated with pure plant oils and beeswax. Free from formaldehyde adhesives, synthetic resins, BPA, and toxic volatile organic compounds (VOCs).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Non-Panda Habitat Groves
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Our raw materials are sourced outside protected panda wildlife zones. We utilize Phyllostachys edulis (Moso bamboo), a tall timber variety not consumed as a primary food source by giant pandas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Plastic-Free Packaging
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Orders are packaged in unbleached kraft cardboard, paper tape, and biodegradable cornstarch cushioning, eliminating single-use plastic wrapping at every distribution stage.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Navigation CTAs */}
      <div className="p-8 rounded-3xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white">
          Explore Our Sustainable Catalogs
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          Discover how renewable bamboo can upgrade your daily kitchen and workspace routines:
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/category/sustainable-bamboo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition min-h-[44px]"
          >
            <span>Sustainable Bamboo (Kitchen & Home)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/category/sustainable-desk-accessories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition min-h-[44px]"
          >
            <span>Sustainable Desk Accessories (Ergonomics)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-300 dark:hover:bg-stone-600 transition min-h-[44px]"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
