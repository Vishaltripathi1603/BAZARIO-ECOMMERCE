"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Sparkles,
  Image as ImageIcon,
  Box,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  ExternalLink,
} from "lucide-react";
import { Product } from "@/lib/types";
import ProductImage from "@/components/ui/ProductImage";

// Dynamic import of 3D viewer with SSR disabled
const Product3DViewer = dynamic(
  () => import("@/components/3d/Product3DViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center animate-pulse">
        <span className="text-xs font-semibold text-slate-500">
          Loading 3D Product Canvas...
        </span>
      </div>
    ),
  }
);

interface ProductMediaGalleryProps {
  product: Product;
}

export default function ProductMediaGallery({ product }: ProductMediaGalleryProps) {
  const isFlagship = product.tier === "flagship";
  const [activeTab, setActiveTab] = useState<"photos" | "3d">(
    isFlagship ? "photos" : "photos"
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ url: "/images/categories/bamboo-cutting-boards.svg", alt: product.name }];

  const currentImage = images[selectedImageIndex] || images[0];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeTab !== "photos") return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsZoomOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left
      nextImage();
    } else if (diff < -50) {
      // Swiped right
      prevImage();
    }
    touchStartX.current = null;
  };

  return (
    <div className="space-y-4">
      {/* 3D vs Photos Switcher Tabs (Only for Flagships) */}
      {isFlagship && (
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition min-h-[36px] ${
              activeTab === "photos"
                ? "bg-teal-700 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>High-Res Photography</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("3d")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition min-h-[36px] ${
              activeTab === "3d"
                ? "bg-teal-700 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Canvas</span>
          </button>
        </div>
      )}

      {/* Main Display Area */}
      {activeTab === "3d" && isFlagship ? (
        <Product3DViewer
          productSlug={product.slug}
          productName={product.name}
          fallbackImage={currentImage.url}
          defaultFinish={product.colorOptions?.[0]}
        />
      ) : (
        <div
          className="relative aspect-square sm:aspect-[4/3] w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ProductImage
            src={currentImage.url}
            alt={currentImage.alt || product.name}
            fill
            priority
            photographer={currentImage.photographer}
            photographerUrl={currentImage.photographerUrl}
            source={currentImage.source}
            showAttribution
            className="w-full h-full"
          />

          {/* Zoom button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            aria-label="Click to zoom image"
            className="absolute top-3 right-3 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 shadow-md backdrop-blur-xs transition z-20"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Prev/Next arrows on hover */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 shadow-md backdrop-blur-xs transition opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 shadow-md backdrop-blur-xs transition opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter dot indicators on mobile */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/70 text-white text-[10px] font-bold backdrop-blur-xs">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}

      {/* Thumbnail Navigation Bar */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedImageIndex(idx);
                setActiveTab("photos");
              }}
              aria-label={`View photo ${idx + 1}`}
              className={`relative w-16 h-16 rounded-2xl border overflow-hidden shrink-0 transition min-h-[44px] min-w-[44px] ${
                selectedImageIndex === idx && activeTab === "photos"
                  ? "border-teal-600 ring-2 ring-teal-600/40 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-70 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={img.url}
                alt={img.alt || `${product.name} thumbnail ${idx + 1}`}
                fill
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Click-to-Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed Product Image View"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-slate-300 transition"
              aria-label="Close zoom modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full aspect-square sm:aspect-[4/3] max-h-[80vh] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
              <ProductImage
                src={currentImage.url}
                alt={currentImage.alt || product.name}
                fill
                priority
                photographer={currentImage.photographer}
                photographerUrl={currentImage.photographerUrl}
                source={currentImage.source}
                showAttribution
                className="w-full h-full"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-4 mt-4 text-white text-xs font-semibold">
                <button
                  type="button"
                  onClick={prevImage}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span>
                  {selectedImageIndex + 1} of {images.length}
                </span>
                <button
                  type="button"
                  onClick={nextImage}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
