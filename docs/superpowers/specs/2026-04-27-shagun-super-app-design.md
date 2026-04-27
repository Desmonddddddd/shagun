# Shagun — Wedding Super App Design Spec

## Vision
A WedMeGood killer — India's most beautiful wedding marketplace with an AI-powered vendor finder chatbot, deep category taxonomy, vibrant Indian aesthetic, and a premium user experience that makes every competitor look dated.

## Tech Stack
- **Framework:** Next.js 16 (App Router, RSC, SSR)
- **Database:** SQLite / Turso via Prisma 7
- **Auth:** NextAuth v5 (Customer, Vendor, Admin roles)
- **AI Chatbot:** Claude API (Anthropic SDK) — smart vendor finder
- **Styling:** Tailwind CSS 4 with custom Indian theme
- **Animations:** Framer Motion
- **UI:** Custom design system (no shadcn — fully bespoke)
- **Icons:** Lucide React

## Design Language

### Color Palette (Vibrant Indian)
- **Primary:** Deep Magenta (#C2185B) — wedding energy
- **Secondary:** Royal Gold (#D4A017) — celebration, luxury
- **Accent:** Saffron Orange (#FF6F00) — warmth
- **Neutral Dark:** Charcoal (#1A1A2E) — text, contrast
- **Neutral Light:** Warm Cream (#FFF8F0) — backgrounds
- **White:** #FFFFFF — cards, sections
- **Success:** Emerald (#059669)
- **Error:** Red (#DC2626)

### Typography
- **Headings:** Playfair Display (serif) — elegance
- **Body:** Inter or DM Sans (sans-serif) — readability
- **Accent/Numbers:** Poppins — modern Indian feel

### Design Principles
- Image-first: huge hero images, vendor galleries, real wedding photos
- Generous whitespace with warm backgrounds
- Subtle gold accents on borders, dividers, highlights
- Smooth Framer Motion animations on scroll, hover, page transitions
- Mobile-first responsive design
- Cultural motifs as subtle decorative elements (not cheesy)

## Pages & Routes

### Public Pages
1. `/` — Homepage
2. `/categories` — All categories grid
3. `/categories/[slug]` — Category page with subcategories
4. `/categories/[slug]/[subSlug]` — Subcategory vendor listing
5. `/vendors/[slug]` — Vendor profile page
6. `/search` — Search results with filters
7. `/real-weddings` — Real wedding stories
8. `/blog` — Blog/inspiration
9. `/about` — About Shagun
10. `/contact` — Contact page

### Auth Pages
11. `/login` — Login
12. `/register` — Register (role selection: Customer/Vendor)

### Vendor Dashboard
13. `/vendor/dashboard` — Overview, stats
14. `/vendor/profile` — Edit business profile
15. `/vendor/services` — Manage services & packages
16. `/vendor/portfolio` — Upload photos/videos
17. `/vendor/leads` — Manage customer inquiries
18. `/vendor/reviews` — View & respond to reviews

### Admin Dashboard
19. `/admin/dashboard` — Platform stats
20. `/admin/vendors` — Approve/manage vendors
21. `/admin/categories` — Manage categories/subcategories
22. `/admin/leads` — All platform leads
23. `/admin/reviews` — Moderate reviews
24. `/admin/users` — User management

## Homepage Sections (Top to Bottom)
1. **Hero** — Full-width image/video background, search bar with city + category dropdowns, tagline "Your Dream Wedding Starts Here"
2. **Category Grid** — 14 major categories as beautiful cards with icons and vendor counts
3. **Featured Vendors** — Carousel of top-rated vendors with photos, ratings, pricing
4. **How It Works** — 3-step visual: Browse → Connect → Celebrate
5. **AI Chatbot Promo** — Section promoting the AI vendor finder ("Not sure where to start? Talk to Shagun AI")
6. **Real Weddings** — Grid of real wedding stories with photos
7. **City Selector** — Popular cities with venue counts
8. **Testimonials** — Customer reviews carousel
9. **Stats** — Platform numbers (vendors, weddings, cities)
10. **App Download CTA** — Promotional section
11. **Footer** — Links, categories, cities, social media

## Category Taxonomy

### 1. Venues
- Banquet Halls
- Farmhouses
- Marriage Gardens / Lawns
- Wedding Resorts
- Destination Wedding Venues
- 5 Star & Luxury Hotels
- 4 Star Hotels
- Small Function Halls
- Kalyana Mandapams

### 2. Photography & Videography
- Wedding Photographers
- Pre-Wedding Photographers
- Cinematographers
- Drone Photography
- Photo Albums & Printing

### 3. Makeup & Beauty
- Bridal Makeup Artists
- Family Makeup
- Grooming & Spa
- Beauty & Wellness

### 4. Planning & Decor
- Wedding Planners
- Decorators
- Florists
- Lighting & Sound

### 5. Music & Entertainment
- DJs
- Live Bands
- Sangeet Choreographers
- Anchors & Hosts
- Wedding Entertainment

### 6. Food & Catering
- Caterers
- Wedding Cakes
- Bartenders & Mixologists
- Chaat & Food Stalls

### 7. Bridal Wear
- Bridal Lehengas
- Kanjeevaram / Silk Sarees
- Cocktail Gowns & Dresses
- Bridal Lehenga on Rent
- Trousseau Sarees

### 8. Groom Wear
- Sherwanis
- Wedding Suits & Tuxedos
- Sherwani on Rent

### 9. Jewellery & Accessories
- Bridal Jewellery
- Flower Jewellery
- Jewellery on Rent
- Accessories (Kalire, Chura, etc.)

### 10. Invitations & Gifts
- Wedding Cards & Invitations
- E-Invites / Digital Invitations
- Wedding Favors & Return Gifts
- Trousseau Packers

### 11. Mehendi
- Mehendi Artists

### 12. Pandit & Rituals
- Wedding Pandits
- Astrologers

### 13. Transport
- Wedding Cars (Luxury)
- Horse & Baggi
- Vintage Cars

### 14. Honeymoon
- Honeymoon Destinations
- Travel Agents
- Honeymoon Packages

## AI Chatbot — "Shagun AI"

### What It Does
A smart vendor finder powered by Claude API. Users describe what they need in natural language, and the AI:
- Understands requirements (budget, city, style, event type, guest count)
- Searches the vendor database
- Returns curated vendor recommendations with reasoning
- Compares vendors side-by-side
- Answers wedding planning questions

### UX
- Floating chat button (bottom-right) on all pages
- Slide-in panel from right side
- Conversational interface with message bubbles
- Vendor cards rendered inline in chat responses
- Quick-action buttons ("Find Photographers", "Compare Venues", "Budget Help")
- Persists across page navigation

### Example Conversations
- "I need a photographer in Mumbai under 1 lakh"
- "Compare these two decorators for me"
- "What's a typical budget for a 300-guest wedding in Delhi?"
- "Show me venues that allow outdoor ceremonies in Jaipur"

## Vendor Profile Page
- **Hero:** Cover image with vendor name, rating, location overlay
- **Quick Info Bar:** Category, city, starting price, experience, events completed
- **About Section:** Description, team size, specialties
- **Portfolio Gallery:** Masonry grid of photos/videos with lightbox
- **Packages:** Card grid with pricing, features, "popular" badge
- **Services:** List with pricing and unit (per event, per day, etc.)
- **Reviews:** Rating breakdown + review cards with customer photos
- **Lead Form:** "Get Quote" sticky CTA that opens a modal form
- **Similar Vendors:** Carousel of related vendors

## Vendor Card Component
- Cover image (16:9 aspect)
- Vendor name
- Category badge
- Star rating + review count
- City
- Starting price ("Starting ₹XX,XXX")
- "View Profile" CTA
- Heart/save icon

## Database Schema Changes
- Add `Subcategory` model (linked to Category)
- Add `RealWedding` model (stories with photos)
- Add `BlogPost` model
- Add `SavedVendor` model (wishlist)
- Add `ChatSession` / `ChatMessage` models for AI chat history
- Expand `Vendor` with more fields (social links, highlights, FAQs)
- Add `City` with state, image, featured flag

## API Routes
- `POST /api/chat` — AI chatbot endpoint (streams Claude responses)
- `GET /api/vendors` — List with filters (category, subcategory, city, price range, rating)
- `GET /api/vendors/[slug]` — Vendor detail
- `GET /api/categories` — All categories with subcategories
- `GET /api/categories/[slug]` — Category detail with vendors
- `POST /api/leads` — Submit inquiry
- `GET/POST /api/reviews` — Reviews CRUD
- `GET /api/real-weddings` — Real wedding stories
- `GET /api/cities` — Cities list
- `POST /api/auth/register` — Registration
- Admin & Vendor CRUD endpoints

## Non-Functional Requirements
- **Performance:** < 2s LCP, lazy-loaded images, optimistic UI
- **SEO:** SSR for all public pages, structured data, meta tags
- **Mobile:** Mobile-first, responsive, touch-friendly
- **Accessibility:** ARIA labels, keyboard navigation, color contrast
- **Security:** CSRF protection, input sanitization, rate limiting on API
