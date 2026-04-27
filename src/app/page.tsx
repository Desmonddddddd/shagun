import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AIChatPromo } from "@/components/home/AIChatPromo";
import { RealWeddings } from "@/components/home/RealWeddings";
import { CitySelector } from "@/components/home/CitySelector";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";
import { AppDownload } from "@/components/home/AppDownload";

export default async function HomePage() {
  const [categories, cities, featuredVendors, realWeddings] = await Promise.all([
    prisma.category.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.city.findMany({
      where: { featured: true },
      orderBy: { vendorCount: "desc" },
    }),
    prisma.vendor.findMany({
      where: { status: "APPROVED", featured: true },
      include: {
        category: { select: { name: true, slug: true } },
        city: { select: { name: true, slug: true } },
      },
      orderBy: { rating: "desc" },
      take: 6,
    }),
    prisma.realWedding.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <Hero
        cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
      />
      <CategoryGrid categories={categories} />
      <FeaturedVendors vendors={featuredVendors} />
      <HowItWorks />
      <AIChatPromo />
      <RealWeddings weddings={realWeddings} />
      <CitySelector cities={cities} />
      <Testimonials />
      <Stats />
      <AppDownload />
    </>
  );
}
