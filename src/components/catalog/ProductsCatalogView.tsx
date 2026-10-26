"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, Search, RotateCcw } from "lucide-react";
import { Product, FilterState } from "@/lib/types";
import { filterAndSortProducts } from "@/lib/data";
import ProductCard from "./ProductCard";
import FacetedFilters from "./FacetedFilters";
import ActiveFilterChips from "./ActiveFilterChips";

interface ProductsCatalogViewProps {
  initialProducts: Product[];
  availableSubcategories: string[];
}

export default function ProductsCatalogView({
  initialProducts,
  availableSubcategories,
}: ProductsCatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse filters from URL search params
  const currentFilters: FilterState = useMemo(() => {
    const subcategory = searchParams.get("subcategory") || undefined;
    const material = searchParams.get("material") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!, 10)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!, 10)
      : undefined;
    const inStockOnly = searchParams.get("inStock") === "true";
    const sortBy = (searchParams.get("sort") as FilterState["sortBy"]) || "newest";
    const searchQuery = searchParams.get("search") || undefined;

    return {
      subcategory,
      material,
      minPrice,
      maxPrice,
      inStockOnly: inStockOnly ? true : undefined,
      sortBy,
      searchQuery,
    };
  }, [searchParams]);

  // Apply filtering and sorting
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, currentFilters);
  }, [initialProducts, currentFilters]);

  // Update URL search parameters
  const updateUrlParams = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.subcategory && newFilters.subcategory !== "All") {
      params.set("subcategory", newFilters.subcategory);
    }
    if (newFilters.material && newFilters.material !== "All") {
      params.set("material", newFilters.material);
    }
    if (newFilters.minPrice !== undefined) {
      params.set("minPrice", newFilters.minPrice.toString());
    }
    if (newFilters.maxPrice !== undefined) {
      params.set("maxPrice", newFilters.maxPrice.toString());
    }
    if (newFilters.inStockOnly) {
      params.set("inStock", "true");
    }
    if (newFilters.sortBy && newFilters.sortBy !== "newest") {
      params.set("sort", newFilters.sortBy);
    }
    if (newFilters.searchQuery && newFilters.searchQuery.trim().length > 0) {
      params.set("search", newFilters.searchQuery.trim());
    }

    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    updateUrlParams(newFilters);
  };

  const handleRemoveSingleFilter = (key: keyof FilterState) => {
    const updated = { ...currentFilters };
    if (key === "minPrice" || key === "maxPrice") {
      updated.minPrice = undefined;
      updated.maxPrice = undefined;
    } else {
      updated[key] = undefined;
    }
    updateUrlParams(updated);
  };

  const handleClearAll = () => {
    updateUrlParams({
      sortBy: "newest",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Dynamic robots meta tag for SEO safety on active filters */}
      {(currentFilters.subcategory ||
        currentFilters.material ||
        currentFilters.minPrice !== undefined ||
        currentFilters.maxPrice !== undefined ||
        currentFilters.inStockOnly ||
        (currentFilters.sortBy && currentFilters.sortBy !== "newest") ||
        currentFilters.searchQuery) && (
        <meta name="robots" content="noindex, follow" />
      )}

      {/* Faceted Filters Sidebar & Mobile Drawer */}
      <FacetedFilters
        availableSubcategories={availableSubcategories}
        filters={currentFilters}
        onFilterChange={handleFilterChange}
        isMobileOpen={isMobileFiltersOpen}
        onCloseMobile={() => setIsMobileFiltersOpen(false)}
      />

      {/* Main Catalog Listing View */}
      <div className="flex-1 w-full space-y-6">
        {/* Mobile Filter Trigger Button & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="search"
              placeholder="Filter products by keyword or name..."
              value={currentFilters.searchQuery || ""}
              onChange={(e) =>
                handleFilterChange({
                  ...currentFilters,
                  searchQuery: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-sm rounded-xl border border-stone-200 dark:border-stone-700 min-h-[44px]"
          >
            <Filter className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>Filter & Sort</span>
          </button>
        </div>

        {/* Active Filters Bar */}
        <ActiveFilterChips
          totalCount={initialProducts.length}
          filteredCount={filteredProducts.length}
          filters={currentFilters}
          onRemoveFilter={handleRemoveSingleFilter}
          onClearAll={handleClearAll}
        />

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={false}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">
              No matching eco-friendly products found
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              We couldn&apos;t find any items matching your selected criteria. Try adjusting or clearing your filters to see more results.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 text-white text-sm font-bold rounded-xl hover:bg-emerald-900 transition min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
