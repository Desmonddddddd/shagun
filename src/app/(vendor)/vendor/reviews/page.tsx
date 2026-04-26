"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn, getInitials, timeAgo, generateStarArray, formatDate } from "@/lib/utils";

interface Review {
  id: number;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  eventType: string;
  eventDate: string;
  createdAt: string;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    customerName: "Priya & Rohit Sharma",
    rating: 5,
    title: "Absolutely phenomenal work!",
    comment:
      "Royal Celebrations Studio made our wedding day truly magical. Every single shot was perfect — from the intimate moments during the pheras to the grand family portraits. The team was so professional and made everyone feel comfortable. The cinematic highlight reel made us cry happy tears all over again!",
    eventType: "Wedding",
    eventDate: "2026-03-15",
    createdAt: "2026-04-01T10:30:00",
  },
  {
    id: 2,
    customerName: "Neha Kapoor",
    rating: 5,
    title: "Best decision we made for our wedding",
    comment:
      "From the pre-wedding shoot in Goa to the 3-day wedding coverage in Delhi, this team exceeded every expectation. Their candid photography style captured emotions we didn't even know were happening. The album quality is museum-worthy.",
    eventType: "Wedding",
    eventDate: "2026-02-20",
    createdAt: "2026-03-15T14:20:00",
  },
  {
    id: 3,
    customerName: "Amit & Sanya Verma",
    rating: 4,
    title: "Great photos, minor delivery delay",
    comment:
      "The photos and videos are stunning. Our friends and family couldn't stop praising the quality. Only reason for 4 stars is the album delivery took a bit longer than promised. But the final product was worth the wait.",
    eventType: "Wedding",
    eventDate: "2026-01-10",
    createdAt: "2026-02-28T09:15:00",
  },
  {
    id: 4,
    customerName: "Riya Joshi",
    rating: 5,
    title: "Made our engagement unforgettable",
    comment:
      "We hired them for just the engagement, but the results were so incredible that we booked them for our wedding too! They have an amazing eye for detail and the editing is top-notch. Highly recommend their Gold package.",
    eventType: "Engagement",
    eventDate: "2025-12-05",
    createdAt: "2026-01-10T16:45:00",
  },
  {
    id: 5,
    customerName: "Karan & Meera Malhotra",
    rating: 4,
    title: "Professional and talented team",
    comment:
      "Very professional from start to finish. The pre-wedding shoot ideas were creative and unique. The wedding day coverage was comprehensive. Would have loved a few more traditional group shots, but overall very happy.",
    eventType: "Pre-Wedding Shoot",
    eventDate: "2025-11-18",
    createdAt: "2025-12-20T11:00:00",
  },
  {
    id: 6,
    customerName: "Deepika Singh",
    rating: 5,
    title: "Captured every emotion perfectly",
    comment:
      "I'm still in awe looking at our sangeet photos. The way they captured the dance performances, the laughter, the happy tears — it's like reliving the night every time. The drone shots of the venue were breathtaking too.",
    eventType: "Sangeet",
    eventDate: "2025-10-22",
    createdAt: "2025-11-15T08:30:00",
  },
  {
    id: 7,
    customerName: "Arjun & Tanya Nair",
    rating: 3,
    title: "Good but could improve communication",
    comment:
      "Photography quality is excellent — no complaints there. However, communication during the planning phase was a bit inconsistent. Once on the event day, everything went smoothly. The final deliverables are beautiful.",
    eventType: "Wedding",
    eventDate: "2025-09-08",
    createdAt: "2025-10-05T13:20:00",
  },
  {
    id: 8,
    customerName: "Anjali Bhatt",
    rating: 5,
    title: "Worth every rupee!",
    comment:
      "We went with the Platinum package and it was worth every single rupee. 3 photographers, 2 videographers — they covered every angle. The same-day edit video played at the reception and everyone was blown away. 100% recommend!",
    eventType: "Wedding",
    eventDate: "2025-08-14",
    createdAt: "2025-09-20T17:10:00",
  },
];

export default function VendorReviewsPage() {
  const totalReviews = sampleReviews.length;
  const averageRating =
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: sampleReviews.filter((r) => r.rating === stars).length,
    percentage:
      (sampleReviews.filter((r) => r.rating === stars).length / totalReviews) * 100,
  }));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal">
          Reviews
        </h1>
        <p className="text-slate mt-1">See what couples are saying about your work.</p>
      </div>

      {/* Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 card-shadow mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left shrink-0">
            <p className="text-5xl md:text-6xl font-bold text-charcoal font-[family-name:var(--font-heading)]">
              {averageRating.toFixed(1)}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-0.5 my-2">
              {generateStarArray(averageRating).map((star, i) => (
                <Star
                  key={i}
                  size={18}
                  className={cn(
                    star === "full"
                      ? "fill-gold text-gold"
                      : star === "half"
                      ? "fill-gold/50 text-gold"
                      : "text-ivory-dark"
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-slate">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2.5">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span className="text-sm text-slate w-12 text-right shrink-0">
                  {d.stars} star
                </span>
                <div className="flex-1 h-2.5 bg-ivory-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
                <span className="text-sm text-slate w-8 shrink-0">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sampleReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-2xl p-5 md:p-6 card-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-sm font-semibold text-gold shrink-0">
                  {getInitials(review.customerName)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{review.customerName}</p>
                  <div className="flex items-center gap-2 text-xs text-slate mt-0.5">
                    <span>{review.eventType}</span>
                    <span>·</span>
                    <span>{formatDate(review.eventDate)}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate shrink-0">{timeAgo(review.createdAt)}</span>
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
            </div>

            {/* Title & Comment */}
            <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-charcoal mb-1.5">
              {review.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
