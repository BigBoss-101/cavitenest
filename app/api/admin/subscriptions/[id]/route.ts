import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const subscriptions = await prisma.subscription.findMany();
    res.json(subscriptions);
  }
}
