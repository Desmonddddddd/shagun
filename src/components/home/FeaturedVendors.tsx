"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import VendorCard from "@/components/vendors/VendorCard";
import { cn } from "@/lib/utils";
import type { VendorCardData } from "@/types";

const featuredVendors: VendorCardData[] = [
  {
    id: "1",
    businessName: "The Royal Orchid Palace",
    slug: "royal-orchid-palace",
    description: "A magnificent heritage venue perfect for grand celebrations",
    rating: 4.9,
    reviewCount: 324,
    startingPrice: 500000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
    experience: 15,
    eventsCompleted: 1200,
    category: { name: "Venues", slug: "venues" },
    city: { name: "Udaipur", slug: "udaipur" },
    media: [],
  },
  {
    id: "2",
    businessName: "Candid Shaadi Photography",
    slug: "candid-shaadi-photography",
    description: "Capturing your love story in its most authentic form",
    rating: 4.8,
    reviewCount: 512,
    startingPrice: 75000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    experience: 10,
    eventsCompleted: 800,
    category: { name: "Photographers", slug: "photographers" },
    city: { name: "Mumbai", slug: "mumbai" },
    media: [],
  },
  {
    id: "3",
    businessName: "Dawat-e-Khaas Caterers",
    slug: "dawat-e-khaas-caterers",
    description: "Royal Mughlai and multi-cuisine wedding feasts",
    rating: 4.7,
    reviewCount: 289,
    startingPrice: 150000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
    experience: 20,
    eventsCompleted: 950,
    category: { name: "Caterers", slug: "caterers" },
    city: { name: "Delhi", slug: "delhi" },
    media: [],
  },
  {
    id: "4",
    businessName: "Blooming Tales Decor",
    slug: "blooming-tales-decor",
    description: "Transforming spaces into enchanted wedding wonderlands",
    rating: 4.9,
    reviewCount: 198,
    startingPrice: 200000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    experience: 8,
    eventsCompleted: 500,
    category: { name: "Decorators", slug: "decorators" },
    city: { name: "Jaipur", slug: "jaipur" },
    media: [],
  },
  {
    id: "5",
    businessName: "Glamour by Nisha",
    slug: "glamour-by-nisha",
    description: "Celebrity bridal makeup artist specializing in HD & airbrush",
    rating: 4.8,
    reviewCount: 445,
    startingPrice: 50000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    experience: 12,
    eventsCompleted: 1500,
    category: { name: "Makeup Artists", slug: "makeup-artists" },
    city: { name: "Mumbai", slug: "mumbai" },
    media: [],
  },
  {
    id: "6",
    businessName: "Rhythm & Beats Entertainment",
    slug: "rhythm-beats-entertainment",
    description: "High-energy DJ, dhol players & sangeet choreography",
    rating: 4.6,
    reviewCount: 167,
    startingPrice: 80000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    experience: 7,
    eventsCompleted: 600,
    category: { name: "DJs & Musicians", slug: "djs-musicians" },
    city: { name: "Bangalore", slug: "bangalore" },
    media: [],
  },
  {
    id: "7",
    businessName: "Sapna Mehendi Arts",
    slug: "sapna-mehendi-arts",
    description: "Intricate bridal mehendi with Rajasthani & Arabic styles",
    rating: 4.9,
    reviewCount: 378,
    startingPrice: 15000,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=600&h=400&fit=crop",
    experience: 18,
    eventsCompleted: 2000,
    category: { name: "Mehendi Artists", slug: "mehendi-artists" },
    city: { name: "Jaipur", slug: "jaipur" },
    media: [],
  },
  {
    id: "8",
    businessName: "Shubh Vivah Planners",
    slug: "shubh-vivah-planners",
    description: "End-to-end luxury wedding planning & coordination",
    rating: 4.8,
    reviewCount: 201,
    startingPrice: 300000,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
    experience: 14,
    eventsCompleted: 400,
    category: { name: "Wedding Planners", slug: "wedding-planners" },
    city: { name: "Delhi", slug: "delhi" },
    media: [],
  },
];

interface FeaturedVendorsProps {
  vendors?: VendorCardData[];
}

export default function FeaturedVendors({ vendors: propVendors }: FeaturedVendorsProps) {
  const displayVendors = propVendors && propVendors.length > 0 ? propVendors : featuredVendors;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal mb-3"
            >
              Handpicked Vendors
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-0.5 bg-gold mb-3 origin-left"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-[family-name:var(--font-body)] text-slate text-base sm:text-lg"
            >
              Top-rated professionals trusted by thousands of couples
            </motion.p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-xl border border-ivory-dark hover:border-gold hover:bg-gold/5 text-slate hover:text-gold-dark transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-xl border border-ivory-dark hover:border-gold hover:bg-gold/5 text-slate hover:text-gold-dark transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Vendor Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex-shrink-0 w-[300px] sm:w-[320px] snap-start"
            >
              <VendorCard vendor={vendor} />
            </div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold-dark font-medium px-6 py-3 rounded-xl transition-all duration-200 font-[family-name:var(--font-body)] text-sm group"
          >
            View All Vendors
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
