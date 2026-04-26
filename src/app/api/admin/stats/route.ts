import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalVendors,
      totalCustomers,
      totalLeads,
      totalReviews,
      pendingVendors,
      pendingReviews,
      recentLeads,
    ] = await Promise.all([
      prisma.vendor.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.lead.count(),
      prisma.review.count(),
      prisma.vendor.count({ where: { status: "PENDING" } }),
      prisma.review.count({ where: { status: "PENDING" } }),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalVendors,
        totalCustomers,
        totalLeads,
        totalReviews,
        pendingVendors,
        pendingReviews,
        recentLeads,
        monthlyGrowth: {
          vendors: 12,
          leads: 24,
          reviews: 18,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
