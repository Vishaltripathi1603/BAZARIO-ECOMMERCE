import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedProducts,
} from "@/lib/data";
import {
  getCanonicalUrl,
  generateArticleSchema,
} from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import RelatedProducts from "@/components/catalog/RelatedProducts";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | BambooNest",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/blog/${slug}`);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: [post.featuredImage.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.featuredImage.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedProducts(post.relatedProductSlugs);
  const articleSchema = generateArticleSchema(post);

  return (
    <>
      <JsonLd data={articleSchema} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Buying Guides", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 border-b border-stone-200 dark:border-stone-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              {post.category}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              Target Keyword: {post.primaryKeyword}
            </span>
          </div>

          {/* Exactly ONE H1 on Page */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Byline & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-stone-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-stone-400" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-400" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 bg-stone-100">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Lead Excerpt Paragraph */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-base sm:text-lg font-medium text-stone-800 dark:text-stone-200 leading-relaxed italic">
          &ldquo;{post.excerpt}&rdquo;
        </div>

        {/* Article Content Body with Logical Headings */}
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-8 text-stone-700 dark:text-stone-300 leading-relaxed">
          {post.sections.map((section, idx) => {
            return (
              <section key={idx} className="space-y-3">
                {section.level === 2 ? (
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight pt-2 border-t border-stone-100 dark:border-stone-800">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight pt-1">
                    {section.heading}
                  </h3>
                )}
                <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  {section.content}
                </p>

                {/* Contextual In-Article Product Card */}
                {section.productRecommendation && (
                  <div className="my-6 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Recommended Eco Solution</span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900 dark:text-white">
                        {section.productRecommendation.name}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {section.productRecommendation.context}
                      </p>
                    </div>

                    <Link
                      href={`/products/${section.productRecommendation.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shrink-0 transition min-h-[44px] justify-center"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Bottom Related Products Section */}
        <RelatedProducts
          products={related}
          currentProductName={post.title}
        />
      </article>
    </>
  );
}
