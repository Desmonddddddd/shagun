"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, ChevronDown, MapPin, Sparkles, Star, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All Categories",
  "Venues",
  "Photographers",
  "Caterers",
  "Decorators",
  "Makeup Artists",
  "Wedding Planners",
  "DJs & Musicians",
  "Mehendi Artists",
  "Bridal Wear",
];

const cities = [
  "All Cities",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Hyderabad",
  "Chennai",
  "Kolkata",
];

const stats = [
  { icon: Building2, value: "10,000+", label: "Vendors" },
  { icon: MapPin, value: "50+", label: "Cities" },
  { icon: Users, value: "1M+", label: "Happy Couples" },
  { icon: Star, value: "4.8", label: "Avg Rating" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-charcoal" aria-hidden="true">
        {/* Mandala pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,168,83,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(201,76,110,0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 80%, rgba(212,168,83,0.2) 0%, transparent 50%)`,
            }}
          />
        </div>
        {/* Hero gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Decorative floating elements */}
        <motion.div
          aria-hidden="true"
          animate={prefersReducedMotion ? {} : { y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl"
        />
        <motion.div
          aria-hidden="true"
          animate={prefersReducedMotion ? {} : { y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-rose/5 blur-2xl"
        />
        <motion.div
          aria-hidden="true"
          animate={prefersReducedMotion ? {} : { y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gold-light/5 blur-xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
      >
        {/* Small badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gold-light font-[family-name:var(--font-body)] border border-gold/20">
            <Sparkles size={14} />
            India&apos;s #1 Wedding Marketplace
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
        >
          Your Dream Wedding
          <br />
          <span className="text-gradient-gold">Starts Here</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-heading)] text-lg sm:text-xl text-gold-light/80 italic mb-6"
        >
          Aapki shaadi, humari zimmedari
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-body)] text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover India&apos;s finest wedding vendors — from venues to
          photographers, caterers to decorators. Your perfect celebration is just
          a search away.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/15">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Category Dropdown */}
              <div className="relative flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Select category"
                  className="w-full appearance-none bg-white rounded-xl px-4 py-3.5 text-sm text-charcoal font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer pr-10"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
                />
              </div>

              {/* City Dropdown */}
              <div className="relative flex-1">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  aria-label="Select city"
                  className="w-full appearance-none bg-white rounded-xl px-4 py-3.5 text-sm text-charcoal font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-gold/30 cursor-pointer pr-10"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
                />
              </div>

              {/* Search Button */}
              <Link
                href={`/vendors?category=${selectedCategory}&city=${selectedCity}`}
                className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-medium px-8 py-3.5 rounded-xl transition-colors duration-200 font-[family-name:var(--font-body)] text-sm whitespace-nowrap"
              >
                <Search size={16} />
                Find Vendors
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/vendors"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 font-[family-name:var(--font-body)] text-sm shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30"
          >
            <Sparkles size={16} />
            Explore Vendors
          </Link>
          <Link
            href="/vendors/register"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-xl transition-all duration-200 font-[family-name:var(--font-body)] text-sm backdrop-blur-sm"
          >
            List Your Business
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon size={18} className="text-gold-light mr-1.5" />
                <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </span>
              </div>
              <span className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom decorative curve */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z"
            fill="var(--ivory)"
          />
        </svg>
      </div>
    </section>
  );
}
