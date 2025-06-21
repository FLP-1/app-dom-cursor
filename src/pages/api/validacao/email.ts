/**
 * Arquivo: email.ts
 * Caminho: src/pages/api/validacao/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para validar email
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/services/email';

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
    await sendEmail({
      to: email,
      subject: 'Validação de Email - DOM',
      text: `Seu código de validação é: ${codigoValidacao}`,
      html: `
        <h1>Validação de Email</h1>
        <p>Seu código de validação é: <strong>${codigoValidacao}</strong></p>
        <p>Este código expira em 30 minutos.</p>
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
