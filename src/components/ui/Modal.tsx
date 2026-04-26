"use client";

import { type ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  className?: string;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.15,
    },
  },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const modalEl = document.querySelector('[role="dialog"]');
        if (!modalEl) return;
        const focusable = modalEl.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Focus first focusable element
      setTimeout(() => {
        const modalEl = document.querySelector('[role="dialog"]');
        if (modalEl) {
          const focusable = modalEl.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) focusable[0].focus();
        }
      }, 50);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative w-full bg-white rounded-2xl card-shadow",
              "max-h-[85vh] flex flex-col",
              sizeStyles[size],
              className
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-ivory-dark">
                <h2 className="text-lg font-semibold text-charcoal font-heading">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Close button when no title */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate hover:text-charcoal hover:bg-ivory-dark transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export type { ModalProps, ModalSize };
