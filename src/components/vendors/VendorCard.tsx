"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { VendorCardData } from "@/types";

interface VendorCardProps {
  vendor: VendorCardData;
  className?: string;
}

export default function VendorCard({ vendor, className }: VendorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      className={cn("h-full", className)}
    >
      <Link href={`/vendors/${vendor.slug}`} className="block h-full focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl">
        <div
          className={cn(
            "group bg-white rounded-2xl overflow-hidden h-full flex flex-col",
            "card-shadow hover:card-shadow-hover",
            "transition-shadow duration-300 ease-out",
            "border border-transparent hover:border-gold/15"
          )}
        >
          {/* Image */}
          <div className="relative h-52 sm:h-56 overflow-hidden">
            {vendor.coverImage ? (
              <Image
                src={vendor.coverImage}
                alt={vendor.businessName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ivory to-ivory-dark flex items-center justify-center">
                <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-slate-light/40">
                  {vendor.businessName.charAt(0)}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {vendor.featured && (
                <span className="px-2.5 py-1 bg-gold text-white text-[11px] font-semibold rounded-full font-[family-name:var(--font-body)] shadow-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-charcoal text-[11px] font-medium rounded-full font-[family-name:var(--font-body)]">
                {vendor.category.name}
              </span>
            </div>

            {/* Price on image */}
            <div className="absolute bottom-3 right-3">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-charcoal text-xs font-semibold rounded-lg font-[family-name:var(--font-body)] shadow-sm">
                From {formatPrice(vendor.startingPrice)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4 sm:p-5">
            {/* Business Name */}
            <h3 className="font-[family-name:var(--font-heading)] font-bold text-charcoal text-base sm:text-lg mb-1 line-clamp-1">
              {vendor.businessName}
            </h3>

            {/* City */}
            <p className="font-[family-name:var(--font-body)] text-xs text-slate flex items-center gap-1 mb-3">
              <MapPin size={12} />
              {vendor.city.name}
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 rounded-md">
                <Star size={13} className="text-gold fill-gold" />
                <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-gold-dark">
                  {vendor.rating.toFixed(1)}
                </span>
              </div>
              <span className="font-[family-name:var(--font-body)] text-xs text-slate">
                ({vendor.reviewCount} reviews)
              </span>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-3 border-t border-ivory-dark">
              <span className="inline-flex items-center gap-1.5 text-gold-dark font-medium font-[family-name:var(--font-body)] text-sm group/link">
                View Profile
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-0.5 transition-transform"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
