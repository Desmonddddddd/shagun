"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    text: "Shagun made planning our wedding so easy! We found an amazing photographer and decorator within our budget. The AI chatbot was incredibly helpful.",
    rating: 5,
  },
  {
    name: "Rohit & Anjali",
    city: "Delhi",
    text: "We booked our venue, caterer, and DJ all through Shagun. The vendor profiles were detailed and the reviews helped us make confident decisions.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    city: "Bangalore",
    text: "As a destination wedding planner, I recommend Shagun to all my clients. The variety of vendors and the easy comparison tools are unmatched.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader
          title="Loved by Couples"
          subtitle="Join thousands of happy couples who found their perfect wedding vendors"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <div className="bg-white rounded-2xl p-6 card-shadow h-full flex flex-col">
                <Quote size={24} className="text-gold mb-4" />
                <p className="text-slate text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-charcoal">{t.name}</p>
                  <p className="text-sm text-slate">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
