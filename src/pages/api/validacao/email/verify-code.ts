import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCode } from '../../../../lib/emailVerification';
import { validateEmail } from '../../../../utils/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ 
        message: 'Email e código são obrigatórios' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Verifica o código
    const isValid = verifyCode(email, code);

    if (!isValid) {
      return res.status(400).json({ 
        message: 'Código inválido ou expirado' 
      });
    }

    return res.status(200).json({ 
      message: 'Email verificado com sucesso',
      verified: true
    });
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return res.status(500).json({ 
      message: 'Erro ao verificar código' 
    });
  }
} 