import { permanentRedirect, notFound } from "next/navigation";
import { getDepartmentBySlug, getCategoryBySlug } from "@/lib/data";

interface CategoryRedirectProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryRedirectPage({ params }: CategoryRedirectProps) {
  const { slug } = await params;

  // 1. Check if slug matches a department
  const dept = getDepartmentBySlug(slug);
  if (dept) {
    permanentRedirect(`/d/${dept.slug}`);
  }

  // 2. Check if slug matches a leaf category
  const cat = getCategoryBySlug(slug);
  if (cat) {
    permanentRedirect(`/c/${cat.fullPath}`);
  }

  notFound();
}
