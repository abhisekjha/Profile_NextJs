import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username as string },
        include: { userProfile: true },
      });

      if (user) {
        res.status(200).json(user.userProfile);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: 'Error fetching user profile', details: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
