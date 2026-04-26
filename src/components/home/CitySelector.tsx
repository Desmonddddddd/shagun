"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const cities = [
  {
    name: "Mumbai",
    slug: "mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop",
    vendorCount: 2500,
    state: "Maharashtra",
  },
  {
    name: "Delhi",
    slug: "delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    vendorCount: 3200,
    state: "NCR",
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    vendorCount: 1800,
    state: "Rajasthan",
  },
  {
    name: "Udaipur",
    slug: "udaipur",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    vendorCount: 1200,
    state: "Rajasthan",
  },
  {
    name: "Goa",
    slug: "goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    vendorCount: 900,
    state: "Goa",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=400&fit=crop",
    vendorCount: 2100,
    state: "Karnataka",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface CitySelectorProps {
  cities?: Array<{
    id: string;
    name: string;
    slug: string;
    state: string;
    vendorCount: number;
    featured: boolean;
  }>;
}

export default function CitySelector({ cities: propCities }: CitySelectorProps) {
  // Merge DB data with hardcoded images (DB cities don't store images)
  const displayCities = propCities && propCities.length > 0
    ? propCities.map((dbCity) => {
        const match = cities.find((c) => c.slug === dbCity.slug);
        return {
          name: dbCity.name,
          slug: dbCity.slug,
          state: dbCity.state,
          vendorCount: dbCity.vendorCount,
          image: match?.image || cities[0].image,
        };
      })
    : cities;

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal mb-3"
          >
            Popular Wedding Destinations
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-0.5 bg-gold mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[family-name:var(--font-body)] text-slate text-base sm:text-lg max-w-lg mx-auto"
          >
            Find the best wedding vendors in India&apos;s most beautiful cities
          </motion.p>
        </div>

        {/* City Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayCities.map((city) => (
            <motion.div key={city.slug} variants={cardVariants}>
              <Link href={`/cities/${city.slug}`} className="group block">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden card-shadow">
                  {/* Image */}
                  <Image
                    src={city.image}
                    alt={`Wedding venues in ${city.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-white mb-1">
                          {city.name}
                        </h3>
                        <p className="font-[family-name:var(--font-body)] text-sm text-white/70 flex items-center gap-1">
                          <MapPin size={13} />
                          {city.state}
                        </p>
                      </div>
                      <span className="font-[family-name:var(--font-body)] text-xs text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        {city.vendorCount.toLocaleString("en-IN")} Vendors
                      </span>
                    </div>
                  </div>

                  {/* Hover Gold Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/40 transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
