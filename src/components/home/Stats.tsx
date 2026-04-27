"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "10,000+", label: "Verified Vendors" },
  { value: "50+", label: "Cities" },
  { value: "25,000+", label: "Weddings Planned" },
  { value: "4.8★", label: "Average Rating" },
];

export function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-magenta via-magenta-dark to-magenta">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <div className="font-heading text-3xl sm:text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
