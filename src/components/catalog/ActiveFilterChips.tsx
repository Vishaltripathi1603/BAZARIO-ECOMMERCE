import React from "react";
import { X, RotateCcw } from "lucide-react";
import { FilterState } from "@/lib/types";

interface ActiveFilterChipsProps {
  totalCount: number;
  filteredCount: number;
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  totalCount,
  filteredCount,
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFilterChipsProps) {
  const activeChips: { key: keyof FilterState; label: string }[] = [];

  if (filters.searchQuery) {
    activeChips.push({ key: "searchQuery", label: `Search: "${filters.searchQuery}"` });
  }
  if (filters.subcategory && filters.subcategory !== "All") {
    activeChips.push({ key: "subcategory", label: `Category: ${filters.subcategory}` });
  }
  if (filters.material && filters.material !== "All") {
    activeChips.push({ key: "material", label: `Material: ${filters.material}` });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    let priceLabel = "";
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      priceLabel = `₹${filters.minPrice} - ₹${filters.maxPrice}`;
    } else if (filters.minPrice !== undefined) {
      priceLabel = `Over ₹${filters.minPrice}`;
    } else if (filters.maxPrice !== undefined) {
      priceLabel = `Under ₹${filters.maxPrice}`;
    }
    activeChips.push({ key: "minPrice", label: priceLabel });
  }
  if (filters.inStockOnly) {
    activeChips.push({ key: "inStockOnly", label: "In Stock Only" });
  }

  const hasActiveFilters = activeChips.length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-stone-200 dark:border-stone-800">
      <div className="text-sm text-stone-600 dark:text-stone-300 font-medium">
        Showing <span className="font-bold text-stone-900 dark:text-white">{filteredCount}</span> of{" "}
        <span className="font-semibold text-stone-800 dark:text-stone-200">{totalCount}</span> sustainable items
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(chip.key)}
                className="hover:text-emerald-950 dark:hover:text-white p-0.5 rounded focus:outline-none"
                aria-label={`Remove filter: ${chip.label}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        </div>
      )}
    </div>
  );
}
