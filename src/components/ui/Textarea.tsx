"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-charcoal mb-1.5 font-body"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full rounded-xl border bg-ivory px-4 py-3 text-sm text-charcoal font-body",
            "placeholder:text-slate-light",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ivory-dark",
            "resize-y min-h-[80px]",
            error
              ? "border-rose focus:ring-rose/30 focus:border-rose"
              : "border-ivory-dark hover:border-gold-light",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs text-rose font-body"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-xs text-slate font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
export type { TextareaProps };
