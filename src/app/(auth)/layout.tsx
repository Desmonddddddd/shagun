export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Decorative Left Panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-charcoal">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Radial accents */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(212,168,83,0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(201,76,110,0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(212,168,83,0.2) 0%, transparent 60%)`,
          }}
        />
        {/* Mandala-inspired decorative circles */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-gold/10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-gold/15 mt-8" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-gold/20 mt-16" />
          <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gold/5 blur-xl" />
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-rose/5 blur-xl" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl font-bold text-white mb-4 text-center leading-tight">
            Your Dream Wedding
            <br />
            <span className="text-gradient-gold">Starts Here</span>
          </h2>
          <p className="font-[family-name:var(--font-heading)] text-lg text-gold-light/70 italic text-center mb-8">
            Aapki shaadi, humari zimmedari
          </p>
          <div className="flex gap-8 text-center">
            <div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">10,000+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Vendors</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Cities</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">4.8★</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 mandala-pattern">
        {children}
      </div>
    </div>
  );
}
