import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-white text-charcoal placeholder:text-slate-light transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta",
            error ? "border-red" : "border-cream-dark",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
