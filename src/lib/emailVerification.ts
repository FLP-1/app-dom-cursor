import { sendEmail } from './email';
import crypto from 'crypto';

interface VerificationCode {
  code: string;
  email: string;
  expiresAt: Date;
}

// Armazena os códigos de verificação em memória
// Em produção, isso deve ser substituído por um banco de dados
const verificationCodes = new Map<string, VerificationCode>();

/**
 * Gera um código de verificação de 6 dígitos
 */
function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Envia um código de verificação para o email
 * @param email - Email para enviar o código
 * @returns O código de verificação gerado
 */
export async function sendVerificationCode(email: string): Promise<string> {
  // Gera um código de 6 dígitos
  const code = generateVerificationCode();
  
  // Define a expiração para 15 minutos
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  // Armazena o código
  verificationCodes.set(email, {
    code,
    email,
    expiresAt
  });

  // Envia o email com o código
  await sendEmail({
    to: email,
    subject: 'Código de Verificação - DOM',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Verificação de Email</h2>
        <p>Olá,</p>
        <p>Seu código de verificação é:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; 
                      font-size: 24px; letter-spacing: 4px; font-weight: bold;">
            ${code}
          </div>
        </div>
        <p>Este código é válido por 15 minutos.</p>
        <p>Se você não solicitou esta verificação, por favor ignore este email.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Este é um email automático, por favor não responda.
        </p>
      </div>
    `
  });

  return code;
}

/**
 * Verifica se o código fornecido é válido para o email
 * @param email - Email a ser verificado
 * @param code - Código de verificação
 * @returns boolean indicando se o código é válido
 */
export function verifyCode(email: string, code: string): boolean {
  const verification = verificationCodes.get(email);

  if (!verification) {
    return false;
  }

  // Verifica se o código expirou
  if (verification.expiresAt < new Date()) {
    verificationCodes.delete(email);
    return false;
  }

  // Verifica se o código está correto
  const isValid = verification.code === code;

  // Se o código for válido, remove-o do armazenamento
  if (isValid) {
    verificationCodes.delete(email);
  }

  return isValid;
}

/**
 * Remove códigos expirados do armazenamento
 */
export function cleanupExpiredCodes(): void {
  const now = new Date();
  
  for (const [email, verification] of verificationCodes.entries()) {
    if (verification.expiresAt < now) {
      verificationCodes.delete(email);
    }
  }
}

// Executa a limpeza a cada 5 minutos
setInterval(cleanupExpiredCodes, 5 * 60 * 1000); 