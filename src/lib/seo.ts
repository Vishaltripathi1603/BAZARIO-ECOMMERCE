import { Product, LeafCategory, BlogPost, Department, FAQItem } from "./types";
import { SITE_CONFIG } from "@/../config/site";

export { SITE_CONFIG };

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    SITE_CONFIG.url.replace(/\/$/, "")
  );
}

export function getCanonicalUrl(pathname: string): string {
  const base = getBaseUrl();
  const cleanPath = pathname.split("?")[0].replace(/\/$/, "");
  return `${base}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: base,
    logo: `${base}/images/logo.svg`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.twitter,
    ],
  };
}

export function generateWebSiteSchema() {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  products: Product[]
) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: `${base}${url}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 24).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${base}/p/${product.slug}`,
        name: product.name,
      })),
    },
  };
}

export function generateProductSchema(product: Product) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.url.startsWith("http") ? img.url : `${base}${img.url}`
    ),
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_CONFIG.name,
    },
    material: product.materials,
    offers: {
      "@type": "Offer",
      url: `${base}/p/${product.slug}`,
      priceCurrency: SITE_CONFIG.currency.code,
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
    // Strict White-Hat Compliance: NO aggregateRating or fake reviews added.
  };
}

export function generateArticleSchema(post: BlogPost) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.url.startsWith("http")
      ? post.featuredImage.url
      : `${base}${post.featuredImage.url}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${base}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
  };
}

export function generateFAQSchema(
  input: FAQItem[] | LeafCategory | { faqs: FAQItem[] }
) {
  const faqList = Array.isArray(input) ? input : input.faqs;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
