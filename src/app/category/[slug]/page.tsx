import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";
import {
  getCanonicalUrl,
  generateCollectionPageSchema,
  generateFAQSchema,
} from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ProductsCatalogView from "@/components/catalog/ProductsCatalogView";
import FAQAccordion from "@/components/ui/Accordion";
import { HelpCircle } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/category/${slug}`);

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${category.metaTitle} | BambooNest`,
      description: category.metaDescription,
      url: canonicalUrl,
      images: [
        slug === "sustainable-bamboo"
          ? "/images/hero/category-bamboo.svg"
          : slug === "sustainable-desk-accessories"
          ? "/images/hero/category-desk.svg"
          : slug === "eco-dining-kitchenware"
          ? "/images/hero/category-dining.svg"
          : "/images/hero/category-wellness.svg",
      ],
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  const collectionSchema = generateCollectionPageSchema(
    category.name,
    category.introText,
    `/category/${category.slug}`,
    categoryProducts
  );

  const faqSchema = generateFAQSchema(category);

  return (
    <>
      <JsonLd data={[collectionSchema, faqSchema]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: "Categories", url: "/products" },
            { name: category.name, url: `/category/${category.slug}` },
          ]}
        />

        {/* Category Hero / Header */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span>Primary Focus: {category.primaryKeyword}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg font-medium text-emerald-900 dark:text-emerald-300">
            {category.headline}
          </p>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-4xl pt-1">
            {category.introText}
          </p>
        </div>

        {/* Faceted Catalog View */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-stone-400 text-sm">
              Loading {category.name} products...
            </div>
          }
        >
          <ProductsCatalogView
            initialProducts={categoryProducts}
            availableSubcategories={category.subcategories}
          />
        </Suspense>

        {/* Category FAQ Section with FAQPage Schema */}
        <section
          aria-labelledby="category-faq-heading"
          className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2
                id="category-faq-heading"
                className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white"
              >
                Everything You Need to Know About {category.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Common questions regarding material sourcing, maintenance, durability, and ergonomic benefits.
              </p>
            </div>

            <FAQAccordion items={category.faqs} />
          </div>
        </section>
      </div>
    </>
  );
}
