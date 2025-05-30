import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// TODO: Use the same secret key as defined in .env.local
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

interface AuthUserPayload {
  userId: number;
  userType: string;
  // Add any other relevant user info you included in the token
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse): AuthUserPayload | null {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  console.log('Header de autorização:', authHeader);
  console.log('Token extraído:', token);

  if (token == null) {
    // No token provided
    console.log('Nenhum token fornecido');
    res.status(401).json({ message: 'Autenticação necessária.' });
    return null;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as AuthUserPayload;
    console.log('Usuário autenticado:', user);
    // You might want to do additional checks here, e.g., if user exists in DB
    return user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      // Trate o erro conforme necessário
      console.error('Erro na verificação do JWT:', err.message);
      res.status(403).json({ message: 'Token inválido ou expirado.' });
    } else {
      // Trate erro genérico
      console.error('Erro na verificação do JWT:', err);
      res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    return null;
  }
} 