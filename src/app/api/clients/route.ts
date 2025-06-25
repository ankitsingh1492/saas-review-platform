/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Create a new client
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const client = await prisma.client.create({ data });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

// List all clients, or only those created by the current user if ?createdByMe=true
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const createdByMe = searchParams.get("createdByMe");
    let clients;
    if (createdByMe === "true") {
      const userId = session.user && (session.user as any).id;
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
