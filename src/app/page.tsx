import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  RotateCcw,
  TreePine,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { getFeaturedProducts, getAllCategories, getAllBlogPosts } from "@/lib/data";
import ProductCard from "@/components/catalog/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getAllCategories();
  const blogs = getAllBlogPosts();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold tracking-wide">
                <Leaf className="w-4 h-4 text-emerald-800 dark:text-emerald-400" aria-hidden="true" />
                <span>Certified Renewable Moso Bamboo</span>
              </div>

              {/* Single H1 on Page */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.12]">
                Sustainable Bamboo for the Way You{" "}
                <span className="text-emerald-800 dark:text-emerald-400 underline decoration-amber-500/60 decoration-wavy decoration-2">
                  Work and Live
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                Replace disposable petroleum plastics and chemically-treated hardwoods with handcrafted, carbon-sequestering bamboo essentials. Engineered for ergonomic home offices and zero-waste household living.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 min-h-[48px]"
                >
                  <span>Explore Catalog (32 Items)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/category/sustainable-desk-accessories"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-bold text-sm border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition min-h-[48px]"
                >
                  <span>Ergonomic Desk Goods</span>
                </Link>
              </div>

              {/* Quick Trust Bullets */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Non-Panda Habitat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Zero Micro-Plastics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fast Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 bg-stone-100">
                <Image
                  src="/images/hero/hero-banner.svg"
                  alt="BambooNest Sustainable Bamboo Lifestyle and Home Office Collection"
                  fill
                  priority // Hero LCP image priority strictly compliant
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl p-4 border border-stone-200/60 dark:border-stone-800/60 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      Featured Workspace Setup
                    </span>
                    <span className="text-emerald-800 dark:text-emerald-400 font-bold">
                      100% Renewable
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Moso bamboo laptop riser + multi-slot desk organizer + Qi wireless charger
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Key Sustainability Benefits">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-400 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">Rapidly Renewable</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Moso bamboo grows up to 90 cm a day, maturing in 3 to 5 years without clearing root systems.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-800 dark:text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">Tougher Than Oak</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Dense cross-laminated grain fibers resist knife scarring, surface scratching, and warping.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-400 shrink-0">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">Carbon Negative</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Absorbs up to 35% more carbon dioxide and releases more oxygen than standard tree stands.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-800 dark:text-blue-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">100% Circular</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Completely biodegradable in commercial compost without releasing toxic synthetic residues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Dedicated Eco Collection Highlight Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Curated Niches
          </span>
          <h2 id="categories-heading" className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
            Explore Our 4 Dedicated Eco Collections
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Structured for deep intent matching, intuitive navigation, and sustainable functionality across your home and office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const bannerMap: Record<string, string> = {
              "sustainable-bamboo": "/images/hero/category-bamboo.svg",
              "sustainable-desk-accessories": "/images/hero/category-desk.svg",
              "eco-dining-kitchenware": "/images/hero/category-dining.svg",
              "bamboo-wellness-decor": "/images/hero/category-wellness.svg",
            };
            const bannerSrc = bannerMap[cat.slug] || "/images/hero/hero-banner.svg";

            return (
              <div
                key={cat.slug}
                className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Visual Banner */}
                  <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <Image
                      src={bannerSrc}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/90 text-emerald-900 dark:bg-stone-900/90 dark:text-emerald-300 shadow-sm backdrop-blur-sm border border-stone-200/80">
                        {cat.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                        {cat.primaryKeyword}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">8 Products</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      <Link href={`/category/${cat.slug}`}>
                        {cat.headline}
                      </Link>
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {cat.introText}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="px-2.5 py-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-lg"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse {cat.name} Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Customer Favorites
            </span>
            <h2 id="featured-heading" className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
              Featured Eco-Crafted Essentials
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline min-h-[44px]"
          >
            <span>View All 32 Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Sustainable Bamboo Section (Original Educational Content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EDE7DC]/70 dark:bg-stone-800/60 border border-stone-300/60 dark:border-stone-700/60 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Ethical Materials Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                Why Sustainable Bamboo Outperforms Traditional Timber and Plastic
              </h2>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                Modern consumption patterns generate millions of tons of single-use kitchen tools and brittle plastic desk organizers every year. By utilizing mature Moso bamboo culms harvested through cyclical thinning rotations, BambooNest products offer higher tensile strength than standard steel while completely avoiding toxic petrochemical additives. Because the underground root rhizomes remain completely undisturbed during harvest, bamboo forests continually prevent hillside soil erosion, filter local groundwater, and regenerate fresh shoots year after year.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-900 dark:text-emerald-300 underline underline-offset-4 hover:text-emerald-700"
                >
                  <span>Read Our Complete Sustainability Promise & Sourcing Audits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-md space-y-3 text-xs">
              <h3 className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-[11px]">
                The Material Facts
              </h3>
              <div className="space-y-2 text-stone-600 dark:text-stone-400">
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>Growth Velocity</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-200">Up to 90 cm / day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>Harvest Cycle</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-200">3–5 years (vs. 40y oak)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>Tensile Strength</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-200">28,000 psi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>Pesticide Need</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-200">0% (Self-protecting kun)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Biodegradability</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">100% Compostable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Guides Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="blog-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Expert Knowledge Base
            </span>
            <h2 id="blog-heading" className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
              Sustainable Living & Workspace Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline min-h-[44px]"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative aspect-[16/10] bg-stone-100 overflow-hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 shadow-sm">
                    {post.category}
                  </span>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800/80 mt-4 flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
