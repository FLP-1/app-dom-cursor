import { renderHook, act } from '@testing-library/react';
import { useEsocialEventHistorico } from '@/hooks/useEsocialEventHistorico';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventHistorico', () => {
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

  it('should get event history successfully', async () => {
    const mockHistorico = [
      {
        data: new Date(),
        status: 'PENDENTE',
        observacao: 'Evento criado'
      },
      {
        data: new Date(),
        status: 'ENVIADO',
        observacao: 'Evento enviado'
      },
      {
        data: new Date(),
        status: 'PROCESSADO',
        observacao: 'Evento processado com sucesso'
      }
    ];

    const mockGetHistorico = jest.spyOn(EsocialEventService, 'getHistorico').mockResolvedValueOnce(mockHistorico);

    const { result } = renderHook(() => useEsocialEventHistorico(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.getHistoricoEvento(mockEvent);
    });

    expect(mockGetHistorico).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.historico).toEqual(mockHistorico);
  });

  it('should handle get history error', async () => {
    const mockGetHistorico = jest.spyOn(EsocialEventService, 'getHistorico').mockRejectedValueOnce(new Error('Erro ao consultar histórico'));

    const { result } = renderHook(() => useEsocialEventHistorico(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getHistoricoEvento(mockEvent)).rejects.toThrow('Erro ao consultar histórico');
    });

    expect(mockGetHistorico).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao consultar histórico');
    expect(result.current.historico).toEqual([]);
  });

  it('should handle get history of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventHistorico(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getHistoricoEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.historico).toEqual([]);
  });

  it('should clear error', async () => {
    const mockGetHistorico = jest.spyOn(EsocialEventService, 'getHistorico').mockRejectedValueOnce(new Error('Erro ao consultar histórico'));

    const { result } = renderHook(() => useEsocialEventHistorico(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getHistoricoEvento(mockEvent)).rejects.toThrow('Erro ao consultar histórico');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 