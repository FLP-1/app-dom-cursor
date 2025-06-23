/**
 * Arquivo: email.ts
 * Caminho: src/pages/api/health/email.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: API de health check para o serviço de email
 */

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const startTime = Date.now();

  try {
    // Testa configuração do SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verifica se as credenciais são válidas
    await transporter.verify();

    const responseTime = Date.now() - startTime;

    return res.status(200).json({
      status: 'healthy',
      service: 'email',
      responseTime,
      details: {
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === 'true',
          authenticated: true
        },
        sendgrid: {
          configured: !!process.env.SENDGRID_API_KEY,
          fromEmail: process.env.SENDGRID_FROM_EMAIL
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return res.status(503).json({
      status: 'down',
      service: 'email',
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          configured: !!(process.env.SMTP_HOST && process.env.SMTP_USER)
        }
      },
      timestamp: new Date().toISOString()
    });
  }
} 