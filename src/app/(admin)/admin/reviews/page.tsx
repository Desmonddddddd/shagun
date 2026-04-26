"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import { cn, getInitials, timeAgo, generateStarArray, formatDate } from "@/lib/utils";

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Review {
  id: number;
  customerName: string;
  vendorName: string;
  rating: number;
  title: string;
  comment: string;
  eventType: string;
  status: ReviewStatus;
  createdAt: string;
}

const statusConfig: Record<ReviewStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-gold/10 text-gold" },
  APPROVED: { label: "Approved", className: "bg-sage/10 text-sage" },
  REJECTED: { label: "Rejected", className: "bg-rose/10 text-rose" },
};

const sampleReviews: Review[] = [
  { id: 1, customerName: "Priya Sharma", vendorName: "Royal Celebrations Studio", rating: 5, title: "Absolutely phenomenal work!", comment: "Every single shot was perfect. The team was professional and made everyone feel comfortable. Highly recommend!", eventType: "Wedding", status: "APPROVED", createdAt: "2026-04-26T10:30:00" },
  { id: 2, customerName: "Rahul Gupta", vendorName: "Dream Venues", rating: 4, title: "Beautiful venue, good service", comment: "The venue was stunning and the staff was helpful. Minor issues with parking but overall a great experience.", eventType: "Engagement", status: "APPROVED", createdAt: "2026-04-25T14:20:00" },
  { id: 3, customerName: "Ananya Reddy", vendorName: "Elegant Decors", rating: 5, title: "Magical decoration!", comment: "They transformed the venue into a fairyland. The floral arrangements were breathtaking. Worth every penny.", eventType: "Wedding", status: "PENDING", createdAt: "2026-04-27T09:15:00" },
  { id: 4, customerName: "Meera Patel", vendorName: "Glamour Makeover Studio", rating: 5, title: "Best bridal makeup ever", comment: "I looked absolutely stunning on my wedding day. The makeup lasted the entire event. The artist was so talented!", eventType: "Wedding", status: "PENDING", createdAt: "2026-04-27T08:45:00" },
  { id: 5, customerName: "Karan Malhotra", vendorName: "Bliss Wedding Planners", rating: 3, title: "Good planning, some hiccups", comment: "Overall planning was good but there were a few coordination issues on the wedding day. The planner resolved them quickly.", eventType: "Wedding", status: "PENDING", createdAt: "2026-04-26T20:30:00" },
  { id: 6, customerName: "Fake Reviewer", vendorName: "Mehndi Magic", rating: 1, title: "SPAM REVIEW DO NOT TRUST", comment: "This is clearly a spam review with no genuine content. The reviewer has no booking history with this vendor.", eventType: "Other", status: "REJECTED", createdAt: "2026-04-25T11:00:00" },
  { id: 7, customerName: "Ishita Kapoor", vendorName: "Melody DJs", rating: 5, title: "Best sangeet night ever!", comment: "The DJ knew exactly how to keep the crowd going. Great song selection and amazing sound quality. Everyone danced all night!", eventType: "Sangeet", status: "PENDING", createdAt: "2026-04-26T16:45:00" },
  { id: 8, customerName: "Deepika Singh", vendorName: "Shubh Vivah Caterers", rating: 4, title: "Delicious food, wonderful service", comment: "The food was absolutely delicious. Every dish was freshly prepared and the live counter was a hit. Slight delay in dessert service.", eventType: "Wedding", status: "APPROVED", createdAt: "2026-04-24T13:20:00" },
  { id: 9, customerName: "Arjun Nair", vendorName: "Royal Celebrations Studio", rating: 5, title: "Cinematic perfection", comment: "The wedding film they produced was like a Bollywood movie. The drone shots were incredible. We watch it on every anniversary!", eventType: "Wedding", status: "PENDING", createdAt: "2026-04-27T07:00:00" },
  { id: 10, customerName: "Competitor Bot", vendorName: "Dream Venues", rating: 1, title: "Terrible venue avoid", comment: "Obvious fake review from a competitor. No real details or booking reference provided.", eventType: "Other", status: "REJECTED", createdAt: "2026-04-23T09:30:00" },
];

const tabs = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
] as const;

export default function AdminReviewsPage() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [reviews, setReviews] = useState(sampleReviews);
  const [search, setSearch] = useState("");

  const filteredReviews = reviews
    .filter((r) => activeTab === "ALL" || r.status === activeTab)
    .filter(
      (r) =>
        r.customerName.toLowerCase().includes(search.toLowerCase()) ||
        r.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
    );

  const handleApprove = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" as ReviewStatus } : r))
    );
  };

  const handleReject = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" as ReviewStatus } : r))
    );
  };

  const pendingCount = reviews.filter((r) => r.status === "PENDING").length;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
            Review Moderation
          </h1>
          <p className="text-slate mt-1">
            {pendingCount} reviews awaiting moderation.
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full sm:w-64 rounded-xl border border-ivory-dark bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const count =
            tab.value === "ALL"
              ? reviews.length
              : reviews.filter((r) => r.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                activeTab === tab.value
                  ? "bg-rose text-white"
                  : "bg-white text-slate hover:bg-ivory-dark hover:text-charcoal"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "text-[11px] px-1.5 py-0.5 rounded-full",
                  activeTab === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-ivory-dark text-slate"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-5 md:p-6 card-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-sm font-semibold text-charcoal shrink-0">
                  {getInitials(review.customerName)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{review.customerName}</p>
                  <p className="text-xs text-slate">
                    reviewing <span className="font-medium text-charcoal">{review.vendorName}</span>{" "}
                    · {review.eventType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={cn(
                    "text-[11px] font-medium px-2 py-0.5 rounded-full",
                    statusConfig[review.status].className
                  )}
                >
                  {statusConfig[review.status].label}
                </span>
                <span className="text-[11px] text-slate">{timeAgo(review.createdAt)}</span>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {generateStarArray(review.rating).map((star, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    star === "full" ? "fill-gold text-gold" : "text-ivory-dark"
                  )}
                />
              ))}
              <span className="text-sm font-medium text-charcoal ml-1.5">{review.rating}.0</span>
            </div>

            {/* Content */}
            <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-charcoal mb-1">
              {review.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed mb-4">{review.comment}</p>

            {/* Actions */}
            {review.status === "PENDING" && (
              <div className="flex items-center gap-2 pt-3 border-t border-ivory-dark">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="flex items-center gap-1.5 bg-sage hover:bg-sage/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  <CheckCircle size={15} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="flex items-center gap-1.5 bg-rose hover:bg-rose-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  <XCircle size={15} />
                  Reject
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-ivory-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={28} className="text-slate" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-1">
            No reviews found
          </h3>
          <p className="text-slate text-sm">
            {activeTab === "PENDING"
              ? "All reviews have been moderated!"
              : "No reviews match the selected filter."}
          </p>
        </div>
      )}
    </div>
  );
}
