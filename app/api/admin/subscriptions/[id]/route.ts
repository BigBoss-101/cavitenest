import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

// Handle GET requests to fetch subscriptions
export async function GET(req: NextRequest) {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}
