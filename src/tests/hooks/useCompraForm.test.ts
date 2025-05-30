import { renderHook, act } from '@testing-library/react';
import { useCompraForm } from '../../hooks/useCompraForm';
import { useNotification } from '../../hooks/useNotification';
import { api } from '../../services/api';

// Mock dos hooks e serviços
jest.mock('../../hooks/useNotification');
jest.mock('../../services/api');

describe('useCompraForm', () => {
  const mockShowNotification = jest.fn();
  const mockPost = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotification as jest.Mock).mockReturnValue({ showNotification: mockShowNotification });
    (api.post as jest.Mock) = mockPost;
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useCompraForm());

    expect(result.current.formState.isSubmitting).toBe(false);
    expect(result.current.formState.errors).toEqual({});
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.produto).toBeDefined();
    expect(result.current.formState.errors.quantidade).toBeDefined();
    expect(result.current.formState.errors.valor).toBeDefined();
  });

  it('deve validar quantidade mínima', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('quantidade', 0);
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.quantidade).toBeDefined();
  });

  it('deve validar valor mínimo', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('valor', 0);
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.valor).toBeDefined();
  });

  it('deve validar data futura', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('data', new Date('2023-01-01'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.data).toBeDefined();
  });

  it('deve enviar compra com dados válidos', async () => {
    const compraData = {
      produto: 'Produto Teste',
      quantidade: 5,
      valor: 100,
      data: new Date('2024-04-15'),
      fornecedor: 'Fornecedor Teste',
      observacoes: 'Observações teste',
    };

    mockPost.mockResolvedValueOnce({ data: { id: 1, ...compraData } });

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', compraData.produto);
      result.current.setValue('quantidade', compraData.quantidade);
      result.current.setValue('valor', compraData.valor);
      result.current.setValue('data', compraData.data);
      result.current.setValue('fornecedor', compraData.fornecedor);
      result.current.setValue('observacoes', compraData.observacoes);
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockPost).toHaveBeenCalledWith('/compras', compraData);
  });

  it('deve mostrar notificação de sucesso ao registrar compra', async () => {
    mockPost.mockResolvedValueOnce({ data: { id: 1 } });

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'success',
      message: 'Compra registrada com sucesso',
    });
  });

  it('deve mostrar notificação de erro ao falhar registro', async () => {
    const error = new Error('Erro ao registrar compra');
    mockPost.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao registrar compra: Erro ao registrar compra',
    });
  });

  it('deve limpar formulário após registro bem-sucedido', async () => {
    mockPost.mockResolvedValueOnce({ data: { id: 1 } });

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.getValues('produto')).toBe('');
    expect(result.current.getValues('quantidade')).toBe(0);
    expect(result.current.getValues('valor')).toBe(0);
    expect(result.current.getValues('data')).toBeNull();
  });

  it('deve manter valores do formulário após erro de registro', async () => {
    const error = new Error('Erro ao registrar compra');
    mockPost.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.getValues('produto')).toBe('Produto Teste');
    expect(result.current.getValues('quantidade')).toBe(5);
    expect(result.current.getValues('valor')).toBe(100);
  });

  it('deve desabilitar submit durante o envio', async () => {
    mockPost.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useCompraForm());

    act(() => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
    });

    expect(result.current.formState.isSubmitting).toBe(false);

    act(() => {
      result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.isSubmitting).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve validar valor total da compra', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('quantidade', 1000);
      result.current.setValue('valor', 1000);
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.valor).toBeDefined();
  });

  it('deve validar quantidade máxima', async () => {
    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('quantidade', 10000);
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.quantidade).toBeDefined();
  });

  it('deve lidar com erros de rede', async () => {
    const error = new Error('Erro de conexão');
    mockPost.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao registrar compra: Erro de conexão',
    });
  });

  it('deve lidar com timeout', async () => {
    const error = new Error('Timeout');
    mockPost.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCompraForm());

    await act(async () => {
      result.current.setValue('produto', 'Produto Teste');
      result.current.setValue('quantidade', 5);
      result.current.setValue('valor', 100);
      result.current.setValue('data', new Date('2024-04-15'));
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao registrar compra: Timeout',
    });
  });
}); 