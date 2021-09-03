import nodemailer from 'nodemailer'
import { NEXT_MAIL_HOST, NEXT_MAIL_PORT, NEXT_MAIL_USER, NEXT_MAIL_PASS } from '@/config/index'

const transporter = nodemailer.createTransport({
    host: NEXT_MAIL_HOST,
    port: Number(NEXT_MAIL_PORT),
    auth: {
        user: NEXT_MAIL_USER,
        pass: NEXT_MAIL_PASS
    }
});

export const sendMail = async (subject: string, to: string, html: string) => await transporter.sendMail({
    from: NEXT_MAIL_USER,
    subject,
    to,
    html
})

