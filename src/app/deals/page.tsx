import React from "react";
import { Metadata } from "next";
import { Percent, Sparkles, ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/data";
import ProductCard from "@/components/catalog/ProductCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Today's Flash Deals & Discounts | Bazario",
  description:
    "Explore today's verified flash deals on Bazario. Save on sustainable bamboo, ergonomic desk accessories, and curated home goods with fast pan-India delivery.",
  alternates: {
    canonical: `${getBaseUrl()}/deals`,
  },
};

export default function DealsPage() {
  const allProducts = getAllProducts();
  const dealProducts = allProducts.filter(
    (p) => p.deal && p.deal.discountPercent > 0
  );

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Flash Deals", url: "/deals" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/15 via-teal-500/10 to-slate-900/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" />
              <span>Limited-Time Markdowns</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Today&apos;s Flash Deals
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Authentic promotional prices across flagship bamboo goods and marketplace essentials. All offers feature direct pan-India shipping and warranty coverage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center shrink-0">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 block">
              {dealProducts.length}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Deals
            </span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
