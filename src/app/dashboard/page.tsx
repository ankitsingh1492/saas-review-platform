import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AnimatedBackground from "./AnimatedBackground";
import DashboardHeader from "./DashboardHeader";
import ClientsSection from "./ClientsSection";
import { Client, SessionUser } from "@/types";

async function getClients(): Promise<Client[]> {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  try {
    const userId = (session.user as SessionUser)?.id;
    if (!userId) return [];

    const clients = await prisma.client.findMany({
      where: { createdById: userId },
      select: {
        id: true,
        name: true,
        domain: true,
      },
    });

    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  const clients = await getClients();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <AnimatedBackground />
      <DashboardHeader userEmail={session.user?.email || ""} />
      <main className="relative z-10 flex flex-col items-center min-h-screen pt-32 px-6">
        <ClientsSection clients={clients} />
      </main>
    </div>
  );
}
