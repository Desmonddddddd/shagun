import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minRating = searchParams.get("minRating");
    const sort = searchParams.get("sort") || "rating";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Record<string, unknown> = {
      status: "APPROVED",
    };

    if (category) {
      where.category = { slug: category };
    }

    if (city) {
      where.city = { slug: city };
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { description: { contains: search } },
        { category: { name: { contains: search } } },
        { city: { name: { contains: search } } },
      ];
    }

    if (minPrice) {
      where.startingPrice = {
        ...(where.startingPrice as object || {}),
        gte: parseInt(minPrice),
      };
    }

    if (maxPrice) {
      where.startingPrice = {
        ...(where.startingPrice as object || {}),
        lte: parseInt(maxPrice),
      };
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "price_low":
        orderBy = { startingPrice: "asc" };
        break;
      case "price_high":
        orderBy = { startingPrice: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "popular":
        orderBy = { reviewCount: "desc" };
        break;
      case "rating":
      default:
        orderBy = { rating: "desc" };
        break;
    }

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          category: { select: { name: true, slug: true } },
          city: { select: { name: true, slug: true } },
          media: { take: 1, orderBy: { displayOrder: "asc" } },
        },
        orderBy: [{ featured: "desc" }, orderBy],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.vendor.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: vendors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}
