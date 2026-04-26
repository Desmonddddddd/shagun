import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, name, email, phone, eventDate, eventType, guestCount, budget, message } = body;

    if (!vendorId || !name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, phone, message" },
        { status: 400 }
      );
    }

    // Verify vendor exists and is approved
    const vendor = await prisma.vendor.findFirst({
      where: { id: vendorId, status: "APPROVED" },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor not found" },
        { status: 404 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        vendorId,
        name,
        email,
        phone,
        eventDate: eventDate ? new Date(eventDate) : null,
        eventType: eventType || null,
        guestCount: guestCount || null,
        budget: budget || null,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      data: lead,
      message: "Your inquiry has been sent! The vendor will contact you soon.",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (vendorId) where.vendorId = vendorId;
    if (status) where.status = status;

    // Support filtering by vendor's userId (for vendor dashboard)
    if (userId) {
      const vendor = await prisma.vendor.findUnique({
        where: { userId },
        select: { id: true },
      });
      if (vendor) {
        where.vendorId = vendor.id;
      } else {
        // No vendor found for this user, return empty
        return NextResponse.json({
          success: true,
          data: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
        });
      }
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          vendor: { select: { businessName: true, slug: true } },
          customer: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: leads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
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

    const body = await request.json();
    const { leadId, status } = body;

    if (!leadId || !status) {
      return NextResponse.json(
        { success: false, error: "leadId and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["NEW", "CONTACTED", "NEGOTIATING", "BOOKED", "CLOSED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify the lead belongs to a vendor owned by this user
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { vendor: { select: { userId: true } } },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    if (lead.vendor.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { status },
      include: {
        vendor: { select: { businessName: true, slug: true } },
        customer: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedLead,
      message: `Lead status updated to ${status}`,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}
