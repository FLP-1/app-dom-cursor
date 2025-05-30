import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { sendEmail } from '../../../lib/email';

// Schema de validação
const forgotPasswordSchema = z.object({
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  email: z.string().email('E-mail inválido'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Validar dados de entrada
    const data = forgotPasswordSchema.parse(req.body);

    // Buscar usuário
    const user = await prisma.user.findFirst({
      where: {
        cpf: data.cpf,
        email: data.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gerar token de redefinição de senha
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    // Salvar token no banco
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hora
      },
    });

    // Enviar e-mail com link de redefinição
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: 'Redefinição de Senha',
      html: `
        <h1>Redefinição de Senha</h1>
        <p>Olá ${user.name},</p>
        <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou esta redefinição, ignore este e-mail.</p>
      `,
    });

    return res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    console.error('Erro ao processar recuperação de senha:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 