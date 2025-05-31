import { renderHook, act } from '@testing-library/react';
import { useEsocialEventConsulta } from '@/hooks/useEsocialEventConsulta';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventConsulta', () => {
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

  it('should consult event successfully', async () => {
    const mockConsultar = jest.spyOn(EsocialEventService, 'consultar').mockResolvedValueOnce({
      ...mockEvent,
      status: 'PROCESSADO',
      protocolo: '123456789'
    });

    const { result } = renderHook(() => useEsocialEventConsulta(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.consultarEvento(mockEvent);
    });

    expect(mockConsultar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle consult error', async () => {
    const mockConsultar = jest.spyOn(EsocialEventService, 'consultar').mockRejectedValueOnce(new Error('Erro ao consultar evento'));

    const { result } = renderHook(() => useEsocialEventConsulta(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.consultarEvento(mockEvent)).rejects.toThrow('Erro ao consultar evento');
    });

    expect(mockConsultar).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao consultar evento');
  });

  it('should handle consult of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventConsulta(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.consultarEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle consult of not sent event', async () => {
    const notSentEvent = {
      ...mockEvent,
      status: 'PENDENTE'
    };

    const { result } = renderHook(() => useEsocialEventConsulta(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.consultarEvento(notSentEvent)).rejects.toThrow('Evento não enviado');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockConsultar = jest.spyOn(EsocialEventService, 'consultar').mockRejectedValueOnce(new Error('Erro ao consultar evento'));

    const { result } = renderHook(() => useEsocialEventConsulta(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.consultarEvento(mockEvent)).rejects.toThrow('Erro ao consultar evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 