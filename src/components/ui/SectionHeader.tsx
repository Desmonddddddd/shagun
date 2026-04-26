"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {badge && (
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
            light
              ? "bg-white/10 text-white/80 border border-white/20"
              : "bg-gold/10 text-gold border border-gold/20"
          }`}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4 ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className={light ? "text-gold-light" : "text-gradient-gold"}>
            {titleHighlight}
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`w-16 h-1 rounded-full mx-auto mb-4 ${
              light ? "bg-gold-light/50" : "bg-gold"
            } ${centered ? "mx-auto" : ""}`}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-base md:text-lg max-w-2xl mb-0 ${
              centered ? "mx-auto" : ""
            } ${light ? "text-white/70" : "text-slate"}`}
          >
            {subtitle}
          </motion.p>
        </>
      )}
    </div>
  );
}
