"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { getAllProducts } from "@/lib/data";
import { Product } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const products = getAllProducts();

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSearch = (val: string) => {
    setQuery(val);
    const q = val.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.primaryKeyword.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(matched);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search catalog products"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-emerald-800 dark:text-emerald-500 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by keyword, product name, or category (e.g. laptop, cutting board)..."
            aria-label="Search products"
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-2.5 py-1 text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-stone-100 dark:divide-stone-800">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center text-stone-500 dark:text-stone-400">
              <p className="text-sm font-medium">Quick suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {["Laptop Stand", "Toothbrush", "Cutting Board", "Desk Mat", "Wireless Charger"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1.5 text-xs bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Found {results.length} {results.length === 1 ? "Product" : "Products"}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <div className="relative w-14 h-14 shrink-0 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden border border-stone-200 dark:border-stone-700">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-medium">
                        {product.subcategory}
                      </span>
                      <span className="text-xs text-stone-400">SKU: {product.sku}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      {product.shortDescription}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="flex items-center justify-end text-xs text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Tag className="w-8 h-8 mx-auto text-stone-300 dark:text-stone-600 mb-2" />
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                No matching eco-friendly products found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for broader keywords like &quot;bamboo&quot;, &quot;desk&quot;, or &quot;tray&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
