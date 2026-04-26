import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Star, MapPin, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} — Wedding Vendors`,
    description: `Find the best ${category.name.toLowerCase()} for your wedding. Browse verified vendors, compare packages, and get quotes.`,
  };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) notFound();

  const vendors = await prisma.vendor.findMany({
    where: { categoryId: category.id, status: "APPROVED" },
    include: {
      category: { select: { name: true, slug: true } },
      city: { select: { name: true, slug: true } },
      media: { take: 1, orderBy: { displayOrder: "asc" } },
    },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-slate-light text-sm mb-4">
            <Link href="/categories" className="hover:text-gold transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-gold">{category.name}</span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-slate-light text-lg max-w-2xl">
            {category.description || `Find the best ${category.name.toLowerCase()} for your dream wedding.`}
          </p>
          <p className="text-gold mt-2 font-medium">{vendors.length} vendors found</p>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {vendors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate text-lg">No vendors found in this category yet.</p>
            <Link href="/categories" className="text-gold hover:underline mt-2 inline-block">
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.slug}`}
                className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 bg-ivory-dark overflow-hidden">
                  {vendor.coverImage || vendor.media[0]?.url ? (
                    <img
                      src={vendor.coverImage || vendor.media[0]?.url}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-light">
                      <span className="text-6xl font-[family-name:var(--font-heading)]">
                        {vendor.businessName[0]}
                      </span>
                    </div>
                  )}
                  {vendor.featured && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-charcoal mb-1 group-hover:text-gold transition-colors">
                    {vendor.businessName}
                  </h3>
                  <div className="flex items-center gap-1 text-slate text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{vendor.city.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-semibold text-charcoal">{vendor.rating.toFixed(1)}</span>
                      <span className="text-slate text-sm">({vendor.reviewCount})</span>
                    </div>
                    <span className="text-gold font-semibold">
                      {formatPrice(vendor.startingPrice)}+
                    </span>
                  </div>
                  <div className="mt-3 flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all">
                    View Profile <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
