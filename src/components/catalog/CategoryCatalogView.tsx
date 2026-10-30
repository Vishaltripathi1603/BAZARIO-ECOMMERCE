"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Filter,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Product, FilterState } from "@/lib/types";
import { filterAndSortProducts } from "@/lib/data";
import ProductCard from "./ProductCard";

interface CategoryCatalogViewProps {
  initialProducts: Product[];
  availableBrands?: string[];
  availableSubcategories?: string[];
  itemsPerPage?: number;
}

export default function CategoryCatalogView({
  initialProducts,
  availableBrands = [],
  availableSubcategories = [],
  itemsPerPage = 12,
}: CategoryCatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract filter state from URL query
  const currentFilters: FilterState = useMemo(() => {
    const brand = searchParams.get("brand") || undefined;
    const subcategory = searchParams.get("subcategory") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!, 10)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!, 10)
      : undefined;
    const inStockOnly = searchParams.get("inStock") === "true";
    const dealsOnly = searchParams.get("deals") === "true";
    const sortBy = (searchParams.get("sort") as FilterState["sortBy"]) || "relevance";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;

    return {
      brand,
      subcategory,
      minPrice,
      maxPrice,
      inStockOnly: inStockOnly ? true : undefined,
      dealsOnly: dealsOnly ? true : undefined,
      sortBy,
      page,
    };
  }, [searchParams]);

  // Apply filtering and sorting
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, currentFilters);
  }, [initialProducts, currentFilters]);

  // Calculate pagination
  const currentPage = currentFilters.page || 1;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const updateUrlParams = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.subcategory) params.set("subcategory", newFilters.subcategory);
    if (newFilters.minPrice !== undefined) params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice !== undefined) params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.inStockOnly) params.set("inStock", "true");
    if (newFilters.dealsOnly) params.set("deals", "true");
    if (newFilters.sortBy && newFilters.sortBy !== "relevance") params.set("sort", newFilters.sortBy);
    if (newFilters.page && newFilters.page > 1) params.set("page", newFilters.page.toString());

    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ ...currentFilters, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAllFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    Boolean(currentFilters.brand) ||
    Boolean(currentFilters.subcategory) ||
    currentFilters.minPrice !== undefined ||
    currentFilters.maxPrice !== undefined ||
    Boolean(currentFilters.inStockOnly) ||
    Boolean(currentFilters.dealsOnly) ||
    (currentFilters.sortBy && currentFilters.sortBy !== "relevance");

  return (
    <div className="space-y-6">
      {/* Top Filter and Sort Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-teal-600 text-white min-h-[40px]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters ({filteredProducts.length})</span>
          </button>

          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Showing{" "}
            <strong className="text-teal-700 dark:text-teal-400">
              {filteredProducts.length}
            </strong>{" "}
            products
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 py-1.5 px-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="catalog-sort" className="font-semibold text-slate-500 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="catalog-sort"
              value={currentFilters.sortBy || "relevance"}
              onChange={(e) =>
                updateUrlParams({
                  ...currentFilters,
                  sortBy: e.target.value as FilterState["sortBy"],
                  page: 1,
                })
              }
              className="py-1.5 pl-2.5 pr-8 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer min-h-[38px]"
            >
              <option value="relevance">Relevance / Flagships First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Faceted Filters (Desktop) */}
        <aside
          className={`lg:block ${
            isMobileFiltersOpen
              ? "fixed inset-0 z-50 p-6 bg-white dark:bg-slate-900 overflow-y-auto"
              : "hidden"
          } lg:relative lg:p-0 lg:bg-transparent lg:z-auto space-y-6`}
        >
          {isMobileFiltersOpen && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
              <span className="font-bold text-lg">Filter Products</span>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            {/* Deals Only Toggle */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(currentFilters.dealsOnly)}
                  onChange={(e) =>
                    updateUrlParams({
                      ...currentFilters,
                      dealsOnly: e.target.checked ? true : undefined,
                      page: 1,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Flash Deals &amp; Discounts Only</span>
                </span>
              </label>
            </div>

            {/* In-Stock Only Toggle */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(currentFilters.inStockOnly)}
                  onChange={(e) =>
                    updateUrlParams({
                      ...currentFilters,
                      inStockOnly: e.target.checked ? true : undefined,
                      page: 1,
                    })
                  }
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  In-Stock Items Only
                </span>
              </label>
            </div>

            {/* Price Filter */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                Price Range
              </span>
              <div className="space-y-2 text-xs">
                {[
                  { label: "All Prices", min: undefined, max: undefined },
                  { label: "Under ₹800", min: 0, max: 800 },
                  { label: "₹800 to ₹1,500", min: 800, max: 1500 },
                  { label: "Above ₹1,500", min: 1500, max: undefined },
                ].map((range, idx) => {
                  const isSelected =
                    currentFilters.minPrice === range.min &&
                    currentFilters.maxPrice === range.max;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        updateUrlParams({
                          ...currentFilters,
                          minPrice: range.min,
                          maxPrice: range.max,
                          page: 1,
                        })
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg transition min-h-[36px] flex items-center justify-between ${
                        isSelected
                          ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{range.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3">
                  Brand ({availableBrands.length})
                </span>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateUrlParams({
                        ...currentFilters,
                        brand: undefined,
                        page: 1,
                      })
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${
                      !currentFilters.brand
                        ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    All Brands
                  </button>
                  {availableBrands.map((brand) => {
                    const isSelected = currentFilters.brand === brand;
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() =>
                          updateUrlParams({
                            ...currentFilters,
                            brand: brand,
                            page: 1,
                          })
                        }
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition truncate ${
                          isSelected
                            ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Product Grid + Pagination */}
        <div className="lg:col-span-3 space-y-8">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition min-h-[40px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <span>Page</span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">
                      {currentPage}
                    </span>
                    <span>of</span>
                    <span>{totalPages}</span>
                  </div>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition min-h-[40px]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No products match the selected filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your price filter or clearing active brand checkboxes.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2 bg-teal-700 text-white font-bold text-xs rounded-xl shadow hover:bg-teal-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
