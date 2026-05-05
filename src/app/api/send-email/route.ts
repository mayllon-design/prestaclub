import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { subject, message, to } = data;

        // Verify if environment variables are set
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error("Faltan variables de entorno SMTP");
            return NextResponse.json({ success: false, error: 'Faltan credenciales SMTP en el servidor' }, { status: 500 });
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send the email
        const info = await transporter.sendMail({
            from: `"PrestaClub Web" <${process.env.SMTP_USER}>`,
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
