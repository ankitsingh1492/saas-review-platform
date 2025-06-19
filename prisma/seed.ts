import prisma from "../src/lib/prisma";

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

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "adminpass", // In production, use hashed passwords!
      name: "Admin User",
      role: "admin",
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: "client@example.com",
      password: "clientpass",
      name: "Client User",
      role: "client",
    },
  });

  // Create API keys
  const adminApiKey = await prisma.aPIKey.create({
    data: {
      key: "admin-api-key-123",
      userId: adminUser.id,
      isActive: true,
    },
  });

  const clientApiKey = await prisma.aPIKey.create({
    data: {
      key: "client-api-key-456",
      userId: clientUser.id,
      clientId: client1.id,
      isActive: true,
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

  // Create media files for reviews
  const review1 = await prisma.review.findFirst({ where: { userId: "user1" } });
  if (review1) {
    await prisma.media.create({
      data: {
        url: "https://s3.amazonaws.com/bucket/image1.jpg",
        thumbnail: "https://s3.amazonaws.com/bucket/thumb1.jpg",
        type: "image",
        uploadedBy: adminUser.id,
        reviewId: review1.id,
      },
    });
  }

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      action: "CREATE_REVIEW",
      userId: adminUser.id,
      clientId: client1.id,
      reviewId: review1 ? review1.id : undefined,
      details: { message: "Admin created a review for Client One." },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
