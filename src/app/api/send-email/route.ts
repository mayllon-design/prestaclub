import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { subject, message, to } = data;

        const host = process.env.SMTP_HOST || 'mail.prestaclub.com';
        const user = process.env.SMTP_USER || 'mayllon@prestaclub.com';
        const pass = process.env.SMTP_PASS || '@ABCD1234a';
        const port = Number(process.env.SMTP_PORT) || 465;
        const secure = process.env.SMTP_SECURE === 'true' || port === 465;

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure, // true for 465, false for other ports
            auth: {
                user,
                pass,
            },
            tls: {
                // do not fail on invalid certs if any
                rejectUnauthorized: false
            }
        });

        // Send the email
        const info = await transporter.sendMail({
            from: `"PrestaClub Web" <${user}>`,
            to: to || "mayllon@prestaclub.com",
            subject: subject || "Nuevo Lead desde la Web",
            text: message,
        });

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }
}
