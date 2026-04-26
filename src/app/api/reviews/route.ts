import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, customerId, rating, title, comment, eventDate } = body;

    if (!vendorId || !customerId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        vendorId,
        customerId,
        rating: parseInt(rating),
        title: title || null,
        comment,
        eventDate: eventDate ? new Date(eventDate) : null,
        status: "APPROVED",
      },
    });

    // Update vendor rating and review count
    const reviews = await prisma.review.findMany({
      where: { vendorId, status: "APPROVED" },
      select: { rating: true },
    });

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      },
    });

    return NextResponse.json({
      success: true,
      data: review,
      message: "Review submitted successfully!",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
