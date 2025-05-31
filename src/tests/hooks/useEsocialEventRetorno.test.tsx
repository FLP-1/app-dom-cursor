import { renderHook, act } from '@testing-library/react';
import { useEsocialEventRetorno } from '@/hooks/useEsocialEventRetorno';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventRetorno', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'ENVIADO',
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

  it('should get event return successfully', async () => {
    const mockRetorno = {
      protocolo: '123456789',
      dataProcessamento: new Date(),
      codigoResposta: '201',
      descricaoResposta: 'Evento processado com sucesso'
    };

    const mockGetRetorno = jest.spyOn(EsocialEventService, 'getRetorno').mockResolvedValueOnce(mockRetorno);

    const { result } = renderHook(() => useEsocialEventRetorno(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.getRetornoEvento(mockEvent);
    });

    expect(mockGetRetorno).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.retorno).toEqual(mockRetorno);
  });

  it('should handle get return error', async () => {
    const mockGetRetorno = jest.spyOn(EsocialEventService, 'getRetorno').mockRejectedValueOnce(new Error('Erro ao consultar retorno'));

    const { result } = renderHook(() => useEsocialEventRetorno(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getRetornoEvento(mockEvent)).rejects.toThrow('Erro ao consultar retorno');
    });

    expect(mockGetRetorno).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao consultar retorno');
    expect(result.current.retorno).toBeNull();
  });

  it('should handle get return of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventRetorno(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getRetornoEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.retorno).toBeNull();
  });

  it('should handle get return of not sent event', async () => {
    const notSentEvent = {
      ...mockEvent,
      status: 'PENDENTE'
    };

    const { result } = renderHook(() => useEsocialEventRetorno(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getRetornoEvento(notSentEvent)).rejects.toThrow('Evento não enviado');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.retorno).toBeNull();
  });

  it('should clear error', async () => {
    const mockGetRetorno = jest.spyOn(EsocialEventService, 'getRetorno').mockRejectedValueOnce(new Error('Erro ao consultar retorno'));

    const { result } = renderHook(() => useEsocialEventRetorno(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getRetornoEvento(mockEvent)).rejects.toThrow('Erro ao consultar retorno');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 