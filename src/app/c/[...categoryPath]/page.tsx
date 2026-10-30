import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  HelpCircle,
  Tag,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  getDepartmentBySlug,
  getSubDepartmentBySlug,
  getCategoryBySlug,
  getProductsBySubDepartment,
  getProductsByCategory,
  getCategoriesBySubDepartment,
  getAllSubDepartments,
} from "@/lib/data";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CategoryCatalogView from "@/components/catalog/CategoryCatalogView";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  getBaseUrl,
} from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ categoryPath: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const subDepartments = getAllSubDepartments();
  const paths: { categoryPath: string[] }[] = [];

  // Pre-render all 157 subdepartments statically
  for (const sub of subDepartments) {
    paths.push({
      categoryPath: [sub.departmentSlug, sub.slug],
    });
  }

  return paths;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryPath } = await params;
  const sParams = (await searchParams) || {};
  const isFiltered = Object.keys(sParams).length > 0;

  if (categoryPath.length === 3) {
    const leafSlug = categoryPath[2];
    const cat = getCategoryBySlug(leafSlug);
    if (!cat) return { title: "Category Not Found" };

    const canonicalUrl = `${getBaseUrl()}/c/${cat.fullPath}`;
    const wordCount = cat.introText ? cat.introText.trim().split(/\s+/).length : 0;
    const isThinContent = cat.productCount < 3 || wordCount < 60;

    return {
      title: cat.metaTitle,
      description: cat.metaDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: isFiltered || isThinContent
        ? { index: false, follow: true }
        : { index: true, follow: true },
      openGraph: {
        title: cat.metaTitle,
        description: cat.metaDescription,
        url: canonicalUrl,
        type: "website",
      },
    };
  }

  if (categoryPath.length === 2) {
    const subSlug = categoryPath[1];
    const sub = getSubDepartmentBySlug(subSlug);
    if (!sub) return { title: "Sub-Department Not Found" };

    const canonicalUrl = `${getBaseUrl()}/c/${categoryPath.join("/")}`;

    return {
      title: sub.metaTitle,
      description: sub.metaDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: isFiltered
        ? { index: false, follow: true }
        : { index: true, follow: true },
      openGraph: {
        title: sub.metaTitle,
        description: sub.metaDescription,
        url: canonicalUrl,
        type: "website",
      },
    };
  }

  return { title: "Catalog | Bazario" };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { categoryPath } = await params;

  if (categoryPath.length < 2 || categoryPath.length > 3) {
    notFound();
  }

  const deptSlug = categoryPath[0];
  const subDeptSlug = categoryPath[1];
  const leafSlug = categoryPath[2];

  const department = getDepartmentBySlug(deptSlug);
  const subDepartment = getSubDepartmentBySlug(subDeptSlug);

  if (!department || !subDepartment) {
    notFound();
  }

  // 1. Leaf Category View (Depth = 3)
  if (categoryPath.length === 3) {
    const leafCategory = getCategoryBySlug(leafSlug);
    if (!leafCategory) {
      notFound();
    }

    const products = getProductsByCategory(leafCategory.slug);
    const siblingCategories = getCategoriesBySubDepartment(subDepartment.slug);

    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: department.name, url: `/d/${department.slug}` },
      { name: subDepartment.name, url: `/c/${department.slug}/${subDepartment.slug}` },
      { name: leafCategory.name, url: `/c/${leafCategory.fullPath}` },
    ];

    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
    const faqSchema = leafCategory.faqs?.length
      ? generateFAQSchema(leafCategory.faqs)
      : null;

    const availableBrands = Array.from(
      new Set(products.map((p) => p.brand).filter(Boolean))
    );

    return (
      <>
        <JsonLd
          data={[breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <Breadcrumbs items={breadcrumbs} />

          {/* Category Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: department.themeColor || "#0d9488" }}
              />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {department.name} &bull; {subDepartment.name}
              </span>
            </div>

            {/* Exactly One H1 */}
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {leafCategory.name}
            </h1>

            {/* Editorial SEO Intro Text (>= 60 words for indexability) */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {leafCategory.introText}
            </p>

            {/* Sibling Leaf Categories Pill Navigation */}
            {siblingCategories.length > 1 && (
              <div className="pt-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Related in {subDepartment.name}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {siblingCategories.map((sib) => {
                    const isCurrent = sib.slug === leafCategory.slug;
                    return (
                      <Link
                        key={sib.slug}
                        href={`/c/${sib.fullPath}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isCurrent
                            ? "bg-teal-700 text-white shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-700"
                        }`}
                      >
                        <Tag className="w-3 h-3 text-teal-400" />
                        <span>{sib.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Faceted Catalog and Products */}
          <Suspense
            fallback={
              <div className="py-12 text-center text-xs font-semibold text-slate-400">
                Loading products...
              </div>
            }
          >
            <CategoryCatalogView
              initialProducts={products}
              availableBrands={availableBrands}
            />
          </Suspense>

          {/* Interactive FAQs Accordion */}
          {leafCategory.faqs && leafCategory.faqs.length > 0 && (
            <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Frequently Asked Questions: {leafCategory.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sourced from genuine technical specifications and material care standards.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {leafCategory.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 transition open:ring-1 open:ring-teal-500/50"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-slate-900 dark:text-white select-none">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </>
    );
  }

  // 2. Sub-Department View (Depth = 2)
  const products = getProductsBySubDepartment(subDepartment.slug);
  const leafCategories = getCategoriesBySubDepartment(subDepartment.slug);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: department.name, url: `/d/${department.slug}` },
    { name: subDepartment.name, url: `/c/${department.slug}/${subDepartment.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: department.themeColor || "#0d9488" }}
            />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {department.name} Line
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {subDepartment.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Explore {products.length} products across {leafCategories.length} specialized categories in {subDepartment.name}. All orders include authentic buyer support and pan-India tracked delivery.
          </p>

          {/* Leaf Categories pills */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Browse Categories in {subDepartment.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {leafCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/c/${cat.fullPath}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 transition shadow-sm"
                >
                  <Tag className="w-3 h-3 text-teal-600" />
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded-full">
                    {cat.productCount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Faceted Catalog and Products */}
        <Suspense
          fallback={
            <div className="py-12 text-center text-xs font-semibold text-slate-400">
              Loading sub-department products...
            </div>
          }
        >
          <CategoryCatalogView initialProducts={products} />
        </Suspense>
      </div>
    </>
  );
}
