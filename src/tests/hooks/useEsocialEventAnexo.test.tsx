import { renderHook, act } from '@testing-library/react';
import { useEsocialEventAnexo } from '@/hooks/useEsocialEventAnexo';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('useEsocialEventAnexo', () => {
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

  it('should get event attachments successfully', async () => {
    const mockAnexos = [
      {
        id: '1',
        nome: 'documento.pdf',
        tipo: 'application/pdf',
        tamanho: 1024,
        data: new Date(),
        url: 'https://example.com/anexos/1'
      },
      {
        id: '2',
        nome: 'imagem.jpg',
        tipo: 'image/jpeg',
        tamanho: 2048,
        data: new Date(),
        url: 'https://example.com/anexos/2'
      }
    ];

    const mockGetAnexos = jest.spyOn(EsocialEventService, 'getAnexos').mockResolvedValueOnce(mockAnexos);

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.getAnexosEvento(mockEvent);
    });

    expect(mockGetAnexos).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.anexos).toEqual(mockAnexos);
  });

  it('should handle get attachments error', async () => {
    const mockGetAnexos = jest.spyOn(EsocialEventService, 'getAnexos').mockRejectedValueOnce(new Error('Erro ao consultar anexos'));

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getAnexosEvento(mockEvent)).rejects.toThrow('Erro ao consultar anexos');
    });

    expect(mockGetAnexos).toHaveBeenCalledWith(mockEvent.id);
    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBe('Erro ao consultar anexos');
    expect(result.current.anexos).toEqual([]);
  });

  it('should handle get attachments of invalid event', async () => {
    const invalidEvent = {
      ...mockEvent,
      id: ''
    };

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getAnexosEvento(invalidEvent as TestEvent)).rejects.toThrow('Evento inválido');
    });

    expect(result.current.isConsultando).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.anexos).toEqual([]);
  });

  it('should upload attachment successfully', async () => {
    const mockAnexo = {
      id: '1',
      nome: 'documento.pdf',
      tipo: 'application/pdf',
      tamanho: 1024,
      data: new Date(),
      url: 'https://example.com/anexos/1'
    };

    const mockFile = new File(['test'], 'documento.pdf', { type: 'application/pdf' });

    const mockUpload = jest.spyOn(EsocialEventService, 'uploadAnexo').mockResolvedValueOnce(mockAnexo);

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.uploadAnexo(mockEvent.id, mockFile);
    });

    expect(mockUpload).toHaveBeenCalledWith(mockEvent.id, mockFile);
    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle upload error', async () => {
    const mockFile = new File(['test'], 'documento.pdf', { type: 'application/pdf' });

    const mockUpload = jest.spyOn(EsocialEventService, 'uploadAnexo').mockRejectedValueOnce(new Error('Erro ao enviar anexo'));

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.uploadAnexo(mockEvent.id, mockFile)).rejects.toThrow('Erro ao enviar anexo');
    });

    expect(mockUpload).toHaveBeenCalledWith(mockEvent.id, mockFile);
    expect(result.current.isEnviando).toBe(false);
    expect(result.current.error).toBe('Erro ao enviar anexo');
  });

  it('should delete attachment successfully', async () => {
    const mockAnexo = {
      id: '1',
      nome: 'documento.pdf',
      tipo: 'application/pdf',
      tamanho: 1024,
      data: new Date(),
      url: 'https://example.com/anexos/1'
    };

    const mockDelete = jest.spyOn(EsocialEventService, 'deleteAnexo').mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.deleteAnexo(mockEvent.id, mockAnexo.id);
    });

    expect(mockDelete).toHaveBeenCalledWith(mockEvent.id, mockAnexo.id);
    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle delete error', async () => {
    const mockAnexo = {
      id: '1',
      nome: 'documento.pdf',
      tipo: 'application/pdf',
      tamanho: 1024,
      data: new Date(),
      url: 'https://example.com/anexos/1'
    };

    const mockDelete = jest.spyOn(EsocialEventService, 'deleteAnexo').mockRejectedValueOnce(new Error('Erro ao excluir anexo'));

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.deleteAnexo(mockEvent.id, mockAnexo.id)).rejects.toThrow('Erro ao excluir anexo');
    });

    expect(mockDelete).toHaveBeenCalledWith(mockEvent.id, mockAnexo.id);
    expect(result.current.isExcluindo).toBe(false);
    expect(result.current.error).toBe('Erro ao excluir anexo');
  });

  it('should clear error', async () => {
    const mockGetAnexos = jest.spyOn(EsocialEventService, 'getAnexos').mockRejectedValueOnce(new Error('Erro ao consultar anexos'));

    const { result } = renderHook(() => useEsocialEventAnexo(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.getAnexosEvento(mockEvent)).rejects.toThrow('Erro ao consultar anexos');
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
}); 