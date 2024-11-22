// app/api/admin/subscriptions/stats/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

export async function GET() {
  const subscriptionStats = await prisma.user.count({
    where: {
      subscribed: true,
    },
  });
  
  return NextResponse.json({ activeSubscriptions: subscriptionStats });
}
