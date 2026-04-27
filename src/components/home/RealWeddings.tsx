"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { RealWedding } from "@/types";

interface RealWeddingsProps {
  weddings: RealWedding[];
}

export function RealWeddings({ weddings }: RealWeddingsProps) {
  if (weddings.length === 0) return null;

  const featured = weddings[0];
  const rest = weddings.slice(1);

  return (
    <section className="py-24 bg-cream">
      <Container>
        <SectionHeader
          title="Love Stories, Told Beautifully"
          subtitle="Real couples, real celebrations — get inspired"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          {/* Featured wedding — full width cinematic */}
          <motion.div variants={fadeInUp}>
            <Link href={`/real-weddings/${featured.slug}`}>
              <div className="group relative overflow-hidden rounded-3xl aspect-[21/9] shadow-elevated hover:shadow-elevated-hover transition-all duration-500">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-lg">
                  <p className="text-gold-light text-sm font-medium tracking-wide mb-2 uppercase">Featured Story</p>
                  <h3 className="font-heading text-3xl sm:text-4xl text-white mb-2">{featured.title}</h3>
                  <p className="text-white/70 text-lg mb-4">{featured.couple}</p>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <MapPin size={14} />
                    <span>{featured.city}</span>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={20} className="text-white" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Rest of weddings */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rest.map((wedding) => (
                <motion.div key={wedding.id} variants={fadeInUp}>
                  <Link href={`/real-weddings/${wedding.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] shadow-elevated hover:shadow-elevated-hover transition-all duration-500">
                      <Image
                        src={wedding.coverImage}
                        alt={wedding.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-xl text-white mb-1">{wedding.title}</h3>
                        <p className="text-white/60 text-sm">{wedding.couple} &middot; {wedding.city}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
