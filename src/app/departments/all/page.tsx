import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllCategories } from "@/lib/data";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Compass, Tag, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "A-Z Category Directory (1,099 Categories) | Bazario",
  description:
    "Complete alphabetical directory of all 1,099 leaf categories on Bazario. Fast internal navigation, zero orphan pages, and complete catalog indexability.",
  alternates: {
    canonical: "/departments/all",
  },
};

export default function AllCategoriesDirectoryPage() {
  const categories = getAllCategories();

  // Group categories alphabetically A-Z
  const grouped: Record<string, typeof categories> = {};
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  alphabet.forEach((letter) => {
    grouped[letter] = [];
  });

  categories.forEach((cat) => {
    const firstChar = cat.name.charAt(0).toUpperCase();
    if (grouped[firstChar]) {
      grouped[firstChar].push(cat);
    } else {
      // Numbers or special chars
      if (!grouped["#"]) grouped["#"] = [];
      grouped["#"].push(cat);
    }
  });

  // Sort categories within each letter group
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Departments", url: "/departments" },
    { name: "A-Z Directory", url: "/departments/all" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Zero-Orphan Directory Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          A-Z Category Directory ({categories.length} Categories)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Comprehensive index of all 1,099 leaf product categories across our 26 marketplace departments. Every category is guaranteed reachable within &le; 3 clicks of the home page.
        </p>

        {/* Alphabet Jump Bar */}
        <div className="mt-6 flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {alphabet.map((letter) => {
            const count = grouped[letter]?.length || 0;
            return (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition ${
                  count > 0
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white shadow-sm"
                    : "opacity-30 cursor-not-allowed text-slate-400"
                }`}
                title={`${count} categories`}
              >
                {letter}
              </a>
            );
          })}
        </div>
      </div>

      {/* Alphabetical Sections */}
      <div className="space-y-12">
        {alphabet.map((letter) => {
          const list = grouped[letter] || [];
          if (list.length === 0) return null;

          return (
            <section
              key={letter}
              id={`letter-${letter}`}
              className="scroll-mt-24 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    {letter}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {list.length} {list.length === 1 ? "Category" : "Categories"}
                  </span>
                </div>
                <a
                  href="#main-content"
                  className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                >
                  &uarr; Back to top
                </a>
              </div>

              {/* 3-column Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/c/${cat.fullPath}`}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-300 dark:hover:border-teal-700 transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 truncate">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {cat.departmentName} &bull; {cat.subDepartmentName}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-full shrink-0">
                      {cat.productCount}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
