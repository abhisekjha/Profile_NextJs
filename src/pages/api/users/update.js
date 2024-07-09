import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, username, name, bio, location, company, position, website } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { username, name, bio, location, company, position, website },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
