import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "rose" | "sage" | "slate" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-gold/15 text-gold-dark border border-gold/20",
  rose: "bg-rose/15 text-rose-dark border border-rose/20",
  sage: "bg-sage/15 text-sage border border-sage/20",
  slate: "bg-slate/10 text-slate border border-slate/15",
  outline: "bg-transparent text-charcoal border border-charcoal/20",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  variant = "gold",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium font-body",
        "rounded-full whitespace-nowrap leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant, BadgeSize };
