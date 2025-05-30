import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCode } from '../../../../lib/phoneVerification';
import { validateBrazilianCellPhone } from '../../../../utils/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({
        message: 'Número de celular e código são obrigatórios',
      });
    }

    if (!validateBrazilianCellPhone(phone)) {
      return res.status(400).json({ message: 'Número de celular inválido' });
    }

    const isValid = verifyCode(phone, code);

    if (!isValid) {
      return res.status(400).json({
        message: 'Código inválido ou expirado',
      });
    }

    return res.status(200).json({
      message: 'Celular verificado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return res.status(500).json({
      message: 'Erro ao verificar código',
    });
  }
} 