/**
 * Arquivo: perfil.ts
 * Caminho: src/pages/api/perfil.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar perfil do usuário
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';
import { messages } from '../../utils/messages';

const perfilSchema = z.object({
  name: z.string().min(3, messages.perfil.validacao.nome),
  email: z.string().email(messages.perfil.validacao.email),
  phone: z.string().min(10, messages.perfil.validacao.telefone),
  cep: z.string().min(8, messages.perfil.validacao.cep),
  logradouro: z.string().min(3, messages.perfil.validacao.logradouro),
  numero: z.string().min(1, messages.perfil.validacao.numero),
  complemento: z.string().optional(),
  bairro: z.string().min(2, messages.perfil.validacao.bairro),
  cidade: z.string().min(2, messages.perfil.validacao.cidade),
  estado: z.string().length(2, messages.perfil.validacao.estado),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: messages.perfil.erro.naoAutorizado });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: messages.perfil.erro.metodoNaoPermitido });
  }

  try {
    const data = perfilSchema.parse(req.body);

    // Verifica se o email já está em uso por outro usuário
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data.email,
        id: { not: session.user.id },
      },
    });

    if (emailExists) {
      return res.status(400).json({ error: messages.perfil.erro.emailJaExiste });
    }

    // Verifica se o telefone já está em uso por outro usuário
    const phoneExists = await prisma.user.findFirst({
      where: {
        phone: data.phone,
        id: { not: session.user.id },
      },
    });

    if (phoneExists) {
      return res.status(400).json({ error: messages.perfil.erro.telefoneJaExiste });
    }

    // Atualiza o perfil do usuário
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }

    console.error('Erro ao atualizar perfil:', error);
    return res.status(500).json({ error: messages.perfil.erro.atualizacao });
  }
} 
