"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  displayOrder: number;
}

interface VendorGalleryProps {
  media: MediaItem[];
  className?: string;
}

export default function VendorGallery({ media, className }: VendorGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedMedia = [...media].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedMedia.length - 1 : prev - 1
    );
  }, [sortedMedia.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === sortedMedia.length - 1 ? 0 : prev + 1
    );
  }, [sortedMedia.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    },
    [goToPrevious, goToNext, closeLightbox]
  );

  if (!sortedMedia.length) {
    return (
      <div className="bg-ivory-dark rounded-2xl p-12 text-center">
        <p className="font-[family-name:var(--font-body)] text-slate">
          No photos available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {sortedMedia.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={item.url}
                alt={item.caption || "Gallery image"}
                width={600}
                height={item.displayOrder % 3 === 0 ? 700 : 400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <Maximize2 size={18} className="text-charcoal" />
                  </div>
                </div>
              </div>
              {/* Caption */}
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-[family-name:var(--font-body)]">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={sortedMedia[currentIndex].url}
                alt={sortedMedia[currentIndex].caption || "Gallery image"}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
                sizes="90vw"
                priority
              />
              {/* Caption */}
              {sortedMedia[currentIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent rounded-b-lg">
                  <p className="text-white text-sm font-[family-name:var(--font-body)] text-center">
                    {sortedMedia[currentIndex].caption}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-[family-name:var(--font-body)]">
                {currentIndex + 1} / {sortedMedia.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
