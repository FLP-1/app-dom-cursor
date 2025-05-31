import { renderHook, act } from '@testing-library/react';
import { useChat } from '@/hooks/useChat';
import { ChatService } from '@/services/ChatService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestMensagem, TestDocumento } from '@/tests/types';

jest.mock('@/services/ChatService');

describe('useChat', () => {
  const mockMensagem: TestMensagem = {
    id: '1',
    texto: 'Teste',
    data: new Date(),
    remetenteId: '1',
    destinatarioId: '2',
    lida: false
  };

  const mockDocumento: TestDocumento = {
    id: '1',
    nome: 'teste.pdf',
    tipo: 'application/pdf',
    tamanho: 1024,
    url: 'https://exemplo.com/teste.pdf'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send message successfully', async () => {
    const mockEnviarMensagem = jest.spyOn(ChatService, 'enviarMensagem').mockResolvedValueOnce(mockMensagem);

    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.enviarMensagem('Teste');
    });

    expect(mockEnviarMensagem).toHaveBeenCalledWith('Teste');
    expect(result.current.mensagens).toContain(mockMensagem);
  });

  it('should handle undefined message', async () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarMensagem(undefined as unknown as string)).rejects.toThrow('Mensagem inválida');
    });

    expect(result.current.mensagens).toEqual([]);
  });

  it('should handle null message', async () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarMensagem(null as unknown as string)).rejects.toThrow('Mensagem inválida');
    });

    expect(result.current.mensagens).toEqual([]);
  });

  it('should send document successfully', async () => {
    const mockEnviarDocumento = jest.spyOn(ChatService, 'enviarDocumento').mockResolvedValueOnce(mockDocumento);

    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.enviarDocumento(mockDocumento);
    });

    expect(mockEnviarDocumento).toHaveBeenCalledWith(mockDocumento);
    expect(result.current.documentos).toContain(mockDocumento);
  });

  it('should handle undefined document', async () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarDocumento(undefined as unknown as TestDocumento)).rejects.toThrow('Documento inválido');
    });

    expect(result.current.documentos).toEqual([]);
  });

  it('should handle null document', async () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.enviarDocumento(null as unknown as TestDocumento)).rejects.toThrow('Documento inválido');
    });

    expect(result.current.documentos).toEqual([]);
  });

  it('should load messages successfully', async () => {
    const mockGetMensagens = jest.spyOn(ChatService, 'getMensagens').mockResolvedValueOnce([mockMensagem]);

    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarMensagens();
    });

    expect(mockGetMensagens).toHaveBeenCalled();
    expect(result.current.mensagens).toEqual([mockMensagem]);
  });

  it('should handle error when loading messages', async () => {
    const mockGetMensagens = jest.spyOn(ChatService, 'getMensagens').mockRejectedValueOnce(new Error('Erro ao carregar mensagens'));

    const { result } = renderHook(() => useChat(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.carregarMensagens()).rejects.toThrow('Erro ao carregar mensagens');
    });

    expect(mockGetMensagens).toHaveBeenCalled();
    expect(result.current.mensagens).toEqual([]);
  });
}); 