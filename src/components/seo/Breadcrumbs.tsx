import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always include Home as first item
  const allItems: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    ...items,
  ];

  const schema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className="w-full py-3 text-sm text-stone-600 dark:text-stone-300"
      >
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.url} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-stone-400 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-stone-900 dark:text-white truncate max-w-[200px] sm:max-w-xs"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="inline-flex items-center gap-1 hover:text-emerald-800 dark:hover:text-emerald-400 hover:underline transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
                  >
                    {index === 0 && (
                      <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
