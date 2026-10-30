"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Package, ExternalLink } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  photographer?: string;
  photographerUrl?: string;
  source?: string;
  showAttribution?: boolean;
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  aspectRatio = "square",
  photographer,
  photographerUrl,
  source = "Pexels",
  showAttribution = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isRemote = src.startsWith("http://") || src.startsWith("https://");

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "";

  if (hasError || !src) {
    // Elegant on-brand fallback card
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400 dark:text-slate-500 rounded-2xl overflow-hidden p-4 border border-slate-200/80 dark:border-slate-800 ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Package className="w-10 h-10 mb-2 text-teal-600/60 dark:text-teal-400/60" />
        <span className="text-[11px] font-bold text-center text-slate-600 dark:text-slate-300 line-clamp-2 px-2">
          {alt || "Bazario Product"}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold mt-1">
          Bazario Authentic Eco Item
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${
        fill ? "w-full h-full" : ""
      } ${aspectClass} ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse z-10"
          aria-hidden="true"
        />
      )}

      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 600}
          height={height || 600}
          priority={priority}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Subtle Photographer Attribution Chip */}
      {showAttribution && photographer && !isLoading && (
        <div className="absolute bottom-2 left-2 z-20">
          {photographerUrl ? (
            <a
              href={photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/70 hover:bg-slate-950/90 text-[10px] text-white/90 backdrop-blur-xs transition"
              title={`Photo by ${photographer} on ${source}`}
            >
              <Camera className="w-2.5 h-2.5 text-teal-400" />
              <span>{photographer}</span>
              <ExternalLink className="w-2 h-2 opacity-70" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/70 text-[10px] text-white/90 backdrop-blur-xs">
              <Camera className="w-2.5 h-2.5 text-teal-400" />
              <span>{photographer}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
