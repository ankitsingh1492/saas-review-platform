import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ratelimit } from "@/lib/upstash/ratelimit";

export async function GET(request: Request) {
  // Skip rate limiting in development
  if (process.env.NODE_ENV !== "development") {
    // Apply rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return new Response("Rate limit exceeded. Please try again later.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "healthy" });
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", error: (error as Error).message },
      { status: 500 }
    );
  }
}
