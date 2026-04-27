"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer, revealUp } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPrice } from "@/lib/utils";
import type { VendorCard } from "@/types";

interface FeaturedVendorsProps {
  vendors: VendorCard[];
}

function VendorCardLarge({ vendor }: { vendor: VendorCard }) {
  return (
    <Link href={`/vendors/${vendor.slug}`}>
      <div className="group relative overflow-hidden rounded-3xl shadow-elevated hover:shadow-elevated-hover transition-all duration-500 aspect-[4/5] sm:aspect-auto sm:h-full">
        <Image
          src={vendor.coverImage || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"}
          alt={vendor.businessName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/90 text-charcoal text-xs font-bold">
              <Star size={10} className="fill-charcoal" />
              {vendor.rating.toFixed(1)}
            </div>
            {vendor.reviewCount > 0 && (
              <span className="text-white/50 text-xs">{vendor.reviewCount} reviews</span>
            )}
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl text-white mb-2">{vendor.businessName}</h3>
          <div className="flex items-center gap-3 text-white/60 text-sm mb-4">
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {vendor.city.name}
            </span>
            <span>&middot;</span>
            <span>{vendor.category.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gold-light font-semibold text-lg">{formatPrice(vendor.startingPrice)}</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-magenta group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function VendorCardSmall({ vendor }: { vendor: VendorCard }) {
  return (
    <Link href={`/vendors/${vendor.slug}`}>
      <div className="group flex gap-4 p-4 rounded-2xl bg-white shadow-elevated hover:shadow-elevated-hover transition-all duration-300 hover:-translate-y-0.5">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
          <Image
            src={vendor.coverImage || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300"}
            alt={vendor.businessName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Star size={12} className="fill-gold text-gold shrink-0" />
            <span className="text-xs font-bold text-charcoal">{vendor.rating.toFixed(1)}</span>
            {vendor.reviewCount > 0 && (
              <span className="text-xs text-slate">({vendor.reviewCount})</span>
            )}
          </div>
          <h4 className="font-heading text-lg text-charcoal truncate group-hover:text-magenta transition-colors">{vendor.businessName}</h4>
          <p className="text-slate text-xs flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> {vendor.city.name} &middot; {vendor.category.name}
          </p>
          <p className="text-magenta font-semibold text-sm mt-2">{formatPrice(vendor.startingPrice)}</p>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedVendors({ vendors }: FeaturedVendorsProps) {
  if (vendors.length === 0) return null;

  const featured = vendors[0];
  const rest = vendors.slice(1, 5);

  return (
    <section className="py-24 gradient-mesh-light">
      <Container>
        <SectionHeader
          title="Handpicked for You"
          subtitle="Our most loved vendors, chosen for their craft and consistency"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Large featured card */}
          <motion.div variants={revealUp} className="lg:row-span-2">
            <VendorCardLarge vendor={featured} />
          </motion.div>

          {/* Smaller cards stacked */}
          <div className="space-y-4">
            {rest.map((vendor) => (
              <motion.div key={vendor.id} variants={fadeInUp}>
                <VendorCardSmall vendor={vendor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
