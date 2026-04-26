import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    return `${(price / 100000).toFixed(1)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceRange(min: number, max?: number): string {
  if (max && max !== min) {
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  }
  return formatPrice(min);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateStarArray(rating: number): ("full" | "half" | "empty")[] {
  const stars: ("full" | "half" | "empty")[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push("full");
    else if (rating >= i - 0.5) stars.push("half");
    else stars.push("empty");
  }
  return stars;
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

export const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Sangeet",
  "Mehendi",
  "Haldi",
  "Reception",
  "Pre-Wedding Shoot",
  "Other",
] as const;

export const BUDGET_RANGES = [
  { label: "Under ₹50,000", min: 0, max: 50000 },
  { label: "₹50,000 - ₹1 Lakh", min: 50000, max: 100000 },
  { label: "₹1 - 3 Lakhs", min: 100000, max: 300000 },
  { label: "₹3 - 5 Lakhs", min: 300000, max: 500000 },
  { label: "₹5 - 10 Lakhs", min: 500000, max: 1000000 },
  { label: "₹10 - 25 Lakhs", min: 1000000, max: 2500000 },
  { label: "₹25 - 50 Lakhs", min: 2500000, max: 5000000 },
  { label: "₹50 Lakhs+", min: 5000000, max: undefined },
] as const;

export const GUEST_COUNT_OPTIONS = [
  "Under 50",
  "50 - 100",
  "100 - 200",
  "200 - 500",
  "500 - 1000",
  "1000+",
] as const;
