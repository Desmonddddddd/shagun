"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, MapPin, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Building2,
    value: 10000,
    suffix: "+",
    label: "Verified Vendors",
    description: "Across all categories",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "+",
    label: "Cities Covered",
    description: "All over India",
  },
  {
    icon: Heart,
    value: 25000,
    suffix: "+",
    label: "Weddings Planned",
    description: "And counting",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "★",
    label: "Average Rating",
    description: "From happy couples",
    isDecimal: true,
  },
];

function AnimatedCounter({
  value,
  suffix,
  isDecimal = false,
  inView,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!inView) return;

    // Skip animation for reduced motion
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    let rafId: number;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setDisplayValue(easedProgress * value);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, prefersReducedMotion]);

  const formatted = isDecimal
    ? displayValue.toFixed(1)
    : Math.floor(displayValue).toLocaleString("en-IN");

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-24 overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-gold" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <Icon
                    size={24}
                    className="text-white/80"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                    inView={isInView}
                  />
                </div>
                <div className="font-[family-name:var(--font-heading)] text-sm sm:text-base font-semibold text-white/90 mb-1">
                  {stat.label}
                </div>
                <div className="font-[family-name:var(--font-body)] text-xs text-white/60">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
