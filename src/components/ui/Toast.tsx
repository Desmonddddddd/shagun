"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastConfig: Record<
  ToastType,
  { icon: typeof CheckCircle2; bgClass: string; borderClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle2,
    bgClass: "bg-sage/10",
    borderClass: "border-l-sage",
    iconClass: "text-sage",
  },
  error: {
    icon: AlertCircle,
    bgClass: "bg-rose/10",
    borderClass: "border-l-rose",
    iconClass: "text-rose",
  },
  info: {
    icon: Info,
    bgClass: "bg-gold/10",
    borderClass: "border-l-gold",
    iconClass: "text-gold",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-500/10",
    borderClass: "border-l-amber-500",
    iconClass: "text-amber-500",
  },
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "flex items-start gap-3 w-80 p-4 rounded-xl bg-white card-shadow",
        "border-l-4",
        config.borderClass
      )}
    >
      <Icon size={20} className={cn("shrink-0 mt-0.5", config.iconClass)} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-charcoal font-body">
            {toast.title}
          </p>
        )}
        <p className="text-sm text-slate font-body">{toast.message}</p>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-1 rounded-md text-slate-light hover:text-charcoal hover:bg-ivory-dark transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutMap = useRef(new Map<string, NodeJS.Timeout>());

  useEffect(() => {
    const map = timeoutMap.current;
    return () => {
      map.forEach(clearTimeout);
      map.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    const timeout = timeoutMap.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutMap.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { ...toast, id }]);

      // Auto-dismiss after 5s with proper cleanup
      const timeout = setTimeout(() => {
        timeoutMap.current.delete(id);
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
      timeoutMap.current.set(id, timeout);
    },
    []
  );

  const success = useCallback(
    (message: string, title?: string) =>
      addToast({ type: "success", message, title }),
    [addToast]
  );
  const error = useCallback(
    (message: string, title?: string) =>
      addToast({ type: "error", message, title }),
    [addToast]
  );
  const info = useCallback(
    (message: string, title?: string) =>
      addToast({ type: "info", message, title }),
    [addToast]
  );
  const warning = useCallback(
    (message: string, title?: string) =>
      addToast({ type: "warning", message, title }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, info, warning }}
    >
      {children}

      {/* Toast container */}
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default ToastProvider;
