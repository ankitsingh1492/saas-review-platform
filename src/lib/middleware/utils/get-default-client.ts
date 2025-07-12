import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

export async function getDefaultClient(user: JWT | null) {
  if (!user?.email || !user.sub) return null;

  try {
    const client = await prisma.client.findFirst({
      where: {
        createdById: user.sub,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return client?.name || null;
  } catch (error) {
    console.error("Error getting default client:", error);
    return null;
  }
}
