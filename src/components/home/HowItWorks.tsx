"use client";

import { motion, type Variants } from "framer-motion";
import { Search, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Search",
    description:
      "Browse thousands of verified wedding vendors across India. Filter by category, city, budget, and ratings.",
    color: "from-gold/15 to-gold/5",
    iconColor: "text-gold-dark",
    number: "01",
  },
  {
    icon: Heart,
    title: "Connect",
    description:
      "Send inquiries, compare packages, and find your perfect match. Chat directly with vendors.",
    color: "from-rose/15 to-rose/5",
    iconColor: "text-rose",
    number: "02",
  },
  {
    icon: Sparkles,
    title: "Celebrate",
    description:
      "Book with confidence and celebrate your dream wedding. Read reviews and see real wedding photos.",
    color: "from-sage/15 to-sage/5",
    iconColor: "text-sage",
    number: "03",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal mb-3"
          >
            How Shagun Works
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
            className="font-[family-name:var(--font-body)] text-slate text-base sm:text-lg max-w-md mx-auto"
          >
            Three simple steps to your perfect wedding
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[20%] right-[20%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full h-full origin-left"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--gold) 0px, var(--gold) 8px, transparent 8px, transparent 16px)",
              }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="relative text-center"
              >
                {/* Connecting Dot (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gold/20" />
                )}

                {/* Step Number */}
                <div className="font-[family-name:var(--font-heading)] text-5xl font-bold text-ivory-dark mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    "w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br shadow-sm",
                    step.color
                  )}
                >
                  <Icon size={32} className={step.iconColor} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-body)] text-sm text-slate leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
