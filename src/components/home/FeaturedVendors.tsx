"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { VendorCard } from "@/types";

interface FeaturedVendorsProps {
  vendors: VendorCard[];
}

export function FeaturedVendors({ vendors }: FeaturedVendorsProps) {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader title="Featured Vendors" subtitle="Handpicked top-rated wedding professionals" />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <motion.div key={vendor.id} variants={fadeInUp}>
              <Link href={`/vendors/${vendor.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={vendor.coverImage || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"}
                      alt={vendor.businessName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {vendor.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="gold" size="sm">Featured</Badge>
                      </div>
                    )}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal hover:text-magenta transition-all"
                      aria-label="Save vendor"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading text-lg text-charcoal group-hover:text-magenta transition-colors">{vendor.businessName}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={14} className="fill-gold text-gold" />
                        <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-slate">({vendor.reviewCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate text-sm mb-3">
                      <MapPin size={14} />
                      <span>{vendor.city.name}</span>
                      <span className="mx-1">&middot;</span>
                      <span>{vendor.category.name}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-cream-dark">
                      <span className="text-magenta font-semibold">Starting {formatPrice(vendor.startingPrice)}</span>
                      <span className="text-sm text-magenta font-medium group-hover:underline">View Profile &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
