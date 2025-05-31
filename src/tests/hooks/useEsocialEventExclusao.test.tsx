import { renderHook, act } from '@testing-library/react';
import { useEsocialEventExclusao } from '@/hooks/useEsocialEventExclusao';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventExclusao', () => {
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

  it('should delete event successfully', async () => {
    const mockExcluir = jest.spyOn(EsocialEventService, 'excluir').mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useEsocialEventExclusao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.excluirEvento(mockEvent);
    });

    expect(mockExcluir).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle delete error', async () => {
    const mockExcluir = jest.spyOn(EsocialEventService, 'excluir').mockRejectedValueOnce(new Error('Erro ao excluir evento'));

    const { result } = renderHook(() => useEsocialEventExclusao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.excluirEvento(mockEvent)).rejects.toThrow('Erro ao excluir evento');
    });

    expect(mockExcluir).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBe('Erro ao excluir evento');
  });

  it('should handle delete of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventExclusao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.excluirEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle delete of sent event', async () => {
    const sentEvent = {
      ...mockEvent,
      status: 'ENVIADO'
    };

    const { result } = renderHook(() => useEsocialEventExclusao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.excluirEvento(sentEvent)).rejects.toThrow('Evento já enviado');
    });

    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should clear error', async () => {
    const mockExcluir = jest.spyOn(EsocialEventService, 'excluir').mockRejectedValueOnce(new Error('Erro ao excluir evento'));

    const { result } = renderHook(() => useEsocialEventExclusao(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.excluirEvento(mockEvent)).rejects.toThrow('Erro ao excluir evento');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 