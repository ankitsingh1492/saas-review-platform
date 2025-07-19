import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { ratelimit } from "@/lib/upstash/ratelimit";

// Get a single client by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await prisma.client.findUnique({ where: { id: id } });
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const updatedClient = await prisma.client.update({
      where: { id: id },
      data: body,
    });

    if (!updatedClient) {
      return NextResponse.json(
        { error: "Client not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to update client" },
      { status: 500 }
    );
  }
}

// Delete a client by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedClient = await prisma.client.delete({
      where: { id: id },
    });

    if (!deletedClient) {
      return NextResponse.json(
        { error: "Client not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Client with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma known error code:", error.code);
      console.error("Prisma known error message:", error.message);

      if (error.code === "P2002") {
        console.error("Unique constraint violation:", error.meta?.target);
        return new Response(JSON.stringify({ error: "Duplicate entry" }), {
          status: 409,
        });
      } else if (error.code === "P2025") {
        console.error("Record not found:", error.meta?.cause);
        return new Response(JSON.stringify({ error: "Record not found" }), {
          status: 404,
        });
      }
      return new Response(
        JSON.stringify({ error: "Prisma operation failed" }),
        { status: 400 }
      );
    } else {
      console.error("An unexpected error occurred:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
}
