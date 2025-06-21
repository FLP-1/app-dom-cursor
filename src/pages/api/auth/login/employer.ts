/**
 * Arquivo: employer.ts
 * Caminho: src/pages/api/auth/login/employer.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para login de empregadores
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateCPF } from '@/utils/validators';

const prisma = new PrismaClient();

// TODO: Define a secret key for JWT. Use a strong, random key and store it securely (e.g., in .env.local)
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cpf, password } = req.body;
  console.log('Tentativa de login:', cpf);

  // Basic validation
  if (!cpf || !password) {
    return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
  }

  // Validate CPF using the shared function
  const cleanCpf = cpf.replace(/\D/g, '');
  console.log('CPF limpo:', cleanCpf);
  if (!validateCPF(cleanCpf)) {
      return res.status(400).json({ message: 'CPF inválido.' });
  }

  try {
    // Find the user by CPF
    const user = await prisma.user.findFirst({
      where: {
        cpf: cleanCpf,
      },
      select: {
        id: true,
        password: true,
        name: true,
      }
    });
    console.log('Usuário encontrado:', user);

    if (!user) {
      console.log('Usuário não encontrado para o CPF:', cpf);
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Senha confere?', passwordMatch);

    if (!passwordMatch) {
      console.log('Senha incorreta para o CPF:', cpf);
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // TODO: Check if email/phone are verified if required for login

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour, adjust as needed
    );

    // Return token and user info
    res.status(200).json({
      token,
      user: {
        userId: user.id,
        name: user.name,
      },
    });

  } catch (err) {
    console.error('Database or processing error:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
} 
