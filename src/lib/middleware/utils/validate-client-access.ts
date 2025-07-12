import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

export async function validateClientAccess(
  user: JWT | null,
  clientName: string
): Promise<boolean> {
  if (!user?.sub || !clientName) return false;

  try {
    const client = await prisma.client.findFirst({
      where: {
        name: clientName,
        createdById: user.sub,
      },
    });

    return !!client;
  } catch (error) {
    console.error("Error validating client access:", error);
    return false;
  }
}
