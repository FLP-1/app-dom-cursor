/**
 * Arquivo: register.ts
 * Caminho: src/pages/api/auth/register.ts
 * Criado em: 2024-01-01
 * Última atualização: 2025-01-27
 * Descrição: API endpoint para registro de usuários.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { validateCPF } from '@/utils/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { name, cpf, email, password, phone } = req.body;

    // Validações básicas
    if (!name || !cpf || !email || !password || !phone) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Validar CPF
    if (!validateCPF(cpf.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'CPF inválido' });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Validar senha
    if (password.length < 8) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }

    // Verificar se o CPF já está cadastrado
    const existingUserByCPF = await prisma.user.findUnique({
      where: { cpf: cpf.replace(/\D/g, '') },
    });

    if (existingUserByCPF) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Verificar se o email já está cadastrado
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await hash(password, 12);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        cpf: cpf.replace(/\D/g, ''),
        email,
        password: hashedPassword,
        phone,
      },
    });

    // Remover a senha do objeto de retorno
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 
