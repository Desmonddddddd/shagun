"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, PartyPopper } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore thousands of verified wedding vendors across 14 categories and 50+ cities. Filter by budget, rating, and style.",
    color: "magenta",
  },
  {
    icon: MessageCircle,
    title: "Connect & Compare",
    description: "Get quotes, compare packages, read real reviews. Use Shagun AI to find your perfect match instantly.",
    color: "gold",
  },
  {
    icon: PartyPopper,
    title: "Celebrate!",
    description: "Book your dream team and celebrate your perfect wedding. Share your story to inspire other couples.",
    color: "saffron",
  },
];

const colorMap: Record<string, string> = {
  magenta: "bg-magenta/10 text-magenta",
  gold: "bg-gold/10 text-gold-dark",
  saffron: "bg-saffron/10 text-saffron",
};

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="How Shagun Works"
          subtitle="Three simple steps to your dream wedding"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={fadeInUp} className="text-center">
              <div className={`w-20 h-20 rounded-2xl ${colorMap[step.color]} flex items-center justify-center mx-auto mb-6`}>
                <step.icon size={32} />
              </div>
              <div className="text-sm font-medium text-magenta mb-2">Step {i + 1}</div>
              <h3 className="font-heading text-xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
