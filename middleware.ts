// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

// Mobile-only routes that should redirect on desktop
const MOBILE_ONLY_ROUTES = ["/camera", "/stories", "/ar-filters"];

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  // Handle protected routes first
  if (isProtectedRoute(req)) {
    await auth.protect();
    return NextResponse.next();
  }

  // Skip device detection for specific paths
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/trpc") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for forced mobile view
  const searchParams = req.nextUrl.searchParams;
  const forceMobile =
    searchParams.get("view") === "mobile" ||
    req.headers.get("x-force-mobile") === "true";

  // Determine if user is on mobile
  let isMobile = forceMobile;
  if (!forceMobile) {
    const ua = req.headers.get("user-agent") || "";
    const parser = new UAParser(ua);
    const device = parser.getDevice();
    isMobile = device.type === "mobile" || device.type === "tablet";
  }

  // Set the device type cookie
  const response = NextResponse.next();
  response.cookies.set("device-type", isMobile ? "mobile" : "desktop", {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: false,
  });

  // Handle mobile-only routes
  if (!isMobile && MOBILE_ONLY_ROUTES.includes(path)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
