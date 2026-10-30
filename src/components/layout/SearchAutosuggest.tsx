"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, ArrowRight, Tag } from "lucide-react";
import { Department } from "@/lib/types";

interface SearchItem {
  slug: string;
  name: string;
  cat: string;
  dept: string;
  price: number;
  img: string;
}

interface SearchAutosuggestProps {
  departments: Department[];
  className?: string;
  onSelect?: () => void;
}

export default function SearchAutosuggest({
  departments,
  className = "",
  onSelect,
}: SearchAutosuggestProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchIndexRef = useRef<SearchItem[] | null>(null);

  // Lazy-load search index on focus or first keystroke
  const loadSearchIndex = async () => {
    if (searchIndexRef.current) return;
    try {
      const res = await fetch("/data/search-index.json");
      if (res.ok) {
        const data = await res.json();
        searchIndexRef.current = data;
      }
    } catch (e) {
      console.error("Failed to load search index", e);
    }
  };

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const index = searchIndexRef.current;
      if (!index) {
        setIsLoading(false);
        return;
      }

      const q = query.toLowerCase().trim();
      let filtered = index.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.cat.toLowerCase().includes(q) ||
          item.dept.toLowerCase().includes(q)
      );

      if (selectedDept !== "all") {
        const deptObj = departments.find((d) => d.slug === selectedDept);
        if (deptObj) {
          filtered = filtered.filter((item) => item.dept === deptObj.name);
        }
      }

      setResults(filtered.slice(0, 8));
      setIsOpen(true);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, selectedDept, departments]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (selectedIndex >= 0 && results[selectedIndex]) {
      router.push(`/p/${results[selectedIndex].slug}`);
      setIsOpen(false);
      onSelect?.();
      return;
    }

    const deptParam = selectedDept !== "all" ? `&dept=${selectedDept}` : "";
    router.push(`/search?q=${encodeURIComponent(query.trim())}${deptParam}`);
    setIsOpen(false);
    onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition shadow-inner overflow-hidden"
      >
        {/* Department dropdown selector */}
        <div className="hidden lg:flex items-center shrink-0 border-r border-slate-300 dark:border-slate-700 bg-slate-200/60 dark:bg-slate-800/80 px-2">
          <label htmlFor="dept-select" className="sr-only">
            Select Department
          </label>
          <select
            id="dept-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-transparent py-2.5 pl-2 pr-1 focus:outline-none cursor-pointer max-w-[140px] truncate"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.slug} value={dept.slug}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 flex items-center">
          <label htmlFor="global-search-input" className="sr-only">
            Search products, brands, and categories
          </label>
          <input
            id="global-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={loadSearchIndex}
            onKeyDown={handleKeyDown}
            placeholder="Search 3,300+ products, eco goods, tech..."
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            className="w-full bg-transparent py-2.5 pl-3.5 pr-8 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none min-h-[44px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          aria-label="Execute search"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 transition flex items-center justify-center shrink-0 min-h-[44px] min-w-[48px]"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* Dropdown Autosuggest Results */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fadeIn">
          {results.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Matching Products</span>
                <span>Press &uarr;&darr; to navigate</span>
              </div>
              <ul role="listbox" className="max-h-80 overflow-y-auto py-1">
                {results.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <li
                      key={item.slug}
                      role="option"
                      aria-selected={isSelected}
                      className={`transition ${
                        isSelected
                          ? "bg-teal-50 dark:bg-teal-950/60"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <Link
                        href={`/p/${item.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          onSelect?.();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                          <Image
                            src={item.img || "/images/categories/bamboo-cutting-boards.svg"}
                            alt={item.name}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="inline-flex items-center gap-1">
                              <Tag className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                              {item.cat}
                            </span>
                            <span>&bull;</span>
                            <span className="truncate">{item.dept}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-teal-700 dark:text-teal-400">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* View all search results link */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}${
                    selectedDept !== "all" ? `&dept=${selectedDept}` : ""
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    onSelect?.();
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 transition"
                >
                  <span>See all matching items for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm font-medium">No direct matches found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs mt-1">Try searching for &quot;bamboo&quot;, &quot;desk&quot;, &quot;audio&quot;, or &quot;organic&quot;.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
