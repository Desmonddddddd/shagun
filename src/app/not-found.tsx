import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Decorative 404 */}
        <div className="relative mb-8">
          <span className="font-[family-name:var(--font-heading)] text-[10rem] md:text-[14rem] font-bold text-gradient-gold opacity-20 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-gold" />
            </div>
          </div>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-slate text-lg mb-8 leading-relaxed">
          Looks like this page wandered off before the ceremony!
          <br />
          Let&apos;s get you back to planning your dream wedding.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-medium rounded-xl hover:bg-gold hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            Search Vendors
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Go back
          </Link>
        </div>
      </div>
    </main>
  );
}
