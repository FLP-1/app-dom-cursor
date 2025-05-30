import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import handler from '@/pages/api/ponto/configuracao';
import { prisma } from '@/lib/prisma';

// Mock dos módulos
jest.mock('next-auth/react');
jest.mock('@/lib/prisma');

describe('API: Configuração do Ponto', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockReq = {
      method: 'POST',
      body: {
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0),
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100,
        ativo: true
      }
    };

    mockRes = {
      status: statusMock,
      json: jsonMock
    };

    // Mock do getSession
    (getSession as jest.Mock).mockResolvedValue({
      user: {
        id: '1'
      }
    });

    // Mock do prisma
    (prisma.configuracaoPonto.upsert as jest.Mock).mockResolvedValue({
      id: '1',
      usuarioId: '1',
      ...mockReq.body
    });
  });

  it('deve salvar configuração com sucesso', async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      usuarioId: '1',
      ativo: true
    }));
  });

  it('deve retornar erro 405 para método não permitido', async () => {
    mockReq.method = 'GET';

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(405);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Método não permitido' });
  });

  it('deve retornar erro 401 para usuário não autenticado', async () => {
    (getSession as jest.Mock).mockResolvedValue(null);

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Não autorizado' });
  });

  it('deve validar dados obrigatórios', async () => {
    mockReq.body = {};

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Dados inválidos'
    }));
  });

  it('deve validar raio permitido', async () => {
    mockReq.body.raioMetros = 50; // Menor que o mínimo permitido (100)

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Dados inválidos'
    }));
  });

  it('deve lidar com erro interno', async () => {
    (prisma.configuracaoPonto.upsert as jest.Mock).mockRejectedValue(new Error('Erro interno'));

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro interno do servidor' });
  });
}); 