import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import {
  getCanonicalUrl,
  generateCollectionPageSchema,
} from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ProductsCatalogView from "@/components/catalog/ProductsCatalogView";

export const metadata: Metadata = {
  title: "All Sustainable Bamboo Products",
  description:
    "Explore all 32 handcrafted sustainable bamboo products including kitchen prep boards, zero-waste cutlery, laptop stands, and ergonomic desk risers.",
  alternates: {
    canonical: getCanonicalUrl("/products"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "All Sustainable Bamboo Products | BambooNest",
    description:
      "Explore all 32 handcrafted sustainable bamboo products including kitchen prep boards, zero-waste cutlery, laptop stands, and ergonomic desk risers.",
    url: getCanonicalUrl("/products"),
    images: ["/images/hero/hero-banner.svg"],
  },
};

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const subcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory))
  );

  const collectionSchema = generateCollectionPageSchema(
    "All Sustainable Bamboo Products & Desk Accessories",
    "Browse our complete catalog of handcrafted sustainable bamboo kitchenware, zero-waste bathroom essentials, and ergonomic desk accessories.",
    "/products",
    allProducts
  );

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ name: "All Products", url: "/products" }]} />

        {/* Page Header */}
        <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Complete Eco Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white mt-1">
            All Sustainable Bamboo Products & Desk Accessories
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
            Browse our complete catalog of handcrafted sustainable bamboo kitchenware, zero-waste bathroom essentials, and ergonomic desk accessories. Filter by subcategory, price, or material to find your ideal eco-conscious solution.
          </p>
        </div>

        {/* Catalog with Suspense for Search Params */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-stone-400 text-sm">
              Loading sustainable catalog...
            </div>
          }
        >
          <ProductsCatalogView
            initialProducts={allProducts}
            availableSubcategories={subcategories}
          />
        </Suspense>
      </div>
    </>
  );
}
