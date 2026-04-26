import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const vendor = await prisma.vendor.findUnique({
      where: { slug, status: "APPROVED" },
      include: {
        user: { select: { name: true, image: true } },
        category: { select: { id: true, name: true, slug: true, icon: true } },
        city: { select: { id: true, name: true, slug: true, state: true } },
        services: {
          orderBy: { price: "asc" },
        },
        packages: {
          orderBy: { price: "asc" },
        },
        reviews: {
          where: { status: "APPROVED" },
          include: {
            customer: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor not found" },
        { status: 404 }
      );
    }

    // Get similar vendors (same category, same city, excluding current)
    const similarVendors = await prisma.vendor.findMany({
      where: {
        status: "APPROVED",
        categoryId: vendor.categoryId,
        id: { not: vendor.id },
      },
      include: {
        category: { select: { name: true, slug: true } },
        city: { select: { name: true, slug: true } },
        media: { take: 1, orderBy: { displayOrder: "asc" } },
      },
      orderBy: { rating: "desc" },
      take: 4,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...vendor,
        similarVendors,
      },
    });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendor" },
      { status: 500 }
    );
  }
}
