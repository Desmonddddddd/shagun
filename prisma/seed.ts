import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

const url = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
const adapter = new PrismaLibSql({ url });
const prisma = new PrismaClient({ adapter });

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
      subs: [{ name: "Mehendi Artists", slug: "mehendi-artists" }],
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
  const vendorData = [
    { name: "Royal Wedding Studio", category: "photography", sub: "wedding-photographers", city: "mumbai", price: 75000, rating: 4.8, reviews: 124, experience: 8, events: 350, desc: "Award-winning wedding photography studio specializing in candid moments and cinematic storytelling. We capture the essence of your love story with artistic flair.", coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800" },
    { name: "Maharani Venues", category: "venues", sub: "luxury-hotels", city: "jaipur", price: 250000, rating: 4.9, reviews: 89, experience: 15, events: 500, desc: "Luxury palace venues in the heart of Jaipur. Host your royal wedding in heritage properties with modern amenities and impeccable service.", coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800" },
    { name: "Glamour by Priya", category: "makeup-beauty", sub: "bridal-makeup", city: "delhi", price: 35000, rating: 4.7, reviews: 210, experience: 10, events: 600, desc: "Celebrity bridal makeup artist creating timeless bridal looks. Specializing in HD, airbrush, and traditional bridal makeup for all skin tones.", coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800" },
    { name: "Dream Decor Co.", category: "planning-decor", sub: "decorators", city: "mumbai", price: 150000, rating: 4.6, reviews: 78, experience: 6, events: 200, desc: "Contemporary wedding decoration with a touch of tradition. From intimate gatherings to grand celebrations, we transform venues into dreamscapes.", coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800" },
    { name: "DJ Rhythmix", category: "music-entertainment", sub: "djs", city: "bangalore", price: 25000, rating: 4.5, reviews: 156, experience: 7, events: 400, desc: "High-energy DJ and sound setup for weddings, sangeet, and cocktail parties. Professional equipment with LED dance floors and special effects.", coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" },
    { name: "Spice Kitchen Catering", category: "food-catering", sub: "caterers", city: "hyderabad", price: 800, rating: 4.8, reviews: 195, experience: 12, events: 700, desc: "Multi-cuisine catering with authentic Hyderabadi biryani. From traditional thalis to modern fusion menus, we create unforgettable culinary experiences.", coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800" },
    { name: "Bride & Bespoke", category: "bridal-wear", sub: "bridal-lehengas", city: "delhi", price: 45000, rating: 4.9, reviews: 67, experience: 9, events: 300, desc: "Handcrafted bridal lehengas with intricate zardozi and threadwork. Each piece is a masterwork of Indian craftsmanship.", coverImage: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800" },
    { name: "Sherwani House", category: "groom-wear", sub: "sherwanis", city: "lucknow", price: 20000, rating: 4.4, reviews: 43, experience: 20, events: 800, desc: "Traditional Lucknowi sherwanis with chikankari embroidery. Bespoke tailoring for the modern Indian groom.", coverImage: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800" },
    { name: "Mehendi Magic", category: "mehendi", sub: "mehendi-artists", city: "jaipur", price: 8000, rating: 4.7, reviews: 312, experience: 11, events: 900, desc: "Intricate Rajasthani and Arabic mehendi designs. Bridal packages include hands, feet, and custom portrait mehendi.", coverImage: "https://images.unsplash.com/photo-1600002415506-dd06090d3480?w=800" },
    { name: "Divine Ceremonies", category: "pandit-rituals", sub: "wedding-pandits", city: "delhi", price: 15000, rating: 4.6, reviews: 88, experience: 25, events: 1200, desc: "Experienced wedding pandits performing ceremonies with proper Vedic rituals. Multi-language ceremonies available.", coverImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800" },
    { name: "Luxury Rides India", category: "transport", sub: "luxury-cars", city: "mumbai", price: 12000, rating: 4.5, reviews: 55, experience: 5, events: 150, desc: "Premium fleet of Rolls Royce, Mercedes, and vintage cars for the perfect baraat. Decorated cars with professional chauffeurs.", coverImage: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800" },
    { name: "Wanderlust Honeymoons", category: "honeymoon", sub: "honeymoon-packages", city: "goa", price: 50000, rating: 4.8, reviews: 102, experience: 8, events: 250, desc: "Curated honeymoon packages to Maldives, Bali, Europe, and more. Romantic getaways with luxury stays and unique experiences.", coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
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
        coverImage: v.coverImage,
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
