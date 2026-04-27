"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerFast } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { City } from "@/types";

interface CitySelectorProps {
  cities: City[];
}

export function CitySelector({ cities }: CitySelectorProps) {
  // Only show cities that have images
  const displayCities = cities.filter((c) => c.image);
  if (displayCities.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeader
          title="Celebrating Across India"
          subtitle="Find vendors in the country's most sought-after wedding destinations"
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="scroll-strip justify-start md:justify-center">
            {displayCities.map((city) => (
              <motion.div key={city.id} variants={fadeInUp}>
                <Link href={`/cities/${city.slug}`} className="group block text-center">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-transparent group-hover:ring-gold shadow-elevated group-hover:shadow-glow-gold transition-all duration-500">
                    <Image
                      src={city.image!}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="144px"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-300" />
                  </div>
                  <h4 className="font-heading text-charcoal text-base sm:text-lg group-hover:text-magenta transition-colors">
                    {city.name}
                  </h4>
                  {city.vendorCount > 1 && (
                    <p className="text-slate text-xs mt-0.5">{city.vendorCount} vendors</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
