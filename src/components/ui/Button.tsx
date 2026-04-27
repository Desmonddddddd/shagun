import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-magenta text-white hover:opacity-90 focus:ring-magenta": variant === "primary",
            "bg-charcoal text-white hover:bg-charcoal-light focus:ring-charcoal": variant === "secondary",
            "border-2 border-magenta text-magenta hover:bg-magenta hover:text-white focus:ring-magenta": variant === "outline",
            "text-charcoal hover:bg-cream-dark focus:ring-charcoal": variant === "ghost",
            "bg-gradient-gold text-charcoal font-semibold hover:opacity-90 focus:ring-gold": variant === "gold",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-2.5 text-base": size === "md",
            "px-8 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
