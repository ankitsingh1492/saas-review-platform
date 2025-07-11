import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Review, Client } from "@/types";

import DashboardHeader from "@/lib/ui/DashboardHeader";
import ClientPageContent from "./components/ClientPageContent";

interface PageProps {
  params: Promise<{ clientName: string }>;
}

async function getClientByName(name: string): Promise<Client | null> {
  return prisma.client.findFirst({
    where: { name: name },
    select: { id: true, name: true, domain: true },
  });
}

async function getReviewsByClientId(clientId: string): Promise<Review[]> {
  const reviews = await prisma.review.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });
  // Map mediaUrls to string[] or null for type compatibility
  return reviews.map((r) => ({
    ...r,
    mediaUrls: Array.isArray(r.mediaUrls)
      ? r.mediaUrls.every((v: unknown) => typeof v === "string")
        ? (r.mediaUrls as string[])
        : null
      : typeof r.mediaUrls === "string"
        ? [r.mediaUrls]
        : null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export default async function ClientDetailsPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  const resolvedParams = await params;
  const decodedClientName = decodeURIComponent(
    resolvedParams.clientName
  ).replace(/-/g, " ");

  const client = await getClientByName(decodedClientName);
  if (!client) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-dashboard text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Client Not Found</h1>
          <p className="text-lg">
            The client &quot;{decodedClientName}&quot; does not exist.
          </p>
        </div>
      </main>
    );
  }
  const reviews = await getReviewsByClientId(client.id);

  return (
    <>
      <DashboardHeader userEmail={session.user?.email || ""} />
      <ClientPageContent client={client} reviews={reviews} />
    </>
  );
}
