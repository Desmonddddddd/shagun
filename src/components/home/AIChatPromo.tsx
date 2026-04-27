"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AIChatPromo() {
  return (
    <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-magenta flex items-center justify-center animate-pulse-gold">
              <Bot size={32} className="text-white" />
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Meet <span className="text-gradient-gold">Shagun AI</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Not sure where to start? Tell our AI assistant what you&apos;re looking for, and it will find
            the perfect vendors for your budget, city, and style.
          </motion.p>

          {/* Sample chat bubbles */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto space-y-3 mb-8">
            <div className="flex justify-end">
              <div className="bg-magenta text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm max-w-xs">
                I need a photographer in Mumbai under ₹1 lakh
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/10 text-white px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-xs flex items-start gap-2">
                <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
                <span>I found 24 photographers in Mumbai within your budget! Here are the top 3...</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button variant="gold" size="lg" className="gap-2">
              Try Shagun AI <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
