import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import HowItWorks from "@/components/home/HowItWorks";
import CitySelector from "@/components/home/CitySelector";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";

export default async function Home() {
  // Fetch data from database (server component)
  const [categories, featuredVendors, cities] = await Promise.all([
    prisma.category.findMany({
      orderBy: { displayOrder: "asc" },
      take: 8,
    }),
    prisma.vendor.findMany({
      where: { status: "APPROVED", featured: true },
      include: { category: true, city: true, media: { take: 1 } },
      take: 6,
    }),
    prisma.city.findMany({
      where: { featured: true },
      take: 8,
    }),
  ]);

  // Map to plain serializable objects
  const categoriesData = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    icon: c.icon,
    image: c.image,
    vendorCount: c.vendorCount,
  }));

  const vendorsData = featuredVendors.map((v) => ({
    id: v.id,
    businessName: v.businessName,
    slug: v.slug,
    description: v.description,
    rating: v.rating,
    reviewCount: v.reviewCount,
    startingPrice: v.startingPrice,
    featured: v.featured,
    coverImage: v.coverImage,
    experience: v.experience,
    eventsCompleted: v.eventsCompleted,
    category: { name: v.category.name, slug: v.category.slug },
    city: { name: v.city.name, slug: v.city.slug },
    media: v.media.map((m) => ({ url: m.url, type: m.type })),
  }));

  const citiesData = cities.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    state: c.state,
    vendorCount: c.vendorCount,
    featured: c.featured,
  }));

  return (
    <main>
      <Hero />
      <CategoryGrid categories={categoriesData} />
      <FeaturedVendors vendors={vendorsData} />
      <HowItWorks />
      <CitySelector cities={citiesData} />
      <Testimonials />
      <Stats />
    </main>
  );
}
