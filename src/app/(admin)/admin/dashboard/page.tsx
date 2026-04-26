"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Store,
  Users,
  MessageSquare,
  Star,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";

interface DashboardStats {
  totalVendors: number;
  totalCustomers: number;
  totalLeads: number;
  totalReviews: number;
  pendingVendors: number;
  pendingReviews: number;
  recentLeads: number;
  monthlyGrowth: {
    vendors: number;
    leads: number;
    reviews: number;
  };
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function AdminDashboardSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton width="220px" height="32px" variant="rectangular" />
        <div className="mt-2">
          <Skeleton width="260px" height="16px" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height="120px" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton variant="rectangular" height="400px" />
        </div>
        <Skeleton variant="rectangular" height="400px" />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStatsData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !statsData) {
    return <AdminDashboardSkeleton />;
  }

  const stats = [
    {
      label: "Total Vendors",
      value: statsData.totalVendors.toLocaleString(),
      change: `+${statsData.monthlyGrowth.vendors}`,
      sub: "this month",
      icon: Store,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Total Customers",
      value: statsData.totalCustomers.toLocaleString(),
      change: "total",
      sub: "registered users",
      icon: Users,
      color: "text-sage",
      bg: "bg-sage/10",
    },
    {
      label: "Total Leads",
      value: statsData.totalLeads.toLocaleString(),
      change: `+${statsData.recentLeads}`,
      sub: "this week",
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Reviews",
      value: statsData.totalReviews.toLocaleString(),
      change: `+${statsData.monthlyGrowth.reviews}`,
      sub: "this month",
      icon: Star,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Pending Approvals",
      value: statsData.pendingVendors.toString(),
      change: statsData.pendingVendors > 0 ? "urgent" : "none",
      sub: "vendors waiting",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Pending Reviews",
      value: statsData.pendingReviews.toString(),
      change: statsData.pendingReviews > 0 ? "needs action" : "none",
      sub: "to moderate",
      icon: AlertCircle,
      color: "text-rose",
      bg: "bg-rose/10",
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Admin Dashboard
        </h1>
        <p className="text-slate mt-1">Overview of the Shagun platform.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
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
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    stat.change === "urgent"
                      ? "text-amber-600"
                      : stat.change === "needs action"
                      ? "text-rose"
                      : stat.change === "none"
                      ? "text-sage"
                      : "text-sage"
                  )}
                >
                  {stat.change !== "urgent" && stat.change !== "needs action" && stat.change !== "none" && (
                    <ArrowUpRight size={14} />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                {stat.value}
              </p>
              <p className="text-slate text-sm mt-0.5">{stat.sub}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl card-shadow"
        >
          <div className="flex items-center justify-between p-5 border-b border-ivory-dark">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal">
              Platform Summary
            </h2>
          </div>
          <div className="p-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate">Vendor Approval Queue</span>
                <span className="text-sm font-semibold text-charcoal">{statsData.pendingVendors} pending</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${Math.min((statsData.pendingVendors / Math.max(statsData.totalVendors, 1)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate">Review Moderation Queue</span>
                <span className="text-sm font-semibold text-charcoal">{statsData.pendingReviews} pending</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose rounded-full transition-all"
                  style={{ width: `${Math.min((statsData.pendingReviews / Math.max(statsData.totalReviews, 1)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate">Leads This Week</span>
                <span className="text-sm font-semibold text-charcoal">{statsData.recentLeads} leads</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage rounded-full transition-all"
                  style={{ width: `${Math.min((statsData.recentLeads / Math.max(statsData.totalLeads, 1)) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-ivory-dark">
              <div className="text-center">
                <p className="text-2xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                  {statsData.totalVendors > 0
                    ? ((statsData.totalLeads / statsData.totalVendors) * 100 / 100).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs text-slate mt-1">Avg Leads/Vendor</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                  {statsData.totalVendors > 0
                    ? (statsData.totalReviews / statsData.totalVendors).toFixed(1)
                    : "0"}
                </p>
                <p className="text-xs text-slate mt-1">Avg Reviews/Vendor</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
                  +{statsData.monthlyGrowth.vendors}
                </p>
                <p className="text-xs text-slate mt-1">New Vendors/Month</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/vendors"
                className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Approve Vendors</p>
                    <p className="text-xs text-slate">{statsData.pendingVendors} pending approvals</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/reviews"
                className="flex items-center justify-between p-3.5 rounded-xl bg-rose/5 hover:bg-rose/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Moderate Reviews</p>
                    <p className="text-xs text-slate">{statsData.pendingReviews} reviews to moderate</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-rose group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3.5 rounded-xl bg-ivory hover:bg-ivory-dark transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Store size={18} className="text-gold" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Manage Categories</p>
                    <p className="text-xs text-slate">Organize service categories</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-4">
              Platform Health
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate">Vendor Growth</span>
                <span className="text-sm font-semibold text-charcoal">+{statsData.monthlyGrowth.vendors} this month</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: `${Math.min(statsData.monthlyGrowth.vendors * 5, 100)}%` }} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-slate">Lead Growth</span>
                <span className="text-sm font-semibold text-charcoal">+{statsData.monthlyGrowth.leads} this month</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: `${Math.min(statsData.monthlyGrowth.leads * 3, 100)}%` }} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-slate">Review Growth</span>
                <span className="text-sm font-semibold text-charcoal">+{statsData.monthlyGrowth.reviews} this month</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full" style={{ width: `${Math.min(statsData.monthlyGrowth.reviews * 4, 100)}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
