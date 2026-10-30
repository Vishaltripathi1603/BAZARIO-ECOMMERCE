/**
 * TypeScript Data Models for Bazario Marketplace
 * Supports 3-tier taxonomy, Tier A / Tier B product catalogs, and faceted navigation.
 */

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  photographer?: string;
  photographerUrl?: string;
  source?: string;
  license?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/* 1. Level 1: Top-Level Department (~25) */
export interface Department {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  iconName: string;
  themeColor: string;
  bannerImage: string;
  isFlagship?: boolean;
  subDepartments: string[]; // slugs
  featuredLeafCategories: string[]; // slugs
  productCount: number;
  metaTitle: string;
  metaDescription: string;
}

/* 2. Level 2: Sub-Department (~180) */
export interface SubDepartment {
  id: string;
  slug: string;
  name: string;
  departmentSlug: string;
  departmentName: string;
  leafCategories: string[]; // slugs
  productCount: number;
  metaTitle: string;
  metaDescription: string;
}

/* 3. Level 3: Leaf Category (1,000+) */
export interface LeafCategory {
  id: string;
  slug: string;
  name: string;
  departmentSlug: string;
  departmentName: string;
  subDepartmentSlug: string;
  subDepartmentName: string;
  parentPath: string[]; // [departmentSlug, subDepartmentSlug]
  fullPath: string; // e.g. "electronics/audio-headphones/wireless-earbuds"
  level: 3;
  breadcrumb: { name: string; url: string }[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  introText: string; // strictly >=60 words for indexable status
  faqs: FAQItem[];
  metaTitle: string; // strictly <=60 chars
  metaDescription: string; // strictly 140-160 chars
  image: string;
  productCount: number; // strictly >=3 products
  isIndexable: boolean; // false if <3 products or <60 words
}

/* Generic Category interface compatible with existing pages */
export type Category = LeafCategory;

/* Product Model (Tier A Flagship & Tier B Scale) */
export interface Product {
  id: string;
  slug: string;
  name: string;
  tier: "flagship" | "standard";
  departmentSlug: string;
  subDepartmentSlug: string;
  leafCategorySlug: string;
  category: string; // For backwards compatibility (leafCategorySlug or flagship slug)
  subcategory: string;
  brand: string;
  price: number; // in INR
  originalPrice?: number; // for deal calculations
  deal?: {
    badge: string;
    discountPercent: number;
    badgeColor?: string;
  };
  shortDescription: string;
  longDescription: string; // Tier A: 150-250 words; Tier B: 60-90 words
  features: string[];
  materials: string;
  dimensions: string;
  useCase: string;
  specs: Record<string, string>;
  colorOptions: string[];
  tags: string[];
  images: ProductImage[];
  image?: string;
  imageAlt?: string;
  compareAtPrice?: number;
  photographer?: string;
  photographerUrl?: string;
  license?: string;
  inStock: boolean;
  sku: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string; // strictly <=60 chars
  metaDescription: string; // strictly 140-160 chars
  relatedSlugs: string[];
  ratingNote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  featuredImage: ProductImage;
  relatedProductSlugs: string[];
  sections: {
    heading: string;
    level: 2 | 3;
    content: string;
    productRecommendation?: {
      slug: string;
      name: string;
      context: string;
    };
  }[];
}

export interface FilterState {
  department?: string;
  subDepartment?: string;
  leafCategory?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  inStockOnly?: boolean;
  dealsOnly?: boolean;
  sortBy?: "relevance" | "price-asc" | "price-desc" | "newest" | "name-asc";
  searchQuery?: string;
  page?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
}
