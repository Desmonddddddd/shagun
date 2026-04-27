"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-text px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            Your perfect wedding team
            <br />
            <span className="text-gold-light italic">is waiting</span>
          </h2>

          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            Join couples across India who found their dream vendors on Shaadisetu.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-lg bg-white/10 text-white placeholder:text-white/30 border border-white/10 focus:border-white/30 outline-none text-sm transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-rose text-white text-sm font-medium rounded-lg hover:bg-rose-light transition-colors group shrink-0"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
