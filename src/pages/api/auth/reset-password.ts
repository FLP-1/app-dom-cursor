/**
 * Arquivo: reset-password.ts
 * Caminho: src/pages/api/auth/reset-password.ts
 * Criado em: 2024-01-01
 * Última atualização: 2025-01-27
 * Descrição: API endpoint para reset de senha.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

// Schema de validação
const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Validar dados de entrada
    const data = resetPasswordSchema.parse(req.body);

    // Verificar token
    const decoded = verify(data.token, process.env.JWT_SECRET || 'default_secret') as { userId: string };

    // Buscar registro de redefinição de senha
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        userId: decoded.userId,
        token: data.token,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!passwordReset) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    // Hash da nova senha
    const hashedPassword = await hash(data.password, 10);

    // Atualizar senha do usuário
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    // Remover token usado
    await prisma.passwordReset.delete({
      where: { id: passwordReset.id },
    });

    return res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    console.error('Erro ao redefinir senha:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 
