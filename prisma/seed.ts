import prisma from "../src/lib/prisma";

async function main() {
  // Create users first
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "adminpass",
      name: "Admin User",
      role: "admin",
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      password: "clientpass",
      name: "Client User",
      role: "client",
    },
  });

  // Create clients, linking to their creator
  const client1 = await prisma.client.create({
    data: {
      name: "Client One",
      domain: "clientone.com",
      brandingConfig: {},
      subscriptionTier: "basic",
      apiKeys: {},
      createdBy: { connect: { id: clientUser.id } }, // clientUser is the creator
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "Client Two",
      domain: "clienttwo.com",
      brandingConfig: {},
      subscriptionTier: "premium",
      apiKeys: {},
      createdBy: { connect: { id: clientUser.id } }, // clientUser is the creator
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

  // Create reviews (using real user IDs)
  const review1 = await prisma.review.create({
    data: {
      userId: adminUser.id,
      clientId: client1.id,
      rating: 5,
      content: "Excellent service!",
      status: "approved",
    },
  });

  const review2 = await prisma.review.create({
    data: {
      userId: clientUser.id,
      clientId: client2.id,
      rating: 4,
      content: "Very good, but room for improvement.",
      status: "approved",
    },
  });

  const review3 = await prisma.review.create({
    data: {
      userId: clientUser.id,
      clientId: client1.id,
      rating: 2,
      content: "Not satisfied with the service.",
      status: "pending",
    },
  });

  // Create media files for reviews
  await prisma.media.create({
    data: {
      url: "https://s3.amazonaws.com/bucket/image1.jpg",
      thumbnail: "https://s3.amazonaws.com/bucket/thumb1.jpg",
      type: "image",
      uploadedBy: adminUser.id,
      reviewId: review1.id,
    },
  });

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      action: "CREATE_REVIEW",
      userId: adminUser.id,
      clientId: client1.id,
      reviewId: review1.id,
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
