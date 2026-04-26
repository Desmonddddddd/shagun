"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { cn, formatDate, timeAgo, getInitials, generateStarArray } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string | null;
  eventDate: string | null;
  guestCount: string | null;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
  vendor: { businessName: string; slug: string };
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  createdAt: string;
  customer: { name: string | null; image: string | null };
}

interface VendorProfile {
  id: string;
  businessName: string;
  rating: number;
  reviewCount: number;
  description: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  experience: number | null;
  teamSize: number | null;
  startingPrice: number;
  reviews: Review[];
}

const statusColors: Record<string, string> = {
  NEW: "bg-gold/10 text-gold",
  CONTACTED: "bg-blue-50 text-blue-600",
  NEGOTIATING: "bg-purple-50 text-purple-600",
  BOOKED: "bg-sage/10 text-sage",
  CLOSED: "bg-slate/10 text-slate",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton width="200px" height="32px" variant="rectangular" />
        <div className="mt-2">
          <Skeleton width="320px" height="16px" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="120px" />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Skeleton variant="rectangular" height="320px" />
        <Skeleton variant="rectangular" height="320px" />
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [vendor, setVendor] = useState<VendorProfile | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [leadsRes, vendorRes] = await Promise.all([
          fetch(`/api/leads?userId=${session.user.id}&limit=50`),
          fetch("/api/vendors/profile"),
        ]);

        const leadsData = await leadsRes.json();
        const vendorData = await vendorRes.json();

        if (leadsData.success) {
          setLeads(leadsData.data);
        }
        if (vendorData.success) {
          setVendor(vendorData.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session?.user?.id]);

  if (loading || !session) {
    return <DashboardSkeleton />;
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const reviewCount = vendor?.reviewCount ?? 0;
  const avgRating = vendor?.rating ?? 0;

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      change: `${newLeads} new`,
      icon: MessageSquare,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "New Leads",
      value: newLeads,
      change: newLeads > 0 ? "needs action" : "all clear",
      icon: TrendingUp,
      color: "text-sage",
      bg: "bg-sage/10",
    },
    {
      label: "Reviews",
      value: reviewCount,
      change: `${reviewCount} total`,
      icon: Star,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Avg Rating",
      value: avgRating > 0 ? avgRating.toFixed(1) : "N/A",
      change: avgRating >= 4.5 ? "excellent" : avgRating >= 4 ? "great" : avgRating > 0 ? "good" : "no reviews",
      icon: Eye,
      color: "text-rose",
      bg: "bg-rose/10",
    },
  ];

  const recentLeads = leads.slice(0, 5);
  const recentReviews = vendor?.reviews?.slice(0, 3) ?? [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Dashboard
        </h1>
        <p className="text-slate mt-1">Welcome back! Here&apos;s how your business is doing.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="bg-white rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium text-sage">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                {stat.value}
              </p>
              <p className="text-slate text-sm mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl card-shadow"
        >
          <div className="flex items-center justify-between p-5 border-b border-ivory-dark">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
              Recent Leads
            </h2>
            <a
              href="/vendor/leads"
              className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
            >
              View All
            </a>
          </div>
          <div className="divide-y divide-ivory-dark">
            {recentLeads.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <MessageSquare size={24} className="text-slate mx-auto mb-2" />
                <p className="text-sm text-slate">No leads yet. They&apos;ll appear here once customers reach out.</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-ivory/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-ivory flex items-center justify-center text-sm font-medium text-charcoal shrink-0">
                      {getInitials(lead.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{lead.name}</p>
                      <p className="text-xs text-slate">{lead.eventType || "General Inquiry"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", statusColors[lead.status] || "bg-slate/10 text-slate")}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-slate hidden sm:block">{formatDate(lead.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl card-shadow"
        >
          <div className="flex items-center justify-between p-5 border-b border-ivory-dark">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
              Recent Reviews
            </h2>
            <a
              href="/vendor/reviews"
              className="text-sm text-gold hover:text-gold-dark font-medium transition-colors"
            >
              View All
            </a>
          </div>
          <div className="divide-y divide-ivory-dark">
            {recentReviews.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <Star size={24} className="text-slate mx-auto mb-2" />
                <p className="text-sm text-slate">No reviews yet. Reviews from customers will appear here.</p>
              </div>
            ) : (
              recentReviews.map((review) => (
                <div key={review.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-xs font-medium text-gold">
                        {getInitials(review.customer.name || "Anonymous")}
                      </div>
                      <span className="text-sm font-medium text-charcoal">{review.customer.name || "Anonymous"}</span>
                    </div>
                    <span className="text-xs text-slate">{timeAgo(review.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {generateStarArray(review.rating).map((star, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={cn(
                          star === "full" ? "fill-gold text-gold" : "text-ivory-dark"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate line-clamp-2">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
