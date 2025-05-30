import { NextApiRequest, NextApiResponse } from 'next';
import { sendPasswordResetEmail } from '../../utils/email';

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

    // Token de teste
    const testToken = 'test-token-123';

    // Enviar email de teste
    await sendPasswordResetEmail(email, testToken);

    return res.status(200).json({
      message: 'Email de teste enviado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao enviar email de teste:', error);
    return res.status(500).json({ 
      message: 'Erro ao enviar email de teste',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 