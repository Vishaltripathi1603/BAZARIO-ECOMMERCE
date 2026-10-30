import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Layers,
  Compass,
} from "lucide-react";
import { SITE_CONFIG } from "@/../config/site";

export const metadata: Metadata = {
  title: "About Bazario & Technical SEO Architecture",
  description:
    "Learn about the academic mission behind Bazario: building a scalable 3-tier marketplace prototype with white-hat technical SEO and crawlability.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  openGraph: {
    title: "About Bazario & Technical SEO Architecture",
    description:
      "Learn about the academic mission behind Bazario: building a scalable 3-tier marketplace prototype with white-hat technical SEO and crawlability.",
    url: getCanonicalUrl("/about"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: "About & Documentation", url: "/about" }]} />

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Marketplace Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About Bazario &amp; The Academic SEO Prototype
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {SITE_CONFIG.tagline} An immersive, Amazon-style multi-category marketplace prototype engineered to solve search visibility, faceted crawl traps, and catalog indexability at scale.
        </p>
      </header>

      {/* Academic Prototype Disclosure Block */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Project Context</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          B.Tech CSE Sem VII &bull; Group SEO-027
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Mandatory Academic Disclosure:</strong> {SITE_CONFIG.academicNotice} Developed as a research project for Department of Computer Science &amp; Engineering. All product listings, brand names, and transactions are simulated prototypes. No real financial payments are accepted.
        </p>
      </div>

      {/* Key Architectural Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Three Architectural Pillars of the Bazario Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              3-Tier Semantic Taxonomy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              26 Departments, 157 Sub-departments, and 1,099 Leaf Categories structured to distribute PageRank evenly and establish clear topical clusters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Zero Orphan Pages (&le; 3 Clicks)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every single leaf category is crawlable through both the slide-out Mega Menu and the complete alphabetical A-Z Directory within at most 3 clicks of the home page.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Pure White-Hat SEO Integrity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero fabricated ratings or fake review stars in schema. Dynamic canonical URLs that collapse faceted filter variants into clean indexing paths.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainable Bamboo Ethos */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Flagship Focus: Sustainable Moso Bamboo
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          While Bazario features a comprehensive 26-department marketplace, our signature flagships remain our certified renewable Moso bamboo kitchenware and ergonomic workspace accessories. Moso bamboo matures in just 3 to 5 years, produces 35% more oxygen than equivalent hardwood stands, and sequesters carbon without chemical pesticides.
        </p>

        <div className="pt-2">
          <Link
            href="/d/sustainable-bamboo"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <span>Explore the Sustainable Bamboo Flagship Line</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
