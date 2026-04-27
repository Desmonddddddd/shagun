"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, PartyPopper } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description: "Browse vendors by category, city, and budget. Read reviews from real couples.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Connect",
    description: "Get quotes, compare packages, and chat directly with vendors you love.",
  },
  {
    number: "03",
    icon: PartyPopper,
    title: "Celebrate",
    description: "Book your perfect team and bring your dream celebration to life.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-surface border-y border-border-light">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl text-text mb-3">
            How It Works
          </h2>
          <p className="text-text-muted text-lg">
            Three simple steps to your perfect wedding
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-4xl mx-auto relative"
        >
          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-10 left-[25%] right-[25%] h-px bg-border" />

          {steps.map((step) => (
            <motion.div key={step.number} variants={item} className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-bg border border-border-light flex items-center justify-center mx-auto mb-6 relative z-10">
                <step.icon size={28} className="text-rose" strokeWidth={1.5} />
              </div>
              <span className="text-gold font-heading text-sm font-semibold tracking-widest">
                {step.number}
              </span>
              <h3 className="font-heading text-xl text-text mt-2 mb-2">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
