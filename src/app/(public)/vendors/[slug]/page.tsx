"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Star, MapPin, Phone, Mail, Globe, Clock, Users,
  Award, ArrowLeft, Check, Heart, Share2, Calendar,
  ChevronLeft, ChevronRight, X
} from "lucide-react";
import { formatPrice, generateStarArray, timeAgo, getInitials } from "@/lib/utils";

interface VendorData {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  featured: boolean;
  experience: number | null;
  teamSize: number | null;
  eventsCompleted: number | null;
  coverImage: string | null;
  category: { name: string; slug: string };
  city: { name: string; slug: string; state: string };
  services: Array<{ id: string; name: string; description: string | null; price: number; unit: string }>;
  packages: Array<{ id: string; name: string; description: string | null; price: number; features: string; popular: boolean }>;
  reviews: Array<{
    id: string; rating: number; title: string | null; comment: string;
    eventDate: string | null; createdAt: string;
    customer: { name: string | null; image: string | null };
  }>;
  media: Array<{ id: string; url: string; type: string; caption: string | null }>;
  similarVendors: Array<{
    id: string; businessName: string; slug: string; rating: number; reviewCount: number;
    startingPrice: number; coverImage: string | null;
    category: { name: string; slug: string };
    city: { name: string; slug: string };
    media: Array<{ url: string }>;
  }>;
}

export default function VendorProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "gallery" | "reviews">("overview");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [leadForm, setLeadForm] = useState({
    name: "", email: "", phone: "", eventDate: "",
    eventType: "", guestCount: "", budget: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/vendors/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setVendor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadForm, vendorId: vendor.id }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setLeadForm({ name: "", email: "", phone: "", eventDate: "", eventType: "", guestCount: "", budget: "", message: "" });
      }
    } catch {
      // handle error
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-pulse text-gold text-lg">Loading vendor...</div>
      </main>
    );
  }

  if (!vendor) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-charcoal">Vendor Not Found</h1>
        <Link href="/categories" className="text-gold hover:underline">Browse Categories</Link>
      </main>
    );
  }

  const unitLabels: Record<string, string> = {
    per_event: "per event",
    per_day: "per day",
    per_hour: "per hour",
    per_person: "per person",
    per_plate: "per plate",
  };

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative h-72 md:h-96 bg-charcoal overflow-hidden">
        {vendor.coverImage ? (
          <img src={vendor.coverImage} alt={vendor.businessName} className="w-full h-full object-cover opacity-60" />
        ) : vendor.media[0]?.url ? (
          <img src={vendor.media[0].url} alt={vendor.businessName} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal to-rose/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-slate-light text-sm mb-3">
            <Link href="/categories" className="hover:text-gold transition-colors">Categories</Link>
            <span>/</span>
            <Link href={`/categories/${vendor.category.slug}`} className="hover:text-gold transition-colors">
              {vendor.category.name}
            </Link>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-2">
                {vendor.businessName}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vendor.city.name}, {vendor.city.state}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 card-shadow">
              {(["overview", "packages", "gallery", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeTab === tab ? "bg-gold text-white" : "text-slate hover:text-charcoal"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* About */}
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-4">About</h2>
                  <p className="text-slate leading-relaxed">{vendor.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {vendor.experience && (
                      <div className="text-center p-3 bg-ivory rounded-xl">
                        <Clock className="w-5 h-5 text-gold mx-auto mb-1" />
                        <p className="font-bold text-charcoal">{vendor.experience}+ Years</p>
                        <p className="text-xs text-slate">Experience</p>
                      </div>
                    )}
                    {vendor.teamSize && (
                      <div className="text-center p-3 bg-ivory rounded-xl">
                        <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                        <p className="font-bold text-charcoal">{vendor.teamSize}+</p>
                        <p className="text-xs text-slate">Team Members</p>
                      </div>
                    )}
                    {vendor.eventsCompleted && (
                      <div className="text-center p-3 bg-ivory rounded-xl">
                        <Award className="w-5 h-5 text-gold mx-auto mb-1" />
                        <p className="font-bold text-charcoal">{vendor.eventsCompleted}+</p>
                        <p className="text-xs text-slate">Events Done</p>
                      </div>
                    )}
                    <div className="text-center p-3 bg-ivory rounded-xl">
                      <Star className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="font-bold text-charcoal">{vendor.rating.toFixed(1)}</p>
                      <p className="text-xs text-slate">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                {vendor.services.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 card-shadow">
                    <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-4">Services</h2>
                    <div className="space-y-3">
                      {vendor.services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between py-3 border-b border-ivory-dark last:border-0">
                          <div>
                            <h4 className="font-medium text-charcoal">{service.name}</h4>
                            {service.description && <p className="text-sm text-slate">{service.description}</p>}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gold">{formatPrice(service.price)}</p>
                            <p className="text-xs text-slate">{unitLabels[service.unit] || service.unit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-4">Contact</h2>
                  <div className="space-y-3">
                    {vendor.phone && (
                      <div className="flex items-center gap-3 text-slate">
                        <Phone className="w-5 h-5 text-gold" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                    {vendor.email && (
                      <div className="flex items-center gap-3 text-slate">
                        <Mail className="w-5 h-5 text-gold" />
                        <span>{vendor.email}</span>
                      </div>
                    )}
                    {vendor.website && (
                      <div className="flex items-center gap-3 text-slate">
                        <Globe className="w-5 h-5 text-gold" />
                        <a href={vendor.website} target="_blank" rel="noreferrer" className="text-gold hover:underline">{vendor.website}</a>
                      </div>
                    )}
                    {vendor.address && (
                      <div className="flex items-center gap-3 text-slate">
                        <MapPin className="w-5 h-5 text-gold" />
                        <span>{vendor.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Packages Tab */}
            {activeTab === "packages" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendor.packages.map((pkg) => {
                  let features: string[] = [];
                  try { features = JSON.parse(pkg.features); } catch { features = []; }
                  return (
                    <div
                      key={pkg.id}
                      className={`bg-white rounded-2xl p-6 card-shadow relative ${
                        pkg.popular ? "ring-2 ring-gold" : ""
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-semibold px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal mt-2">{pkg.name}</h3>
                      {pkg.description && <p className="text-sm text-slate mt-1">{pkg.description}</p>}
                      <p className="text-3xl font-bold text-gold mt-4">{formatPrice(pkg.price)}</p>
                      <ul className="mt-4 space-y-2">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate">
                            <Check className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setActiveTab("overview")}
                        className="w-full mt-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-gold-dark transition-colors"
                      >
                        Get Quote
                      </button>
                    </div>
                  );
                })}
                {vendor.packages.length === 0 && (
                  <div className="col-span-full text-center py-10 text-slate">
                    No packages listed yet. Contact the vendor for custom pricing.
                  </div>
                )}
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {vendor.media.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.media.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                      >
                        <img
                          src={item.url}
                          alt={item.caption || vendor.businessName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate">No gallery photos yet.</div>
                )}

                {/* Lightbox */}
                {lightboxOpen && vendor.media.length > 0 && (
                  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
                      <X className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setLightboxIndex((p) => (p - 1 + vendor.media.length) % vendor.media.length)}
                      className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <img
                      src={vendor.media[lightboxIndex].url}
                      alt={vendor.media[lightboxIndex].caption || ""}
                      className="max-w-[90vw] max-h-[85vh] object-contain"
                    />
                    <button
                      onClick={() => setLightboxIndex((p) => (p + 1) % vendor.media.length)}
                      className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-4 text-white text-sm">
                      {lightboxIndex + 1} / {vendor.media.length}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gold">{vendor.rating.toFixed(1)}</p>
                      <div className="flex gap-0.5 mt-1">
                        {generateStarArray(vendor.rating).map((type, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${type === "full" ? "text-gold fill-gold" : type === "half" ? "text-gold fill-gold/50" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate mt-1">{vendor.reviewCount} reviews</p>
                    </div>
                  </div>

                  {vendor.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {vendor.reviews.map((review) => (
                        <div key={review.id} className="border-b border-ivory-dark pb-4 last:border-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gold/10 text-gold rounded-full flex items-center justify-center text-sm font-semibold">
                              {getInitials(review.customer.name || "User")}
                            </div>
                            <div>
                              <p className="font-medium text-charcoal">{review.customer.name || "Anonymous"}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${i < review.rating ? "text-gold fill-gold" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-slate">{timeAgo(review.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          {review.title && <p className="font-semibold text-charcoal mb-1">{review.title}</p>}
                          <p className="text-slate text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate text-center py-4">No reviews yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Similar Vendors */}
            {vendor.similarVendors.length > 0 && (
              <section className="mt-12">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-6">
                  Similar {vendor.category.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vendor.similarVendors.map((sv) => (
                    <Link
                      key={sv.id}
                      href={`/vendors/${sv.slug}`}
                      className="bg-white rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1"
                    >
                      <div className="h-32 bg-ivory-dark overflow-hidden">
                        {(sv.coverImage || sv.media[0]?.url) ? (
                          <img src={sv.coverImage || sv.media[0]?.url} alt={sv.businessName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl text-slate-light font-[family-name:var(--font-heading)]">
                            {sv.businessName[0]}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-charcoal text-sm">{sv.businessName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-xs font-medium">{sv.rating.toFixed(1)}</span>
                          <span className="text-xs text-slate">| {formatPrice(sv.startingPrice)}+</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — Lead Form */}
          <div className="lg:w-96">
            <div className="sticky top-24 bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal mb-1">
                Get a Free Quote
              </h3>
              <p className="text-sm text-slate mb-4">from {vendor.businessName}</p>
              <p className="text-2xl font-bold text-gold mb-6">
                Starting from {formatPrice(vendor.startingPrice)}
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-charcoal text-lg">Inquiry Sent!</h4>
                  <p className="text-sm text-slate mt-2">{vendor.businessName} will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  />
                  <input
                    type="date"
                    value={leadForm.eventDate}
                    onChange={(e) => setLeadForm((f) => ({ ...f, eventDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  />
                  <select
                    value={leadForm.eventType}
                    onChange={(e) => setLeadForm((f) => ({ ...f, eventType: e.target.value }))}
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  >
                    <option value="">Event Type</option>
                    <option>Wedding</option>
                    <option>Engagement</option>
                    <option>Sangeet</option>
                    <option>Mehendi</option>
                    <option>Reception</option>
                    <option>Pre-Wedding Shoot</option>
                    <option>Other</option>
                  </select>
                  <select
                    value={leadForm.guestCount}
                    onChange={(e) => setLeadForm((f) => ({ ...f, guestCount: e.target.value }))}
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm transition-colors"
                  >
                    <option value="">Guest Count</option>
                    <option>Under 50</option>
                    <option>50 - 100</option>
                    <option>100 - 200</option>
                    <option>200 - 500</option>
                    <option>500 - 1000</option>
                    <option>1000+</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your wedding plans... *"
                    value={leadForm.message}
                    onChange={(e) => setLeadForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm resize-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Inquiry"}
                  </button>
                  <p className="text-xs text-slate text-center">Free inquiry • No commitment • Quick response</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
