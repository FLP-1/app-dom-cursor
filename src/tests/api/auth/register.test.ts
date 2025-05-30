import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/auth/register';
import { prisma } from '../../../lib/prisma';
import { hash } from 'bcryptjs';

// Mock do prisma
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock do bcryptjs
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashed_password')),
}));

describe('Register API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      cpf: '12345678901',
      email: 'test@example.com',
      phone: '11999999999',
      role: 'USER',
      password: 'hashed_password',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        cpf: '12345678901',
        email: 'test@example.com',
        phone: '11999999999',
        password: 'Test123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(expect.objectContaining({
      name: mockUser.name,
      cpf: mockUser.cpf,
      email: mockUser.email,
    }));

    expect(hash).toHaveBeenCalledWith('Test123!', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'Test User',
        cpf: '12345678901',
        email: 'test@example.com',
        phone: '11999999999',
        password: 'hashed_password',
      }),
    });
  });

  it('deve retornar erro se CPF já estiver cadastrado', async () => {
    const existingUser = {
      id: '1',
      cpf: '12345678901',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        cpf: '12345678901',
        email: 'test@example.com',
        phone: '11999999999',
        password: 'Test123!',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'CPF já cadastrado',
    });
  });

  it('deve validar os campos obrigatórios', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: '',
        cpf: '',
        email: '',
        phone: '',
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