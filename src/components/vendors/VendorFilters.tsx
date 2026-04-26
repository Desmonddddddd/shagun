"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Star, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VendorFilters as VendorFiltersType } from "@/types";

interface CategoryOption {
  name: string;
  slug: string;
}

interface CityOption {
  name: string;
  slug: string;
}

interface VendorFiltersProps {
  categories: CategoryOption[];
  cities: CityOption[];
  filters: VendorFiltersType;
  onFilterChange: (filters: Partial<VendorFiltersType>) => void;
  className?: string;
}

const sortOptions = [
  { label: "Most Popular", value: "popular" as const },
  { label: "Rating: High to Low", value: "rating" as const },
  { label: "Price: Low to High", value: "price_low" as const },
  { label: "Price: High to Low", value: "price_high" as const },
  { label: "Newest First", value: "newest" as const },
];

export default function VendorFilters({
  categories,
  cities,
  filters,
  onFilterChange,
  className,
}: VendorFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.category ||
    filters.city ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating;

  const clearFilters = () => {
    onFilterChange({
      category: undefined,
      city: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      sort: undefined,
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label className="block font-[family-name:var(--font-heading)] text-sm font-semibold text-charcoal mb-2">
          Category
        </label>
        <div className="relative">
          <select
            value={filters.category || ""}
            onChange={(e) =>
              onFilterChange({
                category: e.target.value || undefined,
              })
            }
            className="w-full appearance-none bg-ivory rounded-xl px-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)] border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer pr-10"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block font-[family-name:var(--font-heading)] text-sm font-semibold text-charcoal mb-2">
          City
        </label>
        <div className="relative">
          <select
            value={filters.city || ""}
            onChange={(e) =>
              onFilterChange({ city: e.target.value || undefined })
            }
            className="w-full appearance-none bg-ivory rounded-xl px-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)] border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer pr-10"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block font-[family-name:var(--font-heading)] text-sm font-semibold text-charcoal mb-2">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onFilterChange({
                minPrice: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="flex-1 bg-ivory rounded-xl px-3 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)] border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
          <span className="text-slate text-sm">—</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onFilterChange({
                maxPrice: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="flex-1 bg-ivory rounded-xl px-3 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)] border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block font-[family-name:var(--font-heading)] text-sm font-semibold text-charcoal mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                onFilterChange({
                  minRating:
                    filters.minRating === rating ? undefined : rating,
                })
              }
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-[family-name:var(--font-body)] font-medium transition-all duration-200 border",
                filters.minRating === rating
                  ? "bg-gold/15 border-gold/30 text-gold-dark"
                  : "bg-ivory border-ivory-dark text-slate hover:border-gold/20 hover:text-charcoal"
              )}
            >
              <Star
                size={13}
                className={cn(
                  filters.minRating === rating
                    ? "text-gold fill-gold"
                    : "text-slate-light"
                )}
              />
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block font-[family-name:var(--font-heading)] text-sm font-semibold text-charcoal mb-2">
          Sort By
        </label>
        <div className="relative">
          <select
            value={filters.sort || "popular"}
            onChange={(e) =>
              onFilterChange({
                sort: e.target.value as VendorFiltersType["sort"],
              })
            }
            className="w-full appearance-none bg-ivory rounded-xl px-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)] border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer pr-10"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-rose/20 text-rose hover:bg-rose/5 rounded-xl text-sm font-medium font-[family-name:var(--font-body)] transition-colors duration-200"
        >
          <X size={14} />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-[family-name:var(--font-body)] transition-all duration-200 border",
            mobileOpen
              ? "bg-gold text-white border-gold"
              : "bg-white text-charcoal border-ivory-dark hover:border-gold/20"
          )}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-rose text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              !
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden mb-6"
          >
            <div className="bg-white rounded-2xl p-5 card-shadow border border-ivory-dark">
              {filterContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <div className="bg-white rounded-2xl p-6 card-shadow border border-ivory-dark sticky top-24">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-5 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gold" />
            Filters
          </h3>
          {filterContent}
        </div>
      </div>
    </>
  );
}
