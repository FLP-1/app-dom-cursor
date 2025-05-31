import { renderHook, act } from '@testing-library/react';
import { useEsocialEventNotificacao } from '@/hooks/useEsocialEventNotificacao';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventNotificacao', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'PROCESSADO',
    payload: {
      cpf: '12345678900',
      data: new Date(),
      dataInicioAviso: new Date(),
      dataFimAviso: new Date(),
      motivoAviso: 'DISPENSA_SEM_JUSTA_CAUSA',
      observacao: 'Aviso prévio iniciado'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get event notifications successfully', async () => {
    const mockNotificacoes = [
      {
        id: '1',
        data: new Date(),
        tipo: 'INFO',
        mensagem: 'Evento processado com sucesso',
        lida: false
      },
      {
        id: '2',
        data: new Date(),
        tipo: 'ALERTA',
        mensagem: 'Evento enviado para processamento',
        lida: true
      }
    ];

    const mockGetNotificacoes = jest.spyOn(EsocialEventService, 'getNotificacoes').mockResolvedValueOnce(mockNotificacoes);

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.getNotificacoesEvento(mockEvent);
    });

    expect(mockGetNotificacoes).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.notificacoes).toEqual(mockNotificacoes);
  });

  it('should handle get notifications error', async () => {
    const mockGetNotificacoes = jest.spyOn(EsocialEventService, 'getNotificacoes').mockRejectedValueOnce(new Error('Erro ao consultar notificações'));

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getNotificacoesEvento(mockEvent)).rejects.toThrow('Erro ao consultar notificações');
    });

    expect(mockGetNotificacoes).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao consultar notificações');
    expect(result.current.notificacoes).toEqual([]);
  });

  it('should handle get notifications of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getNotificacoesEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.notificacoes).toEqual([]);
  });

  it('should mark notification as read successfully', async () => {
    const mockNotificacao = {
      id: '1',
      data: new Date(),
      tipo: 'INFO',
      mensagem: 'Evento processado com sucesso',
      lida: false
    };

    const mockMarcarComoLida = jest.spyOn(EsocialEventService, 'marcarNotificacaoComoLida').mockResolvedValueOnce({
      ...mockNotificacao,
      lida: true
    });

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.marcarNotificacaoComoLida(mockEvent.id, mockNotificacao.id);
    });

    expect(mockMarcarComoLida).toHaveBeenCalledWith(mockEvent.id, mockNotificacao.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle mark notification as read error', async () => {
    const mockNotificacao = {
      id: '1',
      data: new Date(),
      tipo: 'INFO',
      mensagem: 'Evento processado com sucesso',
      lida: false
    };

    const mockMarcarComoLida = jest.spyOn(EsocialEventService, 'marcarNotificacaoComoLida').mockRejectedValueOnce(new Error('Erro ao marcar notificação como lida'));

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.marcarNotificacaoComoLida(mockEvent.id, mockNotificacao.id)).rejects.toThrow('Erro ao marcar notificação como lida');
    });

    expect(mockMarcarComoLida).toHaveBeenCalledWith(mockEvent.id, mockNotificacao.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao marcar notificação como lida');
  });

  it('should clear error', async () => {
    const mockGetNotificacoes = jest.spyOn(EsocialEventService, 'getNotificacoes').mockRejectedValueOnce(new Error('Erro ao consultar notificações'));

    const { result } = renderHook(() => useEsocialEventNotificacao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getNotificacoesEvento(mockEvent)).rejects.toThrow('Erro ao consultar notificações');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 