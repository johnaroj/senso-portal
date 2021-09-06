import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { sendMail } from '@/utils/mail'
import { NEXT_URL } from '@/config/index'

const prisma = new PrismaClient();

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    if (req.method === 'GET') {
        const email = req.query.email as string;
        const watermeter = req.query.watermeter as string;
        const savedRegistration = await prisma.registration.findFirst({
            where: {
                email: email,
                watermeter: watermeter,
            }
        })

        savedRegistration &&
            await sendMail(
                'Registration cbs successfull',
                savedRegistration.email,
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

        savedRegistration ? res.json(savedRegistration) : res.status(200).json({ message: 'User unknown' });
    }
    else {
        res.status(403).json({ message: 'Method not allowed' });
    }
}