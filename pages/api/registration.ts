import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { NEXT_MAIL_HOST, NEXT_MAIL_PORT, NEXT_MAIL_USER, NEXT_MAIL_PASS } from '@/config/index'

const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
    host: NEXT_MAIL_HOST,
    port: Number(NEXT_MAIL_PORT),
    auth: {
        user: NEXT_MAIL_USER,
        pass: NEXT_MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === 'GET') {
        const watermeter = req.query.watermeter as string;
        const existing = await prisma.registration.findFirst({
            where: {
                watermeter: watermeter
            },
        })
        existing ? res.json(existing) : res.json({})
    } else if (req.method === 'POST') {
        const registration = req.body;
        const matchedWatermeter = await prisma.watermeter.findFirst({
            where: {
                watermeter: registration.watermeter
            }
        })

        if (matchedWatermeter) {
            const savedRegistration = await prisma.registration.create({
                data: registration
            })

            await transporter.sendMail({
                from: NEXT_MAIL_USER,
                to: registration.email,
                subject: 'Registration cbs successfull',
                html: `
                <div>
                    <p>
                        Danki pa partisipa na nos Senso di Prueba. Thank you for participating in the Pilot Census.
                    </p>
                    <p>
                        Bo number di Senso ta/ your census number is: ${savedRegistration.senso_number}
                    </p>
                    <p>
                        Pa kuminsa ku bo enkuesta, por fabor primi riba e link aki/ To start your survey, please press this link:
                    </p>
                    <p>
                        Danki di parti di Ofisina Sentral Di Estadistika (CBS). Thank you in advance from the Central Bureau of Statistics (CBS).
                    </p>
                </div>
            `
            })

            res.json(savedRegistration);
        } else {
            res.status(404).json({ message: 'Watermeter not found' })
        }


    }
    else {
        res.status(403).json({ message: 'Method not allowed' });
    }
}