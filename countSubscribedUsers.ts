import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function countSubscribedUsers() {
  try {
    // Get the current date without time (for daily counts)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day

    // Count users with subscribed set to true
    const activeSubscribedCount = await prisma.user.count({
      where: {
        subscribed: true,
      },
    });

    // Save the count to SubscriptionTrend
    await prisma.subscriptionTrend.upsert({
      where: { date: today },
      update: { activeCount: activeSubscribedCount },
      create: {
        date: today,
        activeCount: activeSubscribedCount,
      },
    });

    console.log(`Saved subscription count for ${today.toISOString()}: ${activeSubscribedCount}`);
  } catch (error) {
    console.error('Error counting subscribed users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

countSubscribedUsers();
