import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, Sparkles, FolderTree, ArrowRight, Tag } from "lucide-react";
import { getAllDepartments, getAllSubDepartments } from "@/lib/data";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { SITE_CONFIG } from "@/../config/site";

export const metadata: Metadata = {
  title: "All 26 Marketplace Departments | Bazario",
  description:
    "Explore all 26 departments on Bazario. Shop sustainable bamboo, ergonomic desk accessories, kitchenware, tech, and thousands of curated home goods.",
  alternates: {
    canonical: "/departments",
  },
};

export default function DepartmentsPage() {
  const departments = getAllDepartments();
  const subDepartments = getAllSubDepartments();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Departments", url: "/departments" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold mb-3">
          <FolderTree className="w-3.5 h-3.5" />
          <span>Marketplace Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          All 26 Departments
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Browse through every major line on Bazario. Each department contains specialized sub-departments and high-quality, verified products with transparent pan-India shipping.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <Link
            href="/departments/all"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition"
          >
            <span>Browse Complete A-Z Category Directory (1,099 Categories)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptSubDepts = subDepartments.filter(
            (s) => s.departmentSlug === dept.slug
          );

          return (
            <div
              key={dept.slug}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:shadow-lg ${
                dept.isFlagship
                  ? "bg-teal-50/50 dark:bg-teal-950/20 border-teal-300 dark:border-teal-800"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: dept.themeColor || "#0d9488" }}
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {dept.productCount} Products
                    </span>
                  </div>
                  {dept.isFlagship && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      <Sparkles className="w-3 h-3" /> Flagship
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  <Link
                    href={`/d/${dept.slug}`}
                    className="hover:text-teal-700 dark:hover:text-teal-400 transition"
                  >
                    {dept.name}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {dept.tagline}
                </p>

                {/* Sub-departments quick pills */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Sub-Departments ({deptSubDepts.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {deptSubDepts.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/c/${dept.slug}/${sub.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 transition"
                      >
                        <Tag className="w-2.5 h-2.5 text-teal-600" />
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                    {deptSubDepts.length > 4 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{deptSubDepts.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/d/${dept.slug}`}
                  className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 inline-flex items-center gap-1"
                >
                  <span>Explore Department</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
