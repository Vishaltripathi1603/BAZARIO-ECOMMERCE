import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  getProductBySlug,
  getFlagshipProducts,
  getRelatedProducts,
  getDepartmentBySlug,
  getCategoryBySlug,
} from "@/lib/data";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ProductDetailActions from "@/components/catalog/ProductDetailActions";
import ProductCard from "@/components/catalog/ProductCard";
import ProductMediaGallery from "./ProductMediaGallery";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  getBaseUrl,
} from "@/lib/seo";

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours ISR for Tier B products

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const flagships = getFlagshipProducts();
  return flagships.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Bazario" };
  }

  const canonicalUrl = `${getBaseUrl()}/p/${product.slug}`;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: product.images[0]?.url || "/images/categories/bamboo-cutting-boards.svg",
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.images[0]?.url || "/images/categories/bamboo-cutting-boards.svg"],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const department = getDepartmentBySlug(product.departmentSlug);
  const leafCategory = getCategoryBySlug(product.leafCategorySlug);
  const relatedProducts = getRelatedProducts(product.relatedSlugs || []);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    ...(department
      ? [{ name: department.name, url: `/d/${department.slug}` }]
      : []),
    ...(leafCategory
      ? [{ name: leafCategory.name, url: `/c/${leafCategory.fullPath}` }]
      : []),
    { name: product.name, url: `/p/${product.slug}` },
  ];

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Main Product Section: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Visual Media Gallery & 3D Viewer */}
          <div className="lg:col-span-7">
            <ProductMediaGallery product={product} />
          </div>

          {/* Right Column: Pricing, Specs & Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Brand Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-semibold">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Exact Single H1 */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Trust Badge */}
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authentic Catalog Item
                </span>
                <span>&bull;</span>
                <span>Zero Fabricated Reviews</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all local taxes. Free delivery on orders &ge; ₹999.
                </p>
              </div>

              {product.deal && (
                <span className="px-3 py-1 text-xs font-black rounded-full bg-amber-400 text-slate-950 shadow-sm uppercase tracking-wide">
                  {product.deal.badge}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Key Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Key Specifications:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions: Finish Picker, Add to Cart, Buy Now */}
            <ProductDetailActions product={product} />
          </div>
        </div>

        {/* Detailed Product Specifications & Description */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Product Overview &amp; Technical Details
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3 max-w-4xl">
              {product.longDescription}
            </p>
          </div>

          {/* Specs Table */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Physical &amp; Engineering Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Materials:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-right">{product.materials}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Dimensions:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-right">{product.dimensions}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Primary Use Case:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-right">{product.useCase}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Stock Status:</span>
                <span className="font-semibold text-teal-600 text-right">In Stock &bull; Verified Inventory</span>
              </div>

              {product.specs &&
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 capitalize">{key}:</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Customers Also Viewed in {product.subcategory}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Complementary recommendations based on taxonomy hierarchy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.slug} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
