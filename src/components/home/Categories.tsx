"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Camera,
  Palette,
  Flower2,
  UtensilsCrossed,
  Music,
  Shirt,
  CalendarHeart,
} from "lucide-react";

const categories = [
  { name: "Venues", icon: Building2, href: "/vendors?category=venues" },
  { name: "Photography", icon: Camera, href: "/vendors?category=photography" },
  { name: "Makeup", icon: Palette, href: "/vendors?category=makeup" },
  { name: "Decor", icon: Flower2, href: "/vendors?category=decor" },
  { name: "Catering", icon: UtensilsCrossed, href: "/vendors?category=catering" },
  { name: "Music & DJ", icon: Music, href: "/vendors?category=music" },
  { name: "Bridal Wear", icon: Shirt, href: "/vendors?category=bridal-wear" },
  { name: "Planning", icon: CalendarHeart, href: "/vendors?category=planning" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Categories() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl text-text mb-3">
            Everything You Need
          </h2>
          <p className="text-text-muted text-lg">
            Explore vendors by category
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <Link href={cat.href}>
                <div className="group flex flex-col items-center gap-4 p-6 sm:p-8 rounded-xl bg-surface border border-border-light hover:border-rose/20 hover:shadow-sm transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-rose/5 group-hover:bg-rose/10 flex items-center justify-center transition-colors duration-300">
                    <cat.icon size={24} className="text-rose" strokeWidth={1.5} />
                  </div>
                  <span className="text-text text-sm font-medium">{cat.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
