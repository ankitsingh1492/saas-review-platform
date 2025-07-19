import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionUser } from "@/types";
import { ratelimit } from "@/lib/upstash/ratelimit";

// Create a new client
export async function POST(request: Request) {
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

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const userId = (session.user as SessionUser)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!data.name || !data.domain || !data.subscriptionTier) {
      return NextResponse.json(
        { error: "Missing required fields: name, domain, subscriptionTier" },
        { status: 400 }
      );
    }

    // Create client with all required fields
    const client = await prisma.client.create({
      data: {
        name: data.name,
        domain: data.domain,
        subscriptionTier: data.subscriptionTier,
        brandingConfig: data.brandingConfig || {
          primaryColor: "#6C63FF",
          secondaryColor: "#5548c8",
          logoUrl: "",
          companyName: data.name,
        },
        apiKeys: data.apiKeys || {
          public: "",
          secret: "",
        },
        createdById: userId,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

// List all clients, or only those created by the current user if ?createdByMe=true
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

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const createdByMe = searchParams.get("createdByMe");
    let clients;
    if (createdByMe === "true") {
      const userId = (session.user as SessionUser)?.id;
      if (!userId) {
        return NextResponse.json(
          { error: "User ID not found in session" },
          { status: 401 }
        );
      }
      clients = await prisma.client.findMany({
        where: { createdById: userId },
      });
    } else {
      clients = await prisma.client.findMany();
    }
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
