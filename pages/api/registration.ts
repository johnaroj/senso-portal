import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMail } from '@/utils/mail'
import { NEXT_URL } from '@/config/index'

import prisma from '@/config/client'

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === 'GET') {
        let existing;

        if (req.query.email) {
            const watermeter = req.query.watermeter as string;
            const email = req.query.email as string;
            existing = await prisma.registration.findFirst({
                where: {
                    watermeter: watermeter,
                    email: email,
                },
            })
            existing ? res.json({ ...existing, message: 'Email and Watermeter already registered' }) : res.json({})
        } else {
            const watermeter = req.query.watermeter as string;
            existing = await prisma.registration.findFirst({
                where: {
                    watermeter: watermeter
                },
            })
            existing ? res.json({ ...existing, message: 'Watermeter already registered' }) : res.json({})
        }

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

            await sendMail(
                'Registration cbs successfull',
                registration.email,
                `
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
                    <p>Pa login click <a href="${NEXT_URL}/account/login">aki</a></p>
                </div>
            `
            )

            res.json(savedRegistration);
        } else {
            res.status(404).json({ message: 'Watermeter not found' })
        }


    }
    else {
        res.status(403).json({ message: 'Method not allowed' });
    }
}