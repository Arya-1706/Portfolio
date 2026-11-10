
import nodemailer from 'nodemailer';

export const sendNotification = async ({ name, email, body }) => {
  // Email is optional. Skip if credentials aren't configured.
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const port = Number(process.env.SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `Portfolio <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `${body}\n\nFrom: ${name} <${email}>`,
  });
};
