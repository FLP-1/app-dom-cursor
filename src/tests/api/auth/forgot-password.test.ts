import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/auth/forgot-password';
import { prisma } from '../../../lib/prisma';
import { sendEmail } from '../../../lib/email';

// Mock do prisma e do serviço de email
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
    passwordReset: {
      create: jest.fn(),
    },
  },
}));

jest.mock('../../../lib/email', () => ({
  sendEmail: jest.fn(),
}));

describe('Forgot Password API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve enviar email de recuperação com sucesso', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    };

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (prisma.passwordReset.create as jest.Mock).mockResolvedValue({});
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        cpf: '12345678901',
        email: 'test@example.com',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'E-mail de recuperação enviado com sucesso',
    });
    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: mockUser.email,
      subject: 'Redefinição de Senha',
    }));
  });

  it('deve retornar erro se usuário não for encontrado', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        cpf: '12345678901',
        email: 'test@example.com',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Usuário não encontrado',
    });
  });

  it('deve validar os campos obrigatórios', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        cpf: '',
        email: '',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: expect.any(String),
    });
  });

  it('deve rejeitar método não permitido', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Método não permitido',
    });
  });
}); 