"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-typing-dot-1" />
      <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-typing-dot-2" />
      <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-typing-dot-3" />
    </div>
  );
}

export function AIChatPromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 gradient-mesh relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-magenta/8 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-gold/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text content */}
            <div>
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-magenta flex items-center justify-center animate-glow-pulse">
                  <Bot size={24} className="text-white" />
                </div>
                <span className="text-gold-light font-medium tracking-wide text-sm uppercase">AI-Powered</span>
              </motion.div>

              <motion.h2 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl text-white mb-5 leading-tight">
                Meet{" "}
                <span className="text-gradient-gold">Shagun AI</span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-white/50 text-lg mb-8 leading-relaxed">
                Tell it your city, budget, and style. It finds the perfect vendors in seconds — like having a wedding planner in your pocket.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Button variant="gold" size="lg" className="gap-2 group">
                  Try Shagun AI
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>

            {/* Right — chat mockup */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="glass-dark rounded-3xl p-6 space-y-4">
                {/* User message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-magenta text-white px-5 py-3 rounded-2xl rounded-br-md text-sm max-w-[280px]">
                    I need a photographer in Jaipur under 1.5 lakhs, candid style
                  </div>
                </motion.div>

                {/* AI typing indicator, then response */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="glass rounded-2xl rounded-bl-md text-sm max-w-[300px] text-white">
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={isInView ? { opacity: 0 } : {}}
                      transition={{ delay: 2.0, duration: 0.3 }}
                      className="absolute"
                    >
                      <TypingIndicator />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 2.3, duration: 0.4 }}
                      className="px-5 py-3 flex items-start gap-2"
                    >
                      <Sparkles size={14} className="text-gold shrink-0 mt-1" />
                      <span className="text-white/90">Found 18 candid photographers in Jaipur within ₹1.5L! Here are my top 3 picks based on ratings and portfolio quality...</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Second user message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 3.0, duration: 0.5 }}
                >
                  <div className="bg-magenta/80 text-white px-5 py-3 rounded-2xl rounded-br-md text-sm max-w-[280px]">
                    Show me their portfolios!
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
