"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-dark active:bg-gold-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-rose text-white hover:bg-rose-dark active:bg-rose-dark shadow-sm hover:shadow-md",
  outline:
    "border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-white",
  ghost:
    "text-charcoal bg-transparent hover:bg-ivory-dark active:bg-ivory-dark",
  danger:
    "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type="button"
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        whileHover={isDisabled ? undefined : { scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium font-body",
          "transition-colors duration-200 ease-out",
          "cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            size={iconSizes[size]}
            className="animate-spin shrink-0"
          />
        )}
        {!loading && Icon && iconPosition === "left" && (
          <Icon size={iconSizes[size]} className="shrink-0" />
        )}
        {children && <span>{children}</span>}
        {!loading && Icon && iconPosition === "right" && (
          <Icon size={iconSizes[size]} className="shrink-0" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
