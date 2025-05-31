import { renderHook, act } from '@testing-library/react';
import { useEsocialEventEnvio } from '@/hooks/useEsocialEventEnvio';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventEnvio', () => {
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

  it('should send event successfully', async () => {
    const mockEnviar = jest.spyOn(EsocialEventService, 'enviar').mockResolvedValueOnce({
      ...mockEvent,
      status: 'ENVIADO'
    });

    const { result } = renderHook(() => useEsocialEventEnvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.enviarEvento(mockEvent);
    });

    expect(mockEnviar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle send error', async () => {
    const mockEnviar = jest.spyOn(EsocialEventService, 'enviar').mockRejectedValueOnce(new Error('Erro ao enviar evento'));

    const { result } = renderHook(() => useEsocialEventEnvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarEvento(mockEvent)).rejects.toThrow('Erro ao enviar evento');
    });

    expect(mockEnviar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBe('Erro ao enviar evento');
  });

  it('should handle send of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventEnvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle send of already sent event', async () => {
    const sentEvent = {
      ...mockEvent,
      status: 'ENVIADO'
    };

    const { result } = renderHook(() => useEsocialEventEnvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarEvento(sentEvent)).rejects.toThrow('Evento já enviado');
    });

    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockEnviar = jest.spyOn(EsocialEventService, 'enviar').mockRejectedValueOnce(new Error('Erro ao enviar evento'));

    const { result } = renderHook(() => useEsocialEventEnvio(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarEvento(mockEvent)).rejects.toThrow('Erro ao enviar evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 