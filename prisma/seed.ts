// ========================================
// Shagun — Wedding Super App
// Seed Data
// ========================================

import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

// ========================================
// Helper
// ========================================
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// ========================================
// CATEGORIES
// ========================================
const categoriesData = [
  {
    name: "Venues",
    slug: "venues",
    description:
      "Stunning banquet halls, farmhouses, heritage havelis and luxury resorts for your dream wedding celebration.",
    icon: "Building",
    displayOrder: 1,
  },
  {
    name: "Photographers",
    slug: "photographers",
    description:
      "Capture every candid moment and regal portrait with India's finest wedding photographers.",
    icon: "Camera",
    displayOrder: 2,
  },
  {
    name: "Videographers",
    slug: "videographers",
    description:
      "Cinematic wedding films and same-day edits that tell your love story beautifully.",
    icon: "Video",
    displayOrder: 3,
  },
  {
    name: "Caterers",
    slug: "caterers",
    description:
      "Multi-cuisine catering from royal Rajasthani thalis to gourmet continental spreads for every palate.",
    icon: "Utensils",
    displayOrder: 4,
  },
  {
    name: "Decorators",
    slug: "decorators",
    description:
      "Transform your venue into a fairy-tale setting with breathtaking floral and thematic décor.",
    icon: "Palette",
    displayOrder: 5,
  },
  {
    name: "Makeup Artists",
    slug: "makeup-artists",
    description:
      "Bridal makeup experts who create stunning looks from subtle elegance to bold glamour.",
    icon: "Sparkles",
    displayOrder: 6,
  },
  {
    name: "Mehendi Artists",
    slug: "mehendi-artists",
    description:
      "Intricate henna designs — from traditional Rajasthani patterns to contemporary Arabic art.",
    icon: "Heart",
    displayOrder: 7,
  },
  {
    name: "DJs & Music",
    slug: "djs-music",
    description:
      "Live bands, dhol players and top DJs to keep your sangeet and reception rocking all night.",
    icon: "Music",
    displayOrder: 8,
  },
  {
    name: "Wedding Planners",
    slug: "wedding-planners",
    description:
      "End-to-end wedding planning and coordination so you can enjoy every moment stress-free.",
    icon: "Users",
    displayOrder: 9,
  },
  {
    name: "Invitations & Cards",
    slug: "invitations-cards",
    description:
      "Exquisite wedding invitations — from hand-crafted scrolls to elegant digital invites.",
    icon: "BookOpen",
    displayOrder: 10,
  },
  {
    name: "Bridal Wear",
    slug: "bridal-wear",
    description:
      "Designer lehengas, sarees and gowns that make every bride look like royalty on her big day.",
    icon: "Crown",
    displayOrder: 11,
  },
  {
    name: "Groom Wear",
    slug: "groom-wear",
    description:
      "Sherwanis, bandhgalas and Indo-western outfits tailored to perfection for the modern groom.",
    icon: "Shirt",
    displayOrder: 12,
  },
  {
    name: "Jewellery",
    slug: "jewellery",
    description:
      "Kundan, polki, temple and contemporary jewellery sets to complete your bridal trousseau.",
    icon: "Gem",
    displayOrder: 13,
  },
  {
    name: "Florists",
    slug: "florists",
    description:
      "Fresh flower arrangements, garlands and floral jewellery crafted with seasonal blooms.",
    icon: "Flower2",
    displayOrder: 14,
  },
  {
    name: "Choreographers",
    slug: "choreographers",
    description:
      "Sangeet choreography that brings Bollywood magic to your family dance performances.",
    icon: "Star",
    displayOrder: 15,
  },
  {
    name: "Pandits & Priests",
    slug: "pandits-priests",
    description:
      "Experienced pandits and priests for all wedding rituals across Hindu, Sikh and Jain traditions.",
    icon: "BookOpen",
    displayOrder: 16,
  },
  {
    name: "Gifting & Favors",
    slug: "gifting-favors",
    description:
      "Curated trousseau packing, return gifts and bespoke wedding favor boxes for your guests.",
    icon: "Gift",
    displayOrder: 17,
  },
  {
    name: "Travel & Stay",
    slug: "travel-stay",
    description:
      "Guest accommodation, luxury transport and destination wedding travel logistics handled seamlessly.",
    icon: "Plane",
    displayOrder: 18,
  },
  {
    name: "Entertainment Acts",
    slug: "entertainment-acts",
    description:
      "Fire dancers, magicians, stand-up comics and folk artists to wow your wedding guests.",
    icon: "Laugh",
    displayOrder: 19,
  },
  {
    name: "Cakes & Desserts",
    slug: "cakes-desserts",
    description:
      "Custom wedding cakes, dessert bars and mithai counters for a sweet celebration.",
    icon: "Cake",
    displayOrder: 20,
  },
];

// ========================================
// CITIES
// ========================================
const citiesData = [
  { name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi", featured: true },
  { name: "Mumbai", slug: "mumbai", state: "Maharashtra", featured: true },
  { name: "Jaipur", slug: "jaipur", state: "Rajasthan", featured: true },
  { name: "Udaipur", slug: "udaipur", state: "Rajasthan", featured: true },
  { name: "Goa", slug: "goa", state: "Goa", featured: true },
  { name: "Bangalore", slug: "bangalore", state: "Karnataka", featured: true },
  { name: "Hyderabad", slug: "hyderabad", state: "Telangana", featured: false },
  { name: "Chennai", slug: "chennai", state: "Tamil Nadu", featured: false },
  { name: "Kolkata", slug: "kolkata", state: "West Bengal", featured: false },
  { name: "Lucknow", slug: "lucknow", state: "Uttar Pradesh", featured: false },
  { name: "Chandigarh", slug: "chandigarh", state: "Punjab", featured: false },
  { name: "Pune", slug: "pune", state: "Maharashtra", featured: false },
  { name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat", featured: false },
  { name: "Jodhpur", slug: "jodhpur", state: "Rajasthan", featured: false },
  { name: "Kochi", slug: "kochi", state: "Kerala", featured: false },
];

// ========================================
// VENDORS DATA (20 vendors)
// ========================================
interface VendorSeed {
  user: { name: string; email: string };
  vendor: {
    businessName: string;
    slug: string;
    description: string;
    phone: string;
    email: string;
    website?: string;
    address?: string;
    category: string;
    city: string;
    featured: boolean;
    rating: number;
    startingPrice: number;
    experience: number;
    teamSize: number;
    eventsCompleted: number;
    coverImage: string;
  };
  packages: {
    name: string;
    description: string;
    price: number;
    features: string[];
    popular: boolean;
  }[];
  services: { name: string; price: number; unit: string; description?: string }[];
  reviews: {
    customerIdx: number;
    rating: number;
    title: string;
    comment: string;
    eventDate: string;
  }[];
  media: { url: string; caption: string }[];
}

const vendorsData: VendorSeed[] = [
  // ── 1. Royal Palace Banquets — Venues, Delhi ──
  {
    user: { name: "Rajesh Malhotra", email: "rajesh@royalpalace.in" },
    vendor: {
      businessName: "Royal Palace Banquets",
      slug: "royal-palace-banquets",
      description:
        "One of Delhi's most prestigious wedding venues, Royal Palace Banquets offers sprawling lawns, grand ballrooms and impeccable hospitality. With capacity for 200 to 2,000 guests, we have hosted over 400 royal-themed weddings in the last decade.",
      phone: "+91 98100 12345",
      email: "bookings@royalpalace.in",
      website: "https://royalpalace.in",
      address: "Plot 12, Hospitality District, New Delhi",
      category: "venues",
      city: "delhi-ncr",
      featured: true,
      rating: 4.7,
      startingPrice: 250000,
      experience: 15,
      teamSize: 50,
      eventsCompleted: 420,
      coverImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Silver Celebration",
        description: "Perfect for intimate gatherings up to 200 guests",
        price: 250000,
        features: [
          "Indoor AC banquet hall",
          "Basic floral décor",
          "Valet parking for 50 cars",
          "Complimentary bridal suite",
          "In-house DJ setup",
        ],
        popular: false,
      },
      {
        name: "Gold Grandeur",
        description: "Our most popular package for 200–500 guests",
        price: 600000,
        features: [
          "Grand ballroom + lawn access",
          "Premium floral & lighting décor",
          "Valet parking for 150 cars",
          "2 luxury suites for families",
          "In-house DJ + sound system",
          "Dedicated event coordinator",
          "Complimentary mehendi area",
        ],
        popular: true,
      },
      {
        name: "Platinum Royale",
        description: "The ultimate royal wedding experience for 500+ guests",
        price: 1500000,
        features: [
          "Entire venue exclusive booking",
          "Custom theme décor with imported flowers",
          "Valet parking for 300 cars",
          "5 luxury suites",
          "Celebrity DJ or live band",
          "Dedicated event manager + team of 20",
          "Fireworks & drone show option",
          "Complimentary 2-night stay for couple",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Banquet Hall Rental", price: 200000, unit: "per_event" },
      { name: "Garden Lawn Rental", price: 150000, unit: "per_event" },
      { name: "Bridal Suite", price: 15000, unit: "per_day" },
      { name: "Valet Parking Service", price: 25000, unit: "per_event" },
      { name: "Sound & Lighting Setup", price: 50000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Absolutely magical venue!",
        comment:
          "Royal Palace made our wedding dreams come true. The ballroom was breathtaking and the staff went above and beyond. Our guests are still talking about the grand entrance setup!",
        eventDate: "2024-11-15",
      },
      {
        customerIdx: 1,
        rating: 5,
        title: "World-class hospitality",
        comment:
          "From the first visit to the last farewell, the Royal Palace team treated us like family. The lawn setup for our sangeet was picture perfect. Highly recommend the Platinum package!",
        eventDate: "2024-12-20",
      },
      {
        customerIdx: 2,
        rating: 4,
        title: "Beautiful venue, minor hiccups",
        comment:
          "The venue itself is stunning and the décor team did a fabulous job. There were some minor coordination issues with parking on the wedding day, but the manager resolved everything quickly.",
        eventDate: "2025-01-10",
      },
      {
        customerIdx: 3,
        rating: 5,
        title: "Best venue in Delhi NCR",
        comment:
          "We looked at 20+ venues before choosing Royal Palace and it was the best decision. The food was incredible, the ambience was regal, and the entire experience was seamless.",
        eventDate: "2025-02-14",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
        caption: "Grand ballroom setup for reception",
      },
      {
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
        caption: "Lawn area decorated for evening ceremony",
      },
      {
        url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
        caption: "Entrance gate with marigold décor",
      },
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        caption: "Aerial view of the banquet complex",
      },
      {
        url: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=600&fit=crop",
        caption: "Stage setup with floral arch",
      },
    ],
  },

  // ── 2. Candid Clicks Studio — Photographers, Mumbai ──
  {
    user: { name: "Arjun Deshmukh", email: "arjun@candidclicks.in" },
    vendor: {
      businessName: "Candid Clicks Studio",
      slug: "candid-clicks-studio",
      description:
        "Award-winning wedding photography studio specializing in candid, editorial and fine-art wedding portraits. We believe every love story deserves to be told through timeless imagery that you'll treasure for generations.",
      phone: "+91 98200 54321",
      email: "hello@candidclicks.in",
      website: "https://candidclicks.in",
      address: "Bandra West, Mumbai",
      category: "photographers",
      city: "mumbai",
      featured: true,
      rating: 4.9,
      startingPrice: 75000,
      experience: 10,
      teamSize: 12,
      eventsCompleted: 380,
      coverImage:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Essential Memories",
        description: "Perfect for intimate weddings and pre-wedding shoots",
        price: 75000,
        features: [
          "1 lead photographer",
          "Pre-wedding shoot (3 hours)",
          "Wedding day coverage (8 hours)",
          "200+ edited digital photos",
          "Online gallery with downloads",
        ],
        popular: false,
      },
      {
        name: "Premium Story",
        description: "Complete wedding coverage across all events",
        price: 150000,
        features: [
          "2 photographers + 1 assistant",
          "Pre-wedding shoot (full day)",
          "All events: mehendi, sangeet, wedding, reception",
          "500+ edited digital photos",
          "Cinematic photo slideshow",
          "Premium coffee-table album (40 pages)",
          "Online gallery with unlimited downloads",
        ],
        popular: true,
      },
      {
        name: "Luxury Chronicle",
        description: "The ultimate photography experience for destination weddings",
        price: 300000,
        features: [
          "3 photographers + drone operator",
          "Pre-wedding shoot at exotic location",
          "Unlimited event coverage (all days)",
          "1000+ edited digital photos",
          "2 luxury leather-bound albums",
          "Same-day edited highlights",
          "Drone aerial photography",
          "Dedicated online gallery forever",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Pre-Wedding Shoot", price: 35000, unit: "per_event" },
      { name: "Wedding Day Photography", price: 50000, unit: "per_day" },
      { name: "Drone Photography Add-on", price: 25000, unit: "per_event" },
      { name: "Photo Album (40 pages)", price: 15000, unit: "per_event" },
      { name: "Engagement Photography", price: 25000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Photos that made us cry happy tears",
        comment:
          "Arjun and his team captured our wedding so beautifully. Every candid shot tells a story. The pre-wedding shoot in Lonavala was absolutely stunning. Worth every rupee!",
        eventDate: "2024-10-05",
      },
      {
        customerIdx: 2,
        rating: 5,
        title: "Best investment we made for our wedding",
        comment:
          "Candid Clicks truly lives up to their name. They captured moments we didn't even know happened — my dad's tears, my best friend's dance, the stolen glances. The album quality is exceptional.",
        eventDate: "2024-11-22",
      },
      {
        customerIdx: 3,
        rating: 5,
        title: "Incredible eye for detail",
        comment:
          "The team is incredibly professional and creative. They made us feel comfortable in front of the camera from day one. The edited photos look like they belong in a magazine.",
        eventDate: "2025-01-18",
      },
      {
        customerIdx: 4,
        rating: 4,
        title: "Great photos, slightly delayed delivery",
        comment:
          "The quality of photography is outstanding — truly top-notch candid work. The album took about 6 weeks to deliver which was slightly longer than promised, but the final product was worth the wait.",
        eventDate: "2025-02-28",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
        caption: "Candid bridal portrait",
      },
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        caption: "Couple portrait at sunset",
      },
      {
        url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop",
        caption: "Wedding ceremony moments",
      },
      {
        url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&h=600&fit=crop",
        caption: "Pre-wedding shoot at heritage location",
      },
      {
        url: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
        caption: "Bridal details — jewellery & mehendi",
      },
      {
        url: "https://images.unsplash.com/photo-1585933646595-a28d21143bbb?w=800&h=600&fit=crop",
        caption: "Reception dance floor action",
      },
    ],
  },

  // ── 3. Spice Route Caterers — Caterers, Jaipur ──
  {
    user: { name: "Suresh Rathore", email: "suresh@spiceroute.in" },
    vendor: {
      businessName: "Spice Route Caterers",
      slug: "spice-route-caterers",
      description:
        "Jaipur's premier wedding caterer offering authentic Rajasthani cuisine alongside multi-cuisine menus. From traditional dal-baati-churma to live pasta counters, we create culinary experiences that your guests will remember long after the celebrations end.",
      phone: "+91 94140 67890",
      email: "orders@spiceroute.in",
      address: "C-Scheme, Jaipur",
      category: "caterers",
      city: "jaipur",
      featured: true,
      rating: 4.7,
      startingPrice: 800,
      experience: 12,
      teamSize: 45,
      eventsCompleted: 400,
      coverImage:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Classic Feast",
        description: "Traditional vegetarian spread for up to 300 guests",
        price: 800,
        features: [
          "Welcome drinks & chaat counter",
          "2 soups + 4 starters",
          "Main course: 6 dishes + breads + rice",
          "Dal-baati-churma live counter",
          "2 desserts + paan counter",
          "Uniformed serving staff",
        ],
        popular: false,
      },
      {
        name: "Royal Rajasthani",
        description: "Elaborate multi-cuisine menu with live counters",
        price: 1500,
        features: [
          "Welcome drinks + mocktail bar",
          "6 starters (veg & non-veg options)",
          "Live chaat, pasta & dosa counters",
          "Main course: 10 dishes + breads + biryani",
          "Authentic Rajasthani thali option",
          "4 desserts + ice cream counter",
          "Decorative food display setup",
          "Dedicated service captain",
        ],
        popular: true,
      },
      {
        name: "Emperor's Banquet",
        description: "The ultimate luxury dining experience",
        price: 2500,
        features: [
          "Premium welcome drinks + cocktail bar",
          "10 starters with sushi counter",
          "7 live counters including tandoor & wok",
          "Main course: 15 dishes + 3 breads + biryani",
          "Rajasthani, Mughlai & Continental cuisines",
          "6 desserts + chocolate fountain",
          "Themed food stall décor",
          "Butler service at VIP tables",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Vegetarian Menu", price: 800, unit: "per_plate" },
      { name: "Non-Vegetarian Menu", price: 1200, unit: "per_plate" },
      { name: "Live Counter Setup", price: 15000, unit: "per_event" },
      { name: "Cocktail Bar Service", price: 25000, unit: "per_event" },
      { name: "Sweet Counter (Mithai)", price: 500, unit: "per_plate" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "Food was the highlight of our wedding!",
        comment:
          "The dal-baati-churma counter was a massive hit. Every guest complimented the food — from starters to desserts. Suresh bhai personally supervised and made sure everything was perfect.",
        eventDate: "2024-10-28",
      },
      {
        customerIdx: 2,
        rating: 4,
        title: "Delicious food, great presentation",
        comment:
          "The Royal Rajasthani package was excellent. The live counters were a great touch and the presentation was beautiful. Only minor feedback — the dessert section could have been slightly larger for our guest count.",
        eventDate: "2024-12-05",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Exceeded all expectations",
        comment:
          "We chose the Emperor's Banquet for our reception and it was absolutely spectacular. The chocolate fountain, sushi counter and butler service made our guests feel like royalty. Best caterer in Jaipur!",
        eventDate: "2025-01-25",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop",
        caption: "Grand buffet setup",
      },
      {
        url: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&h=600&fit=crop",
        caption: "Live chaat counter at a wedding",
      },
      {
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
        caption: "Beautifully plated starters",
      },
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        caption: "Dessert display with mithai",
      },
    ],
  },

  // ── 4. Blooming Affairs — Decorators, Udaipur ──
  {
    user: { name: "Kavita Soni", email: "kavita@bloomingaffairs.in" },
    vendor: {
      businessName: "Blooming Affairs",
      slug: "blooming-affairs",
      description:
        "Udaipur's most sought-after wedding décor studio, transforming palaces and lakeside venues into ethereal dreamscapes. We specialize in luxury floral installations, pastel themes and grand mandap designs that blend Rajputana heritage with modern elegance.",
      phone: "+91 94610 11223",
      email: "design@bloomingaffairs.in",
      website: "https://bloomingaffairs.in",
      address: "Lake Palace Road, Udaipur",
      category: "decorators",
      city: "udaipur",
      featured: true,
      rating: 4.9,
      startingPrice: 100000,
      experience: 8,
      teamSize: 25,
      eventsCompleted: 200,
      coverImage:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Elegant Bloom",
        description: "Beautiful décor for intimate celebrations",
        price: 100000,
        features: [
          "Stage & mandap decoration",
          "Entrance gate floral arch",
          "Table centerpieces (up to 20 tables)",
          "Fairy light canopy",
          "Fresh flower arrangements",
        ],
        popular: false,
      },
      {
        name: "Regal Garden",
        description: "Full venue transformation with premium florals",
        price: 350000,
        features: [
          "Complete venue décor concept & design",
          "Grand mandap with imported flowers",
          "Photo booth setup",
          "Ceiling draping & fairy lights",
          "Aisle decoration with candles & petals",
          "Seating area lounge setup",
          "Welcome signage & monograms",
        ],
        popular: true,
      },
      {
        name: "Palace Dream",
        description: "Ultra-luxury décor for the most opulent celebrations",
        price: 800000,
        features: [
          "Bespoke theme design & mood boards",
          "Imported flowers from Thailand & Netherlands",
          "Grand chandelier installations",
          "Multiple venue zone designs",
          "LED wall & projection mapping",
          "Custom furniture & prop fabrication",
          "Mehendi & sangeet décor included",
          "On-site décor team for 3 days",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Mandap Decoration", price: 50000, unit: "per_event" },
      { name: "Stage Decoration", price: 40000, unit: "per_event" },
      { name: "Entrance Décor", price: 25000, unit: "per_event" },
      { name: "Floral Arrangements", price: 30000, unit: "per_event" },
      { name: "Photo Booth Setup", price: 20000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Our wedding looked like a fairytale!",
        comment:
          "Kavita and her team created pure magic at our Udaipur palace wedding. The mandap was covered in the most gorgeous white and blush roses. Every corner was Instagram-worthy. The attention to detail was incredible.",
        eventDate: "2024-11-02",
      },
      {
        customerIdx: 3,
        rating: 5,
        title: "Beyond our wildest dreams",
        comment:
          "We wanted a modern-meets-traditional vibe and Blooming Affairs nailed it. The chandelier installation over the reception area was jaw-dropping. Our guests thought they were at a movie set!",
        eventDate: "2025-01-12",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Worth every penny",
        comment:
          "The Palace Dream package transformed our entire venue across 3 days. From the pastel mehendi setup to the dramatic sangeet stage, everything was cohesive and stunning. Kavita is a true artist.",
        eventDate: "2025-02-20",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        caption: "Mandap decorated with fresh roses",
      },
      {
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
        caption: "Lakeside ceremony setup in Udaipur",
      },
      {
        url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&h=600&fit=crop",
        caption: "Fairy light ceiling installation",
      },
      {
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
        caption: "Grand entrance with floral arches",
      },
      {
        url: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=600&fit=crop",
        caption: "Stage décor with pastel draping",
      },
    ],
  },

  // ── 5. Glow & Grace Makeover — Makeup Artists, Bangalore ──
  {
    user: { name: "Deepika Rao", email: "deepika@glowandgrace.in" },
    vendor: {
      businessName: "Glow & Grace Makeover",
      slug: "glow-and-grace-makeover",
      description:
        "Celebrity bridal makeup artist Deepika Rao brings international techniques with an Indian sensibility. From soft dewy looks to dramatic smokey eyes, we create brides who radiate confidence and beauty on their special day.",
      phone: "+91 99020 33445",
      email: "bookings@glowandgrace.in",
      website: "https://glowandgrace.in",
      address: "Indiranagar, Bangalore",
      category: "makeup-artists",
      city: "bangalore",
      featured: true,
      rating: 4.8,
      startingPrice: 25000,
      experience: 9,
      teamSize: 8,
      eventsCompleted: 500,
      coverImage:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Classic Bridal",
        description: "Elegant bridal makeup for your wedding day",
        price: 25000,
        features: [
          "Bridal makeup (HD finish)",
          "Hairstyling with accessories",
          "Pre-bridal skin consultation",
          "Touch-up kit for the day",
          "Draping assistance",
        ],
        popular: false,
      },
      {
        name: "Complete Bridal",
        description: "Full bridal package covering all wedding events",
        price: 75000,
        features: [
          "Engagement / reception look",
          "Mehendi / sangeet look",
          "Wedding day bridal makeup (airbrush)",
          "Hairstyling for all events",
          "Pre-bridal facial & cleanup",
          "False lashes & accessories",
          "1 family member makeup included",
        ],
        popular: true,
      },
      {
        name: "Celebrity Luxe",
        description: "The red-carpet bridal experience",
        price: 150000,
        features: [
          "All events makeup & hair (up to 5 looks)",
          "Pre-bridal skincare regime (1 month)",
          "International airbrush makeup",
          "Premium lashes & hair extensions",
          "5 family members makeup included",
          "Personal makeup assistant on wedding day",
          "Destination wedding travel included",
          "Complimentary bridal robe & kit",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Bridal Makeup", price: 25000, unit: "per_event" },
      { name: "Party Makeup", price: 8000, unit: "per_event" },
      { name: "Engagement Look", price: 15000, unit: "per_event" },
      { name: "Family Makeup (per person)", price: 5000, unit: "per_person" },
      { name: "Pre-Bridal Facial Package", price: 12000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "I felt like a queen!",
        comment:
          "Deepika understood exactly what I wanted — a dewy, natural yet glamorous look. My makeup lasted 14 hours without any touchup! She's an absolute magician with brushes. Every bride should book her.",
        eventDate: "2024-09-15",
      },
      {
        customerIdx: 2,
        rating: 5,
        title: "Makeup that survived tears of joy",
        comment:
          "I cried so much during my vidaai and my makeup didn't budge! Deepika used amazing quality products and the airbrush finish was flawless. She also did my mom and sister's makeup beautifully.",
        eventDate: "2024-11-30",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Three stunning looks across two days",
        comment:
          "Booked the Complete Bridal package and every look was different and gorgeous. The sangeet look was fun and glam, while the wedding look was elegant and traditional. Deepika is the best in Bangalore!",
        eventDate: "2025-01-05",
      },
      {
        customerIdx: 1,
        rating: 4,
        title: "Beautiful work with minor scheduling delay",
        comment:
          "The makeup quality was excellent and my wife looked absolutely stunning. Deepika arrived about 30 minutes late due to traffic which caused some anxiety, but once she started, the result was perfect.",
        eventDate: "2025-03-08",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
        caption: "Bridal portrait — dewy glam look",
      },
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
        caption: "South Indian bridal look",
      },
      {
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
        caption: "Reception makeup — smokey eyes",
      },
      {
        url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=600&fit=crop",
        caption: "Bridal hair styling with jasmine",
      },
    ],
  },

  // ── 6. Rhythm & Beats Entertainment — DJs & Music, Goa ──
  {
    user: { name: "Karan Arora", email: "karan@rhythmbeats.in" },
    vendor: {
      businessName: "Rhythm & Beats Entertainment",
      slug: "rhythm-and-beats-entertainment",
      description:
        "Goa's top-rated wedding DJ and live music provider. From Punjabi bhangra beats to Bollywood chartbusters, we keep the dance floor packed. Our state-of-the-art sound and LED lighting systems create an electrifying party atmosphere.",
      phone: "+91 98110 55667",
      email: "bookings@rhythmbeats.in",
      address: "Calangute, Goa",
      category: "djs-music",
      city: "goa",
      featured: true,
      rating: 4.6,
      startingPrice: 35000,
      experience: 7,
      teamSize: 15,
      eventsCompleted: 280,
      coverImage:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Party Starter",
        description: "DJ setup for a single event",
        price: 35000,
        features: [
          "Professional DJ for 4 hours",
          "Basic sound system (up to 300 guests)",
          "LED dance floor lights",
          "Wireless microphone",
          "Custom playlist curation",
        ],
        popular: false,
      },
      {
        name: "Bollywood Nights",
        description: "Complete DJ & sound package for sangeet + reception",
        price: 85000,
        features: [
          "DJ for 2 events (sangeet + reception)",
          "Premium sound system (up to 800 guests)",
          "LED wall + moving head lights",
          "Fog machine & CO2 jets",
          "2 wireless mics",
          "Emcee / anchor services",
          "Custom mashups & Bollywood medleys",
        ],
        popular: true,
      },
      {
        name: "Grand Celebration",
        description: "Multi-day entertainment with live band option",
        price: 200000,
        features: [
          "DJ for all events (3 days)",
          "Concert-grade sound system",
          "Intelligent lighting rig with truss",
          "Live dhol players (2)",
          "Saxophone / vocalist add-on",
          "LED screens & projection",
          "Dedicated sound engineer",
          "Fireworks sync option",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "DJ Setup (4 hours)", price: 35000, unit: "per_event" },
      { name: "Dhol Players (2)", price: 15000, unit: "per_event" },
      { name: "Live Band (5 piece)", price: 75000, unit: "per_event" },
      { name: "Emcee / Anchor", price: 20000, unit: "per_event" },
      { name: "LED Screen Rental", price: 25000, unit: "per_day" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "Best sangeet night ever!",
        comment:
          "Karan kept the energy going non-stop! The Bollywood medleys were amazing and the dhol players during the baraat were fantastic. Our guests danced till 2 AM. Absolutely worth it!",
        eventDate: "2024-11-10",
      },
      {
        customerIdx: 3,
        rating: 4,
        title: "Great music, amazing lighting",
        comment:
          "The LED wall and fog machines transformed our reception into a club-like atmosphere. The music selection was perfect — a great mix of old and new Bollywood. Would have loved slightly more Punjabi tracks.",
        eventDate: "2025-01-20",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Party of the year!",
        comment:
          "Everyone said our wedding had the best music they'd ever experienced. The live saxophone during cocktails was a classy touch. Karan is super professional and reads the crowd perfectly.",
        eventDate: "2025-02-15",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop",
        caption: "DJ console with LED lighting",
      },
      {
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
        caption: "Dance floor in action",
      },
      {
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        caption: "Live performance setup",
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
        caption: "LED light show at reception",
      },
    ],
  },

  // ── 7. DreamWeave Films — Videographers, Mumbai ──
  {
    user: { name: "Sahil Patel", email: "sahil@dreamweavefilms.in" },
    vendor: {
      businessName: "DreamWeave Films",
      slug: "dreamweave-films",
      description:
        "Cinematic wedding filmmakers who craft your love story into a movie. From teaser trailers to full-length wedding films, our team uses RED cameras and aerial cinematography to deliver Hollywood-quality wedding content.",
      phone: "+91 98200 77889",
      email: "info@dreamweavefilms.in",
      website: "https://dreamweavefilms.in",
      address: "Andheri West, Mumbai",
      category: "videographers",
      city: "mumbai",
      featured: false,
      rating: 4.7,
      startingPrice: 100000,
      experience: 6,
      teamSize: 10,
      eventsCompleted: 200,
      coverImage:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Highlights Reel",
        description: "Perfect teaser film for social media",
        price: 100000,
        features: [
          "1 cinematographer + 1 assistant",
          "Wedding day coverage",
          "3-5 minute highlights film",
          "Background music licensed",
          "Color graded & sound designed",
        ],
        popular: false,
      },
      {
        name: "The Love Story",
        description: "Complete cinematic coverage across events",
        price: 200000,
        features: [
          "2 cinematographers + drone operator",
          "All events covered (2-3 days)",
          "5-7 minute cinematic trailer",
          "Full ceremony film (60-90 min)",
          "Same-day edit teaser",
          "4K delivery",
          "Licensed music + voiceover option",
        ],
        popular: true,
      },
      {
        name: "Epic Wedding Film",
        description: "Documentary-style wedding movie",
        price: 400000,
        features: [
          "3 cinematographers + drone + gimbal",
          "Unlimited event coverage",
          "10-minute cinematic film",
          "Full-length wedding movie",
          "Same-day edit for reception screening",
          "6K RED camera footage",
          "Interviews with family & friends",
          "International delivery & streaming",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Wedding Day Videography", price: 60000, unit: "per_day" },
      { name: "Pre-Wedding Video", price: 50000, unit: "per_event" },
      { name: "Drone Cinematography", price: 30000, unit: "per_event" },
      { name: "Same-Day Edit", price: 40000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Our wedding film made everyone cry!",
        comment:
          "Sahil's team created a 7-minute cinematic film that was pure emotion. The way they captured the varmala, the pheras and the vidaai — we watch it every anniversary. Masterful storytelling.",
        eventDate: "2024-10-12",
      },
      {
        customerIdx: 2,
        rating: 4,
        title: "Great cinematic quality",
        comment:
          "The video quality is outstanding — truly cinematic. The drone shots of our beach wedding in Alibaug were breathtaking. I wish the final delivery had been a bit faster, but the output was worth it.",
        eventDate: "2025-01-08",
      },
      {
        customerIdx: 3,
        rating: 5,
        title: "Better than a Bollywood movie!",
        comment:
          "The same-day edit they played at our reception had the entire hall in tears. Sahil and team are incredibly talented and professional. They captured moments we didn't even know happened.",
        eventDate: "2025-03-01",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
        caption: "Behind the scenes — cinema camera setup",
      },
      {
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
        caption: "Drone aerial wedding coverage",
      },
      {
        url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
        caption: "Couple cinematic portrait",
      },
    ],
  },

  // ── 8. Eternal Henna — Mehendi Artists, Jaipur ──
  {
    user: { name: "Rekha Kumari", email: "rekha@eternalhenna.in" },
    vendor: {
      businessName: "Eternal Henna",
      slug: "eternal-henna",
      description:
        "Third-generation mehendi artist Rekha brings Jaipur's legendary henna traditions to your wedding. Specializing in intricate bridal patterns, portrait mehendi, and fusion Arabic-Indian designs that photograph beautifully and stain deeply.",
      phone: "+91 94140 22334",
      email: "bookings@eternalhenna.in",
      address: "Johari Bazaar, Jaipur",
      category: "mehendi-artists",
      city: "jaipur",
      featured: false,
      rating: 4.9,
      startingPrice: 15000,
      experience: 14,
      teamSize: 8,
      eventsCompleted: 450,
      coverImage:
        "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Bridal Henna",
        description: "Detailed bridal mehendi for the bride",
        price: 15000,
        features: [
          "Full bridal hands & feet mehendi",
          "Intricate Rajasthani patterns",
          "Premium organic henna paste",
          "3-4 hour session",
          "Dark stain guaranteed",
        ],
        popular: false,
      },
      {
        name: "Bridal + Family",
        description: "Mehendi for the bride and her closest family",
        price: 35000,
        features: [
          "Full bridal mehendi (hands & feet)",
          "Mehendi for 10 family members",
          "Mix of traditional & Arabic designs",
          "Premium organic henna",
          "Groom's name hidden in design",
          "Travel within Jaipur included",
        ],
        popular: true,
      },
      {
        name: "Grand Mehendi Party",
        description: "Complete mehendi ceremony coverage for all guests",
        price: 75000,
        features: [
          "Bridal portrait mehendi (hands & feet)",
          "Team of 5 artists for guests",
          "Unlimited guest mehendi (4-5 hours)",
          "Customized designs catalogue",
          "Premium organic paste",
          "Live mehendi demonstration",
          "Décor consultation for mehendi setup",
          "Travel anywhere in Rajasthan",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Bridal Mehendi", price: 15000, unit: "per_event" },
      { name: "Guest Mehendi (per person)", price: 500, unit: "per_person" },
      { name: "Portrait Mehendi (bride)", price: 5000, unit: "per_event" },
      { name: "Groom Mehendi", price: 3000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "The most beautiful mehendi I've ever seen",
        comment:
          "Rekha ji's work is legendary for a reason. My bridal mehendi had the most intricate Rajasthani patterns with my husband's face hidden in the design! The colour was deep maroon and lasted 3 weeks.",
        eventDate: "2024-09-20",
      },
      {
        customerIdx: 2,
        rating: 5,
        title: "Artists were amazing with all guests",
        comment:
          "We booked the Grand Mehendi Party package and Rekha ji's team of 5 handled over 80 guests beautifully. Every design was unique and gorgeous. The organic henna gave such a rich, dark stain.",
        eventDate: "2024-12-10",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Worth travelling to Jaipur for!",
        comment:
          "We flew Rekha ji to our Delhi wedding and it was the best decision. Her fusion Arabic-Rajasthani designs are unique and absolutely stunning. My mehendi was the talk of all the functions!",
        eventDate: "2025-02-05",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=600&fit=crop",
        caption: "Intricate bridal hand mehendi",
      },
      {
        url: "https://images.unsplash.com/photo-1595263874954-54c44e3c488b?w=800&h=600&fit=crop",
        caption: "Detailed feet mehendi design",
      },
      {
        url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop",
        caption: "Arabic fusion design close-up",
      },
    ],
  },

  // ── 9. Vivah Planners — Wedding Planners, Hyderabad ──
  {
    user: { name: "Neha Gupta", email: "neha@vivahplanners.in" },
    vendor: {
      businessName: "Vivah Planners",
      slug: "vivah-planners",
      description:
        "Hyderabad's premier full-service wedding planning firm. From intimate nikaahs to grand Telugu weddings, we orchestrate every detail so you can enjoy a stress-free, magical celebration. Fluent in multi-cultural and interfaith wedding traditions.",
      phone: "+91 90100 22334",
      email: "plan@vivahplanners.in",
      website: "https://vivahplanners.in",
      address: "Jubilee Hills, Hyderabad",
      category: "wedding-planners",
      city: "hyderabad",
      featured: false,
      rating: 4.7,
      startingPrice: 200000,
      experience: 11,
      teamSize: 18,
      eventsCompleted: 220,
      coverImage:
        "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Day-of Coordination",
        description: "Expert coordination on your wedding day",
        price: 200000,
        features: [
          "Timeline & logistics management",
          "Vendor coordination on the day",
          "2 coordinators on-site",
          "Emergency kit & backup plans",
          "Guest management assistance",
        ],
        popular: false,
      },
      {
        name: "Partial Planning",
        description: "Planning support with vendor management",
        price: 500000,
        features: [
          "Venue shortlisting & booking",
          "Vendor recommendations & negotiations",
          "Budget tracking & management",
          "Event timeline creation",
          "3 coordinators for all events",
          "Décor concept & design input",
          "Guest RSVP management",
        ],
        popular: true,
      },
      {
        name: "Full Wedding Management",
        description: "End-to-end wedding planning from start to finish",
        price: 1500000,
        features: [
          "Complete wedding planning (6+ months)",
          "Venue sourcing & site visits",
          "All vendor booking & management",
          "Budget creation & tracking",
          "Design theme & mood boards",
          "Multi-event management (3-4 days)",
          "Dedicated team of 8 on-site",
          "Post-wedding brunch coordination",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Full Wedding Planning", price: 500000, unit: "per_event" },
      { name: "Day-of Coordination", price: 200000, unit: "per_event" },
      { name: "Vendor Management", price: 100000, unit: "per_event" },
      { name: "Design Consultation", price: 25000, unit: "per_hour" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "Stress-free wedding experience!",
        comment:
          "Neha and team planned our entire 3-day Telugu wedding and it was flawless. They managed 20+ vendors seamlessly, handled last-minute changes with grace, and made sure we enjoyed every moment.",
        eventDate: "2024-12-01",
      },
      {
        customerIdx: 3,
        rating: 4,
        title: "Professional and creative team",
        comment:
          "Vivah Planners managed our multi-cultural wedding (Hindu-Muslim) beautifully. They understood both traditions and coordinated seamlessly. The only minor issue was some vendor delays beyond their control.",
        eventDate: "2025-01-15",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Best decision we made!",
        comment:
          "Hiring Vivah Planners was the best decision of our wedding journey. Neha's attention to detail is unmatched — from the welcome bags to the farewell brunch. She even surprised us with a fireworks display!",
        eventDate: "2025-03-10",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",
        caption: "Managed wedding event coordination",
      },
      {
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
        caption: "Grand wedding setup managed by our team",
      },
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        caption: "Sunset ceremony coordination",
      },
    ],
  },

  // ── 10. Pushp Vatika Florists — Florists, Udaipur ──
  {
    user: { name: "Ganesh Kumawat", email: "ganesh@pushpvatika.in" },
    vendor: {
      businessName: "Pushp Vatika Florists",
      slug: "pushp-vatika-florists",
      description:
        "Udaipur's finest floral design studio specializing in grand wedding installations, bridal garlands, and venue floristry. We source the freshest marigolds, roses, orchids and exotic blooms to create breathtaking arrangements for your celebration.",
      phone: "+91 94140 99001",
      email: "orders@pushpvatika.in",
      address: "Hiran Magri, Udaipur",
      category: "florists",
      city: "udaipur",
      featured: false,
      rating: 4.6,
      startingPrice: 30000,
      experience: 10,
      teamSize: 12,
      eventsCompleted: 300,
      coverImage:
        "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Floral Essentials",
        description: "Key floral elements for your wedding",
        price: 30000,
        features: [
          "Jaimala (bridal garlands)",
          "Mandap floral decoration",
          "Bouquet for the bride",
          "Car decoration",
          "Fresh seasonal flowers",
        ],
        popular: false,
      },
      {
        name: "Garden Romance",
        description: "Comprehensive floral design for all wedding events",
        price: 80000,
        features: [
          "Jaimala with premium roses & orchids",
          "Full mandap floral design",
          "Aisle flower arrangements",
          "Table centerpieces (30 tables)",
          "Entrance floral arch",
          "Mehendi floral jewellery set",
          "Bridal room flower decoration",
        ],
        popular: true,
      },
      {
        name: "Royal Bloom",
        description: "Luxurious floral experience with imported flowers",
        price: 200000,
        features: [
          "Imported orchids, hydrangeas & peonies",
          "Grand mandap installation",
          "Ceiling suspended floral chandeliers",
          "Complete venue floristry (3 events)",
          "Floral photo wall / backdrop",
          "Bridal floral jewellery (full set)",
          "Guest welcome garlands (100+)",
          "Fresh flower maintenance team on-site",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Bridal Garlands (Jaimala)", price: 5000, unit: "per_event" },
      { name: "Mandap Flowers", price: 25000, unit: "per_event" },
      { name: "Table Centerpieces (each)", price: 1500, unit: "per_event" },
      { name: "Floral Jewellery Set", price: 8000, unit: "per_event" },
      { name: "Car Decoration", price: 8000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Most stunning flowers at our wedding",
        comment:
          "Ganesh ji and his team created the most magnificent floral mandap I've ever seen. The roses were fresh, the orchids were gorgeous, and the jaimala was a work of art. Pushp Vatika is Udaipur's best!",
        eventDate: "2024-11-05",
      },
      {
        customerIdx: 2,
        rating: 4,
        title: "Beautiful floral arrangements",
        comment:
          "The Garden Romance package covered all our floral needs beautifully. The table centerpieces were elegant and the floral jewellery for our mehendi was lovely. Great value for money.",
        eventDate: "2025-02-12",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=600&fit=crop",
        caption: "Floral mandap installation",
      },
      {
        url: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=600&fit=crop",
        caption: "Bridal garland crafting",
      },
      {
        url: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=600&fit=crop",
        caption: "Floral entrance archway",
      },
      {
        url: "https://images.unsplash.com/photo-1561128290-005859246e58?w=800&h=600&fit=crop",
        caption: "Table centerpiece arrangements",
      },
    ],
  },

  // ── 11. Naach Gaana Choreography — Choreographers, Mumbai ──
  {
    user: { name: "Riya Fernandez", email: "riya@naachgaana.in" },
    vendor: {
      businessName: "Naach Gaana Choreography",
      slug: "naach-gaana-choreography",
      description:
        "Bollywood-style sangeet choreography that turns every family member into a star. From viral couple dances to hilarious group performances, we make your sangeet the most memorable night of the celebrations.",
      phone: "+91 98200 11234",
      email: "riya@naachgaana.in",
      address: "Versova, Mumbai",
      category: "choreographers",
      city: "mumbai",
      featured: false,
      rating: 4.8,
      startingPrice: 20000,
      experience: 5,
      teamSize: 6,
      eventsCompleted: 150,
      coverImage:
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Couple Dance",
        description: "A showstopping first dance for the couple",
        price: 20000,
        features: [
          "Song selection assistance",
          "Custom choreography",
          "4 practice sessions",
          "Video tutorial for home practice",
          "Day-of rehearsal",
        ],
        popular: false,
      },
      {
        name: "Full Sangeet",
        description: "Choreography for the entire sangeet lineup",
        price: 60000,
        features: [
          "Choreography for up to 6 performances",
          "Couple dance + family performances",
          "8 practice sessions",
          "Video tutorials for all dances",
          "Props & costume suggestions",
          "Day-of coordination & rehearsal",
          "Music editing & mashups",
        ],
        popular: true,
      },
      {
        name: "Star Sangeet",
        description: "Premium choreography with professional backup dancers",
        price: 150000,
        features: [
          "Unlimited performances choreography",
          "12+ practice sessions",
          "4 professional backup dancers",
          "Custom music production & mashups",
          "Props & costume design",
          "Flash mob surprise element",
          "2 rehearsal sessions at venue",
          "Full day-of dance management",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Couple Dance Choreography", price: 20000, unit: "per_event" },
      { name: "Group Performance (per group)", price: 10000, unit: "per_event" },
      { name: "Backup Dancers (per dancer)", price: 15000, unit: "per_event" },
      { name: "Music Editing & Mashup", price: 5000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "Our sangeet was a Bollywood movie!",
        comment:
          "Riya choreographed 8 performances for our sangeet and every single one was amazing. She made my 60-year-old dad look like a pro dancer! The couple dance she created for us was the highlight of the night.",
        eventDate: "2024-10-18",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Made non-dancers look amazing",
        comment:
          "I have two left feet but Riya was so patient and fun during practice. She creates choreography that looks impressive but is actually doable for normal people. Our flash mob surprise was a huge hit!",
        eventDate: "2025-01-30",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop",
        caption: "Sangeet performance rehearsal",
      },
      {
        url: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop",
        caption: "Couple first dance",
      },
      {
        url: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&h=600&fit=crop",
        caption: "Group performance on stage",
      },
    ],
  },

  // ── 12. Pandit Shastri Ji — Pandits & Priests, Lucknow ──
  {
    user: { name: "Pt. Ramesh Shastri", email: "shastri@shagun.in" },
    vendor: {
      businessName: "Pandit Shastri Ji & Associates",
      slug: "pandit-shastri-ji",
      description:
        "Renowned Vedic pandit with over 15 years of experience performing Hindu wedding ceremonies across North India. Pandit Shastri Ji conducts all rituals with proper Vedic mantras while explaining their significance in Hindi and English to the couple and guests.",
      phone: "+91 94150 55667",
      email: "panditshastri@gmail.com",
      address: "Aminabad, Lucknow",
      category: "pandits-priests",
      city: "lucknow",
      featured: false,
      rating: 4.9,
      startingPrice: 21000,
      experience: 15,
      teamSize: 5,
      eventsCompleted: 480,
      coverImage:
        "https://images.unsplash.com/photo-1604076913837-52ab5f0b9a09?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Essential Ceremonies",
        description: "Core wedding rituals performed with Vedic traditions",
        price: 21000,
        features: [
          "Ganesh Puja",
          "Havan & pheras",
          "Kanyadaan ceremony",
          "All essential mantras with explanations",
          "Samagri (puja materials) included",
        ],
        popular: false,
      },
      {
        name: "Complete Wedding Rituals",
        description: "Full ceremonial coverage for 2-day wedding",
        price: 51000,
        features: [
          "Ganesh Puja & Haldi ceremony",
          "Complete wedding rituals (4-5 hours)",
          "Saptapadi with Vedic mantras",
          "All rituals explained in Hindi & English",
          "Premium samagri & sacred items",
          "Assistant pandit for smooth flow",
          "Post-wedding Grihapravesh puja",
        ],
        popular: true,
      },
      {
        name: "Grand Vedic Wedding",
        description: "Elaborate multi-day ceremonies with full team",
        price: 101000,
        features: [
          "Pre-wedding pujas (Ganesh, haldi, mehendi)",
          "Complete wedding ceremony (traditional)",
          "Team of 3 pandits",
          "Sanskrit mantras with Hindi & English translation",
          "Premium samagri & decorative havan kund",
          "Coordination with all vendors for ceremony",
          "Post-wedding rituals & Grihapravesh",
          "Travel anywhere in India included",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Wedding Ceremony", price: 21000, unit: "per_event" },
      { name: "Haldi Ceremony", price: 5000, unit: "per_event" },
      { name: "Ganesh Puja", price: 5000, unit: "per_event" },
      { name: "Grihapravesh", price: 7000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 3,
        rating: 5,
        title: "Made our ceremony truly meaningful",
        comment:
          "Pandit Shastri Ji didn't just perform rituals — he explained every mantra beautifully. Our NRI relatives were so moved because they could finally understand the significance of each ceremony. An absolute gem.",
        eventDate: "2024-11-25",
      },
      {
        customerIdx: 0,
        rating: 5,
        title: "Perfect ceremonies, warm personality",
        comment:
          "We loved how Shastri Ji involved both families in the ceremonies. He kept it authentic yet engaging, finishing within the auspicious muhurat. He even cracked a few jokes that lightened the mood!",
        eventDate: "2025-02-08",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1604076913837-52ab5f0b9a09?w=800&h=600&fit=crop",
        caption: "Sacred havan ceremony",
      },
      {
        url: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800&h=600&fit=crop",
        caption: "Wedding mandap rituals",
      },
      {
        url: "https://images.unsplash.com/photo-1622653902360-1b96cfb5d285?w=800&h=600&fit=crop",
        caption: "Saptapadi around sacred fire",
      },
    ],
  },

  // ── 13. The Invitation Studio — Invitations & Cards, Kolkata ──
  {
    user: { name: "Farah Begum", email: "farah@invitationstudio.in" },
    vendor: {
      businessName: "The Invitation Studio",
      slug: "the-invitation-studio",
      description:
        "Luxury wedding invitation designers creating bespoke cards, scroll invitations and digital invites. From Mughal-inspired designs to minimalist modern aesthetics, we craft invitations that set the tone for your grand celebration.",
      phone: "+91 90100 44332",
      email: "hello@invitationstudio.in",
      website: "https://invitationstudio.in",
      address: "Park Street, Kolkata",
      category: "invitations-cards",
      city: "kolkata",
      featured: false,
      rating: 4.5,
      startingPrice: 5000,
      experience: 8,
      teamSize: 10,
      eventsCompleted: 250,
      coverImage:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Digital Elegance",
        description: "Beautiful digital invitations for the modern couple",
        price: 5000,
        features: [
          "Custom digital invitation design",
          "WhatsApp & email-ready formats",
          "RSVP tracking link",
          "Save-the-date card",
          "2 revision rounds",
        ],
        popular: false,
      },
      {
        name: "Classic Print",
        description: "Printed invitation cards with premium finishes",
        price: 15000,
        features: [
          "Custom card design (200 cards)",
          "Premium cardstock with foil stamping",
          "Matching envelope & liner",
          "Digital version included",
          "RSVP cards",
          "3 revision rounds",
          "Delivery within India",
        ],
        popular: true,
      },
      {
        name: "Royal Scroll",
        description: "Luxurious boxed scroll invitations",
        price: 75000,
        features: [
          "Handcrafted scroll invitations (100 sets)",
          "Silk-lined boxes with ribbon",
          "Gold/silver foil embossing",
          "Matching suite: RSVP, menu, program",
          "Digital invitation included",
          "Wax seal finishing",
          "White-glove delivery",
          "Unlimited revisions",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Digital Invitation Design", price: 5000, unit: "per_event" },
      { name: "Printed Cards (per 100)", price: 8000, unit: "per_event" },
      { name: "Scroll Invitations (per 50)", price: 35000, unit: "per_event" },
      { name: "Wedding Website Design", price: 10000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 2,
        rating: 5,
        title: "Invitations that wowed our guests!",
        comment:
          "Our scroll invitations were absolutely exquisite. The silk boxes with gold foil lettering were so premium that guests kept them as souvenirs. Farah's design sense is impeccable.",
        eventDate: "2024-10-15",
      },
      {
        customerIdx: 4,
        rating: 4,
        title: "Beautiful designs, good communication",
        comment:
          "We went with the Classic Print package and the cards turned out beautifully. The Mughal-inspired design was elegant. Delivery took slightly longer than expected but the quality made up for it.",
        eventDate: "2025-01-10",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=600&fit=crop",
        caption: "Luxury scroll invitation set",
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",
        caption: "Premium printed invitation cards",
      },
      {
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
        caption: "Invitation design samples",
      },
    ],
  },

  // ── 14. Maharani Couture — Bridal Wear, Delhi ──
  {
    user: { name: "Simran Bhatia", email: "simran@maharanicouture.in" },
    vendor: {
      businessName: "Maharani Couture",
      slug: "maharani-couture",
      description:
        "Bespoke bridal lehengas and sarees handcrafted in our Delhi atelier. Every piece features intricate zardozi, gota patti or sequin work done by master artisans. From classic red to contemporary pastels, we dress brides who want to make a statement.",
      phone: "+91 98100 66778",
      email: "studio@maharanicouture.in",
      website: "https://maharanicouture.in",
      address: "Shahpur Jat, New Delhi",
      category: "bridal-wear",
      city: "delhi-ncr",
      featured: false,
      rating: 4.7,
      startingPrice: 50000,
      experience: 12,
      teamSize: 20,
      eventsCompleted: 350,
      coverImage:
        "https://images.unsplash.com/photo-1610117238813-17401aed4145?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Elegant Bride",
        description: "Designer lehenga for the modern bride",
        price: 50000,
        features: [
          "Semi-stitched designer lehenga",
          "Machine embroidery with hand finishing",
          "Matching dupatta",
          "2 fitting sessions",
          "Alteration included",
        ],
        popular: false,
      },
      {
        name: "Royal Trousseau",
        description: "Complete bridal outfit with accessories",
        price: 150000,
        features: [
          "Fully customized bridal lehenga",
          "Hand embroidery (zardozi / gota)",
          "Designer blouse with customization",
          "2 matching dupattas",
          "Bridal clutch & jutti set",
          "4 fitting sessions",
          "Outfit for engagement / reception",
        ],
        popular: true,
      },
      {
        name: "Couture Collection",
        description: "Luxury bespoke bridal wardrobe",
        price: 500000,
        features: [
          "Bespoke bridal lehenga (3000+ hours handwork)",
          "Premium fabrics: raw silk, velvet, organza",
          "Real gold / silver zari thread work",
          "Complete trousseau: 3 outfits for all events",
          "Personal styling consultation",
          "Matching groom outfit option",
          "Heritage packaging in custom trunk",
          "Lifetime alteration support",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Custom Bridal Lehenga", price: 50000, unit: "per_event" },
      { name: "Reception Gown", price: 35000, unit: "per_event" },
      { name: "Sangeet Outfit", price: 25000, unit: "per_event" },
      { name: "Bridal Dupatta (custom)", price: 15000, unit: "per_event" },
      { name: "Styling Consultation", price: 5000, unit: "per_hour" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "My dream lehenga came to life!",
        comment:
          "Simran designed the most gorgeous maroon and gold lehenga for me. The zardozi work was so intricate and the fit was perfect. I received so many compliments — truly a dream outfit.",
        eventDate: "2024-10-25",
      },
      {
        customerIdx: 2,
        rating: 5,
        title: "Stunning trousseau, exceptional craftsmanship",
        comment:
          "I got the Royal Trousseau package — a red bridal lehenga and a pastel reception outfit. Both were stunning. The attention to detail in the hand embroidery is world-class. Highly recommend!",
        eventDate: "2024-12-15",
      },
      {
        customerIdx: 4,
        rating: 4,
        title: "Beautiful but plan ahead",
        comment:
          "The lehenga was absolutely gorgeous and exactly what I envisioned. My only advice: start the process 4-5 months early. The hand embroidery takes time and rushing it would compromise quality.",
        eventDate: "2025-02-01",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1610117238813-17401aed4145?w=800&h=600&fit=crop",
        caption: "Red bridal lehenga with zardozi",
      },
      {
        url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop",
        caption: "Pastel reception lehenga",
      },
      {
        url: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&h=600&fit=crop",
        caption: "Embroidery detail close-up",
      },
      {
        url: "https://images.unsplash.com/photo-1609757754093-a886e6b37953?w=800&h=600&fit=crop",
        caption: "Bridal styling session",
      },
    ],
  },

  // ── 15. Nawab Sherwanis — Groom Wear, Lucknow ──
  {
    user: { name: "Imran Siddiqui", email: "imran@nawabsherwanis.in" },
    vendor: {
      businessName: "Nawab Sherwanis",
      slug: "nawab-sherwanis",
      description:
        "Lucknow's finest chikankari sherwanis and Indo-western groom outfits. Our pieces blend Awadhi craftsmanship with contemporary cuts, featuring authentic Lucknowi chikan embroidery that takes weeks to hand-stitch.",
      phone: "+91 94150 77889",
      email: "orders@nawabsherwanis.in",
      address: "Hazratganj, Lucknow",
      category: "groom-wear",
      city: "lucknow",
      featured: false,
      rating: 4.6,
      startingPrice: 25000,
      experience: 10,
      teamSize: 15,
      eventsCompleted: 200,
      coverImage:
        "https://images.unsplash.com/photo-1593030103066-0093718e7d68?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Classic Groom",
        description: "Elegant sherwani for the wedding day",
        price: 25000,
        features: [
          "Ready-to-wear sherwani",
          "Churidar / pajama set",
          "Matching stole / dupatta",
          "Alteration included",
          "Garment bag packaging",
        ],
        popular: false,
      },
      {
        name: "Royal Groom",
        description: "Custom sherwani with Lucknowi embroidery",
        price: 65000,
        features: [
          "Custom-stitched sherwani",
          "Hand chikankari embroidery",
          "Silk churidar & stole",
          "Mojari / jutti pair",
          "Safa / pagdi (turban)",
          "3 fitting sessions",
          "Occasion: wedding + reception outfit",
        ],
        popular: true,
      },
      {
        name: "Nawab Collection",
        description: "Complete groom wardrobe for all wedding events",
        price: 150000,
        features: [
          "Bespoke sherwani with zardozi & chikan work",
          "Premium silk / velvet fabric",
          "Complete set: churidar, stole, mojari, safa",
          "Sangeet Indo-western outfit",
          "Reception bandhgala suit",
          "Matching accessories set",
          "Personal styling session",
          "Heritage trunk packaging",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Custom Sherwani", price: 25000, unit: "per_event" },
      { name: "Indo-Western Outfit", price: 20000, unit: "per_event" },
      { name: "Bandhgala Suit", price: 18000, unit: "per_event" },
      { name: "Turban / Safa Tying", price: 3000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "The most regal sherwani!",
        comment:
          "Imran bhai created a stunning ivory sherwani with gold chikankari work that perfectly matched my wife's lehenga. The craftsmanship is outstanding. I felt like a true Nawab on my wedding day!",
        eventDate: "2024-12-10",
      },
      {
        customerIdx: 3,
        rating: 4,
        title: "Great quality, authentic Lucknowi craft",
        comment:
          "The Royal Groom package was excellent value. The chikankari work is genuinely hand-done (you can see the fine threadwork). The fit was slightly tight initially but they altered it perfectly.",
        eventDate: "2025-02-18",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1593030103066-0093718e7d68?w=800&h=600&fit=crop",
        caption: "Ivory silk sherwani with chikankari",
      },
      {
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop",
        caption: "Groom styling with pagdi",
      },
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop",
        caption: "Chikankari embroidery detail",
      },
    ],
  },

  // ── 16. Kundan Palace — Jewellery, Jaipur ──
  {
    user: { name: "Manish Soni", email: "manish@kundanpalace.in" },
    vendor: {
      businessName: "Kundan Palace Jewellers",
      slug: "kundan-palace-jewellers",
      description:
        "Heritage jewellery house in Jaipur's famed Johari Bazaar, creating exquisite kundan, polki and jadau bridal jewellery. Four generations of master craftsmen bring you pieces that blend royal Rajasthani tradition with modern elegance.",
      phone: "+91 94140 33221",
      email: "info@kundanpalace.in",
      address: "Johari Bazaar, Jaipur",
      category: "jewellery",
      city: "jaipur",
      featured: false,
      rating: 4.7,
      startingPrice: 50000,
      experience: 15,
      teamSize: 12,
      eventsCompleted: 300,
      coverImage:
        "https://images.unsplash.com/photo-1515562141589-67f0d7088323?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Bridal Basics",
        description: "Essential bridal jewellery set",
        price: 50000,
        features: [
          "Kundan necklace set",
          "Matching maang tikka",
          "Earrings",
          "2 bangles / kangan set",
          "Certificate of authenticity",
        ],
        popular: false,
      },
      {
        name: "Rani Haar Collection",
        description: "Complete bridal jewellery set with premium pieces",
        price: 200000,
        features: [
          "Rani haar (long necklace)",
          "Choker necklace",
          "Maang tikka + matha patti",
          "Jhumka earrings",
          "Haath phool (hand jewellery)",
          "Bangles set (8 pieces)",
          "Nath (nose ring)",
        ],
        popular: true,
      },
      {
        name: "Royal Heritage",
        description: "Museum-worthy jadau bridal jewellery",
        price: 800000,
        features: [
          "Custom jadau bridal set (22K gold)",
          "Rani haar + choker",
          "Passa & maang tikka with uncut diamonds",
          "Polki jhumkas",
          "Full set: haath phool, bichhiya, payal",
          "Custom design consultation",
          "Jewellery box in velvet case",
          "Lifetime polishing & maintenance",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Kundan Set (Necklace + Earrings)", price: 50000, unit: "per_event" },
      { name: "Polki Bridal Set", price: 150000, unit: "per_event" },
      { name: "Jewellery on Rent (full set)", price: 25000, unit: "per_day" },
      { name: "Custom Design Consultation", price: 5000, unit: "per_hour" },
    ],
    reviews: [
      {
        customerIdx: 0,
        rating: 5,
        title: "Heirloom quality jewellery!",
        comment:
          "My kundan set from Kundan Palace is the most beautiful jewellery I own. The craftsmanship is museum-worthy. My mother-in-law was so impressed she ordered a set for herself! Worth every penny.",
        eventDate: "2024-11-08",
      },
      {
        customerIdx: 2,
        rating: 4,
        title: "Gorgeous pieces, slightly over budget",
        comment:
          "The Rani Haar Collection is absolutely stunning. The polki work is genuine and the gold quality is excellent. It ended up being slightly more expensive than initially quoted due to gold price fluctuations, but the quality justified it.",
        eventDate: "2025-01-22",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1515562141589-67f0d7088323?w=800&h=600&fit=crop",
        caption: "Kundan bridal necklace set",
      },
      {
        url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop",
        caption: "Polki choker with maang tikka",
      },
      {
        url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=600&fit=crop",
        caption: "Jhumka earrings close-up",
      },
    ],
  },

  // ── 17. Sweet Celebrations — Cakes & Desserts, Pune ──
  {
    user: { name: "Nidhi Agarwal", email: "nidhi@sweetcelebrations.in" },
    vendor: {
      businessName: "Sweet Celebrations Bakery",
      slug: "sweet-celebrations-bakery",
      description:
        "Award-winning wedding cake designers and dessert caterers in Pune. From towering 7-tier fondant cakes to elegant dessert tables featuring French patisserie and Indian mithai fusion, we make your celebrations deliciously unforgettable.",
      phone: "+91 99020 88990",
      email: "orders@sweetcelebrations.in",
      address: "Koregaon Park, Pune",
      category: "cakes-desserts",
      city: "pune",
      featured: false,
      rating: 4.8,
      startingPrice: 15000,
      experience: 7,
      teamSize: 10,
      eventsCompleted: 200,
      coverImage:
        "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Sweet Beginning",
        description: "Beautiful wedding cake for intimate celebrations",
        price: 15000,
        features: [
          "3-tier fondant wedding cake",
          "Custom flavour selection",
          "Fresh flower decoration",
          "Cake cutting stand & knife",
          "Delivery & setup",
        ],
        popular: false,
      },
      {
        name: "Dessert Paradise",
        description: "Wedding cake plus a curated dessert table",
        price: 50000,
        features: [
          "5-tier designer wedding cake",
          "Dessert table (serves 150)",
          "Cupcake tower (100 pieces)",
          "Macaron & truffle display",
          "Mithai fusion counter",
          "Custom cake topper",
          "Table décor & signage",
        ],
        popular: true,
      },
      {
        name: "Grand Patisserie",
        description: "Luxury dessert experience for large weddings",
        price: 150000,
        features: [
          "7-tier custom sculpted cake",
          "Full dessert room setup (serves 500)",
          "Live crepe & waffle station",
          "Chocolate fountain",
          "Ice cream bar (8 flavours)",
          "Mithai & ladoo display",
          "Edible wedding favours for guests",
          "Dedicated pastry chef on-site",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Custom Wedding Cake", price: 15000, unit: "per_event" },
      { name: "Dessert Table Setup", price: 25000, unit: "per_event" },
      { name: "Cupcake Tower (100 pcs)", price: 10000, unit: "per_event" },
      { name: "Chocolate Fountain Rental", price: 8000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 5,
        title: "Most beautiful (and delicious) cake!",
        comment:
          "Nidhi created a 5-tier white and gold cake that was a work of art. And it tasted even better than it looked! The chocolate truffle flavour was divine. The dessert table was also a huge hit.",
        eventDate: "2024-11-18",
      },
      {
        customerIdx: 4,
        rating: 5,
        title: "Great desserts, lovely presentation",
        comment:
          "The Dessert Paradise package was perfect for our 200-guest reception. The macarons and mithai fusion were creative touches that our guests absolutely loved. Will definitely order again for parties!",
        eventDate: "2025-02-22",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop",
        caption: "5-tier white & gold wedding cake",
      },
      {
        url: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&h=600&fit=crop",
        caption: "Curated dessert table display",
      },
      {
        url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop",
        caption: "Macaron tower & sweet treats",
      },
    ],
  },

  // ── 18. Wanderlust Weddings — Travel & Stay, Goa ──
  {
    user: { name: "Nikhil Fernandes", email: "nikhil@wanderlustweddings.in" },
    vendor: {
      businessName: "Wanderlust Weddings",
      slug: "wanderlust-weddings",
      description:
        "Specialist in destination wedding logistics across Goa, Rajasthan and Kerala. We handle everything from charter flights and luxury resort bookings to vintage car baraats and guest welcome hampers, making travel seamless for all your guests.",
      phone: "+91 98220 55443",
      email: "travel@wanderlustweddings.in",
      address: "Panjim, Goa",
      category: "travel-stay",
      city: "goa",
      featured: false,
      rating: 4.5,
      startingPrice: 100000,
      experience: 6,
      teamSize: 8,
      eventsCompleted: 100,
      coverImage:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Guest Logistics",
        description: "Travel coordination for wedding guests",
        price: 100000,
        features: [
          "Airport transfers for up to 50 guests",
          "Hotel block booking assistance",
          "Welcome hampers at hotel",
          "Local transport coordination",
          "Helpline for guest queries",
        ],
        popular: false,
      },
      {
        name: "Destination Essentials",
        description: "Complete travel management for destination weddings",
        price: 300000,
        features: [
          "Hotel booking & negotiation (100+ rooms)",
          "Airport transfers (all guests)",
          "Luxury car for bride & groom",
          "Welcome hampers & itinerary cards",
          "Sightseeing tours for guests",
          "On-ground travel coordinator",
          "Emergency backup transport",
        ],
        popular: true,
      },
      {
        name: "Royal Caravan",
        description: "Ultra-luxury destination wedding travel package",
        price: 800000,
        features: [
          "Charter flight / luxury train arrangement",
          "5-star resort exclusive booking",
          "Vintage car baraat",
          "Luxury bus fleet for guests",
          "Personalised welcome gifts",
          "Multi-day guest activity planning",
          "Private yacht / boat experience",
          "Full-time travel concierge team",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Airport Transfers (per car)", price: 3000, unit: "per_event" },
      { name: "Luxury Car Rental (per day)", price: 15000, unit: "per_day" },
      { name: "Welcome Hamper (per guest)", price: 1500, unit: "per_person" },
      { name: "Guest Hotel Coordination", price: 50000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 3,
        rating: 5,
        title: "Made our Goa wedding logistics effortless",
        comment:
          "120 guests travelling from across India to Goa — Wanderlust handled every single detail. Airport pickups, hotel check-ins, the vintage Ambassador for our baraat. Nikhil is a logistics genius!",
        eventDate: "2024-12-18",
      },
      {
        customerIdx: 0,
        rating: 4,
        title: "Great coordination for destination wedding",
        comment:
          "They managed hotel bookings and transfers for our 80 guests efficiently. The welcome hampers were a lovely touch. One shuttle was slightly delayed but their backup plan kicked in instantly.",
        eventDate: "2025-03-05",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        caption: "Luxury resort in Goa",
      },
      {
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        caption: "Vintage car for baraat",
      },
      {
        url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
        caption: "Guest transport coordination",
      },
    ],
  },

  // ── 19. Trousseau Tales — Gifting & Favors, Chennai ──
  {
    user: { name: "Lakshmi Iyer", email: "lakshmi@trousseautales.in" },
    vendor: {
      businessName: "Trousseau Tales",
      slug: "trousseau-tales",
      description:
        "Chennai's premier trousseau packing and wedding gifting studio. We create stunning saree packing trays, custom gift hampers and beautifully packaged return gifts that reflect the grandeur of South Indian wedding traditions.",
      phone: "+91 98840 22110",
      email: "hello@trousseautales.in",
      address: "T. Nagar, Chennai",
      category: "gifting-favors",
      city: "chennai",
      featured: false,
      rating: 4.5,
      startingPrice: 500,
      experience: 5,
      teamSize: 8,
      eventsCompleted: 120,
      coverImage:
        "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Return Gifts Basic",
        description: "Elegant return gifts for your wedding guests",
        price: 500,
        features: [
          "Custom gift box design",
          "Assorted dry fruits / chocolates",
          "Personalized thank-you card",
          "Ribbon & flower decoration",
          "Minimum order: 50 boxes",
        ],
        popular: false,
      },
      {
        name: "Trousseau Packing",
        description: "Beautiful trousseau presentation for the bride",
        price: 25000,
        features: [
          "Packing for 21 sarees / outfits",
          "Decorated trays with fabric & flowers",
          "Coconut & fruit tray arrangements",
          "Jewellery box decoration",
          "Cosmetics hamper styling",
          "Custom colour theme",
          "Photo-ready presentation",
        ],
        popular: true,
      },
      {
        name: "Luxury Gifting Suite",
        description: "Complete wedding gifting solution",
        price: 100000,
        features: [
          "Trousseau packing (31 items)",
          "Premium return gifts (200 boxes)",
          "Groomsmen & bridesmaid hampers (10)",
          "Welcome hampers for VIP guests",
          "Custom monogram branding",
          "Gift wrapping station at venue",
          "Curated gift catalogue",
          "On-site team for distribution",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Return Gift Box (per piece)", price: 500, unit: "per_person" },
      { name: "Trousseau Packing (per tray)", price: 1200, unit: "per_event" },
      { name: "Gift Hamper (premium)", price: 2500, unit: "per_event" },
      { name: "Gift Wrapping Station", price: 15000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 2,
        rating: 5,
        title: "Trousseau looked like a magazine shoot!",
        comment:
          "Lakshmi and her team packed my trousseau so beautifully — each saree tray was a work of art with fresh flowers and decorative elements. My in-laws were thoroughly impressed. The photos came out amazing!",
        eventDate: "2024-10-30",
      },
      {
        customerIdx: 4,
        rating: 4,
        title: "Lovely return gifts, great presentation",
        comment:
          "We ordered 250 custom gift boxes with dry fruits and chocolates. The packaging was elegant with our monogram. A few boxes had slightly different ribbon colours but overall the quality was excellent.",
        eventDate: "2025-01-20",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&h=600&fit=crop",
        caption: "Beautifully packed trousseau trays",
      },
      {
        url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop",
        caption: "Premium return gift boxes",
      },
      {
        url: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&h=600&fit=crop",
        caption: "Wedding hamper collection",
      },
    ],
  },

  // ── 20. ShowStopper Entertainment — Entertainment Acts, Chandigarh ──
  {
    user: { name: "Aditya Reddy", email: "aditya@showstopper.in" },
    vendor: {
      businessName: "ShowStopper Entertainment",
      slug: "showstopper-entertainment",
      description:
        "North India's most booked wedding entertainment company offering stand-up comedy, magic shows, fire dancers, folk artists and live sketch artists. We curate unforgettable performance experiences that keep your guests engaged and entertained throughout your celebrations.",
      phone: "+91 90100 77665",
      email: "bookings@showstopper.in",
      address: "Sector 17, Chandigarh",
      category: "entertainment-acts",
      city: "chandigarh",
      featured: false,
      rating: 4.4,
      startingPrice: 25000,
      experience: 4,
      teamSize: 20,
      eventsCompleted: 100,
      coverImage:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    },
    packages: [
      {
        name: "Single Act",
        description: "One entertainment performance for your event",
        price: 25000,
        features: [
          "Choice of: comedian / magician / fire dancer",
          "30-45 minute performance",
          "Professional sound requirements shared",
          "Customized content for wedding theme",
          "Setup & teardown handled",
        ],
        popular: false,
      },
      {
        name: "Entertainment Package",
        description: "Multiple acts across your wedding events",
        price: 75000,
        features: [
          "Stand-up comedian (45 min)",
          "Close-up magic during cocktails",
          "Fire dance performance",
          "Live caricature artist",
          "Sound & lighting coordination",
          "MC / host for transitions",
          "2 events covered",
        ],
        popular: true,
      },
      {
        name: "Grand Spectacle",
        description: "Full entertainment production for multi-day wedding",
        price: 200000,
        features: [
          "Stand-up comedy show (celebrity comedian)",
          "Illusionist / magic show",
          "Fire & LED dance troupe",
          "Live sketch artist (portraits for guests)",
          "Folk dance troupe (Rajasthani / Punjabi)",
          "Photo booth with props",
          "3-day entertainment calendar",
          "Dedicated entertainment coordinator",
        ],
        popular: false,
      },
    ],
    services: [
      { name: "Stand-up Comedy Show", price: 30000, unit: "per_event" },
      { name: "Magic / Illusion Show", price: 25000, unit: "per_event" },
      { name: "Fire Dance Performance", price: 20000, unit: "per_event" },
      { name: "Live Caricature Artist", price: 10000, unit: "per_event" },
      { name: "Photo Booth Setup", price: 15000, unit: "per_event" },
    ],
    reviews: [
      {
        customerIdx: 1,
        rating: 4,
        title: "Great entertainment, guests loved it!",
        comment:
          "The comedian was hilarious — he customized jokes about the bride and groom that had everyone in splits. The fire dancers during cocktails were a spectacular surprise. Minor sound issues at the start but quickly fixed.",
        eventDate: "2024-11-20",
      },
      {
        customerIdx: 3,
        rating: 5,
        title: "Made our wedding truly unique!",
        comment:
          "No one expected a magic show at a wedding and it was the highlight of the evening! The caricature artist was also a huge hit — guests queued up for their portraits. Aditya and team were professional and creative.",
        eventDate: "2025-02-25",
      },
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        caption: "Fire dance performance at wedding",
      },
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        caption: "Stage performance with lighting",
      },
      {
        url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
        caption: "Entertainment setup at celebration",
      },
    ],
  },
];

// ========================================
// MAIN SEED FUNCTION
// ========================================
async function main() {
  console.log("🌱 Seeding Shagun database...\n");

  // --------------------------------------------------
  // 1. CLEAR EXISTING DATA (reverse dependency order)
  // --------------------------------------------------
  console.log("🗑️  Clearing existing data...");
  await prisma.media.deleteMany();
  await prisma.review.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.package.deleteMany();
  await prisma.vendorService.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.category.deleteMany();
  await prisma.city.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  console.log("   ✅ All tables cleared.\n");

  // --------------------------------------------------
  // 2. CREATE CATEGORIES
  // --------------------------------------------------
  console.log("📂 Creating categories...");
  const createdCategories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }
  console.log(`   ✅ Created ${categoriesData.length} categories.\n`);

  // --------------------------------------------------
  // 3. CREATE CITIES
  // --------------------------------------------------
  console.log("🏙️  Creating cities...");
  const createdCities: Record<string, string> = {};
  for (const city of citiesData) {
    const created = await prisma.city.create({ data: city });
    createdCities[city.slug] = created.id;
  }
  console.log(`   ✅ Created ${citiesData.length} cities.\n`);

  // --------------------------------------------------
  // 4. CREATE ADMIN USER
  // --------------------------------------------------
  console.log("👑 Creating admin user...");
  const adminPassword = await hashPassword("admin123");
  const adminUser = await prisma.user.create({
    data: {
      name: "Shagun Admin",
      email: "admin@shagun.in",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`   ✅ Admin: ${adminUser.email}\n`);

  // --------------------------------------------------
  // 5. CREATE CUSTOMER USERS
  // --------------------------------------------------
  console.log("👥 Creating customer users...");
  const customerPassword = await hashPassword("customer123");

  const customersData = [
    { name: "Priya Sharma", email: "priya.sharma@gmail.com" },
    { name: "Rahul Mehta", email: "rahul.mehta@gmail.com" },
    { name: "Ananya Gupta", email: "ananya.gupta@gmail.com" },
    { name: "Vikram Singh", email: "vikram.singh@gmail.com" },
    { name: "Neha Kapoor", email: "neha.kapoor@gmail.com" },
  ];

  const customerIds: string[] = [];
  for (const cust of customersData) {
    const created = await prisma.user.create({
      data: {
        name: cust.name,
        email: cust.email,
        password: customerPassword,
        role: "CUSTOMER",
      },
    });
    customerIds.push(created.id);
  }
  console.log(`   ✅ Created ${customersData.length} customer users.\n`);

  // --------------------------------------------------
  // 6. CREATE VENDORS
  // --------------------------------------------------
  console.log("🏪 Creating vendors...\n");

  const vendorPassword = await hashPassword("vendor123");
  const categoryVendorCounts: Record<string, number> = {};
  const cityVendorCounts: Record<string, number> = {};

  for (const v of vendorsData) {
    const categoryId = createdCategories[v.vendor.category];
    const cityId = createdCities[v.vendor.city];

    if (!categoryId || !cityId) {
      console.log(
        `   ⚠️ Skipping ${v.vendor.businessName} — category or city not found`
      );
      continue;
    }

    // 6a. Create vendor user
    const user = await prisma.user.create({
      data: {
        name: v.user.name,
        email: v.user.email,
        password: vendorPassword,
        role: "VENDOR",
      },
    });

    // 6b. Create vendor profile
    const vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        businessName: v.vendor.businessName,
        slug: v.vendor.slug,
        description: v.vendor.description,
        phone: v.vendor.phone,
        email: v.vendor.email,
        website: v.vendor.website || null,
        address: v.vendor.address || null,
        cityId,
        categoryId,
        status: "APPROVED",
        featured: v.vendor.featured,
        rating: v.vendor.rating,
        reviewCount: v.reviews.length,
        startingPrice: v.vendor.startingPrice,
        experience: v.vendor.experience,
        teamSize: v.vendor.teamSize,
        eventsCompleted: v.vendor.eventsCompleted,
        coverImage: v.vendor.coverImage,
      },
    });

    // 6c. Create packages
    for (const pkg of v.packages) {
      await prisma.package.create({
        data: {
          vendorId: vendor.id,
          name: pkg.name,
          description: pkg.description,
          price: pkg.price,
          features: JSON.stringify(pkg.features),
          popular: pkg.popular,
        },
      });
    }

    // 6d. Create services
    for (const svc of v.services) {
      await prisma.vendorService.create({
        data: {
          vendorId: vendor.id,
          name: svc.name,
          price: svc.price,
          unit: svc.unit,
        },
      });
    }

    // 6e. Create reviews
    for (const rev of v.reviews) {
      await prisma.review.create({
        data: {
          vendorId: vendor.id,
          customerId: customerIds[rev.customerIdx],
          rating: rev.rating,
          title: rev.title,
          comment: rev.comment,
          eventDate: new Date(rev.eventDate),
          status: "APPROVED",
        },
      });
    }

    // 6f. Create media
    for (let i = 0; i < v.media.length; i++) {
      await prisma.media.create({
        data: {
          vendorId: vendor.id,
          url: v.media[i].url,
          type: "IMAGE",
          caption: v.media[i].caption,
          displayOrder: i + 1,
        },
      });
    }

    // Track counts
    categoryVendorCounts[v.vendor.category] =
      (categoryVendorCounts[v.vendor.category] || 0) + 1;
    cityVendorCounts[v.vendor.city] =
      (cityVendorCounts[v.vendor.city] || 0) + 1;

    console.log(
      `   ✅ ${v.vendor.businessName} (${v.vendor.category}, ${v.vendor.city})`
    );
  }

  // --------------------------------------------------
  // 7. UPDATE VENDOR COUNTS
  // --------------------------------------------------
  console.log("\n📊 Updating vendor counts...");

  for (const [slug, count] of Object.entries(categoryVendorCounts)) {
    await prisma.category.update({
      where: { id: createdCategories[slug] },
      data: { vendorCount: count },
    });
  }

  for (const [slug, count] of Object.entries(cityVendorCounts)) {
    await prisma.city.update({
      where: { id: createdCities[slug] },
      data: { vendorCount: count },
    });
  }
  console.log("   ✅ Counts updated.\n");

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------
  const totalUsers = await prisma.user.count();
  const totalVendors = await prisma.vendor.count();
  const totalPackages = await prisma.package.count();
  const totalServices = await prisma.vendorService.count();
  const totalReviews = await prisma.review.count();
  const totalMedia = await prisma.media.count();

  console.log("========================================");
  console.log("🎉 Shagun seed data created successfully!");
  console.log("========================================");
  console.log(`   Users:      ${totalUsers}`);
  console.log(`   Vendors:    ${totalVendors}`);
  console.log(`   Categories: ${categoriesData.length}`);
  console.log(`   Cities:     ${citiesData.length}`);
  console.log(`   Packages:   ${totalPackages}`);
  console.log(`   Services:   ${totalServices}`);
  console.log(`   Reviews:    ${totalReviews}`);
  console.log(`   Media:      ${totalMedia}`);
  console.log("========================================");
  console.log("\n📋 Login credentials:");
  console.log("   Admin:    admin@shagun.in / admin123");
  console.log("   Customer: priya.sharma@gmail.com / customer123");
  console.log("   Vendor:   rajesh@royalpalace.in / vendor123\n");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
