import { renderHook, act } from '@testing-library/react';
import { useEsocialEventCancelamento } from '@/hooks/useEsocialEventCancelamento';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventCancelamento', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'PENDENTE',
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

  it('should cancel event successfully', async () => {
    const mockCancelar = jest.spyOn(EsocialEventService, 'cancelar').mockResolvedValueOnce({
      ...mockEvent,
      status: 'CANCELADO'
    });

    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.cancelarEvento(mockEvent, 'Motivo do cancelamento');
    });

    expect(mockCancelar).toHaveBeenCalledWith(mockEvent.id, 'Motivo do cancelamento');
    expect(result.current.isCancelando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle cancel error', async () => {
    const mockCancelar = jest.spyOn(EsocialEventService, 'cancelar').mockRejectedValueOnce(new Error('Erro ao cancelar evento'));

    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.cancelarEvento(mockEvent, 'Motivo do cancelamento')).rejects.toThrow('Erro ao cancelar evento');
    });

    expect(mockCancelar).toHaveBeenCalledWith(mockEvent.id, 'Motivo do cancelamento');
    expect(result.current.isCancelando).toBe(false);
    expect(result.current.error).toBe('Erro ao cancelar evento');
  });

  it('should handle cancel of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.cancelarEvento(invalidEvent as TestEvent, 'Motivo do cancelamento')).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isCancelando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle cancel of already cancelled event', async () => {
    const cancelledEvent = {
      ...mockEvent,
      status: 'CANCELADO'
    };

    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.cancelarEvento(cancelledEvent, 'Motivo do cancelamento')).rejects.toThrow('Evento já cancelado');
    });

    expect(result.current.isCancelando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle cancel without reason', async () => {
    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.cancelarEvento(mockEvent, '')).rejects.toThrow('Motivo do cancelamento é obrigatório');
    });

    expect(result.current.isCancelando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockCancelar = jest.spyOn(EsocialEventService, 'cancelar').mockRejectedValueOnce(new Error('Erro ao cancelar evento'));

    const { result } = renderHook(() => useEsocialEventCancelamento(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.cancelarEvento(mockEvent, 'Motivo do cancelamento')).rejects.toThrow('Erro ao cancelar evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 