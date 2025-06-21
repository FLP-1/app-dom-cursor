/**
 * Arquivo: send-code.ts
 * Caminho: src/pages/api/validacao/email/send-code.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para enviar código de verificação para email
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationCode } from '@/lib/emailVerification';
import { validateEmail } from '@/utils/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Envia o código de verificação
    await sendVerificationCode(email);

    return res.status(200).json({ 
      message: 'Código de verificação enviado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao enviar código de verificação:', error);
    return res.status(500).json({ 
      message: 'Erro ao enviar código de verificação' 
    });
  }
} 
