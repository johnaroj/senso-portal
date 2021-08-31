import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { watermeter } = req.query;
        const existing = await prisma.registration.findMany({
            where: {
                watermeter: Number(watermeter)
            },
        })
        res.json(existing);
    } else if (req.method === 'POST') {
        const registration = JSON.parse(req.body);
        const savedRegistration = await prisma.registration.create({
            data: registration
        })
        res.json(savedRegistration);
    }
    else {
        res.status(403).json({ message: 'Method not allowed' });
    }
}