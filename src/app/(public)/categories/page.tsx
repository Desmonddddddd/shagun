import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Building, Camera, Video, Utensils, Palette, Sparkles,
  Flower2, Music, Users, BookOpen, Crown, Shirt, Gem,
  Heart, Star, Gift, Plane, Laugh, Cake, MapPin
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Building: <Building className="w-8 h-8" />,
  Camera: <Camera className="w-8 h-8" />,
  Video: <Video className="w-8 h-8" />,
  Utensils: <Utensils className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Flower2: <Flower2 className="w-8 h-8" />,
  Music: <Music className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Crown: <Crown className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  Gem: <Gem className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />,
  Gift: <Gift className="w-8 h-8" />,
  Plane: <Plane className="w-8 h-8" />,
  Laugh: <Laugh className="w-8 h-8" />,
  Cake: <Cake className="w-8 h-8" />,
  MapPin: <MapPin className="w-8 h-8" />,
};

export const metadata = {
  title: "Wedding Categories",
  description: "Browse all wedding service categories — venues, photographers, caterers, decorators, makeup artists and more.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4">
            Wedding Service Categories
          </h1>
          <p className="text-slate-light text-lg max-w-2xl mx-auto">
            From stunning venues to talented photographers, find every service you need to make your dream wedding a reality.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-ivory rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300 mb-4">
                {iconMap[category.icon || "Heart"] || <Heart className="w-8 h-8" />}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-charcoal mb-1">
                {category.name}
              </h3>
              <p className="text-slate text-sm mb-2">
                {category.description}
              </p>
              <span className="text-gold text-sm font-medium">
                {category.vendorCount} Vendors &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
