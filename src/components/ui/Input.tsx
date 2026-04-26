"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-charcoal mb-1.5 font-body"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light pointer-events-none">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-ivory px-4 py-2.5 text-sm text-charcoal font-body",
              "placeholder:text-slate-light",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ivory-dark",
              Icon ? "pl-11" : "pl-4",
              error
                ? "border-rose focus:ring-rose/30 focus:border-rose"
                : "border-ivory-dark hover:border-gold-light",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-rose font-body"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-xs text-slate font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
export type { InputProps };
