import type { Category, Subcategory, City, Vendor, VendorService, Package, Lead, Review, Media, RealWedding, BlogPost } from "@prisma/client";

export type CategoryWithSubs = Category & {
  subcategories: Subcategory[];
};

export type VendorWithRelations = Vendor & {
  category: Category;
  subcategory: Subcategory | null;
  city: City;
  services: VendorService[];
  packages: Package[];
  reviews: Review[];
  media: Media[];
};

export type VendorCard = Pick<Vendor, "id" | "businessName" | "slug" | "rating" | "reviewCount" | "startingPrice" | "coverImage" | "featured"> & {
  category: Pick<Category, "name" | "slug">;
  city: Pick<City, "name" | "slug">;
};

export type { Category, Subcategory, City, Vendor, VendorService, Package, Lead, Review, Media, RealWedding, BlogPost };
