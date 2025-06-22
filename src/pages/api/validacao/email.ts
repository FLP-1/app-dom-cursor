/**
 * Arquivo: email.ts
 * Caminho: src/pages/api/validacao/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: API para validar email com mensagens centralizadas
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/services/email.service';
import { emailMessages } from '@/i18n/messages/email.messages';

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
      return res.status(400).json({
        codigo: 'EMAIL_REQUERIDO',
        mensagem: 'Email é obrigatório',
        validado: false,
      });
    }

    // Verificar se o email já está em uso
    const emailExistente = await prisma.empregador.findFirst({
      where: { email },
    });

    if (emailExistente) {
      return res.status(400).json({
        codigo: 'EMAIL_EM_USO',
        mensagem: 'Este email já está em uso',
        validado: false,
      });
    }

    // Gerar código de validação
    const codigoValidacao = Math.floor(100000 + Math.random() * 900000).toString();

    // Salvar código de validação
    await prisma.validacaoEmail.create({
      data: {
        email,
        codigo: codigoValidacao,
        expiraEm: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      },
    });

    // Enviar email com código
    const messages = emailMessages.pt.validation;
    
    await emailService.sendEmail({
      to: email,
      subject: 'Validação de Email - DOM',
      text: `${messages.codeMessage} ${codigoValidacao}`,
      html: `
        <h1>${messages.title}</h1>
        <p>${messages.codeMessage} <strong>${codigoValidacao}</strong></p>
        <p>${messages.codeExpiration}</p>
      `,
    });

    return res.status(200).json({
      codigo: 'EMAIL_ENVIADO',
      mensagem: 'Código de validação enviado para seu email',
      validado: false,
    });
  } catch (error) {
    console.error('Erro ao validar email:', error);
    return res.status(500).json({
      codigo: 'ERRO_INTERNO',
      mensagem: 'Erro ao processar validação do email',
      validado: false,
    });
  }
} 
