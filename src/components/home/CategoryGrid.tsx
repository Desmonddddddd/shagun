"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as Icons from "lucide-react";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

function getIcon(iconName: string) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
  return Icon || Icons.Tag;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Every Wedding Need, Covered"
          subtitle="Explore 14 categories and find the perfect vendors for your celebration"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {categories.map((category) => {
            const IconComponent = getIcon(category.icon || "Tag");
            return (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-shadow hover:card-shadow-hover transition-all duration-300">
                    {category.image && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent size={16} className="text-gold" />
                        <span className="text-white font-medium text-sm sm:text-base">{category.name}</span>
                      </div>
                      <p className="text-white/70 text-xs">{category.vendorCount} vendors</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
