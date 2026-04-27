import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "magenta" | "gold" | "saffron" | "emerald" | "slate";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "magenta", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        {
          "bg-magenta/10 text-magenta": variant === "magenta",
          "bg-gold/10 text-gold-dark": variant === "gold",
          "bg-saffron/10 text-saffron": variant === "saffron",
          "bg-emerald/10 text-emerald": variant === "emerald",
          "bg-slate/10 text-slate": variant === "slate",
        },
        {
          "px-2.5 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
