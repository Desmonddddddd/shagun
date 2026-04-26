import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        city: { select: { id: true, name: true, slug: true } },
        reviews: {
          where: { status: "APPROVED" },
          include: {
            customer: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        media: { orderBy: { displayOrder: "asc" } },
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendor profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify vendor exists for this user
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!existingVendor) {
      return NextResponse.json(
        { success: false, error: "Vendor profile not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      businessName,
      description,
      phone,
      email,
      website,
      address,
      experience,
      teamSize,
      startingPrice,
    } = body;

    // Build update data, only include provided fields
    const updateData: Record<string, unknown> = {};
    if (businessName !== undefined) updateData.businessName = businessName;
    if (description !== undefined) updateData.description = description;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (website !== undefined) updateData.website = website;
    if (address !== undefined) updateData.address = address;
    if (experience !== undefined) updateData.experience = parseInt(experience) || 0;
    if (teamSize !== undefined) updateData.teamSize = parseInt(teamSize) || 0;
    if (startingPrice !== undefined) updateData.startingPrice = parseInt(startingPrice) || 0;

    const updatedVendor = await prisma.vendor.update({
      where: { userId: session.user.id },
      data: updateData,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        city: { select: { id: true, name: true, slug: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedVendor,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating vendor profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
