import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import handler from '@/pages/api/ponto/registrar';
import { prisma } from '@/lib/prisma';

// Mock dos módulos
jest.mock('next-auth/react');
jest.mock('@/lib/prisma');

describe('API: Registrar Ponto', () => {
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
        tipo: 'ENTRADA',
        dataHora: new Date(),
        latitude: -23.5505,
        longitude: -46.6333,
        timezone: 'America/Sao_Paulo',
        dispositivo: 'test',
        ip: '127.0.0.1'
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
    (prisma.registroPonto.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.configuracaoPonto.findUnique as jest.Mock).mockResolvedValue({
      ativo: true,
      horaInicio: new Date(2024, 0, 1, 8, 0),
      horaFim: new Date(2024, 0, 1, 18, 0),
      latitude: -23.5505,
      longitude: -46.6333,
      raioMetros: 100
    });
    (prisma.registroPonto.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...mockReq.body,
      validado: true
    });
  });

  it('deve registrar ponto com sucesso', async () => {
    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      tipo: 'ENTRADA',
      validado: true
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

  it('deve validar registro duplicado', async () => {
    (prisma.registroPonto.findFirst as jest.Mock).mockResolvedValue({
      id: '1',
      tipo: 'ENTRADA',
      dataHora: new Date()
    });

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Já existe um registro para este minuto' });
  });

  it('deve validar horário permitido', async () => {
    (prisma.configuracaoPonto.findUnique as jest.Mock).mockResolvedValue({
      ativo: true,
      horaInicio: new Date(2024, 0, 1, 8, 0),
      horaFim: new Date(2024, 0, 1, 18, 0)
    });

    mockReq.body.dataHora = new Date(2024, 0, 1, 7, 0); // 07:00

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Registro fora do horário permitido' });
  });

  it('deve validar localização', async () => {
    (prisma.configuracaoPonto.findUnique as jest.Mock).mockResolvedValue({
      ativo: true,
      latitude: -23.5505,
      longitude: -46.6333,
      raioMetros: 100
    });

    mockReq.body.latitude = -23.5605; // Fora do raio permitido
    mockReq.body.longitude = -46.6433;

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Localização fora da área permitida' });
  });

  it('deve lidar com erro interno', async () => {
    (prisma.registroPonto.create as jest.Mock).mockRejectedValue(new Error('Erro interno'));

    await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro interno do servidor' });
  });
}); 