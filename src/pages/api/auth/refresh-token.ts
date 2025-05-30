import { NextApiRequest, NextApiResponse } from 'next';
import { verify, sign } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Obtém o refresh token do cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não fornecido' });
    }

    // Verifica o refresh token
    const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };

    // Busca o usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Gera um novo token de acesso
    const newToken = sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Gera um novo refresh token
    const newRefreshToken = sign(
      { userId: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Atualiza o refresh token no cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
    ]);

    // Retorna o novo token de acesso
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
} 