"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { City } from "@/types";

interface CitySelectorProps {
  cities: City[];
}

export function CitySelector({ cities }: CitySelectorProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Popular Wedding Destinations"
          subtitle="Explore vendors in India's most popular wedding cities"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {cities.map((city) => (
            <motion.div key={city.id} variants={fadeInUp}>
              <Link href={`/cities/${city.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-square card-shadow hover:card-shadow-hover transition-all duration-300">
                  {city.image && (
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-heading text-xl text-white">{city.name}</h3>
                    <p className="text-white/70 text-sm">{city.vendorCount} vendors</p>
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
