import Image from "next/image";
import { Star } from "lucide-react";
import { cn, getInitials, formatDate, timeAgo } from "@/lib/utils";

interface ReviewData {
  id: string;
  rating: number;
  title: string | null;
  comment: string;
  eventDate: Date | string | null;
  createdAt: Date | string;
  customer: {
    name: string | null;
    image: string | null;
  };
}

interface ReviewCardProps {
  review: ReviewData;
  className?: string;
}

export default function ReviewCard({ review, className }: ReviewCardProps) {
  const customerName = review.customer.name || "Anonymous";
  const initials = getInitials(customerName);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-5 sm:p-6",
        "border border-ivory-dark",
        "transition-all duration-200 hover:border-gold/15",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {review.customer.image ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-ivory-dark">
              <Image
                src={review.customer.image}
                alt={customerName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-rose/20 flex items-center justify-center ring-2 ring-ivory-dark">
              <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-dark">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Name & Date */}
        <div className="flex-1 min-w-0">
          <h4 className="font-[family-name:var(--font-heading)] font-semibold text-charcoal text-sm truncate">
            {customerName}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-[family-name:var(--font-body)] text-xs text-slate">
              {timeAgo(review.createdAt)}
            </span>
            {review.eventDate && (
              <>
                <span className="text-ivory-dark">·</span>
                <span className="font-[family-name:var(--font-body)] text-xs text-slate">
                  Event: {formatDate(review.eventDate)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={cn(
                i < review.rating
                  ? "text-gold fill-gold"
                  : "text-ivory-dark"
              )}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h5 className="font-[family-name:var(--font-heading)] font-semibold text-charcoal text-sm mb-2">
          {review.title}
        </h5>
      )}

      {/* Comment */}
      <p className="font-[family-name:var(--font-body)] text-sm text-charcoal/75 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}
