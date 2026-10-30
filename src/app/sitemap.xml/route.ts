import { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/seo";

export async function GET() {
  const baseUrl = getBaseUrl();
  const currentDate = new Date().toISOString().split("T")[0];

  const subSitemaps = [
    `${baseUrl}/sitemap/departments.xml`,
    `${baseUrl}/sitemap/categories-1.xml`,
    `${baseUrl}/sitemap/categories-2.xml`,
    `${baseUrl}/sitemap/products-1.xml`,
    `${baseUrl}/sitemap/products-2.xml`,
    `${baseUrl}/sitemap/products-3.xml`,
    `${baseUrl}/sitemap/products-4.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subSitemaps
  .map(
    (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
