// ========================================
// Shagun — Type Definitions
// ========================================

// Re-export Prisma types for convenience
export type {
  User,
  Vendor,
  Category,
  City,
  VendorService,
  Package,
  Lead,
  Review,
  Media,
} from "@prisma/client";

// Enum types (stored as strings in SQLite)
export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";
export type VendorStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type LeadStatus = "NEW" | "CONTACTED" | "NEGOTIATING" | "BOOKED" | "CLOSED";
export type MediaType = "IMAGE" | "VIDEO";
export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

// Extended vendor with relations
export interface VendorWithRelations {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  description: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  cityId: string;
  categoryId: string;
  status: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  experience: number | null;
  teamSize: number | null;
  eventsCompleted: number | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
  city: {
    id: string;
    name: string;
    slug: string;
    state: string;
  };
  services: Array<{
    id: string;
    name: string;
    description: string | null;
    price: number;
    unit: string;
  }>;
  packages: Array<{
    id: string;
    name: string;
    description: string | null;
    price: number;
    features: string[];
    popular: boolean;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    comment: string;
    eventDate: Date | null;
    createdAt: Date;
    customer: {
      name: string | null;
      image: string | null;
    };
  }>;
  media: Array<{
    id: string;
    url: string;
    type: string;
    caption: string | null;
    displayOrder: number;
  }>;
  user: {
    name: string | null;
    image: string | null;
  };
}

// Vendor card (listing view)
export interface VendorCardData {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  featured: boolean;
  coverImage: string | null;
  experience: number | null;
  eventsCompleted: number | null;
  category: {
    name: string;
    slug: string;
  };
  city: {
    name: string;
    slug: string;
  };
  media: Array<{
    url: string;
    type: string;
  }>;
}

// Search & filter params
export interface VendorFilters {
  category?: string;
  city?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: "rating" | "price_low" | "price_high" | "newest" | "popular";
  page?: number;
  limit?: number;
}

// Lead form data
export interface LeadFormData {
  vendorId: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  budget: string;
  message: string;
  phone: string;
  name: string;
  email: string;
}

// Review form data
export interface ReviewFormData {
  vendorId: string;
  rating: number;
  title: string;
  comment: string;
  eventDate?: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard stats
export interface DashboardStats {
  totalVendors: number;
  totalCustomers: number;
  totalLeads: number;
  totalReviews: number;
  pendingVendors: number;
  pendingReviews: number;
  recentLeads: number;
  monthlyGrowth: {
    vendors: number;
    leads: number;
    reviews: number;
  };
}

// Vendor dashboard stats
export interface VendorDashboardStats {
  totalLeads: number;
  newLeads: number;
  totalReviews: number;
  averageRating: number;
  profileViews: number;
  responseRate: number;
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
}
