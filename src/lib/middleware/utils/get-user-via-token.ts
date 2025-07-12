import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getUserViaToken(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return token?.sub ? token : null;
  } catch (error) {
    console.error("Error getting user via token:", error);
    return null;
  }
}
