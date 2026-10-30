import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/search",
        "/signin",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/account",
        "/account/",
        "/checkout",
        "/auth/",
        "/*?*", // Prevent search crawler index bloat on dynamic filtered parameter combinations
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
