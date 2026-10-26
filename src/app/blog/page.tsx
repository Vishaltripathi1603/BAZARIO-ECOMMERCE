import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { BookOpen, ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainable Living & Desk Guides",
  description:
    "Expert buying guides and care manuals on eco-friendly home offices, Moso bamboo benefits over plastic, and how to maintain natural wood kitchenware.",
  alternates: {
    canonical: getCanonicalUrl("/blog"),
  },
  openGraph: {
    title: "Sustainable Living & Desk Guides | BambooNest Blog",
    description:
      "Expert buying guides and care manuals on eco-friendly home offices, Moso bamboo benefits over plastic, and how to maintain natural wood kitchenware.",
    url: getCanonicalUrl("/blog"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: "Buying Guides & Blog", url: "/blog" }]} />

      {/* Page Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Educational Resource Center
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Sustainable Living & Eco-Office Guides
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
          Comprehensive, evidence-based buying guides covering ergonomics, materials science, and maintenance protocols for sustainable bamboo goods. Designed to help consumers build mindful, plastic-free living spaces.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <article
            key={post.slug}
            className="group bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-white/95 dark:bg-stone-900/95 text-emerald-800 dark:text-emerald-400 shadow-sm border border-stone-200/60">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5" />
                    {post.author.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
