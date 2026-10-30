import { NextResponse } from "next/server";
import {
  getAllDepartments,
  getAllSubDepartments,
  getAllCategories,
  getAllProducts,
  getAllBlogPosts,
} from "@/lib/data";
import { getBaseUrl } from "@/lib/seo";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function buildUrlSetXml(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const baseUrl = getBaseUrl();
  const currentDate = new Date().toISOString().split("T")[0];

  let urls: SitemapUrl[] = [];

  if (filename === "departments.xml") {
    // 1. Static Pages
    urls.push(
      { loc: `${baseUrl}`, lastmod: currentDate, changefreq: "daily", priority: "1.0" },
      { loc: `${baseUrl}/departments`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
      { loc: `${baseUrl}/departments/all`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
      { loc: `${baseUrl}/deals`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
      { loc: `${baseUrl}/products`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
      { loc: `${baseUrl}/blog`, lastmod: currentDate, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: "monthly", priority: "0.6" },
      { loc: `${baseUrl}/credits`, lastmod: currentDate, changefreq: "monthly", priority: "0.5" },
      { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: "monthly", priority: "0.6" }
    );

    // 2. Departments
    const departments = getAllDepartments();
    departments.forEach((dept) => {
      urls.push({
        loc: `${baseUrl}/d/${dept.slug}`,
        lastmod: currentDate,
        changefreq: "daily",
        priority: dept.isFlagship ? "0.95" : "0.85",
      });
    });

    // 3. Sub-departments
    const subDepartments = getAllSubDepartments();
    subDepartments.forEach((sub) => {
      urls.push({
        loc: `${baseUrl}/c/${sub.departmentSlug}/${sub.slug}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.80",
      });
    });

    // 4. Blog Posts
    const blogPosts = getAllBlogPosts();
    blogPosts.forEach((b) => {
      urls.push({
        loc: `${baseUrl}/blog/${b.slug}`,
        lastmod: b.publishDate || currentDate,
        changefreq: "monthly",
        priority: "0.70",
      });
    });
  } else if (filename === "categories-1.xml") {
    // Leaf categories batch 1 (0 to 600)
    const categories = getAllCategories().filter((c) => c.isIndexable);
    const batch = categories.slice(0, 600);
    batch.forEach((cat) => {
      urls.push({
        loc: `${baseUrl}/c/${cat.fullPath}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.75",
      });
    });
  } else if (filename === "categories-2.xml") {
    // Leaf categories batch 2 (600+)
    const categories = getAllCategories().filter((c) => c.isIndexable);
    const batch = categories.slice(600);
    batch.forEach((cat) => {
      urls.push({
        loc: `${baseUrl}/c/${cat.fullPath}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.75",
      });
    });
  } else if (filename.startsWith("products-")) {
    const products = getAllProducts();
    let start = 0;
    let end = 1000;

    if (filename === "products-1.xml") {
      start = 0;
      end = 1000;
    } else if (filename === "products-2.xml") {
      start = 1000;
      end = 2000;
    } else if (filename === "products-3.xml") {
      start = 2000;
      end = 3000;
    } else if (filename === "products-4.xml") {
      start = 3000;
      end = products.length;
    }

    const batch = products.slice(start, end);
    batch.forEach((prod) => {
      urls.push({
        loc: `${baseUrl}/p/${prod.slug}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: prod.tier === "flagship" ? "0.85" : "0.65",
      });
    });
  } else {
    return new NextResponse("Sitemap Not Found", { status: 404 });
  }

  const xml = buildUrlSetXml(urls);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
