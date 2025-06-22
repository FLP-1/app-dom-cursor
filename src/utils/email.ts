/**
 * Arquivo: email.ts
 * Caminho: src/utils/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Função para enviar email de recuperação de senha com mensagens centralizadas
 */

import nodemailer from 'nodemailer';
import { emailMessages } from '@/i18n/messages/email.messages';

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string, language: 'pt' | 'en' = 'pt'): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
  const messages = emailMessages[language].passwordReset;

  const mailOptions = {
    from: `"DOM" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: language === 'pt' ? 'Recuperação de Senha - DOM' : 'Password Recovery - DOM',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">${messages.title}</h2>
        <p>${messages.greeting}</p>
        <p>${messages.requestMessage}</p>
        <p>${messages.actionMessage}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #1976d2; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            ${language === 'pt' ? 'Redefinir Senha' : 'Reset Password'}
          </a>
        </div>
        <p>${messages.ignoreMessage}</p>
        <p>${messages.linkExpiration}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          ${language === 'pt' ? 'Este é um email automático, por favor não responda.' : 'This is an automatic email, please do not reply.'}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error(language === 'pt' ? 'Falha ao enviar email de recuperação de senha' : 'Failed to send password recovery email');
  }
} 
