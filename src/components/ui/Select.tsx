"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: LucideIcon;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder,
      icon: Icon,
      helperText,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
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

          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full rounded-xl border bg-ivory px-4 py-2.5 text-sm text-charcoal font-body",
              "appearance-none",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ivory-dark",
              Icon ? "pl-11" : "pl-4",
              "pr-10",
              error
                ? "border-rose focus:ring-rose/30 focus:border-rose"
                : "border-ivory-dark hover:border-gold-light",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-light pointer-events-none">
            <ChevronDown size={16} />
          </div>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-xs text-rose font-body"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${selectId}-helper`}
            className="mt-1.5 text-xs text-slate font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
export type { SelectProps, SelectOption };
