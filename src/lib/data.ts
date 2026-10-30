import departmentsData from "../../data/departments.json";
import subdepartmentsData from "../../data/subdepartments.json";
import categoriesData from "../../data/categories.json";
import productsData from "../../data/products.json";
import blogData from "../../data/blog.json";
import {
  Department,
  SubDepartment,
  LeafCategory,
  Category,
  Product,
  BlogPost,
  FilterState,
} from "./types";

const departments: Department[] = departmentsData as Department[];
const subDepartments: SubDepartment[] = subdepartmentsData as SubDepartment[];
const categories: LeafCategory[] = categoriesData as LeafCategory[];
const products: Product[] = productsData as Product[];
const blogPosts: BlogPost[] = blogData as BlogPost[];

// Index maps for O(1) slug lookup
const departmentMap = new Map<string, Department>(
  departments.map((d) => [d.slug, d])
);
const subDepartmentMap = new Map<string, SubDepartment>(
  subDepartments.map((s) => [s.slug, s])
);
const categoryMap = new Map<string, LeafCategory>(
  categories.map((c) => [c.slug, c])
);
const productMap = new Map<string, Product>(
  products.map((p) => [p.slug, p])
);

// Departments
export function getAllDepartments(): Department[] {
  return departments;
}

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departmentMap.get(slug);
}

export function getFlagshipDepartments(): Department[] {
  return departments.filter((d) => d.isFlagship);
}

// SubDepartments
export function getAllSubDepartments(): SubDepartment[] {
  return subDepartments;
}

export function getSubDepartmentBySlug(slug: string): SubDepartment | undefined {
  return subDepartmentMap.get(slug);
}

export function getSubDepartmentsByDepartment(deptSlug: string): SubDepartment[] {
  return subDepartments.filter((s) => s.departmentSlug === deptSlug);
}

// Leaf Categories
export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryMap.get(slug);
}

export function getCategoriesByDepartment(deptSlug: string): LeafCategory[] {
  return categories.filter((c) => c.departmentSlug === deptSlug);
}

export function getCategoriesBySubDepartment(subDeptSlug: string): LeafCategory[] {
  return categories.filter((c) => c.subDepartmentSlug === subDeptSlug);
}

// Products
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return productMap.get(slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

export function getProductsByDepartment(deptSlug: string): Product[] {
  return products.filter((p) => p.departmentSlug === deptSlug);
}

export function getProductsBySubDepartment(subDeptSlug: string): Product[] {
  return products.filter((p) => p.subDepartmentSlug === subDeptSlug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(
    (p) => p.leafCategorySlug === categorySlug || p.category === categorySlug
  );
}

export function getFlagshipProducts(): Product[] {
  return products.filter((p) => p.tier === "flagship");
}

export function getFeaturedProducts(): Product[] {
  const flagships = products.filter((p) => p.tier === "flagship");
  if (flagships.length >= 8) {
    return flagships.slice(0, 8);
  }
  return products.slice(0, 8);
}

export function getDealProducts(limit = 12): Product[] {
  return products
    .filter((p) => p.deal && p.deal.discountPercent > 0)
    .slice(0, limit);
}

export function getRelatedProducts(relatedSlugs: string[]): Product[] {
  if (!relatedSlugs || relatedSlugs.length === 0) return [];
  return relatedSlugs
    .map((slug) => productMap.get(slug))
    .filter((p): p is Product => Boolean(p));
}

// Blog
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

// Filter and Sort Engine
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
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.materials.toLowerCase().includes(q)
    );
  }

  // 2. Department filter
  if (filters.department && filters.department !== "All") {
    filtered = filtered.filter((p) => p.departmentSlug === filters.department);
  }

  // 3. SubDepartment filter
  if (filters.subDepartment && filters.subDepartment !== "All") {
    filtered = filtered.filter((p) => p.subDepartmentSlug === filters.subDepartment);
  }

  // 4. Leaf category filter
  if (filters.leafCategory && filters.leafCategory !== "All") {
    filtered = filtered.filter(
      (p) => p.leafCategorySlug === filters.leafCategory || p.category === filters.leafCategory
    );
  }

  // 5. Brand filter
  if (filters.brand && filters.brand !== "All") {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === filters.brand!.toLowerCase());
  }

  // 6. Price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  // 7. In stock only
  if (filters.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // 8. Deals only
  if (filters.dealsOnly) {
    filtered = filtered.filter((p) => p.deal && p.deal.discountPercent > 0);
  }

  // 9. Material
  if (filters.material && filters.material !== "All") {
    filtered = filtered.filter((p) =>
      p.materials.toLowerCase().includes(filters.material!.toLowerCase())
    );
  }

  // 10. Sorting
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
        filtered.sort((a, b) => b.sku.localeCompare(a.sku));
        break;
      case "relevance":
      default:
        // Flagships first, then by SKU
        filtered.sort((a, b) => {
          if (a.tier === "flagship" && b.tier !== "flagship") return -1;
          if (b.tier === "flagship" && a.tier !== "flagship") return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }
  }

  return filtered;
}
