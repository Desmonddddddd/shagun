import Link from "next/link";
import {
  Shield,
  Award,
  Flower2,
  Lightbulb,
  Heart,
  ArrowRight,
  Star,
  MapPin,
  Store,
  Users,
} from "lucide-react";

export const metadata = {
  title: "About Shagun — India's Premier Wedding Marketplace",
  description:
    "Learn about Shagun — India's premier wedding services marketplace. Connecting couples with their perfect wedding vendors since 2023.",
  openGraph: {
    title: "About Shagun — India's Premier Wedding Marketplace",
    description: "Connecting couples with trusted vendors for their dream wedding. Discover our mission, values, and the team behind Shagun.",
  },
};

const values = [
  {
    icon: Shield,
    title: "Trust",
    description:
      "Every vendor on our platform is verified. We ensure transparency in pricing, reviews, and services so you can plan with confidence.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We handpick and continuously evaluate our vendors to maintain the highest standards. Your special day deserves nothing less than perfection.",
  },
  {
    icon: Flower2,
    title: "Tradition",
    description:
      "We celebrate India's rich wedding traditions. From Vedic rituals to contemporary celebrations, we honor every custom and ceremony.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage technology to simplify wedding planning. Smart matching, instant quotes, and seamless communication — all in one platform.",
  },
];

const stats = [
  { label: "Verified Vendors", value: "10,000+", icon: Store },
  { label: "Cities Covered", value: "50+", icon: MapPin },
  { label: "Happy Weddings", value: "25,000+", icon: Heart },
  { label: "Average Rating", value: "4.8", icon: Star },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative bg-charcoal text-white py-20 md:py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/5 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]" aria-hidden="true">
          <div className="w-full h-full rounded-full border-[40px] border-gold" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="inline-block text-gold text-sm font-medium tracking-widest uppercase mb-4">
            Our Story
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Making Dream Weddings{" "}
            <span className="text-gradient-gold">a Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-light max-w-2xl mx-auto leading-relaxed">
            Shagun was born from a simple dream — to make wedding planning in India as joyful as the celebration itself.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                About Shagun
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-6">
                Where Love Meets the{" "}
                <span className="text-gradient-gold">Perfect Plan</span>
              </h2>
              <div className="space-y-4 text-slate leading-relaxed">
                <p>
                  Indian weddings are more than ceremonies — they are a confluence of love, family, culture, and celebration. Yet, planning one can be overwhelming. From finding the right venue to the perfect photographer, from choosing between caterers to coordinating with decorators — the process can be stressful.
                </p>
                <p>
                  That&apos;s why we created Shagun. We envisioned a platform where every couple could discover, compare, and connect with the best wedding professionals in their city — all in one place.
                </p>
                <p>
                  Today, Shagun is India&apos;s most trusted wedding services marketplace, connecting thousands of couples with verified, top-rated vendors across the country.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 card-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={36} className="text-gold" />
                  </div>
                  <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-charcoal mb-2 italic">
                    &ldquo;Aapki Shaadi,
                    <br />
                    Humari Zimmedari&rdquo;
                  </p>
                  <p className="text-slate text-sm mt-3">
                    Your wedding, our responsibility — that&apos;s the promise behind everything we do.
                  </p>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/5 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose/5 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-rose text-sm font-semibold tracking-widest uppercase">
            Our Mission
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-6">
            Connect Every Couple with Their{" "}
            <span className="text-rose">Perfect</span> Wedding Vendors
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto leading-relaxed">
            We believe every couple deserves a stress-free wedding planning experience. Our mission is to bridge the gap between couples and quality wedding professionals, making it effortless to find, compare, and book the best vendors — whether you&apos;re planning an intimate ceremony or a grand celebration.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              What We Stand For
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mt-3">
              Our Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-gold" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-charcoal text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold">
              Trusted by{" "}
              <span className="text-gradient-gold">Thousands</span>
            </h2>
            <p className="text-slate-light mt-3">
              Numbers that reflect our commitment to making every wedding special.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <Icon size={28} className="text-gold mx-auto mb-3" />
                  <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="text-slate-light text-sm mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 card-shadow relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose/5 rounded-tr-full" />

            <div className="relative">
              <Heart size={36} className="text-rose mx-auto mb-4" />
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Ready to Plan Your{" "}
                <span className="text-gradient-gold">Dream Wedding?</span>
              </h2>
              <p className="text-slate text-lg mb-8 max-w-xl mx-auto">
                Browse our curated collection of wedding service categories and find the perfect vendors for your special day.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-gradient-gold text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
              >
                Explore Categories
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
