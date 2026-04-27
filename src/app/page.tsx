import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AIChatPromo } from "@/components/home/AIChatPromo";
import { RealWeddings } from "@/components/home/RealWeddings";
import { CitySelector } from "@/components/home/CitySelector";
import { CTABanner } from "@/components/home/CTABanner";

export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
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
    return { categories, cities, featuredVendors, realWeddings };
  } catch {
    return { categories: [], cities: [], featuredVendors: [], realWeddings: [] };
  }
}

export default async function HomePage() {
  const { categories, cities, featuredVendors, realWeddings } = await getHomeData();

  return (
    <>
      <Hero
        cities={cities.map((c) => ({ name: c.name, slug: c.slug }))}
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
      />
      {categories.length > 0 && <CategoryGrid categories={categories} />}
      {featuredVendors.length > 0 && <FeaturedVendors vendors={featuredVendors} />}
      <HowItWorks />
      <AIChatPromo />
      {realWeddings.length > 0 && <RealWeddings weddings={realWeddings} />}
      {cities.length > 0 && <CitySelector cities={cities} />}
      <CTABanner />
    </>
  );
}
