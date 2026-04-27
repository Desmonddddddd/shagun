"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, PartyPopper } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Browse curated wedding vendors across 14 categories. Filter by city, budget, and style to find your perfect match.",
    gradient: "from-magenta to-magenta-dark",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Connect",
    description: "Compare packages, read verified reviews, and chat directly. Or let Shagun AI recommend vendors tailored to your vision.",
    gradient: "from-gold to-gold-dark",
  },
  {
    icon: PartyPopper,
    number: "03",
    title: "Celebrate",
    description: "Book your dream team and bring your celebration to life. Every detail handled, every moment unforgettable.",
    gradient: "from-saffron to-saffron-light",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-magenta/[0.02] blur-3xl pointer-events-none" />

      <Container>
        <SectionHeader
          title="Three Steps to Forever"
          subtitle="Planning your celebration has never been this effortless"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto relative"
        >
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-magenta/20 via-gold/30 to-saffron/20" />

          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeInUp} className="relative text-center group">
              {/* Icon with gradient */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                <step.icon size={32} className="text-white" />
              </div>

              {/* Step number */}
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate/40 mb-3 block">
                Step {step.number}
              </span>

              <h3 className="font-heading text-2xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-slate text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
