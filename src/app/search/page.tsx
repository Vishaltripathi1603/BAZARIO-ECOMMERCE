import React, { Suspense } from "react";
import { Metadata } from "next";
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllProducts, filterAndSortProducts, getAllDepartments } from "@/lib/data";
import CategoryCatalogView from "@/components/catalog/CategoryCatalogView";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Results | Bazario",
  description: "Search across 3,300+ marketplace products on Bazario.",
  robots: {
    index: false,
    follow: true,
  },
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const deptParam = typeof params.dept === "string" ? params.dept : undefined;

  const allProducts = getAllProducts();
  const departments = getAllDepartments();

  let matchedProducts = allProducts;

  if (q) {
    matchedProducts = filterAndSortProducts(allProducts, {
      searchQuery: q,
      department: deptParam && deptParam !== "all" ? deptParam : undefined,
    });
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: `Search: "${q || "All"}"`, url: `/search?q=${encodeURIComponent(q)}` },
  ];

  const currentDeptObj = departments.find((d) => d.slug === deptParam);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Marketplace Search</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {q ? (
              <>
                Results for &ldquo;<span className="text-teal-700 dark:text-teal-400">{q}</span>&rdquo;
              </>
            ) : (
              "Search Catalog"
            )}
            {currentDeptObj && (
              <span className="text-base font-normal text-slate-500 ml-2">
                in {currentDeptObj.name}
              </span>
            )}
          </h1>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          {matchedProducts.length} Results Found
        </span>
      </div>

      {/* Faceted Results */}
      <Suspense
        fallback={
          <div className="py-12 text-center text-xs font-semibold text-slate-400">
            Searching products...
          </div>
        }
      >
        <CategoryCatalogView initialProducts={matchedProducts} />
      </Suspense>
    </div>
  );
}
