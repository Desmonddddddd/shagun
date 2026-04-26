"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Priya & Arjun Mehta",
    location: "Wedding in Udaipur",
    quote:
      "Shagun made our dream destination wedding a reality. We found the most incredible venue and photographer through their platform. The entire experience was seamless — from searching to booking. Our Udaipur wedding was nothing short of magical!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Neha & Rohit Sharma",
    location: "Wedding in Jaipur",
    quote:
      "We were overwhelmed with wedding planning until we discovered Shagun. The vendor reviews and packages helped us make informed decisions. Our decorator and caterer were absolutely phenomenal. Thank you Shagun for making our big day perfect!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Ananya & Vikram Singh",
    location: "Wedding in Delhi",
    quote:
      "From our engagement to the reception, every vendor we hired through Shagun exceeded our expectations. The platform&apos;s rating system is so reliable. We found our makeup artist, mehendi artist, and wedding planner all in one place!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Kavya & Aditya Reddy",
    location: "Wedding in Goa",
    quote:
      "Our beach wedding in Goa was a dream come true, thanks to the amazing vendors we found on Shagun. The DJ, the decorators, the photographer — everyone was top-notch. The inquiry system made it so easy to compare and choose. Highly recommend!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
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
            Love Stories from Happy Couples
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
            Hear from couples who found their perfect vendors on Shagun
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group"
            >
              <div
                className={cn(
                  "relative bg-ivory/50 rounded-2xl p-7 sm:p-8",
                  "border border-ivory-dark hover:border-gold/20",
                  "transition-all duration-300 ease-out h-full",
                  "hover:shadow-lg hover:shadow-gold/5"
                )}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-7 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={48} className="text-gold" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-[family-name:var(--font-body)] text-charcoal/80 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/20">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-heading)] font-semibold text-charcoal text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="font-[family-name:var(--font-body)] text-xs text-slate">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
