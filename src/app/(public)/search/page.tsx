"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface VendorResult {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  featured: boolean;
  coverImage: string | null;
  category: { name: string; slug: string };
  city: { name: string; slug: string };
  media: Array<{ url: string; type: string }>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center"><div className="animate-pulse text-gold text-lg">Loading search...</div></div>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState("rating");
  const [vendors, setVendors] = useState<VendorResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const doSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    params.set("sort", sort);
    params.set("limit", "24");

    try {
      const res = await fetch(`/api/vendors?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setVendors(data.data);
        setTotal(data.total);
      }
    } catch {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    doSearch();
  }, [category, city, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <main className="min-h-screen bg-ivory">
      {/* Search Header */}
      <section className="bg-charcoal text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-6 text-center">
            Find Your Perfect Vendor
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendors, categories, cities..."
                className="w-full pl-12 pr-4 py-4 bg-white text-charcoal rounded-xl text-lg focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate">
            {loading ? "Searching..." : `${total} vendors found`}
            {query && <span> for &ldquo;{query}&rdquo;</span>}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg card-shadow text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 bg-white rounded-lg card-shadow text-sm focus:ring-2 focus:ring-gold outline-none"
            >
              <option value="rating">Top Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(category || city) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {category && (
              <span className="flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                {category}
                <button onClick={() => setCategory("")}><X className="w-3 h-3" /></button>
              </span>
            )}
            {city && (
              <span className="flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                {city}
                <button onClick={() => setCity("")}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button onClick={() => { setCategory(""); setCity(""); }} className="text-sm text-slate hover:text-rose">
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden card-shadow">
                <div className="h-52 animate-shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 animate-shimmer rounded" />
                  <div className="h-4 w-1/2 animate-shimmer rounded" />
                  <div className="h-4 w-full animate-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No vendors found</h3>
            <p className="text-slate">Try adjusting your search or browse our categories</p>
            <Link href="/categories" className="inline-block mt-4 px-6 py-2 bg-gold text-white rounded-xl hover:bg-gold-dark transition-colors">
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.slug}`}
                className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 bg-ivory-dark overflow-hidden">
                  {vendor.coverImage || vendor.media?.[0]?.url ? (
                    <img
                      src={vendor.coverImage || vendor.media[0]?.url}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-light">
                      <span className="text-6xl font-[family-name:var(--font-heading)]">{vendor.businessName[0]}</span>
                    </div>
                  )}
                  {vendor.featured && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                  )}
                  <span className="absolute top-3 right-3 bg-white/90 text-charcoal text-xs font-medium px-2 py-1 rounded-full">
                    {vendor.category.name}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-charcoal mb-1 group-hover:text-gold transition-colors">
                    {vendor.businessName}
                  </h3>
                  <div className="flex items-center gap-1 text-slate text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{vendor.city.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-semibold text-charcoal">{vendor.rating.toFixed(1)}</span>
                      <span className="text-slate text-sm">({vendor.reviewCount})</span>
                    </div>
                    <span className="text-gold font-semibold">{formatPrice(vendor.startingPrice)}+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
