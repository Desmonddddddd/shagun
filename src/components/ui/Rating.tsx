"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { generateStarArray } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  maxRating?: number;
  size?: number;
  className?: string;
}

type RatingProps =
  | ({ mode?: "display" } & RatingDisplayProps)
  | ({ mode: "input" } & RatingInputProps);

function RatingDisplay({
  rating,
  maxRating = 5,
  size = 16,
  showValue = false,
  className,
}: RatingDisplayProps) {
  const stars = generateStarArray(rating);

  return (
    <div className={cn("inline-flex items-center gap-1", className)} role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const type = stars[i] || "empty";
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                type === "full" && "fill-gold text-gold",
                type === "half" && "fill-gold/50 text-gold",
                type === "empty" && "fill-transparent text-slate-light/50"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-charcoal ml-1 font-body">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

function RatingInput({
  value,
  onChange,
  maxRating = 5,
  size = 24,
  className,
}: RatingInputProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      onMouseLeave={() => setHovered(0)}
    >
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => {
        const isFilled = star <= (hovered || value);
        return (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            className="cursor-pointer p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={`Rate ${star} of ${maxRating}`}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors duration-150",
                isFilled
                  ? "fill-gold text-gold"
                  : "fill-transparent text-slate-light/50 hover:text-gold-light"
              )}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

export default function Rating(props: RatingProps) {
  if (props.mode === "input") {
    const { mode, ...rest } = props;
    return <RatingInput {...rest} />;
  }

  const { mode, ...rest } = props;
  return <RatingDisplay {...(rest as RatingDisplayProps)} />;
}

export { RatingDisplay, RatingInput };
export type { RatingProps, RatingDisplayProps, RatingInputProps };
