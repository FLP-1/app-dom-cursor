/**
 * Arquivo: phoneVerification.ts
 * Caminho: src/lib/phoneVerification.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { sendSMS } from './sms';
import crypto from 'crypto';

interface VerificationCode {
  code: string;
  phone: string;
  expiresAt: Date;
}

// Em produção, isso deve ser substituído por um banco de dados
const verificationCodes = new Map<string, VerificationCode>();

function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function sendVerificationCode(phone: string): Promise<void> {
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  verificationCodes.set(phone, {
    code,
    phone,
    expiresAt,
  });

  await sendSMS(phone, `Seu código de verificação é: ${code}`);
}

export function verifyCode(phone: string, code: string): boolean {
  const verification = verificationCodes.get(phone);

  if (!verification) {
    return false;
  }

  if (verification.expiresAt < new Date()) {
    verificationCodes.delete(phone);
    return false;
  }

  if (verification.code !== code) {
    return false;
  }

  verificationCodes.delete(phone);
  return true;
}

// Limpa códigos expirados a cada 5 minutos
setInterval(() => {
  const now = new Date();
  for (const [phone, verification] of verificationCodes.entries()) {
    if (verification.expiresAt < now) {
      verificationCodes.delete(phone);
    }
  }
}, 5 * 60 * 1000); 
