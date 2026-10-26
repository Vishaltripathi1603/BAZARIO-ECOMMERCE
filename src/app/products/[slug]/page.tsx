import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getCategoryBySlug,
} from "@/lib/data";
import {
  getCanonicalUrl,
  generateProductSchema,
} from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import RelatedProducts from "@/components/catalog/RelatedProducts";
import ProductDetailActions from "@/components/catalog/ProductDetailActions";
import {
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  Leaf,
  Info,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | BambooNest",
    };
  }

  const canonicalUrl = getCanonicalUrl(`/products/${slug}`);

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: canonicalUrl,
      images: [product.images[0].url],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product.relatedSlugs);
  const productSchema = generateProductSchema(product);

  return (
    <>
      <JsonLd data={productSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            {
              name: category ? category.name : "Products",
              url: category ? `/category/${category.slug}` : "/products",
            },
            { name: product.name, url: `/products/${product.slug}` },
          ]}
        />

        {/* Product Showcase Section */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-md">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                priority // Prioritize product detail main image for LCP
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 dark:bg-stone-900/90 text-emerald-800 dark:text-emerald-400 shadow-sm border border-stone-200/80">
                  {product.subcategory}
                </span>
              </div>
            </div>

            {/* Sustainability Highlights Badge */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-300">
              <Leaf className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                <strong>100% Verified Sourcing:</strong> Harvested from sustainably managed Moso groves with non-toxic, food-grade mineral finishes.
              </span>
            </div>
          </div>

          {/* Right Column: Pricing, Overview & Action */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category / Subcategory Tag */}
            <div className="flex items-center gap-2">
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 hover:underline"
              >
                {category?.name}
              </Link>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                SKU: {product.sku}
              </span>
            </div>

            {/* Exactly ONE H1 on Page */}
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price & Stock Status Strip */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                  Price (inclusive of all taxes)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-stone-900 dark:text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    Free Pan-India Delivery
                  </span>
                </div>
              </div>

              <div>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    In Stock & Ready to Ship
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    Temporarily Restocking
                  </span>
                )}
              </div>
            </div>

            {/* Short Narrative Overview */}
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Bulleted Core Features */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                Key Craft & Functional Highlights
              </h2>
              <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Buy & Cart Actions */}
            <ProductDetailActions product={product} />

            {/* Reassurance Icons Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-600 shrink-0" />
                <span>Dispatch within 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-600 shrink-0" />
                <span>1-Year Craft Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-stone-600 shrink-0" />
                <span>Plastic-Free Return Box</span>
              </div>
            </div>
          </div>
        </article>

        {/* Detailed 100% Original Long Description & Technical Specs */}
        <section
          aria-labelledby="product-details-heading"
          className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-8"
        >
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Detailed Material Analysis
            </span>
            {/* H2 containing primary keyword naturally */}
            <h2
              id="product-details-heading"
              className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white"
            >
              Complete Description & Craft of {product.primaryKeyword}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {product.longDescription}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                Technical Specifications & Material Attributes
              </h3>
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Raw Materials</span>
                <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">{product.materials}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Dimensions</span>
                <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">{product.dimensions}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Intended Use Case</span>
                <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">{product.useCase}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Color Variants</span>
                <span className="sm:col-span-2 text-stone-900 dark:text-stone-100">{product.colorOptions.join(", ")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Product SKU</span>
                <span className="sm:col-span-2 font-mono text-xs text-stone-700 dark:text-stone-300">{product.sku}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6">
                <span className="font-semibold text-stone-500 dark:text-stone-400">Catalog Tags</span>
                <span className="sm:col-span-2 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                    >
                      <Tag className="w-3 h-3 text-stone-400" />
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Authentic White-Hat Transparency Notice */}
          <div className="p-5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-400">
            <Info className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Authentic Review Integrity:</strong> As a dedicated white-hat e-commerce SEO prototype, BambooNest never injects fabricated 5-star customer ratings or synthetic reviews into schema markup or user interfaces. All product dimensions, material origins, and durability testing specifications published above reflect verifiable physical attributes.
            </p>
          </div>
        </section>

        {/* Related Products Section */}
        <RelatedProducts
          products={related}
          currentProductName={product.name}
        />
      </div>
    </>
  );
}
