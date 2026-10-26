"use client";

import React from "react";
import { Filter, X, SlidersHorizontal, Check } from "lucide-react";
import { FilterState } from "@/lib/types";

interface FacetedFiltersProps {
  availableSubcategories: string[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function FacetedFilters({
  availableSubcategories,
  filters,
  onFilterChange,
  isMobileOpen,
  onCloseMobile,
}: FacetedFiltersProps) {
  const priceRanges = [
    { label: "All Prices", min: undefined, max: undefined },
    { label: "Under ₹750", min: 0, max: 750 },
    { label: "₹750 – ₹1,500", min: 750, max: 1500 },
    { label: "Above ₹1,500", min: 1500, max: undefined },
  ];

  const sortOptions = [
    { label: "Featured / Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A to Z", value: "name-asc" },
  ];

  const materials = ["All", "Moso Bamboo", "Organic", "Laminated", "Cross-Ply"];

  const handleSubcategoryChange = (sub: string) => {
    onFilterChange({
      ...filters,
      subcategory: sub === "All" ? undefined : sub,
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleMaterialChange = (mat: string) => {
    onFilterChange({
      ...filters,
      material: mat === "All" ? undefined : mat,
    });
  };

  const handleInStockToggle = (checked: boolean) => {
    onFilterChange({
      ...filters,
      inStockOnly: checked ? true : undefined,
    });
  };

  const handleSortChange = (sortVal: string) => {
    onFilterChange({
      ...filters,
      sortBy: sortVal as FilterState["sortBy"],
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Sort By Dropdown */}
      <div>
        <label
          htmlFor="catalog-sort"
          className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2"
        >
          Sort Products
        </label>
        <select
          id="catalog-sort"
          value={filters.sortBy || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-700 min-h-[44px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Radios */}
      {availableSubcategories.length > 0 && (
        <fieldset>
          <legend className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
            Subcategory
          </legend>
          <div className="space-y-1.5">
            {["All", ...availableSubcategories].map((sub) => {
              const selected =
                sub === "All"
                  ? !filters.subcategory || filters.subcategory === "All"
                  : filters.subcategory === sub;
              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => handleSubcategoryChange(sub)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left min-h-[44px] ${
                    selected
                      ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 font-bold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                  }`}
                >
                  <span>{sub === "All" ? "All Subcategories" : sub}</span>
                  {selected && <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Price Range */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          Price Range
        </legend>
        <div className="space-y-1.5">
          {priceRanges.map((pr) => {
            const isSelected =
              filters.minPrice === pr.min && filters.maxPrice === pr.max;
            return (
              <button
                type="button"
                key={pr.label}
                onClick={() => handlePriceChange(pr.min, pr.max)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left min-h-[44px] ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 font-bold"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                }`}
              >
                <span>{pr.label}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Material Specifications */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          Material & Craft
        </legend>
        <div className="space-y-1.5">
          {materials.map((mat) => {
            const isSelected =
              mat === "All"
                ? !filters.material || filters.material === "All"
                : filters.material === mat;
            return (
              <button
                type="button"
                key={mat}
                onClick={() => handleMaterialChange(mat)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left min-h-[44px] ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 font-bold"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium"
                }`}
              >
                <span>{mat === "All" ? "All Materials" : mat}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* In-Stock Filter Toggle */}
      <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
        <label className="flex items-center gap-3 cursor-pointer select-none min-h-[44px]">
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={(e) => handleInStockToggle(e.target.checked)}
            className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-700 border-stone-300 dark:border-stone-700 cursor-pointer"
          />
          <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
            In Stock Items Only
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        aria-label="Product filters"
        className="hidden lg:block w-64 shrink-0 pr-6 border-r border-stone-200 dark:border-stone-800"
      >
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
            <SlidersHorizontal className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Filter Catalog
            </h2>
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer (Bottom Sheet / Overlay) */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter and Sort products"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/60 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={onCloseMobile}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] bg-[#FBF9F5] dark:bg-stone-900 rounded-t-3xl sm:rounded-2xl p-6 overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  Filter & Sort
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {filterContent}

            <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 bg-emerald-800 text-white font-bold rounded-xl text-sm min-h-[44px] shadow-lg hover:bg-emerald-900 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
