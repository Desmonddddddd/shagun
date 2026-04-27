"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AppDownload() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div variants={fadeInUp} className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
              Wedding Planning
              <br />
              <span className="text-gradient-magenta">On The Go</span>
            </h2>
            <p className="text-slate mb-6 max-w-md">
              Download the Shagun app for a seamless wedding planning experience.
              Browse vendors, chat with AI, and manage everything from your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button variant="primary" size="lg" className="gap-2">
                Coming Soon <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex-shrink-0">
            <div className="w-48 h-80 bg-gradient-magenta rounded-3xl flex items-center justify-center shadow-2xl">
              <Smartphone size={64} className="text-white/80" />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
