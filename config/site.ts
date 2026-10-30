/**
 * Central Site Configuration for Bazario Marketplace
 * Single source of truth for brand identity, metadata, navigation, and theme colors.
 */

export const SITE_CONFIG = {
  name: "Bazario",
  legalName: "Bazario Marketplace Demo",
  tagline: "Everything you need, beautifully delivered.",
  description:
    "Bazario is a modern multi-category marketplace featuring electronics, fashion, home essentials, and eco-certified flagship departments.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "Group SEO-027",
  academicNotice: "Demo store for an academic SEO project. Products are not for sale.",
  freeShippingThreshold: 999,
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  flagshipDepartments: [
    {
      slug: "sustainable-bamboo",
      name: "Sustainable Bamboo",
      badge: "Flagship Eco Department",
      tagline: "Handcrafted 100% natural Moso bamboo essentials for home & personal care.",
      icon: "Leaf",
      themeColor: "#059669",
    },
    {
      slug: "sustainable-desk-accessories",
      name: "Sustainable Desk Accessories",
      badge: "Flagship Ergonomics",
      tagline: "Ergonomic risers, docks, and organizers engineered for mindful productivity.",
      icon: "Monitor",
      themeColor: "#0284C7",
    },
  ],
  colors: {
    primary: "#0F766E", // Deep Teal / Emerald
    primaryHover: "#115E59",
    primaryLight: "#F0FDFA",
    accent: "#F59E0B", // Amber / Gold for Deals & Accents
    accentHover: "#D97706",
    surfaceDark: "#0F172A", // Slate 900
    surfaceLight: "#F8FAFC", // Slate 50
    borderDark: "#334155",
    borderLight: "#E2E8F0",
  },
  contact: {
    email: "support@bazariomarket.demo",
    phone: "+91 800 229 2746",
    address: "Group SEO-027 Academic Research Lab, Department of CSE",
  },
  social: {
    twitter: "https://twitter.com/bazariomarket",
    github: "https://github.com/bazario-demo",
  },
};

export type SiteConfig = typeof SITE_CONFIG;
