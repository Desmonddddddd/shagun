"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, Sparkles } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          }}
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Floating gold sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-light rounded-full animate-sparkle"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-6">
            <Sparkles size={16} className="text-gold-light" />
            <span className="text-gold-light/90 font-medium tracking-[0.2em] uppercase text-sm">
              The Celebration Begins
            </span>
            <Sparkles size={16} className="text-gold-light" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
          >
            Where Love
            <br />
            Finds Its{" "}
            <span className="text-gradient-gold inline-block">
              Perfect Match
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/60 text-lg sm:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Discover extraordinary wedding vendors who turn your vision into an unforgettable celebration.
          </motion.p>

          {/* Glassmorphism Search */}
          <motion.div
            variants={fadeInUp}
            className="glass-white rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-elevated"
          >
            <div className="flex items-center gap-2 px-4 py-3 flex-1 border-b sm:border-b-0 sm:border-r border-charcoal/10">
              <MapPin size={18} className="text-magenta shrink-0" />
              <div className="relative flex-1">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer font-medium pr-6"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city.slug} value={city.slug}>{city.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 flex-1 border-b sm:border-b-0 sm:border-r border-charcoal/10">
              <Search size={18} className="text-magenta shrink-0" />
              <div className="relative flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer font-medium pr-6"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="bg-gradient-magenta text-white px-8 py-3 rounded-xl font-medium hover:shadow-glow-magenta transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase">Explore</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1 h-1.5 bg-gold-light rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
