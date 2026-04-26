import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role, businessName, description } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: role || "CUSTOMER",
      },
    });

    // If vendor registration, create a pending vendor profile
    if (role === "VENDOR" && businessName) {
      // Get first category and city as defaults
      const defaultCategory = await prisma.category.findFirst({ orderBy: { displayOrder: "asc" } });
      const defaultCity = await prisma.city.findFirst({ orderBy: { name: "asc" } });

      if (defaultCategory && defaultCity) {
        await prisma.vendor.create({
          data: {
            userId: user.id,
            businessName,
            slug: slugify(businessName) + "-" + user.id.slice(-4),
            description: description || `Welcome to ${businessName}`,
            categoryId: defaultCategory.id,
            cityId: defaultCity.id,
            status: "PENDING",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: role === "VENDOR"
        ? "Vendor account created! Your profile is pending approval."
        : "Account created successfully! You can now sign in.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
