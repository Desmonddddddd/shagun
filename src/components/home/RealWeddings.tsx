"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { RealWedding } from "@/types";

interface RealWeddingsProps {
  weddings: RealWedding[];
}

export function RealWeddings({ weddings }: RealWeddingsProps) {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader
          title="Real Wedding Stories"
          subtitle="Get inspired by beautiful weddings planned through Shagun"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {weddings.map((wedding) => (
            <motion.div key={wedding.id} variants={fadeInUp}>
              <Link href={`/real-weddings/${wedding.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={wedding.coverImage}
                      alt={wedding.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-xl text-white mb-1">{wedding.title}</h3>
                      <p className="text-white/80 text-sm">{wedding.couple}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 text-sm text-slate">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {wedding.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {new Date(wedding.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
