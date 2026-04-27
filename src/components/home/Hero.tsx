"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

interface HeroProps {
  cities: { name: string; slug: string }[];
  categories: { name: string; slug: string }[];
}

export function Hero({ cities, categories }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="absolute top-10 right-10 w-64 h-64 opacity-10 mandala-pattern rounded-full hidden lg:block" />

      <Container className="relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
          <motion.p variants={fadeInUp} className="text-gold-light font-medium text-lg mb-4 tracking-wide">
            India&apos;s Wedding Super App
          </motion.p>

          <motion.h1 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Your Dream Wedding
            <br />
            <span className="text-gradient-gold">Starts Here</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-white/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            Discover 10,000+ verified wedding vendors across 50+ cities.
            Find venues, photographers, makeup artists, and everything you need.
          </motion.p>

          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-3 card-shadow max-w-2xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cream-dark flex-1">
              <MapPin size={18} className="text-magenta shrink-0" />
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer">
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.slug} value={city.slug}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cream-dark flex-1">
              <Search size={18} className="text-magenta shrink-0" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer">
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <button onClick={handleSearch} className="bg-gradient-magenta text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shrink-0">
              <Search size={18} />
              <span>Search</span>
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-white/60 text-sm">Popular:</span>
            {["Venues in Delhi", "Photographers in Mumbai", "Makeup in Bangalore"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm hover:bg-white/25 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
