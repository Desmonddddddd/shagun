"use client";

import { motion } from "framer-motion";

const cities = ["Mumbai", "Delhi", "Bangalore", "Jaipur", "Udaipur", "Goa"];

export function TrustBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-y border-border-light bg-surface"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-medium">
          Trusted by couples across India
        </p>
        <div className="flex items-center gap-6">
          {cities.map((city) => (
            <span key={city} className="text-text-light text-xs font-medium tracking-wide uppercase">
              {city}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
