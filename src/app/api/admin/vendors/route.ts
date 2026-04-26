import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, status } = body;

    if (!vendorId || !status) {
      return NextResponse.json(
        { success: false, error: "vendorId and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["APPROVED", "REJECTED", "SUSPENDED", "PENDING"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: { status },
      include: {
        user: { select: { name: true, email: true } },
        category: { select: { name: true } },
        city: { select: { name: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: vendor,
      message: `Vendor ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Error updating vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vendor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          user: { select: { name: true, email: true } },
          category: { select: { name: true, slug: true } },
          city: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
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
