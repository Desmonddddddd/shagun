"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, revealUp } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

// Curated Unsplash images that feel premium and Indian-wedding specific
const categoryImages: Record<string, string> = {
  "venues": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  "photography": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
  "makeup-beauty": "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80",
  "planning-decor": "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
  "food-catering": "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
  "bridal-wear": "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&q=80",
  "groom-wear": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "jewellery": "https://images.unsplash.com/photo-1515562141589-67f0d7e1a26a?w=800&q=80",
  "music-entertainment": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  "invitations": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
  "mehndi-artists": "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=800&q=80",
  "gifts-favours": "https://images.unsplash.com/photo-1549465220-1a8b9238f525?w=800&q=80",
  "honeymoon": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "pandit-services": "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=800&q=80",
};

function getVendorCountText(count: number): string | null {
  if (count <= 1) return null;
  return `${count} vendors`;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // Top 4 get the hero treatment, rest go in the scroll strip
  const heroCategories = categories.slice(0, 4);
  const restCategories = categories.slice(4);

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          title="Every Detail, Perfected"
          subtitle="From grand venues to the finest mehndi artists — find exactly who you need"
        />

        {/* Hero categories — large alternating cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
        >
          {heroCategories.map((category, i) => (
            <motion.div
              key={category.id}
              variants={revealUp}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Link href={`/categories/${category.slug}`}>
                <div className={`group relative overflow-hidden rounded-3xl shadow-elevated hover:shadow-elevated-hover transition-all duration-500 ${
                  i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"
                }`}>
                  <Image
                    src={categoryImages[category.slug] || `https://images.unsplash.com/photo-1519741497674-611481863552?w=800`}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between">
                    <div>
                      <h3 className={`font-heading text-white mb-1 ${
                        i === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                      }`}>
                        {category.name}
                      </h3>
                      {getVendorCountText(category.vendorCount) && (
                        <p className="text-white/50 text-sm">{getVendorCountText(category.vendorCount)}</p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Remaining categories — horizontal scroll */}
        {restCategories.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="scroll-strip">
              {restCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                  <div className="relative w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated hover:shadow-elevated-hover transition-all duration-500">
                    <Image
                      src={categoryImages[category.slug] || `https://images.unsplash.com/photo-1519741497674-611481863552?w=400`}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="224px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-heading text-white text-lg">{category.name}</h4>
                      {getVendorCountText(category.vendorCount) && (
                        <p className="text-white/50 text-xs mt-0.5">{getVendorCountText(category.vendorCount)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
