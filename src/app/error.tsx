"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-rose/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-rose" />
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
          Something Went Wrong
        </h1>
        <p className="text-slate text-lg mb-8 leading-relaxed">
          Don&apos;t worry, even the best celebrations have unexpected moments.
          <br />
          Let&apos;s try that again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-medium rounded-xl hover:bg-gold hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-slate-light">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
