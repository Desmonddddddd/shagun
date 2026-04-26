"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Camera,
  UtensilsCrossed,
  Palette,
  Sparkles,
  Music,
  Flower2,
  Shirt,
  Gem,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  vendorCount: number;
}

interface CategoryGridProps {
  categories?: CategoryData[];
}

const iconMap: Record<string, typeof Building2> = {
  Building2,
  Camera,
  UtensilsCrossed,
  Palette,
  Sparkles,
  Music,
  Flower2,
  Shirt,
  Gem,
  ClipboardList,
};

const colorCycle = [
  { color: "from-rose/10 to-rose/5", iconColor: "text-rose" },
  { color: "from-gold/10 to-gold/5", iconColor: "text-gold-dark" },
  { color: "from-sage/10 to-sage/5", iconColor: "text-sage" },
];

const defaultCategories = [
  {
    name: "Venues",
    slug: "venues",
    icon: Building2,
    count: "500+",
    color: "from-rose/10 to-rose/5",
    iconColor: "text-rose",
  },
  {
    name: "Photographers",
    slug: "photographers",
    icon: Camera,
    count: "800+",
    color: "from-gold/10 to-gold/5",
    iconColor: "text-gold-dark",
  },
  {
    name: "Caterers",
    slug: "caterers",
    icon: UtensilsCrossed,
    count: "400+",
    color: "from-sage/10 to-sage/5",
    iconColor: "text-sage",
  },
  {
    name: "Decorators",
    slug: "decorators",
    icon: Palette,
    count: "350+",
    color: "from-rose/10 to-rose/5",
    iconColor: "text-rose",
  },
  {
    name: "Makeup Artists",
    slug: "makeup-artists",
    icon: Sparkles,
    count: "600+",
    color: "from-gold/10 to-gold/5",
    iconColor: "text-gold-dark",
  },
  {
    name: "DJs & Musicians",
    slug: "djs-musicians",
    icon: Music,
    count: "250+",
    color: "from-sage/10 to-sage/5",
    iconColor: "text-sage",
  },
  {
    name: "Mehendi Artists",
    slug: "mehendi-artists",
    icon: Flower2,
    count: "300+",
    color: "from-rose/10 to-rose/5",
    iconColor: "text-rose",
  },
  {
    name: "Bridal Wear",
    slug: "bridal-wear",
    icon: Shirt,
    count: "450+",
    color: "from-gold/10 to-gold/5",
    iconColor: "text-gold-dark",
  },
  {
    name: "Jewellery",
    slug: "jewellery",
    icon: Gem,
    count: "200+",
    color: "from-sage/10 to-sage/5",
    iconColor: "text-sage",
  },
  {
    name: "Wedding Planners",
    slug: "wedding-planners",
    icon: ClipboardList,
    count: "150+",
    color: "from-rose/10 to-rose/5",
    iconColor: "text-rose",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CategoryGrid({ categories: categoriesProp }: CategoryGridProps) {
  // Build display categories from DB data or fall back to hardcoded defaults
  const categories = categoriesProp
    ? categoriesProp.map((c, i) => ({
        name: c.name,
        slug: c.slug,
        icon: (c.icon && iconMap[c.icon]) || Object.values(iconMap)[i % Object.values(iconMap).length],
        count: c.vendorCount > 0 ? `${c.vendorCount}+` : "New",
        ...colorCycle[i % colorCycle.length],
      }))
    : defaultCategories;
  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal mb-3"
          >
            Every Service You Need
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-0.5 bg-gold mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[family-name:var(--font-body)] text-slate text-base sm:text-lg max-w-xl mx-auto"
          >
            From dreamy venues to stunning makeup — we&apos;ve got your entire
            wedding covered
          </motion.p>
        </div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.slug} variants={cardVariants}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group block"
                >
                  <div
                    className={cn(
                      "relative bg-white rounded-2xl p-5 sm:p-6 text-center",
                      "card-shadow transition-all duration-300 ease-out",
                      "hover:card-shadow-hover hover:-translate-y-1",
                      "border border-transparent hover:border-gold/20"
                    )}
                  >
                    {/* Icon Container */}
                    <div
                      className={cn(
                        "w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                        category.color
                      )}
                    >
                      <Icon size={26} className={category.iconColor} />
                    </div>

                    {/* Name */}
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-charcoal text-sm sm:text-base mb-1 group-hover:text-gold-dark transition-colors">
                      {category.name}
                    </h3>

                    {/* Count */}
                    <p className="font-[family-name:var(--font-body)] text-xs text-slate">
                      {category.count} Vendors
                    </p>

                    {/* Gold accent line on hover */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-gold rounded-full transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gold-dark hover:text-gold font-medium font-[family-name:var(--font-body)] text-sm transition-colors group"
          >
            View All Categories
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
