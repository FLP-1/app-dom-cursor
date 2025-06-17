/**
 * Arquivo: email.ts
 * Caminho: src/utils/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para enviar email de recuperação de senha
 */

import nodemailer from 'nodemailer';

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: `"DOM" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Recuperação de Senha - DOM',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Recuperação de Senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha no DOM.</p>
        <p>Para prosseguir com a redefinição de senha, clique no botão abaixo:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #1976d2; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Redefinir Senha
          </a>
        </div>
        <p>Se você não solicitou a redefinição de senha, por favor ignore este email.</p>
        <p>Este link é válido por 1 hora.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Este é um email automático, por favor não responda.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar email de recuperação de senha');
  }
} 
