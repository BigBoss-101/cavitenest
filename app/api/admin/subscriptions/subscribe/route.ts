// app/api/admin/subscriptions/subscribe/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const { lessorId } = await request.json();

  // Update the user's subscription status
  const lessor = await prisma.user.update({
    where: { id: lessorId },
    data: { subscribed: true },
  });

  return NextResponse.json(lessor);
}

