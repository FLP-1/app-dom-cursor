import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationCode } from '../../../../lib/phoneVerification';
import { validateBrazilianCellPhone } from '../../../../utils/validation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Número de celular é obrigatório' });
    }

    if (!validateBrazilianCellPhone(phone)) {
      return res.status(400).json({ message: 'Número de celular inválido' });
    }

    await sendVerificationCode(phone);

    return res.status(200).json({
      message: 'Código de verificação enviado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao enviar código de verificação:', error);
    return res.status(500).json({
      message: 'Erro ao enviar código de verificação',
    });
  }
} 