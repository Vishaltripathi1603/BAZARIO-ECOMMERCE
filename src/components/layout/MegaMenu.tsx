"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, ChevronRight, Sparkles, FolderTree, Tag, ExternalLink } from "lucide-react";
import { Department, SubDepartment, LeafCategory } from "@/lib/types";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  subDepartments: SubDepartment[];
}

export default function MegaMenu({
  isOpen,
  onClose,
  departments,
  subDepartments,
}: MegaMenuProps) {
  const [selectedDeptSlug, setSelectedDeptSlug] = useState<string>(
    departments[0]?.slug || "sustainable-bamboo"
  );
  const [categories, setCategories] = useState<LeafCategory[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lazy-load categories only when user opens the MegaMenu (code-split)
  useEffect(() => {
    if (isOpen && categories.length === 0) {
      import("../../../data/categories.json").then((mod) => {
        setCategories(mod.default as LeafCategory[]);
      });
    }
  }, [isOpen, categories.length]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeDepartment =
    departments.find((d) => d.slug === selectedDeptSlug) || departments[0];

  const activeSubDepartments = subDepartments.filter(
    (s) => s.departmentSlug === activeDepartment?.slug
  );

  // Map subDepartmentSlug -> LeafCategory[]
  const subDeptCategoriesMap = new Map<string, LeafCategory[]>();
  categories.forEach((cat) => {
    if (cat.departmentSlug === activeDepartment?.slug) {
      const existing = subDeptCategoriesMap.get(cat.subDepartmentSlug) || [];
      existing.push(cat);
      subDeptCategoriesMap.set(cat.subDepartmentSlug, existing);
    }
  });

  if (!isOpen) {
    // Render hidden semantic links for non-JS crawlers
    return (
      <nav
        aria-label="Crawlable Department Tree"
        className="sr-only"
        id="crawler-department-tree"
      >
        <h2>All Marketplace Departments</h2>
        <ul>
          {departments.map((dept) => (
            <li key={dept.slug}>
              <Link href={`/d/${dept.slug}`}>{dept.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="All Marketplace Departments Mega Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full max-h-screen text-slate-800 dark:text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Marketplace Directory</h2>
              <p className="text-xs text-slate-400">
                26 Departments &bull; 157 Sub-Departments &bull; 1,099 Leaf Categories
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/departments/all"
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              <span>A-Z Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: 2 Columns */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: All 26 Departments */}
          <div className="w-72 sm:w-80 border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-2 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Departments ({departments.length})
            </div>
            {departments.map((dept) => {
              const isSelected = dept.slug === selectedDeptSlug;
              return (
                <button
                  key={dept.slug}
                  type="button"
                  onMouseEnter={() => setSelectedDeptSlug(dept.slug)}
                  onClick={() => setSelectedDeptSlug(dept.slug)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-between group min-h-[44px] ${
                    isSelected
                      ? "bg-teal-600 text-white font-semibold shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: dept.themeColor || "#0d9488" }}
                    />
                    <span className="truncate">{dept.name}</span>
                    {dept.isFlagship && (
                      <span className="shrink-0 text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
                        Flagship
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-white translate-x-0.5"
                        : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Subdepartments & Leaf Categories */}
          <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-900">
            {activeDepartment && (
              <div>
                {/* Active Dept Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {activeDepartment.name}
                      </h3>
                      {activeDepartment.isFlagship && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                          <Sparkles className="w-3 h-3" /> Flagship Line
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {activeDepartment.tagline} &bull; {activeDepartment.productCount} Total Products
                    </p>
                  </div>
                  <Link
                    href={`/d/${activeDepartment.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition min-h-[44px]"
                  >
                    <span>View Department</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Sub-departments Grid */}
                <div className="space-y-6">
                  {activeSubDepartments.map((subDept) => {
                    const leafCats = subDeptCategoriesMap.get(subDept.slug) || [];
                    return (
                      <div
                        key={subDept.slug}
                        className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-700/60">
                          <Link
                            href={`/c/${activeDepartment.slug}/${subDept.slug}`}
                            onClick={onClose}
                            className="font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 text-sm flex items-center gap-1.5 group"
                          >
                            <span>{subDept.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {subDept.productCount} items
                          </span>
                        </div>

                        {/* Leaf Categories Pills */}
                        <div className="flex flex-wrap gap-2">
                          {leafCats.length > 0 ? (
                            leafCats.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/c/${cat.fullPath}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-teal-300 rounded-lg border border-slate-200 dark:border-slate-700 transition"
                              >
                                <Tag className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                                <span>{cat.name}</span>
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={`/c/${activeDepartment.slug}/${subDept.slug}`}
                              onClick={onClose}
                              className="text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline"
                            >
                              Browse all {subDept.name} products &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Every leaf category is accessible within &le; 3 clicks</span>
          <Link
            href="/departments/all"
            onClick={onClose}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Browse All 1,099 Categories (A-Z) &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
