import { ratelimit } from "@/lib/upstash/ratelimit";

// Placeholder for /api/reviews endpoints
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

  return Response.json({ message: "Reviews API route placeholder" });
}
