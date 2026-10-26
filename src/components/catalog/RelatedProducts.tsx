import React from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  currentProductName: string;
}

export default function RelatedProducts({
  products,
  currentProductName,
}: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Handcrafted Pairings
          </span>
          <h2
            id="related-products-heading"
            className="text-2xl font-black text-stone-900 dark:text-white mt-1"
          >
            Pairs Well With {currentProductName}
          </h2>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
          Discover complementary sustainable bamboo essentials to complete your mindful lifestyle and workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
