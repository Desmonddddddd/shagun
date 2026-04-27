"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

export function CTABanner() {
  return (
    <section className="py-24 bg-cream">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal p-10 sm:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-magenta/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <Heart size={32} className="text-magenta fill-magenta/30" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight"
            >
              Your Celebration Deserves
              <br />
              <span className="text-gradient-gold">The Very Best</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-10 max-w-md mx-auto">
              Join thousands of couples who found their perfect wedding vendors on Shagun.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <button className="bg-gradient-magenta text-white px-8 py-4 rounded-xl font-medium hover:shadow-glow-magenta transition-all duration-300 flex items-center justify-center gap-2 group">
                  Start Planning
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/register">
                <button className="glass text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                  Register as Vendor
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
