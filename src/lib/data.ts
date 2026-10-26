import productsData from "../../data/products.json";
import categoriesData from "../../data/categories.json";
import blogData from "../../data/blog.json";
import { Product, Category, BlogPost, FilterState } from "./types";

const products: Product[] = productsData as Product[];
const categories: Category[] = categoriesData as Category[];
const blogPosts: BlogPost[] = blogData as BlogPost[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(relatedSlugs: string[]): Product[] {
  return products.filter((p) => relatedSlugs.includes(p.slug));
}

export function getFeaturedProducts(): Product[] {
  // Select 8 showcase products (2 from each of the 4 categories)
  return [
    products.find((p) => p.slug === "bamboo-laptop-stand-riser")!,
    products.find((p) => p.slug === "bamboo-cutting-board-juice-groove")!,
    products.find((p) => p.slug === "bamboo-salad-bowl-serving-set")!,
    products.find((p) => p.slug === "bamboo-aromatherapy-essential-oil-diffuser")!,
    products.find((p) => p.slug === "bamboo-wireless-charging-pad")!,
    products.find((p) => p.slug === "bamboo-dual-monitor-riser-stand")!,
    products.find((p) => p.slug === "bamboo-cutlery-flatware-dining-set")!,
    products.find((p) => p.slug === "bamboo-woven-pendant-light-shade")!,
  ].filter(Boolean);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function filterAndSortProducts(
  items: Product[],
  filters: FilterState
): Product[] {
  let filtered = [...items];

  // 1. Search query
  if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
    const q = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.materials.toLowerCase().includes(q)
    );
  }

  // 2. Subcategory
  if (filters.subcategory && filters.subcategory !== "All") {
    filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
  }

  // 3. Price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  // 4. In stock only
  if (filters.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // 5. Material
  if (filters.material && filters.material !== "All") {
    filtered = filtered.filter((p) =>
      p.materials.toLowerCase().includes(filters.material!.toLowerCase())
    );
  }

  // 6. Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Keep order or sort by SKU descending
        filtered.sort((a, b) => b.sku.localeCompare(a.sku));
        break;
    }
  }

  return filtered;
}
