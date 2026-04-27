"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", light = false, className }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn("mb-14", align === "center" && "text-center", className)}
    >
      <h2 className={cn(
        "font-heading text-3xl sm:text-4xl lg:text-5xl mb-4 tracking-tight",
        light ? "text-white" : "text-charcoal"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl leading-relaxed",
          align === "center" && "mx-auto",
          light ? "text-white/60" : "text-slate"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
