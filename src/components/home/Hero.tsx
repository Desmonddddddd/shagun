"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-rose font-medium text-sm tracking-wide uppercase mb-4">
              Your wedding, simplified
            </p>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-text leading-[1.1] tracking-tight mb-6">
              Where Every
              <br />
              Wedding{" "}
              <span className="text-rose italic">Begins</span>
            </h1>

            <p className="text-text-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-md">
              Discover trusted wedding vendors who bring your vision to life.
              One place for everything your celebration needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/vendors"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-rose text-white text-sm font-medium rounded-lg hover:bg-rose-dark transition-colors group"
              >
                Find Vendors
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-text text-sm font-medium rounded-lg hover:border-rose hover:text-rose transition-colors"
              >
                Are You a Vendor?
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                alt="Beautiful wedding celebration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose/5 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
