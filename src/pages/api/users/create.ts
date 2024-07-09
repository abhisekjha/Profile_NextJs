import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, name, avatar, bio, website, twitter, github, linkedin } = req.body;

    console.log('Received data:', req.body);

    if (!username || !name) {
      return res.status(400).json({ error: 'Username and name are required' });
    }

    try {
      console.log('Finding or creating user...');
      const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
      });
      console.log('User upserted:', user);

      console.log('Finding existing profile...');
      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId: user.id }
      });
      console.log('Existing profile:', existingProfile);

      let userProfile;
      if (existingProfile) {
        console.log('Updating existing profile...');
        userProfile = await prisma.userProfile.update({
          where: { userId: user.id },
          data: {
            name: name || existingProfile.name,
            avatar: avatar || existingProfile.avatar,
            bio: bio || existingProfile.bio,
            website: website || existingProfile.website,
            twitter: twitter || existingProfile.twitter,
            github: github || existingProfile.github,
            linkedin: linkedin || existingProfile.linkedin,
          },
        });
        console.log('Profile updated:', userProfile);
      } else {
        console.log('Creating new profile...');
        userProfile = await prisma.userProfile.create({
          data: {
            userId: user.id,
            name,
            avatar,
            bio,
            website,
            twitter,
            github,
            linkedin,
          },
        });
        console.log('Profile created:', userProfile);
      }

      res.status(200).json(userProfile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating/updating user profile:', error);
        res.status(500).json({ error: 'Error creating/updating user profile', details: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
