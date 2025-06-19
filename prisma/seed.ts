import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create clients
  const client1 = await prisma.client.create({
    data: {
      name: "Client One",
      domain: "clientone.com",
      brandingConfig: {},
      subscriptionTier: "basic",
      apiKeys: {},
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "Client Two",
      domain: "clienttwo.com",
      brandingConfig: {},
      subscriptionTier: "premium",
      apiKeys: {},
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      userId: "user1",
      clientId: client1.id,
      rating: 5,
      content: "Excellent service!",
      status: "approved",
    },
  });

  await prisma.review.create({
    data: {
      userId: "user2",
      clientId: client2.id,
      rating: 4,
      content: "Very good, but room for improvement.",
      status: "approved",
    },
  });

  await prisma.review.create({
    data: {
      userId: "user3",
      clientId: client1.id,
      rating: 2,
      content: "Not satisfied with the service.",
      status: "pending",
    },
  });

  // Add more seed data as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
