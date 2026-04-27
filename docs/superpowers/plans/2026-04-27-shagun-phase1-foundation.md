# Shagun Phase 1: Foundation & Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete fresh rebuild of Shagun — wipe existing src/, install new deps, set up expanded Prisma schema with subcategories, build the full design system, and deliver a production-quality homepage with all 11 sections.

**Architecture:** Next.js 16 App Router with RSC. SQLite/Turso via Prisma 7 with LibSQL adapter. Tailwind CSS 4 with custom Indian wedding theme (vibrant magenta, gold, saffron). Framer Motion for animations. Custom design system — no component libraries.

**Tech Stack:** Next.js 16, React 19, Prisma 7, Tailwind CSS 4, Framer Motion 12, NextAuth v5, Lucide React, TypeScript 5

**Phases Overview:**
- **Phase 1 (this plan):** Infrastructure, schema, design system, homepage
- **Phase 2:** Categories, subcategories, vendor listing, search & filters
- **Phase 3:** Vendor profile page, lead form, reviews
- **Phase 4:** Auth (login/register), vendor dashboard
- **Phase 5:** AI chatbot (Shagun AI), admin dashboard
- **Phase 6:** Real weddings, blog, about, contact, polish

---

## File Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind + custom Indian theme
│   ├── layout.tsx               # Root layout with fonts, metadata
│   ├── page.tsx                 # Homepage (server component)
│   ├── template.tsx             # Page transition wrapper
│   ├── providers.tsx            # Client providers (session, etc.)
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   └── api/
│       └── auth/
│           └── [...nextauth]/route.ts  # Auth API route
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Button with variants
│   │   ├── Card.tsx             # Card component
│   │   ├── Badge.tsx            # Badge/tag component
│   │   ├── Input.tsx            # Form input
│   │   ├── Select.tsx           # Dropdown select
│   │   ├── Rating.tsx           # Star rating display
│   │   ├── SectionHeader.tsx    # Section title + subtitle
│   │   ├── Skeleton.tsx         # Loading skeleton
│   │   └── Container.tsx        # Max-width container
│   ├── layout/
│   │   ├── Navbar.tsx           # Site navigation
│   │   └── Footer.tsx           # Site footer
│   └── home/
│       ├── Hero.tsx             # Hero with search
│       ├── CategoryGrid.tsx     # 14 category cards
│       ├── FeaturedVendors.tsx  # Vendor carousel
│       ├── HowItWorks.tsx       # 3-step process
│       ├── AIChatPromo.tsx      # Shagun AI promo section
│       ├── RealWeddings.tsx     # Real wedding stories grid
│       ├── CitySelector.tsx     # Popular cities
│       ├── Testimonials.tsx     # Customer reviews
│       ├── Stats.tsx            # Platform numbers
│       └── AppDownload.tsx      # App download CTA
├── lib/
│   ├── prisma.ts               # Prisma client (keep existing)
│   ├── auth.ts                  # NextAuth config (keep existing)
│   ├── utils.ts                 # Utility functions (cn, formatPrice)
│   └── motion.ts               # Framer Motion variants
├── types/
│   └── index.ts                 # TypeScript types
└── middleware.ts                # Auth middleware
prisma/
├── schema.prisma                # Expanded schema
└── seed.ts                      # Seed with categories, cities, vendors
```

---

### Task 1: Wipe Old Code & Reset Project Structure

**Files:**
- Delete: all files under `src/` (we recreate them)
- Delete: `prisma/migrations/`, `prisma/dev.db`
- Keep: `package.json`, `tsconfig.json`, `next.config.ts`, `.env`, `.env.example`, `.gitignore`, `eslint.config.mjs`, `postcss.config.mjs`, `prisma/schema.prisma` (will be rewritten)

- [ ] **Step 1: Delete old source files**

```bash
rm -rf src/
rm -rf prisma/migrations/ prisma/dev.db prisma/dev.db-journal
rm -rf .next/
```

- [ ] **Step 2: Create new directory structure**

```bash
mkdir -p src/app/api/auth
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/lib
mkdir -p src/types
```

- [ ] **Step 3: Install new dependency — @anthropic-ai/sdk for the AI chatbot**

```bash
npm install @anthropic-ai/sdk
```

- [ ] **Step 4: Update .env.example with ANTHROPIC_API_KEY**

Add to `.env.example`:
```
# AI Chatbot
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: wipe old codebase for fresh Shagun rebuild"
```

---

### Task 2: Expanded Prisma Schema

**Files:**
- Rewrite: `prisma/schema.prisma`

- [ ] **Step 1: Write the new schema with Subcategory, RealWedding, BlogPost, SavedVendor, ChatSession, ChatMessage models**

```prisma
// ========================================
// Shagun — Wedding Super App
// Database Schema v2.0
// ========================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
}

// ========================================
// Auth Models (NextAuth.js v5)
// ========================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  phone         String?
  password      String?
  role          String    @default("CUSTOMER") // CUSTOMER | VENDOR | ADMIN
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  vendor        Vendor?
  leads         Lead[]         @relation("CustomerLeads")
  reviews       Review[]       @relation("CustomerReviews")
  savedVendors  SavedVendor[]
  chatSessions  ChatSession[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ========================================
// Category & Subcategory
// ========================================

model Category {
  id            String         @id @default(cuid())
  name          String         @unique
  slug          String         @unique
  description   String?
  icon          String?        // Lucide icon name
  image         String?
  vendorCount   Int            @default(0)
  displayOrder  Int            @default(0)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  subcategories Subcategory[]
  vendors       Vendor[]

  @@map("categories")
}

model Subcategory {
  id           String   @id @default(cuid())
  name         String
  slug         String
  description  String?
  categoryId   String
  vendorCount  Int      @default(0)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  vendors  Vendor[] @relation("VendorSubcategory")

  @@unique([categoryId, slug])
  @@map("subcategories")
}

// ========================================
// Location
// ========================================

model City {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  state       String
  image       String?
  vendorCount Int      @default(0)
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  vendors Vendor[]

  @@map("cities")
}

// ========================================
// Vendor
// ========================================

model Vendor {
  id              String   @id @default(cuid())
  userId          String   @unique
  businessName    String
  slug            String   @unique
  description     String
  phone           String?
  email           String?
  website         String?
  address         String?
  cityId          String
  categoryId      String
  subcategoryId   String?
  status          String   @default("PENDING") // PENDING | APPROVED | REJECTED | SUSPENDED
  featured        Boolean  @default(false)
  rating          Float    @default(0)
  reviewCount     Int      @default(0)
  startingPrice   Int      @default(0)
  experience      Int?     // years
  teamSize        Int?
  eventsCompleted Int?
  coverImage      String?
  instagram       String?
  facebook        String?
  youtube         String?
  highlights      String?  // JSON array as string
  faqs            String?  // JSON array as string [{q, a}]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user         User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  category     Category        @relation(fields: [categoryId], references: [id])
  subcategory  Subcategory?    @relation("VendorSubcategory", fields: [subcategoryId], references: [id])
  city         City            @relation(fields: [cityId], references: [id])
  services     VendorService[]
  packages     Package[]
  leads        Lead[]
  reviews      Review[]
  media        Media[]
  savedBy      SavedVendor[]

  @@index([categoryId])
  @@index([subcategoryId])
  @@index([cityId])
  @@index([status])
  @@index([rating])
  @@index([startingPrice])
  @@index([featured])
  @@map("vendors")
}

model VendorService {
  id          String  @id @default(cuid())
  vendorId    String
  name        String
  description String?
  price       Int
  unit        String  @default("per_event") // per_event | per_day | per_hour | per_person | per_plate

  vendor Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@map("vendor_services")
}

model Package {
  id          String  @id @default(cuid())
  vendorId    String
  name        String
  description String?
  price       Int
  features    String  // JSON array stored as string
  popular     Boolean @default(false)

  vendor Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@map("packages")
}

// ========================================
// Leads & Reviews
// ========================================

model Lead {
  id         String    @id @default(cuid())
  customerId String?
  vendorId   String
  name       String
  email      String
  phone      String
  eventDate  DateTime?
  eventType  String?
  guestCount String?
  budget     String?
  message    String
  status     String    @default("NEW") // NEW | CONTACTED | NEGOTIATING | BOOKED | CLOSED
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  customer User?  @relation("CustomerLeads", fields: [customerId], references: [id])
  vendor   Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId])
  @@index([customerId])
  @@index([status])
  @@map("leads")
}

model Review {
  id         String    @id @default(cuid())
  vendorId   String
  customerId String
  rating     Int       // 1-5
  title      String?
  comment    String
  eventDate  DateTime?
  status     String    @default("APPROVED") // PENDING | APPROVED | REJECTED
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  vendor   Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  customer User   @relation("CustomerReviews", fields: [customerId], references: [id])

  @@index([vendorId])
  @@index([customerId])
  @@map("reviews")
}

// ========================================
// Media
// ========================================

model Media {
  id           String @id @default(cuid())
  vendorId     String
  url          String
  type         String @default("IMAGE") // IMAGE | VIDEO
  caption      String?
  displayOrder Int    @default(0)

  vendor Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId])
  @@map("media")
}

// ========================================
// Saved/Wishlist
// ========================================

model SavedVendor {
  id        String   @id @default(cuid())
  userId    String
  vendorId  String
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  vendor Vendor @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@unique([userId, vendorId])
  @@map("saved_vendors")
}

// ========================================
// AI Chat
// ========================================

model ChatSession {
  id        String        @id @default(cuid())
  userId    String?
  title     String?
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  user     User?          @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages ChatMessage[]

  @@map("chat_sessions")
}

model ChatMessage {
  id        String   @id @default(cuid())
  sessionId String
  role      String   // "user" | "assistant"
  content   String
  createdAt DateTime @default(now())

  session ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)

  @@index([sessionId])
  @@map("chat_messages")
}

// ========================================
// Content
// ========================================

model RealWedding {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  couple      String   // "Priya & Rahul"
  city        String
  date        DateTime
  description String
  coverImage  String
  images      String   // JSON array of image URLs
  vendorNames String?  // JSON array of vendor names used
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("real_weddings")
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String
  coverImage  String
  author      String
  category    String   // "Planning Tips" | "Trends" | "Inspiration" | "Budget"
  tags        String?  // JSON array
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("blog_posts")
}
```

- [ ] **Step 2: Run prisma migration**

```bash
npx prisma migrate dev --name init-v2
```

Expected: Migration creates all tables successfully.

- [ ] **Step 3: Verify schema with prisma studio (optional quick check)**

```bash
npx prisma generate
```

Expected: Prisma Client generated successfully.

- [ ] **Step 4: Commit**

```bash
git add prisma/
git commit -m "feat: expanded Prisma schema with subcategories, chat, real weddings, blog"
```

---

### Task 3: Seed Data — Categories, Subcategories, Cities, Sample Vendors

**Files:**
- Rewrite: `prisma/seed.ts`

- [ ] **Step 1: Write comprehensive seed file**

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Shagun database...");

  // ── Cities ──
  const cities = await Promise.all([
    prisma.city.create({ data: { name: "Mumbai", slug: "mumbai", state: "Maharashtra", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Delhi", slug: "delhi", state: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Bangalore", slug: "bangalore", state: "Karnataka", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Jaipur", slug: "jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Udaipur", slug: "udaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Goa", slug: "goa", state: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Hyderabad", slug: "hyderabad", state: "Telangana", image: "https://images.unsplash.com/photo-1572348650783-001e88cc1959?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Chennai", slug: "chennai", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800", featured: true } }),
    prisma.city.create({ data: { name: "Kolkata", slug: "kolkata", state: "West Bengal", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800", featured: false } }),
    prisma.city.create({ data: { name: "Pune", slug: "pune", state: "Maharashtra", image: "https://images.unsplash.com/photo-1572427221867-bd4e375b2c3e?w=800", featured: false } }),
    prisma.city.create({ data: { name: "Lucknow", slug: "lucknow", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", featured: false } }),
    prisma.city.create({ data: { name: "Chandigarh", slug: "chandigarh", state: "Chandigarh", image: "https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=800", featured: false } }),
  ]);

  // ── Categories & Subcategories ──
  const categoriesData = [
    {
      name: "Venues", slug: "venues", icon: "Building2", displayOrder: 1,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      description: "Find the perfect venue for your dream wedding",
      subs: [
        { name: "Banquet Halls", slug: "banquet-halls" },
        { name: "Farmhouses", slug: "farmhouses" },
        { name: "Marriage Gardens / Lawns", slug: "marriage-gardens" },
        { name: "Wedding Resorts", slug: "wedding-resorts" },
        { name: "Destination Wedding Venues", slug: "destination-venues" },
        { name: "5 Star & Luxury Hotels", slug: "luxury-hotels" },
        { name: "4 Star Hotels", slug: "four-star-hotels" },
        { name: "Small Function Halls", slug: "function-halls" },
        { name: "Kalyana Mandapams", slug: "kalyana-mandapams" },
      ],
    },
    {
      name: "Photography & Videography", slug: "photography", icon: "Camera", displayOrder: 2,
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
      description: "Capture every magical moment of your special day",
      subs: [
        { name: "Wedding Photographers", slug: "wedding-photographers" },
        { name: "Pre-Wedding Photographers", slug: "pre-wedding-photographers" },
        { name: "Cinematographers", slug: "cinematographers" },
        { name: "Drone Photography", slug: "drone-photography" },
        { name: "Photo Albums & Printing", slug: "photo-albums" },
      ],
    },
    {
      name: "Makeup & Beauty", slug: "makeup-beauty", icon: "Sparkles", displayOrder: 3,
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800",
      description: "Look your absolute best on your wedding day",
      subs: [
        { name: "Bridal Makeup Artists", slug: "bridal-makeup" },
        { name: "Family Makeup", slug: "family-makeup" },
        { name: "Grooming & Spa", slug: "grooming-spa" },
        { name: "Beauty & Wellness", slug: "beauty-wellness" },
      ],
    },
    {
      name: "Planning & Decor", slug: "planning-decor", icon: "Palette", displayOrder: 4,
      image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
      description: "Plan and decorate your wedding to perfection",
      subs: [
        { name: "Wedding Planners", slug: "wedding-planners" },
        { name: "Decorators", slug: "decorators" },
        { name: "Florists", slug: "florists" },
        { name: "Lighting & Sound", slug: "lighting-sound" },
      ],
    },
    {
      name: "Music & Entertainment", slug: "music-entertainment", icon: "Music", displayOrder: 5,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      description: "Set the mood with amazing music and entertainment",
      subs: [
        { name: "DJs", slug: "djs" },
        { name: "Live Bands", slug: "live-bands" },
        { name: "Sangeet Choreographers", slug: "sangeet-choreographers" },
        { name: "Anchors & Hosts", slug: "anchors-hosts" },
        { name: "Wedding Entertainment", slug: "wedding-entertainment" },
      ],
    },
    {
      name: "Food & Catering", slug: "food-catering", icon: "UtensilsCrossed", displayOrder: 6,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
      description: "Delight your guests with exquisite cuisine",
      subs: [
        { name: "Caterers", slug: "caterers" },
        { name: "Wedding Cakes", slug: "wedding-cakes" },
        { name: "Bartenders & Mixologists", slug: "bartenders" },
        { name: "Chaat & Food Stalls", slug: "food-stalls" },
      ],
    },
    {
      name: "Bridal Wear", slug: "bridal-wear", icon: "Shirt", displayOrder: 7,
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800",
      description: "Find your dream bridal outfit",
      subs: [
        { name: "Bridal Lehengas", slug: "bridal-lehengas" },
        { name: "Kanjeevaram / Silk Sarees", slug: "silk-sarees" },
        { name: "Cocktail Gowns & Dresses", slug: "cocktail-gowns" },
        { name: "Bridal Lehenga on Rent", slug: "lehenga-rent" },
        { name: "Trousseau Sarees", slug: "trousseau-sarees" },
      ],
    },
    {
      name: "Groom Wear", slug: "groom-wear", icon: "Crown", displayOrder: 8,
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
      description: "Dress the groom in style",
      subs: [
        { name: "Sherwanis", slug: "sherwanis" },
        { name: "Wedding Suits & Tuxedos", slug: "wedding-suits" },
        { name: "Sherwani on Rent", slug: "sherwani-rent" },
      ],
    },
    {
      name: "Jewellery & Accessories", slug: "jewellery", icon: "Gem", displayOrder: 9,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      description: "Complete your look with stunning jewellery",
      subs: [
        { name: "Bridal Jewellery", slug: "bridal-jewellery" },
        { name: "Flower Jewellery", slug: "flower-jewellery" },
        { name: "Jewellery on Rent", slug: "jewellery-rent" },
        { name: "Accessories", slug: "accessories" },
      ],
    },
    {
      name: "Invitations & Gifts", slug: "invitations-gifts", icon: "Gift", displayOrder: 10,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      description: "Beautiful invitations and thoughtful gifts",
      subs: [
        { name: "Wedding Cards & Invitations", slug: "wedding-cards" },
        { name: "E-Invites / Digital Invitations", slug: "e-invites" },
        { name: "Wedding Favors & Return Gifts", slug: "wedding-favors" },
        { name: "Trousseau Packers", slug: "trousseau-packers" },
      ],
    },
    {
      name: "Mehendi", slug: "mehendi", icon: "Hand", displayOrder: 11,
      image: "https://images.unsplash.com/photo-1600002415506-dd06090d3480?w=800",
      description: "Intricate mehendi designs for the bride and family",
      subs: [
        { name: "Mehendi Artists", slug: "mehendi-artists" },
      ],
    },
    {
      name: "Pandit & Rituals", slug: "pandit-rituals", icon: "Flame", displayOrder: 12,
      image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800",
      description: "Traditional rituals performed with devotion",
      subs: [
        { name: "Wedding Pandits", slug: "wedding-pandits" },
        { name: "Astrologers", slug: "astrologers" },
      ],
    },
    {
      name: "Transport", slug: "transport", icon: "Car", displayOrder: 13,
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800",
      description: "Arrive in style on your big day",
      subs: [
        { name: "Wedding Cars (Luxury)", slug: "luxury-cars" },
        { name: "Horse & Baggi", slug: "horse-baggi" },
        { name: "Vintage Cars", slug: "vintage-cars" },
      ],
    },
    {
      name: "Honeymoon", slug: "honeymoon", icon: "Plane", displayOrder: 14,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      description: "Plan the perfect romantic getaway",
      subs: [
        { name: "Honeymoon Destinations", slug: "honeymoon-destinations" },
        { name: "Travel Agents", slug: "travel-agents" },
        { name: "Honeymoon Packages", slug: "honeymoon-packages" },
      ],
    },
  ];

  const categoryMap: Record<string, string> = {};
  const subcategoryMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        image: cat.image,
        description: cat.description,
        displayOrder: cat.displayOrder,
      },
    });
    categoryMap[cat.slug] = created.id;

    for (const sub of cat.subs) {
      const createdSub = await prisma.subcategory.create({
        data: {
          name: sub.name,
          slug: sub.slug,
          categoryId: created.id,
        },
      });
      subcategoryMap[sub.slug] = createdSub.id;
    }
  }

  // ── Admin User ──
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      name: "Shagun Admin",
      email: "admin@shagun.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // ── Sample Vendors ──
  const vendorUsers = [];
  const vendorData = [
    { name: "Royal Wedding Studio", category: "photography", sub: "wedding-photographers", city: "mumbai", price: 75000, rating: 4.8, reviews: 124, experience: 8, events: 350, desc: "Award-winning wedding photography studio specializing in candid moments and cinematic storytelling. We capture the essence of your love story with artistic flair." },
    { name: "Maharani Venues", category: "venues", sub: "luxury-hotels", city: "jaipur", price: 250000, rating: 4.9, reviews: 89, experience: 15, events: 500, desc: "Luxury palace venues in the heart of Jaipur. Host your royal wedding in heritage properties with modern amenities and impeccable service." },
    { name: "Glamour by Priya", category: "makeup-beauty", sub: "bridal-makeup", city: "delhi", price: 35000, rating: 4.7, reviews: 210, experience: 10, events: 600, desc: "Celebrity bridal makeup artist creating timeless bridal looks. Specializing in HD, airbrush, and traditional bridal makeup for all skin tones." },
    { name: "Dream Decor Co.", category: "planning-decor", sub: "decorators", city: "mumbai", price: 150000, rating: 4.6, reviews: 78, experience: 6, events: 200, desc: "Contemporary wedding decoration with a touch of tradition. From intimate gatherings to grand celebrations, we transform venues into dreamscapes." },
    { name: "DJ Rhythmix", category: "music-entertainment", sub: "djs", city: "bangalore", price: 25000, rating: 4.5, reviews: 156, experience: 7, events: 400, desc: "High-energy DJ and sound setup for weddings, sangeet, and cocktail parties. Professional equipment with LED dance floors and special effects." },
    { name: "Spice Kitchen Catering", category: "food-catering", sub: "caterers", city: "hyderabad", price: 800, rating: 4.8, reviews: 195, experience: 12, events: 700, desc: "Multi-cuisine catering with authentic Hyderabadi biryani. From traditional thalis to modern fusion menus, we create unforgettable culinary experiences." },
    { name: "Bride & Bespoke", category: "bridal-wear", sub: "bridal-lehengas", city: "delhi", price: 45000, rating: 4.9, reviews: 67, experience: 9, events: 300, desc: "Handcrafted bridal lehengas with intricate zardozi and threadwork. Each piece is a masterwork of Indian craftsmanship." },
    { name: "Sherwani House", category: "groom-wear", sub: "sherwanis", city: "lucknow", price: 20000, rating: 4.4, reviews: 43, experience: 20, events: 800, desc: "Traditional Lucknowi sherwanis with chikankari embroidery. Bespoke tailoring for the modern Indian groom." },
    { name: "Mehendi Magic", category: "mehendi", sub: "mehendi-artists", city: "jaipur", price: 8000, rating: 4.7, reviews: 312, experience: 11, events: 900, desc: "Intricate Rajasthani and Arabic mehendi designs. Bridal packages include hands, feet, and custom portrait mehendi." },
    { name: "Divine Ceremonies", category: "pandit-rituals", sub: "wedding-pandits", city: "delhi", price: 15000, rating: 4.6, reviews: 88, experience: 25, events: 1200, desc: "Experienced wedding pandits performing ceremonies with proper Vedic rituals. Multi-language ceremonies available." },
    { name: "Luxury Rides India", category: "transport", sub: "luxury-cars", city: "mumbai", price: 12000, rating: 4.5, reviews: 55, experience: 5, events: 150, desc: "Premium fleet of Rolls Royce, Mercedes, and vintage cars for the perfect baraat. Decorated cars with professional chauffeurs." },
    { name: "Wanderlust Honeymoons", category: "honeymoon", sub: "honeymoon-packages", city: "goa", price: 50000, rating: 4.8, reviews: 102, experience: 8, events: 250, desc: "Curated honeymoon packages to Maldives, Bali, Europe, and more. Romantic getaways with luxury stays and unique experiences." },
  ];

  for (let i = 0; i < vendorData.length; i++) {
    const v = vendorData[i];
    const password = await bcrypt.hash("vendor123", 12);
    const user = await prisma.user.create({
      data: {
        name: v.name,
        email: `vendor${i + 1}@shagun.com`,
        password,
        role: "VENDOR",
      },
    });
    vendorUsers.push(user);

    const cityRecord = await prisma.city.findUnique({ where: { slug: v.city } });

    await prisma.vendor.create({
      data: {
        userId: user.id,
        businessName: v.name,
        slug: v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
        description: v.desc,
        categoryId: categoryMap[v.category],
        subcategoryId: subcategoryMap[v.sub],
        cityId: cityRecord!.id,
        status: "APPROVED",
        featured: i < 6,
        rating: v.rating,
        reviewCount: v.reviews,
        startingPrice: v.price,
        experience: v.experience,
        eventsCompleted: v.events,
        coverImage: `https://images.unsplash.com/photo-${1519167758481 + i * 111111}?w=800`,
      },
    });
  }

  // ── Update vendor counts ──
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    const count = await prisma.vendor.count({ where: { categoryId: cat.id, status: "APPROVED" } });
    await prisma.category.update({ where: { id: cat.id }, data: { vendorCount: count } });
  }

  const citiesList = await prisma.city.findMany();
  for (const city of citiesList) {
    const count = await prisma.vendor.count({ where: { cityId: city.id, status: "APPROVED" } });
    await prisma.city.update({ where: { id: city.id }, data: { vendorCount: count } });
  }

  // ── Sample Real Weddings ──
  await prisma.realWedding.createMany({
    data: [
      {
        title: "A Royal Affair in Udaipur",
        slug: "royal-affair-udaipur",
        couple: "Priya & Rahul",
        city: "Udaipur",
        date: new Date("2025-12-15"),
        description: "A breathtaking lakeside wedding at the City Palace with 500 guests, traditional Rajasthani decor, and a stunning baraat on horseback.",
        coverImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800",
        images: JSON.stringify(["https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800"]),
        featured: true,
      },
      {
        title: "Beach Romance in Goa",
        slug: "beach-romance-goa",
        couple: "Ananya & Vikram",
        city: "Goa",
        date: new Date("2026-01-20"),
        description: "An intimate beach wedding with 150 guests, bohemian decor, and a magical sunset ceremony on the shores of Palolem.",
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        images: JSON.stringify(["https://images.unsplash.com/photo-1519741497674-611481863552?w=800"]),
        featured: true,
      },
      {
        title: "Garden Paradise in Bangalore",
        slug: "garden-paradise-bangalore",
        couple: "Sneha & Arjun",
        city: "Bangalore",
        date: new Date("2026-02-14"),
        description: "A lush garden wedding combining South Indian traditions with modern elegance. Gold and white decor with 800 guests.",
        coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
        images: JSON.stringify(["https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800"]),
        featured: true,
      },
    ],
  });

  console.log("✅ Seed complete!");
  console.log(`   📂 ${categoriesData.length} categories with subcategories`);
  console.log(`   🏙️  ${cities.length} cities`);
  console.log(`   👤 1 admin + ${vendorData.length} vendors`);
  console.log(`   💒 3 real wedding stories`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 2: Run the seed**

```bash
npx prisma db seed
```

Expected: Seed completes with success message showing counts.

- [ ] **Step 3: Commit**

```bash
git add prisma/seed.ts
git commit -m "feat: comprehensive seed data with 14 categories, 12 cities, 12 sample vendors"
```

---

### Task 4: Core Config Files — globals.css, layout.tsx, utilities

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/providers.tsx`
- Create: `src/app/template.tsx`
- Create: `src/lib/utils.ts`
- Create: `src/lib/motion.ts`
- Create: `src/lib/prisma.ts`
- Create: `src/lib/auth.ts`
- Create: `src/types/index.ts`
- Create: `src/middleware.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Write globals.css with vibrant Indian theme**

```css
@import "tailwindcss";

:root {
  /* ── Vibrant Indian Palette ── */
  --magenta: #C2185B;
  --magenta-light: #E91E8C;
  --magenta-dark: #880E4F;
  --gold: #D4A017;
  --gold-light: #F0C040;
  --gold-dark: #B8860B;
  --saffron: #FF6F00;
  --saffron-light: #FF9800;
  --cream: #FFF8F0;
  --cream-dark: #F5EDE0;
  --charcoal: #1A1A2E;
  --charcoal-light: #2D2D44;
  --slate: #6B7280;
  --slate-light: #9CA3AF;
  --white: #FFFFFF;
  --emerald: #059669;
  --red: #DC2626;

  --background: var(--cream);
  --foreground: var(--charcoal);
}

@theme inline {
  --color-magenta: var(--magenta);
  --color-magenta-light: var(--magenta-light);
  --color-magenta-dark: var(--magenta-dark);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-gold-dark: var(--gold-dark);
  --color-saffron: var(--saffron);
  --color-saffron-light: var(--saffron-light);
  --color-cream: var(--cream);
  --color-cream-dark: var(--cream-dark);
  --color-charcoal: var(--charcoal);
  --color-charcoal-light: var(--charcoal-light);
  --color-slate: var(--slate);
  --color-slate-light: var(--slate-light);
  --color-emerald: var(--emerald);
  --color-red: var(--red);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-heading: var(--font-playfair);
  --font-body: var(--font-dm-sans);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--cream);
  color: var(--charcoal);
  font-family: var(--font-body), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading), Georgia, serif;
}

/* ── Gold gradient text ── */
.text-gradient-gold {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Magenta gradient text ── */
.text-gradient-magenta {
  background: linear-gradient(135deg, var(--magenta) 0%, var(--magenta-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Gradient backgrounds ── */
.bg-gradient-gold {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
}

.bg-gradient-magenta {
  background: linear-gradient(135deg, var(--magenta) 0%, var(--magenta-light) 100%);
}

.bg-gradient-saffron {
  background: linear-gradient(135deg, var(--saffron) 0%, var(--saffron-light) 100%);
}

/* ── Hero overlay ── */
.hero-overlay {
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.85) 0%,
    rgba(194, 24, 91, 0.5) 50%,
    rgba(212, 160, 23, 0.3) 100%
  );
}

/* ── Decorative ── */
.mandala-pattern {
  background-image: radial-gradient(circle at 50% 50%, rgba(212, 160, 23, 0.05) 0%, transparent 70%);
}

/* ── Card shadows ── */
.card-shadow {
  box-shadow: 0 4px 20px rgba(194, 24, 91, 0.06), 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-shadow-hover {
  box-shadow: 0 8px 30px rgba(194, 24, 91, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* ── Gold border accent ── */
.border-gold-accent {
  border-image: linear-gradient(135deg, var(--gold), var(--gold-light)) 1;
}

/* ── Custom scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--cream-dark); }
::-webkit-scrollbar-thumb { background: var(--gold-light); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold); }

/* ── Selection ── */
::selection {
  background: rgba(194, 24, 91, 0.2);
  color: var(--charcoal);
}

/* ── Animations ── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 160, 23, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(212, 160, 23, 0); }
}

.animate-float { animation: float 3s ease-in-out infinite; }

.animate-shimmer {
  background: linear-gradient(90deg, var(--cream-dark) 25%, var(--cream) 50%, var(--cream-dark) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
.animate-pulse-gold { animation: pulse-gold 2s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-float, .animate-shimmer, .animate-fade-in-up, .animate-pulse-gold {
    animation: none !important;
  }
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write src/types/index.ts**

```typescript
import type { Category, Subcategory, City, Vendor, VendorService, Package, Lead, Review, Media, RealWedding, BlogPost } from "@prisma/client";

// ── Extended types with relations ──
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
```

- [ ] **Step 3: Write src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatPriceExact(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
```

- [ ] **Step 4: Write src/lib/motion.ts — Framer Motion animation variants**

```typescript
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: "easeInOut" },
};
```

- [ ] **Step 5: Copy existing src/lib/prisma.ts (unchanged)**

```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  const adapter = new PrismaLibSql({
    url,
    ...(authToken ? { authToken } : {}),
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

- [ ] **Step 6: Copy existing src/lib/auth.ts (unchanged)**

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login", newUser: "/register" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: string;
    };
  }
}
```

- [ ] **Step 7: Write src/app/api/auth/[...nextauth]/route.ts**

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

- [ ] **Step 8: Write src/middleware.ts**

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Protect vendor routes
  if (pathname.startsWith("/vendor")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "VENDOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/vendor/:path*", "/admin/:path*"],
};
```

- [ ] **Step 9: Write src/app/layout.tsx with Google Fonts**

```tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shagun — India's Wedding Super App",
    template: "%s | Shagun",
  },
  description:
    "Find the best wedding vendors, venues, photographers, makeup artists, and more. Plan your dream Indian wedding with Shagun.",
  keywords: [
    "wedding",
    "indian wedding",
    "wedding vendors",
    "wedding venues",
    "bridal makeup",
    "wedding photographer",
    "shagun",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-cream text-charcoal font-body antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Write src/app/providers.tsx**

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

- [ ] **Step 11: Write src/app/template.tsx (page transitions)**

```tsx
"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 12: Write src/app/error.tsx**

```tsx
"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-4xl text-charcoal mb-4">Oops!</h1>
        <p className="text-slate mb-6">
          Something went wrong. Please try again.
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 13: Write src/app/not-found.tsx**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl text-gradient-magenta mb-4">404</h1>
        <h2 className="font-heading text-2xl text-charcoal mb-4">Page Not Found</h2>
        <p className="text-slate mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-magenta text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 14: Commit**

```bash
git add src/app/globals.css src/types/index.ts src/lib/ src/app/layout.tsx src/app/providers.tsx src/app/template.tsx src/app/error.tsx src/app/not-found.tsx src/app/api/ src/middleware.ts
git commit -m "feat: core infrastructure — theme, layout, auth, types, utilities"
```

---

### Task 5: Design System — UI Components

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Rating.tsx`
- Create: `src/components/ui/SectionHeader.tsx`
- Create: `src/components/ui/Skeleton.tsx`

- [ ] **Step 1: Write Container.tsx**

```tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Write Button.tsx**

```tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-magenta text-white hover:opacity-90 focus:ring-magenta": variant === "primary",
            "bg-charcoal text-white hover:bg-charcoal-light focus:ring-charcoal": variant === "secondary",
            "border-2 border-magenta text-magenta hover:bg-magenta hover:text-white focus:ring-magenta": variant === "outline",
            "text-charcoal hover:bg-cream-dark focus:ring-charcoal": variant === "ghost",
            "bg-gradient-gold text-charcoal font-semibold hover:opacity-90 focus:ring-gold": variant === "gold",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-2.5 text-base": size === "md",
            "px-8 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

- [ ] **Step 3: Write Card.tsx**

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export function Card({ children, className, hover = true, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow overflow-hidden",
        hover && "transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1",
        padding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Write Badge.tsx**

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "magenta" | "gold" | "saffron" | "emerald" | "slate";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "magenta", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        {
          "bg-magenta/10 text-magenta": variant === "magenta",
          "bg-gold/10 text-gold-dark": variant === "gold",
          "bg-saffron/10 text-saffron": variant === "saffron",
          "bg-emerald/10 text-emerald": variant === "emerald",
          "bg-slate/10 text-slate": variant === "slate",
        },
        {
          "px-2.5 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Write Input.tsx**

```tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-white text-charcoal placeholder:text-slate-light transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta",
            error ? "border-red" : "border-cream-dark",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
```

- [ ] **Step 6: Write Select.tsx**

```tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-white text-charcoal transition-all duration-200 appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta",
            error ? "border-red" : "border-cream-dark",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
```

- [ ] **Step 7: Write Rating.tsx**

```tsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({ value, max = 5, size = "md", showValue = true, count, className }: RatingProps) {
  const sizes = { sm: 14, md: 18, lg: 22 };
  const iconSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={iconSize}
          className={cn(
            i < Math.floor(value) ? "fill-gold text-gold" : "text-cream-dark"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 font-medium text-charcoal">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-slate text-sm">({count})</span>
      )}
    </div>
  );
}
```

- [ ] **Step 8: Write SectionHeader.tsx**

```tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-3">{title}</h2>
      {subtitle && (
        <p className="text-slate text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 bg-gradient-gold rounded-full",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
```

- [ ] **Step 9: Write Skeleton.tsx**

```tsx
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-shimmer rounded-xl", className)} />
  );
}

export function VendorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 10: Commit**

```bash
git add src/components/ui/
git commit -m "feat: design system — Button, Card, Badge, Input, Select, Rating, SectionHeader, Skeleton, Container"
```

---

### Task 6: Layout Components — Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Write Navbar.tsx**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, Search, Heart, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Venues", href: "/categories/venues" },
  { label: "Vendors", href: "/categories" },
  { label: "Real Weddings", href: "/real-weddings" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cream-dark/50">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-gradient-magenta">
              Shagun
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-magenta transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="p-2 text-charcoal hover:text-magenta transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              href="/saved"
              className="p-2 text-charcoal hover:text-magenta transition-colors"
              aria-label="Saved vendors"
            >
              <Heart size={20} />
            </Link>
            {session ? (
              <Link href={session.user.role === "VENDOR" ? "/vendor/dashboard" : session.user.role === "ADMIN" ? "/admin/dashboard" : "/profile"}>
                <Button variant="outline" size="sm">
                  <User size={16} className="mr-2" />
                  {session.user.name || "Account"}
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-cream-dark/50">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-charcoal hover:text-magenta transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 border-t border-cream-dark/50">
                {session ? (
                  <Link href="/profile" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">Account</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
```

- [ ] **Step 2: Write Footer.tsx**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heart } from "lucide-react";

const footerLinks = {
  "Wedding Vendors": [
    { label: "Venues", href: "/categories/venues" },
    { label: "Photographers", href: "/categories/photography" },
    { label: "Makeup Artists", href: "/categories/makeup-beauty" },
    { label: "Decorators", href: "/categories/planning-decor" },
    { label: "Caterers", href: "/categories/food-catering" },
    { label: "DJs", href: "/categories/music-entertainment" },
  ],
  "Popular Cities": [
    { label: "Mumbai", href: "/cities/mumbai" },
    { label: "Delhi", href: "/cities/delhi" },
    { label: "Bangalore", href: "/cities/bangalore" },
    { label: "Jaipur", href: "/cities/jaipur" },
    { label: "Udaipur", href: "/cities/udaipur" },
    { label: "Goa", href: "/cities/goa" },
  ],
  "Quick Links": [
    { label: "About Us", href: "/about" },
    { label: "Real Weddings", href: "/real-weddings" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Register as Vendor", href: "/register" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-3xl font-heading font-bold text-gradient-gold">
                Shagun
              </span>
            </Link>
            <p className="mt-4 text-slate-light text-sm leading-relaxed">
              India&apos;s Wedding Super App. Find the perfect vendors for your dream wedding — all in one place.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading text-lg text-gold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-light hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-light text-sm">
            © {new Date().getFullYear()} Shagun. All rights reserved.
          </p>
          <p className="text-slate-light text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-magenta fill-magenta" /> in India
          </p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git commit -m "feat: Navbar and Footer with vibrant Indian design"
```

---

### Task 7: Homepage — All 10 Sections

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/CategoryGrid.tsx`
- Create: `src/components/home/FeaturedVendors.tsx`
- Create: `src/components/home/HowItWorks.tsx`
- Create: `src/components/home/AIChatPromo.tsx`
- Create: `src/components/home/RealWeddings.tsx`
- Create: `src/components/home/CitySelector.tsx`
- Create: `src/components/home/Testimonials.tsx`
- Create: `src/components/home/Stats.tsx`
- Create: `src/components/home/AppDownload.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Write Hero.tsx**

```tsx
"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

interface HeroProps {
  cities: { name: string; slug: string }[];
  categories: { name: string; slug: string }[];
}

export function Hero({ cities, categories }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative mandala */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-10 mandala-pattern rounded-full hidden lg:block" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-gold-light font-medium text-lg mb-4 tracking-wide"
          >
            ✨ India&apos;s Wedding Super App
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Your Dream Wedding
            <br />
            <span className="text-gradient-gold">Starts Here</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg sm:text-xl mb-10 max-w-xl mx-auto"
          >
            Discover 10,000+ verified wedding vendors across 50+ cities.
            Find venues, photographers, makeup artists, and everything you need.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-3 card-shadow max-w-2xl mx-auto"
          >
            {/* City Select */}
            <div className="flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cream-dark flex-1">
              <MapPin size={18} className="text-magenta shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cream-dark flex-1">
              <Search size={18} className="text-magenta shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-charcoal outline-none appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-gradient-magenta text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shrink-0">
              <Search size={18} />
              <span>Search</span>
            </button>
          </motion.div>

          {/* Popular searches */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-white/60 text-sm">Popular:</span>
            {["Venues in Delhi", "Photographers in Mumbai", "Makeup in Bangalore"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm hover:bg-white/25 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write CategoryGrid.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as Icons from "lucide-react";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

function getIcon(iconName: string) {
  const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
  return Icon || Icons.Tag;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Every Wedding Need, Covered"
          subtitle="Explore 14 categories and find the perfect vendors for your celebration"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {categories.map((category) => {
            const IconComponent = getIcon(category.icon || "Tag");
            return (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-shadow hover:card-shadow-hover transition-all duration-300">
                    {/* Background image */}
                    {category.image && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent size={16} className="text-gold" />
                        <span className="text-white font-medium text-sm sm:text-base">
                          {category.name}
                        </span>
                      </div>
                      <p className="text-white/70 text-xs">
                        {category.vendorCount} vendors
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Write FeaturedVendors.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Heart } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { VendorCard } from "@/types";

interface FeaturedVendorsProps {
  vendors: VendorCard[];
}

export function FeaturedVendors({ vendors }: FeaturedVendorsProps) {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader
          title="Featured Vendors"
          subtitle="Handpicked top-rated wedding professionals"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {vendors.map((vendor) => (
            <motion.div key={vendor.id} variants={fadeInUp}>
              <Link href={`/vendors/${vendor.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={vendor.coverImage || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"}
                      alt={vendor.businessName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {vendor.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="gold" size="sm">⭐ Featured</Badge>
                      </div>
                    )}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal hover:text-magenta transition-all"
                      aria-label="Save vendor"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading text-lg text-charcoal group-hover:text-magenta transition-colors">
                        {vendor.businessName}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={14} className="fill-gold text-gold" />
                        <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-slate">({vendor.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-slate text-sm mb-3">
                      <MapPin size={14} />
                      <span>{vendor.city.name}</span>
                      <span className="mx-1">·</span>
                      <span>{vendor.category.name}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-cream-dark">
                      <span className="text-magenta font-semibold">
                        Starting {formatPrice(vendor.startingPrice)}
                      </span>
                      <span className="text-sm text-magenta font-medium group-hover:underline">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Write HowItWorks.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, PartyPopper } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore thousands of verified wedding vendors across 14 categories and 50+ cities. Filter by budget, rating, and style.",
    color: "magenta",
  },
  {
    icon: MessageCircle,
    title: "Connect & Compare",
    description: "Get quotes, compare packages, read real reviews. Use Shagun AI to find your perfect match instantly.",
    color: "gold",
  },
  {
    icon: PartyPopper,
    title: "Celebrate!",
    description: "Book your dream team and celebrate your perfect wedding. Share your story to inspire other couples.",
    color: "saffron",
  },
];

const colorMap: Record<string, string> = {
  magenta: "bg-magenta/10 text-magenta",
  gold: "bg-gold/10 text-gold-dark",
  saffron: "bg-saffron/10 text-saffron",
};

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="How Shagun Works"
          subtitle="Three simple steps to your dream wedding"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={fadeInUp} className="text-center">
              <div className={`w-20 h-20 rounded-2xl ${colorMap[step.color]} flex items-center justify-center mx-auto mb-6`}>
                <step.icon size={32} />
              </div>
              <div className="text-sm font-medium text-magenta mb-2">Step {i + 1}</div>
              <h3 className="font-heading text-xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Write AIChatPromo.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AIChatPromo() {
  return (
    <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-magenta flex items-center justify-center animate-pulse-gold">
              <Bot size={32} className="text-white" />
            </div>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="font-heading text-3xl sm:text-4xl text-white mb-4">
            Meet <span className="text-gradient-gold">Shagun AI</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Not sure where to start? Tell our AI assistant what you&apos;re looking for, and it will find
            the perfect vendors for your budget, city, and style.
          </motion.p>

          {/* Sample chat bubbles */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto space-y-3 mb-8">
            <div className="flex justify-end">
              <div className="bg-magenta text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm max-w-xs">
                I need a photographer in Mumbai under ₹1 lakh
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/10 text-white px-4 py-2.5 rounded-2xl rounded-bl-md text-sm max-w-xs flex items-start gap-2">
                <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
                <span>I found 24 photographers in Mumbai within your budget! Here are the top 3...</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button variant="gold" size="lg" className="gap-2">
              Try Shagun AI <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Write RealWeddings.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { RealWedding } from "@/types";

interface RealWeddingsProps {
  weddings: RealWedding[];
}

export function RealWeddings({ weddings }: RealWeddingsProps) {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader
          title="Real Wedding Stories"
          subtitle="Get inspired by beautiful weddings planned through Shagun"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {weddings.map((wedding) => (
            <motion.div key={wedding.id} variants={fadeInUp}>
              <Link href={`/real-weddings/${wedding.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={wedding.coverImage}
                      alt={wedding.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-xl text-white mb-1">{wedding.title}</h3>
                      <p className="text-white/80 text-sm">{wedding.couple}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 text-sm text-slate">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {wedding.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {new Date(wedding.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Write CitySelector.tsx**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { City } from "@/types";

interface CitySelectorProps {
  cities: City[];
}

export function CitySelector({ cities }: CitySelectorProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Popular Wedding Destinations"
          subtitle="Explore vendors in India's most popular wedding cities"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {cities.map((city) => (
            <motion.div key={city.id} variants={fadeInUp}>
              <Link href={`/cities/${city.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-square card-shadow hover:card-shadow-hover transition-all duration-300">
                  {city.image && (
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-heading text-xl text-white">{city.name}</h3>
                    <p className="text-white/70 text-sm">{city.vendorCount} vendors</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 8: Write Testimonials.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    text: "Shagun made planning our wedding so easy! We found an amazing photographer and decorator within our budget. The AI chatbot was incredibly helpful.",
    rating: 5,
  },
  {
    name: "Rohit & Anjali",
    city: "Delhi",
    text: "We booked our venue, caterer, and DJ all through Shagun. The vendor profiles were detailed and the reviews helped us make confident decisions.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    city: "Bangalore",
    text: "As a destination wedding planner, I recommend Shagun to all my clients. The variety of vendors and the easy comparison tools are unmatched.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-cream">
      <Container>
        <SectionHeader
          title="Loved by Couples"
          subtitle="Join thousands of happy couples who found their perfect wedding vendors"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <div className="bg-white rounded-2xl p-6 card-shadow h-full flex flex-col">
                <Quote size={24} className="text-gold mb-4" />
                <p className="text-slate text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-charcoal">{t.name}</p>
                  <p className="text-sm text-slate">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: Write Stats.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: "10,000+", label: "Verified Vendors" },
  { value: "50+", label: "Cities" },
  { value: "25,000+", label: "Weddings Planned" },
  { value: "4.8★", label: "Average Rating" },
];

export function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-magenta via-magenta-dark to-magenta">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <div className="font-heading text-3xl sm:text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 10: Write AppDownload.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AppDownload() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div variants={fadeInUp} className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
              Wedding Planning
              <br />
              <span className="text-gradient-magenta">On The Go</span>
            </h2>
            <p className="text-slate mb-6 max-w-md">
              Download the Shagun app for a seamless wedding planning experience.
              Browse vendors, chat with AI, and manage everything from your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button variant="primary" size="lg" className="gap-2">
                Coming Soon <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex-shrink-0">
            <div className="w-48 h-80 bg-gradient-magenta rounded-3xl flex items-center justify-center shadow-2xl">
              <Smartphone size={64} className="text-white/80" />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 11: Write src/app/page.tsx — Homepage assembling all sections**

```tsx
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
```

- [ ] **Step 12: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: complete homepage with all 10 sections — Hero, Categories, Vendors, AI Promo, Real Weddings, Cities, Testimonials, Stats, App Download"
```

---

### Task 8: Build & Smoke Test

- [ ] **Step 1: Run the dev server to verify everything compiles**

```bash
npm run dev
```

Expected: Server starts on localhost:3000, homepage renders with all sections.

- [ ] **Step 2: Fix any TypeScript or build errors**

Check the terminal output. Common issues:
- Missing imports
- Type mismatches
- Tailwind class issues

Fix each error as it appears.

- [ ] **Step 3: Run the linter**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 4: Run a production build to verify**

```bash
npm run build
```

Expected: Build succeeds with all pages pre-rendered.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors and lint issues"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Open the browser and verify each homepage section renders**

Navigate to http://localhost:3000 and visually verify:
1. ✅ Hero with search bar, city/category dropdowns
2. ✅ 14 category cards with images and vendor counts
3. ✅ 6 featured vendor cards with ratings and prices
4. ✅ How It Works 3-step section
5. ✅ Shagun AI promo with sample chat bubbles
6. ✅ 3 real wedding story cards
7. ✅ 8 featured city cards with images
8. ✅ 3 testimonial cards
9. ✅ Stats bar (magenta background)
10. ✅ App download CTA
11. ✅ Navbar with navigation links
12. ✅ Footer with link columns

- [ ] **Step 2: Verify mobile responsiveness**

Resize browser to 375px width and confirm:
- Navbar collapses to hamburger menu
- Category grid shows 2 columns
- Vendor cards stack to single column
- All text is readable, no overflow

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "chore: Phase 1 complete — foundation and homepage verified"
```
