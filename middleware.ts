import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Skip device detection middleware for specific paths
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/trpc") ||
    path.includes(".") ||
    isProtectedRoute(req) ||
    path !== "/" // Only process the root path
  ) {
    return NextResponse.next();
  }

  // Check for a test query parameter or custom header to force mobile view
  const searchParams = req.nextUrl.searchParams;
  const forceMobile =
    searchParams.get("view") === "mobile" ||
    req.headers.get("x-force-mobile") === "true";

  // If not forcing mobile, proceed with normal detection
  if (!forceMobile) {
    // Get the user agent
    const ua = req.headers.get("user-agent") || "";
    const parser = new UAParser(ua);
    const device = parser.getDevice();
    const isMobile = device.type === "mobile" || device.type === "tablet";

    const response = NextResponse.next();
    response.cookies.set("device-type", isMobile ? "mobile" : "desktop", {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: false, // Allow access from client-side JS
    });
    return response;
  }

  // Force mobile view when the parameter or header is present
  const response = NextResponse.next();
  response.cookies.set("device-type", "mobile", {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: false, // Allow access from client-side JS
  });

  return response;
});

// Config remains the same
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
