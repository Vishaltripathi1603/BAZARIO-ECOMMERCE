import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Sparkles,
  Percent,
  ShieldCheck,
  Compass,
  GraduationCap,
  Layers,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import {
  getAllDepartments,
  getFlagshipDepartments,
  getDealProducts,
  getFlagshipProducts,
  getAllBlogPosts,
} from "@/lib/data";
import ProductCard from "@/components/catalog/ProductCard";
import { SITE_CONFIG } from "@/../config/site";

import Hero3DWrapper from "@/components/3d/Hero3DWrapper";

export default function HomePage() {
  const departments = getAllDepartments();
  const flagshipDepts = getFlagshipDepartments();
  const dealProducts = getDealProducts(8);
  const flagshipProducts = getFlagshipProducts();
  const blogs = getAllBlogPosts();

  // Flagship subsets
  const bambooProducts = flagshipProducts
    .filter((p) => p.departmentSlug === "sustainable-bamboo")
    .slice(0, 4);
  const deskProducts = flagshipProducts
    .filter((p) => p.departmentSlug === "sustainable-desk-accessories")
    .slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section with Interactive 3D Scene */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 text-teal-900 dark:bg-teal-950/80 dark:text-teal-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" aria-hidden="true" />
                <span>Next-Gen E-Commerce Architecture &bull; 26 Departments</span>
              </div>

              {/* Exact Single H1 on Page */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Everything You Need,{" "}
                <span className="text-teal-700 dark:text-teal-400 underline decoration-amber-500/60 decoration-wavy decoration-2">
                  Beautifully Delivered.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Discover over 3,300 curated essentials across 26 marketplace departments. Featuring certified organic bamboo flagships, ergonomic work setups, and zero-compromise technical SEO architecture.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/departments"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-h-[48px]"
                >
                  <span>Explore 26 Departments</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/departments/all"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition min-h-[48px]"
                >
                  <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>A-Z Directory (1,099 Categories)</span>
                </Link>
              </div>

              {/* Quick Metrics */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="block text-xl font-black text-slate-900 dark:text-white">26</span>
                  <span className="text-slate-500">Departments</span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-900 dark:text-white">1,099</span>
                  <span className="text-slate-500">Leaf Categories</span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-900 dark:text-white">3,329</span>
                  <span className="text-slate-500">Indexed Products</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Canvas */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
                <Hero3DWrapper />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Department (All 26 Departments Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Crawlable Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Shop by Department
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Every department features verified sub-departments and indexable leaf categories.
            </p>
          </div>
          <Link
            href="/departments/all"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 transition"
          >
            <span>View Complete A-Z Directory</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 26 Departments Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {departments.map((dept) => {
            const isFlagship = dept.isFlagship;
            return (
              <Link
                key={dept.slug}
                href={`/d/${dept.slug}`}
                className={`group p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                  isFlagship
                    ? "bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800/80 hover:border-teal-500"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-500"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: dept.themeColor || "#0d9488" }}
                    />
                    {isFlagship && (
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black tracking-wider uppercase">
                        Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 line-clamp-2 transition-colors">
                    {dept.name}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{dept.productCount} items</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-slate-400 group-hover:text-teal-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Today's Flash Deals Row */}
      {dealProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-slate-900/10 border border-amber-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Today&apos;s Flash Deals
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Limited-time savings on flagship and curated catalog products.
                  </p>
                </div>
              </div>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition"
              >
                <span>View All Flash Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dealProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Flagship Showcase: Sustainable Bamboo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Department 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Sustainable Bamboo Essentials
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              100% natural, certified renewable Moso bamboo. Antibacterial kitchen boards, organic dining sets, and eco storage.
            </p>
          </div>
          <Link
            href="/d/sustainable-bamboo"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition"
          >
            <span>Browse All Bamboo (108 Items)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bambooProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* 5. Flagship Showcase: Sustainable Desk Accessories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Department 2</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Sustainable Desk Accessories & Ergonomics
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Precision-milled bamboo monitor risers, wireless dock stations, and cable organizers designed for focused workflows.
            </p>
          </div>
          <Link
            href="/d/sustainable-desk-accessories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 transition"
          >
            <span>Browse All Desk Goods (108 Items)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deskProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* 6. Academic Project Ethos & White-Hat Verification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Academic Project Notice</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {SITE_CONFIG.academicNotice} Developed for B.Tech CSE Sem VII, Group SEO-027 to demonstrate modern technical SEO, crawlability, and semantic e-commerce architecture.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Zero Fabricated Data</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strict adherence to Google Search Essentials: No fake 5-star aggregateRating schema, no duplicated supplier text, and transparent INR catalog pricing.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">&le; 3 Clicks &amp; Zero Orphans</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                With our 3-tier mega menu and A-Z directory, every single one of our 1,099 leaf categories is linked and indexable within 3 clicks of the home page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Editorial Buying Guides */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Editorial &amp; Buying Guides
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Authoritative research, care tips, and sustainable lifestyle articles.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800"
            >
              <span>View All Guides</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-teal-500 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-teal-600">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-teal-600 transition">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{post.publishDate}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
