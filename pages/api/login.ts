import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/client'

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, senso_number } = req.body;
        const savedRegistration = await prisma.registration.findFirst({
            where: {
                email: email,
                senso_number: senso_number,
            }
        })
        savedRegistration ? res.json(savedRegistration) : res.status(404).json({ message: 'Could not login' });
    }
    else {
        res.status(403).json({ message: 'Method not allowed' });
    }
}