import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Initialize Ratelimit instance with Redis connection
// Set a fixed window rate limit of 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "10 s"),
  analytics: true,
  prefix: "review-platform:ratelimit",
});
