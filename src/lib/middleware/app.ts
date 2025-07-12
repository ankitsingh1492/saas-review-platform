import { parse } from "@/lib/middleware/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUserViaToken } from "./utils/get-user-via-token";
// import { getDefaultClient } from "./utils/get-default-client";
// import { validateClientAccess } from "./utils/validate-client-access";

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req);

  // Get user from token
  const user = await getUserViaToken(req);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/signin",
    "/auth/error",
    "/widget",
    "/api/health",
    "/",
  ];

  // API routes that should be handled separately
  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Allow access to public routes without authentication
  if (publicRoutes.some((route) => path.startsWith(route))) {
    // If user is authenticated and trying to access signin, redirect to dashboard
    if (user && path.startsWith("/auth/signin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // If there's no user and the path requires authentication, redirect to signin
  if (!user) {
    const redirectUrl =
      path === "/"
        ? "/auth/signin"
        : `/auth/signin?next=${encodeURIComponent(fullPath)}`;
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // If there's a user
  if (user) {
    // Root path - redirect to dashboard
    if (path === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Dashboard path - check if user has clients
    if (path === "/dashboard") {
      //   const defaultClient = await getDefaultClient(user);
      //   if (!defaultClient) {
      //     // User has no clients, stay on dashboard to create one
      //     return NextResponse.next();
      //   }
      return NextResponse.next();
    }

    // Client-specific paths - validate client exists and user has access
    if (path.startsWith("/client/")) {
      //   const clientName = path.split("/")[2];
      //   if (clientName) {
      //     const hasAccess = await validateClientAccess(user, clientName);
      //     if (!hasAccess) {
      //       return NextResponse.redirect(new URL("/dashboard", req.url));
      //     }
      //     return NextResponse.next();
      //   }
      return NextResponse.next();
    }

    // Reviews path
    if (path.startsWith("/reviews")) {
      return NextResponse.next();
    }
  }

  // Default: continue with the request
  return NextResponse.next();
}
