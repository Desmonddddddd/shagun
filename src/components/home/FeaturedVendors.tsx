"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";

const vendors = [
  {
    name: "The Grand Palace",
    category: "Venue",
    city: "Jaipur",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
    slug: "the-grand-palace",
  },
  {
    name: "Karan Sidhu Photography",
    category: "Photography",
    city: "Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
    slug: "karan-sidhu",
  },
  {
    name: "Priya Mehra Makeup",
    category: "Makeup",
    city: "Mumbai",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80",
    slug: "priya-mehra",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function FeaturedVendors() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-3">
              Top Vendors
            </h2>
            <p className="text-text-muted text-lg">
              Handpicked professionals loved by couples
            </p>
          </div>
          <Link
            href="/vendors"
            className="hidden sm:inline-flex items-center gap-1.5 text-rose text-sm font-medium hover:gap-2.5 transition-all"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {vendors.map((vendor) => (
            <motion.div key={vendor.slug} variants={item}>
              <Link href={`/vendors/${vendor.slug}`}>
                <div className="group rounded-xl overflow-hidden bg-surface border border-border-light hover:border-rose/20 hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={vendor.image}
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading text-lg text-text group-hover:text-rose transition-colors">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Star size={13} className="fill-gold text-gold" />
                        <span className="text-sm font-medium text-text">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted text-sm">
                      <MapPin size={13} />
                      <span>{vendor.city}</span>
                      <span className="text-border">&middot;</span>
                      <span>{vendor.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-rose text-sm font-medium"
          >
            View all vendors <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
