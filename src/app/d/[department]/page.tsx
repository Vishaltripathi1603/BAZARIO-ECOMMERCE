import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ChevronRight,
  Sparkles,
  Tag,
  ArrowRight,
  FolderTree,
  Filter,
} from "lucide-react";
import {
  getAllDepartments,
  getDepartmentBySlug,
  getSubDepartmentsByDepartment,
  getCategoriesByDepartment,
  getProductsByDepartment,
} from "@/lib/data";
import ProductCard from "@/components/catalog/ProductCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, getBaseUrl } from "@/lib/seo";

interface DepartmentPageProps {
  params: Promise<{ department: string }>;
}

export async function generateStaticParams() {
  const departments = getAllDepartments();
  return departments.map((d) => ({
    department: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { department: deptSlug } = await params;
  const dept = getDepartmentBySlug(deptSlug);
  if (!dept) return { title: "Department Not Found" };

  const canonicalUrl = `${getBaseUrl()}/d/${dept.slug}`;

  return {
    title: dept.metaTitle,
    description: dept.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: dept.metaTitle,
      description: dept.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { department: deptSlug } = await params;
  const dept = getDepartmentBySlug(deptSlug);

  if (!dept) {
    notFound();
  }

  const subDepartments = getSubDepartmentsByDepartment(dept.slug);
  const leafCategories = getCategoriesByDepartment(dept.slug);
  const products = getProductsByDepartment(dept.slug);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Departments", url: "/departments" },
    { name: dept.name, url: `/d/${dept.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Group leaf categories by subDepartmentSlug
  const subDeptMap = new Map<string, typeof leafCategories>();
  leafCategories.forEach((cat) => {
    const list = subDeptMap.get(cat.subDepartmentSlug) || [];
    list.push(cat);
    subDeptMap.set(cat.subDepartmentSlug, list);
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Department Hero Banner */}
        <div
          className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden ${
            dept.isFlagship
              ? "bg-gradient-to-br from-teal-900/90 via-slate-900 to-emerald-950 text-white border-teal-500/40 shadow-xl"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
          }`}
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: dept.themeColor || "#0d9488" }}
              />
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Department Overview
              </span>
              {dept.isFlagship && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  <Sparkles className="w-3 h-3" /> Flagship Department
                </span>
              )}
            </div>

            {/* Exactly One H1 */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {dept.name}
            </h1>

            <p className="text-sm sm:text-base opacity-90 leading-relaxed">
              {dept.tagline} Discover {dept.productCount} authentic products organized across {subDepartments.length} specialized sub-departments and {leafCategories.length} leaf categories.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold opacity-80">
              <span>{subDepartments.length} Sub-Departments</span>
              <span>&bull;</span>
              <span>{leafCategories.length} Categories</span>
              <span>&bull;</span>
              <span>{products.length} Products</span>
            </div>
          </div>
        </div>

        {/* Sub-Departments & Leaf Categories Explorer */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-teal-600" />
                <span>Explore Sub-Departments</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select a sub-department or drill down into any leaf category.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subDepartments.map((subDept) => {
              const cats = subDeptMap.get(subDept.slug) || [];
              return (
                <div
                  key={subDept.slug}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-teal-500 transition shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/c/${dept.slug}/${subDept.slug}`}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-teal-600 transition"
                      >
                        {subDept.name}
                      </Link>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {subDept.productCount} items
                      </span>
                    </div>

                    {/* Leaf Categories */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cats.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/c/${cat.fullPath}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200/60 dark:border-slate-700 transition"
                        >
                          <Tag className="w-2.5 h-2.5 text-teal-600" />
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/c/${dept.slug}/${subDept.slug}`}
                      className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Sub-Department Catalog</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Products in this Department */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Featured {dept.name} Products
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Showing top verified items available for immediate pan-India dispatch.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Showing {Math.min(products.length, 12)} of {products.length} Products
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 12).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
