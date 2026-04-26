"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Store, Eye, EyeOff, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"customer" | "vendor">("customer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    category: "",
    city: "",
    description: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role: mode === "vendor" ? "VENDOR" : "CUSTOMER",
        }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/login?registered=true");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <Link href="/" className="inline-block">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-gradient-gold">
            Shagun
          </h1>
        </Link>
        <p className="text-slate mt-2">Create your account and get started.</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 card-shadow">
        {/* Mode Toggle */}
        <div className="flex bg-ivory rounded-xl p-1 mb-6" role="tablist">
          <button
            role="tab"
            aria-selected={mode === "customer"}
            onClick={() => setMode("customer")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              mode === "customer"
                ? "bg-gold text-white shadow-sm"
                : "text-slate hover:text-charcoal"
            }`}
          >
            <User className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
            Customer
          </button>
          <button
            role="tab"
            aria-selected={mode === "vendor"}
            onClick={() => setMode("vendor")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              mode === "vendor"
                ? "bg-gold text-white shadow-sm"
                : "text-slate hover:text-charcoal"
            }`}
          >
            <Store className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
            Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-3 bg-rose/10 text-rose text-sm rounded-xl border border-rose/20"
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="register-name" className="block text-sm font-medium text-charcoal mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="register-name"
                type="text"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="Your full name"
                required
                autoComplete="name"
                className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-charcoal mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="register-email"
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="register-phone" className="block text-sm font-medium text-charcoal mb-1.5">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="register-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
            </div>
          </div>

          {/* Vendor-only fields with animation */}
          <AnimatePresence>
            {mode === "vendor" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <label htmlFor="register-businessName" className="block text-sm font-medium text-charcoal mb-1.5">
                    Business Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
                    <input
                      id="register-businessName"
                      type="text"
                      value={form.businessName}
                      onChange={(e) => updateForm("businessName", e.target.value)}
                      placeholder="Your business name"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-description" className="block text-sm font-medium text-charcoal mb-1.5">
                    About Your Business
                  </label>
                  <textarea
                    id="register-description"
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    placeholder="Tell us about your services..."
                    rows={3}
                    className="w-full px-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none resize-none transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-charcoal mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
                placeholder="Min 6 characters"
                required
                autoComplete="new-password"
                className="w-full pl-11 pr-12 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-charcoal transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="register-confirmPassword" className="block text-sm font-medium text-charcoal mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="register-confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            whileTap={loading ? undefined : { scale: 0.98 }}
            className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" aria-label="Creating account" />
            ) : (
              <>
                {mode === "vendor" ? "Register as Vendor" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate">
            Already have an account?{" "}
            <Link href="/login" className="text-gold font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
