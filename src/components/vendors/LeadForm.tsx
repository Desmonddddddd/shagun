"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  ChevronDown,
} from "lucide-react";
import { cn, EVENT_TYPES, BUDGET_RANGES, GUEST_COUNT_OPTIONS } from "@/lib/utils";

interface LeadFormProps {
  vendorId: string;
  vendorName: string;
  className?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  eventType?: string;
  message?: string;
}

export default function LeadForm({
  vendorId,
  vendorName,
  className,
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, vendorId }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "",
        guestCount: "",
        budget: "",
        message: "",
      });
      setErrors({});
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow border border-ivory-dark overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="bg-gradient-gold px-6 py-5">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
          Get a Free Quote
        </h3>
        <p className="font-[family-name:var(--font-body)] text-sm text-white/80 mt-1">
          from {vendorName}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Success / Error Messages */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-sage/10 border border-sage/20 rounded-xl"
            >
              <CheckCircle size={18} className="text-sage flex-shrink-0" />
              <p className="font-[family-name:var(--font-body)] text-sm text-sage">
                Inquiry sent successfully! The vendor will contact you soon.
              </p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-rose/10 border border-rose/20 rounded-xl"
            >
              <AlertCircle size={18} className="text-rose flex-shrink-0" />
              <p className="font-[family-name:var(--font-body)] text-sm text-rose">
                Something went wrong. Please try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name */}
        <div>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light"
            />
            <input
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={cn(
                "w-full bg-ivory rounded-xl pl-10 pr-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)]",
                "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                "placeholder:text-slate-light transition-all duration-200",
                errors.name ? "border-rose" : "border-ivory-dark"
              )}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light"
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={cn(
                "w-full bg-ivory rounded-xl pl-10 pr-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)]",
                "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                "placeholder:text-slate-light transition-all duration-200",
                errors.email ? "border-rose" : "border-ivory-dark"
              )}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={cn(
                "w-full bg-ivory rounded-xl pl-10 pr-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)]",
                "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                "placeholder:text-slate-light transition-all duration-200",
                errors.phone ? "border-rose" : "border-ivory-dark"
              )}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light"
            />
            <input
              type="date"
              placeholder="Event Date *"
              value={formData.eventDate}
              onChange={(e) => handleChange("eventDate", e.target.value)}
              className={cn(
                "w-full bg-ivory rounded-xl pl-10 pr-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)]",
                "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                "placeholder:text-slate-light transition-all duration-200",
                errors.eventDate ? "border-rose" : "border-ivory-dark"
              )}
            />
          </div>
          {errors.eventDate && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.eventDate}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <div className="relative">
            <select
              value={formData.eventType}
              onChange={(e) => handleChange("eventType", e.target.value)}
              className={cn(
                "w-full appearance-none bg-ivory rounded-xl px-4 py-2.5 text-sm font-[family-name:var(--font-body)]",
                "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
                "cursor-pointer pr-10 transition-all duration-200",
                formData.eventType ? "text-charcoal" : "text-slate-light",
                errors.eventType ? "border-rose" : "border-ivory-dark"
              )}
            >
              <option value="" className="text-slate-light">
                Event Type *
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type} className="text-charcoal">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
            />
          </div>
          {errors.eventType && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.eventType}
            </p>
          )}
        </div>

        {/* Guest Count */}
        <div className="relative">
          <div className="relative">
            <Users
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-light"
            />
            <select
              value={formData.guestCount}
              onChange={(e) => handleChange("guestCount", e.target.value)}
              className="w-full appearance-none bg-ivory rounded-xl pl-10 pr-10 py-2.5 text-sm font-[family-name:var(--font-body)] text-charcoal border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer transition-all duration-200"
            >
              <option value="" className="text-slate-light">
                Guest Count (optional)
              </option>
              {GUEST_COUNT_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count} guests
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="relative">
          <select
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="w-full appearance-none bg-ivory rounded-xl px-4 py-2.5 text-sm font-[family-name:var(--font-body)] text-charcoal border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold cursor-pointer pr-10 transition-all duration-200"
          >
            <option value="" className="text-slate-light">
              Budget Range (optional)
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none"
          />
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Tell us about your wedding vision... *"
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={cn(
              "w-full bg-ivory rounded-xl px-4 py-2.5 text-sm text-charcoal font-[family-name:var(--font-body)]",
              "border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
              "placeholder:text-slate-light resize-none transition-all duration-200",
              errors.message ? "border-rose" : "border-ivory-dark"
            )}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose font-[family-name:var(--font-body)]">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white",
            "font-medium py-3.5 rounded-xl transition-all duration-200",
            "font-[family-name:var(--font-body)] text-sm shadow-sm hover:shadow-md",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={16} />
              Send Inquiry
            </>
          )}
        </button>

        <p className="text-center font-[family-name:var(--font-body)] text-[11px] text-slate-light leading-relaxed">
          By submitting, you agree to our{" "}
          <a href="/terms" className="text-gold-dark underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-gold-dark underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
