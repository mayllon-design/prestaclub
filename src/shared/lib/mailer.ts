import nodemailer from "nodemailer";

// Envío de correos por SMTP. Se configura con variables de entorno:
//   SMTP_HOST, SMTP_PORT (465 por defecto), SMTP_USER, SMTP_PASS, SMTP_FROM
// Si falta SMTP_HOST o SMTP_USER no se envía nada y sendMail devuelve false.

export const smtpConfigurado = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

export async function sendMail(opts: { to: string | string[]; subject: string; text: string; replyTo?: string }) {
  if (!smtpConfigurado()) return false;
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transport.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, ...opts });
  return true;
}
