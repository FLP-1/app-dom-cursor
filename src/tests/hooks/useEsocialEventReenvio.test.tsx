import { renderHook, act } from '@testing-library/react';
import { useEsocialEventReenvio } from '@/hooks/useEsocialEventReenvio';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventReenvio', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'ERRO',
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

  it('should resend event successfully', async () => {
    const mockReenviar = jest.spyOn(EsocialEventService, 'reenviar').mockResolvedValueOnce({
      ...mockEvent,
      status: 'PENDENTE'
    });

    const { result } = renderHook(() => useEsocialEventReenvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.reenviarEvento(mockEvent);
    });

    expect(mockReenviar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isReenviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle resend error', async () => {
    const mockReenviar = jest.spyOn(EsocialEventService, 'reenviar').mockRejectedValueOnce(new Error('Erro ao reenviar evento'));

    const { result } = renderHook(() => useEsocialEventReenvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.reenviarEvento(mockEvent)).rejects.toThrow('Erro ao reenviar evento');
    });

    expect(mockReenviar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isReenviando).toBe(false);
    expect(result.current.error).toBe('Erro ao reenviar evento');
  });

  it('should handle resend of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventReenvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.reenviarEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isReenviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle resend of not errored event', async () => {
    const notErroredEvent = {
      ...mockEvent,
      status: 'PENDENTE'
    };

    const { result } = renderHook(() => useEsocialEventReenvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.reenviarEvento(notErroredEvent)).rejects.toThrow('Evento não está com erro');
    });

    expect(result.current.isReenviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockReenviar = jest.spyOn(EsocialEventService, 'reenviar').mockRejectedValueOnce(new Error('Erro ao reenviar evento'));

    const { result } = renderHook(() => useEsocialEventReenvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.reenviarEvento(mockEvent)).rejects.toThrow('Erro ao reenviar evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 