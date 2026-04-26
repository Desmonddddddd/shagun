import { cn } from "@/lib/utils";
import VendorCard from "./VendorCard";
import { Search } from "lucide-react";
import type { VendorCardData } from "@/types";

interface VendorGridProps {
  vendors: VendorCardData[];
  loading?: boolean;
  className?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow">
      {/* Image Skeleton */}
      <div className="h-52 sm:h-56 animate-shimmer" />
      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-5 w-3/4 rounded-lg animate-shimmer" />
        <div className="h-3 w-1/3 rounded-lg animate-shimmer" />
        <div className="h-4 w-1/2 rounded-lg animate-shimmer" />
        <div className="pt-3 border-t border-ivory-dark">
          <div className="h-4 w-1/3 rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function VendorGrid({
  vendors,
  loading = false,
  className,
}: VendorGridProps) {
  // Loading state
  if (loading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6",
          className
        )}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!vendors || vendors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-ivory-dark flex items-center justify-center mb-5">
          <Search size={32} className="text-slate-light" />
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-charcoal mb-2">
          No vendors found
        </h3>
        <p className="font-[family-name:var(--font-body)] text-sm text-slate text-center max-w-sm">
          Try adjusting your filters or search criteria to find the perfect
          vendor for your celebration.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6",
        className
      )}
    >
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
