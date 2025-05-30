import { createMocks } from 'node-mocks-http';
import handler from '../perfil';
import { prisma } from '../../../lib/prisma';
import { messages } from '../../../utils/messages';

// Mock do prisma
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Mock do next-auth
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

describe('API Perfil', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '11999999999',
    cep: '12345678',
    logradouro: 'Rua Teste',
    numero: '123',
    complemento: 'Apto 1',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 401 quando não há sessão', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: mockUser,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.erro.naoAutorizado,
    });
  });

  it('deve retornar 405 quando o método não é PUT', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.erro.metodoNaoPermitido,
    });
  });

  it('deve retornar 400 quando o email já está em uso', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        ...mockUser,
        email: 'existing@example.com',
      },
    });

    (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce({
      id: '2',
      email: 'existing@example.com',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.erro.emailJaExiste,
    });
  });

  it('deve retornar 400 quando o telefone já está em uso', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        ...mockUser,
        phone: '11988888888',
      },
    });

    (prisma.user.findFirst as jest.Mock)
      .mockResolvedValueOnce(null) // Email não existe
      .mockResolvedValueOnce({
        id: '2',
        phone: '11988888888',
      });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.erro.telefoneJaExiste,
    });
  });

  it('deve atualizar o perfil com sucesso', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: mockUser,
    });

    (prisma.user.findFirst as jest.Mock)
      .mockResolvedValueOnce(null) // Email não existe
      .mockResolvedValueOnce(null); // Telefone não existe

    (prisma.user.update as jest.Mock).mockResolvedValueOnce(mockUser);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      data: mockUser,
    });
  });

  it('deve retornar 400 quando os dados são inválidos', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        ...mockUser,
        name: 'Te', // Nome muito curto
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.validacao.nome,
    });
  });

  it('deve retornar 500 quando ocorre um erro interno', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: mockUser,
    });

    (prisma.user.findFirst as jest.Mock).mockRejectedValueOnce(new Error('Erro interno'));

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: messages.perfil.erro.atualizacao,
    });
  });
}); 