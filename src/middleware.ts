import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");

  // Only protect vendor and admin routes
  if (!isVendorRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // Get JWT token (does not require Prisma/DB — reads from cookie)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not authenticated — redirect to login
  if (!token) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string | undefined;

  // Admin routes — require ADMIN role
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Vendor routes — require VENDOR or ADMIN role
  if (isVendorRoute && role !== "VENDOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vendor/:path*", "/admin/:path*"],
};
