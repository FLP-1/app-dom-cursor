import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/auth/reset-password';
import { prisma } from '../../../lib/prisma';
import { sign } from 'jsonwebtoken';

// Mock do prisma
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    passwordReset: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      update: jest.fn(),
    },
  },
}));

describe('Reset Password API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve redefinir senha com sucesso', async () => {
    const userId = '1';
    const token = sign({ userId }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

    const mockPasswordReset = {
      id: '1',
      userId,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    };

    (prisma.passwordReset.findFirst as jest.Mock).mockResolvedValue(mockPasswordReset);
    (prisma.user.update as jest.Mock).mockResolvedValue({});
    (prisma.passwordReset.delete as jest.Mock).mockResolvedValue({});

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        token,
        password: 'NewPassword123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Senha redefinida com sucesso',
    });
    expect(prisma.user.update).toHaveBeenCalled();
    expect(prisma.passwordReset.delete).toHaveBeenCalled();
  });

  it('deve retornar erro se token for inválido', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        token: 'invalid_token',
        password: 'NewPassword123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Token inválido ou expirado',
    });
  });

  it('deve retornar erro se token estiver expirado', async () => {
    const userId = '1';
    const token = sign({ userId }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '0s' });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        token,
        password: 'NewPassword123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Token inválido ou expirado',
    });
  });

  it('deve validar os campos obrigatórios', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        token: '',
        password: '',
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