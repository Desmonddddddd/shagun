import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({ value, max = 5, size = "md", showValue = true, count, className }: RatingProps) {
  const sizes = { sm: 14, md: 18, lg: 22 };
  const iconSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={iconSize}
          className={cn(
            i < Math.floor(value) ? "fill-gold text-gold" : "text-cream-dark"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 font-medium text-charcoal">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-slate text-sm">({count})</span>
      )}
    </div>
  );
}
