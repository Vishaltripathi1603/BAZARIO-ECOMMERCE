export type CategorySlug =
  | "sustainable-bamboo"
  | "sustainable-desk-accessories"
  | "eco-dining-kitchenware"
  | "bamboo-wellness-decor";

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  price: number; // in INR
  shortDescription: string;
  longDescription: string;
  features: string[];
  materials: string;
  dimensions: string;
  useCase: string;
  colorOptions: string[];
  tags: string[];
  images: ProductImage[];
  inStock: boolean;
  sku: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  relatedSlugs: string[];
  ratingNote?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  headline: string;
  introText: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  subcategories: string[];
  faqs: FAQItem[];
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
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  inStockOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "newest" | "name-asc";
  searchQuery?: string;
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
