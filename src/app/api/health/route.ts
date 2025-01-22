import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
