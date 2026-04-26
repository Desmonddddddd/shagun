"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const justRegistered = searchParams.get("registered") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        const session = await fetch("/api/auth/session").then((r) => r.json());
        if (session?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (session?.user?.role === "VENDOR") {
          router.push("/vendor/dashboard");
        } else {
          router.push(callbackUrl || "/");
        }
        router.refresh();
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
        <p className="text-slate mt-2">Welcome back! Sign in to your account.</p>
      </motion.div>

      <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 card-shadow">
        {justRegistered && (
          <div
            className="p-3 bg-sage/10 text-sage text-sm rounded-xl border border-sage/20 mb-5 flex items-center gap-2"
            role="status"
          >
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            Account created successfully! Please sign in.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <label htmlFor="login-email" className="block text-sm font-medium text-charcoal mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 bg-ivory rounded-xl border border-ivory-dark focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-charcoal mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" aria-hidden="true" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
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

          <motion.button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            whileTap={loading ? undefined : { scale: 0.98 }}
            className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" aria-label="Signing in" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-gold font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md text-center py-20">
          <div className="animate-pulse text-gold text-lg">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
