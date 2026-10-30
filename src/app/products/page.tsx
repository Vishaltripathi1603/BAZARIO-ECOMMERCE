import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getAllDepartments } from "@/lib/data";
import { getCanonicalUrl, generateCollectionPageSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CategoryCatalogView from "@/components/catalog/CategoryCatalogView";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Marketplace Catalog (3,300+ Products) | Bazario",
  description:
    "Explore over 3,300 curated products on Bazario. Shop sustainable bamboo, ergonomic desk goods, electronics, and home essentials with verified pan-India delivery.",
  alternates: {
    canonical: getCanonicalUrl("/products"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Complete Marketplace Catalog (3,300+ Products) | Bazario",
    description:
      "Explore over 3,300 curated products on Bazario. Shop sustainable bamboo, ergonomic desk goods, electronics, and home essentials with verified pan-India delivery.",
    url: getCanonicalUrl("/products"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const departments = getAllDepartments();

  const collectionSchema = generateCollectionPageSchema(
    "Complete Marketplace Catalog",
    "Browse over 3,300 verified products on Bazario across 26 departments.",
    "/products",
    allProducts.slice(0, 32)
  );

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ name: "All Products", url: "/products" }]} />

        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Marketplace Inventory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              All Products Catalog ({allProducts.length} Items)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Explore our complete indexed catalog of sustainable bamboo goods, workspace accessories, and multi-category essentials.
            </p>
          </div>

          <Link
            href="/departments/all"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>A-Z Category Directory</span>
          </Link>
        </div>

        {/* Catalog with Suspense for Search Params */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-400 text-sm">
              Loading catalog products...
            </div>
          }
        >
          <CategoryCatalogView initialProducts={allProducts} />
        </Suspense>
      </div>
    </>
  );
}
