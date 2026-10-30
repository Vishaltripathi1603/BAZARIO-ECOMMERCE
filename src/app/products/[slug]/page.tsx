import { permanentRedirect, notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";

interface ProductRedirectProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductRedirectPage({ params }: ProductRedirectProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (product) {
    permanentRedirect(`/p/${product.slug}`);
  }

  notFound();
}
