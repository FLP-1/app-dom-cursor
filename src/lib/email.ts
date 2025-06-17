/**
 * Arquivo: email.ts
 * Caminho: src/lib/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Configurar o transporter do nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Falha ao enviar e-mail');
  }
} 
