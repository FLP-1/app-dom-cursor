import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { sendSMS } from '../../../services/sms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { telefone } = req.body;

    if (!telefone) {
      return res.status(400).json({
        codigo: 'TELEFONE_REQUERIDO',
        mensagem: 'Telefone é obrigatório',
        validado: false,
      });
    }

    // Verificar se o telefone já está em uso
    const telefoneExistente = await prisma.empregador.findFirst({
      where: { telefone },
    });

    if (telefoneExistente) {
      return res.status(400).json({
        codigo: 'TELEFONE_EM_USO',
        mensagem: 'Este telefone já está em uso',
        validado: false,
      });
    }

    // Gerar código de validação
    const codigoValidacao = Math.floor(100000 + Math.random() * 900000).toString();

    // Salvar código de validação
    await prisma.validacaoTelefone.create({
      data: {
        telefone,
        codigo: codigoValidacao,
        expiraEm: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      },
    });

    // Enviar SMS com código
    await sendSMS({
      to: telefone,
      message: `Seu código de validação é: ${codigoValidacao}`,
    });

    return res.status(200).json({
      codigo: 'SMS_ENVIADO',
      mensagem: 'Código de validação enviado para seu telefone',
      validado: false,
    });
  } catch (error) {
    console.error('Erro ao validar telefone:', error);
    return res.status(500).json({
      codigo: 'ERRO_INTERNO',
      mensagem: 'Erro ao processar validação do telefone',
      validado: false,
    });
  }
} 