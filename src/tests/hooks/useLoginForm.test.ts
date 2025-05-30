import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Mock dos hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../hooks/useNotification');

describe('useLoginForm', () => {
  const mockLogin = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useNotification as jest.Mock).mockReturnValue({ showNotification: mockShowNotification });
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formState.isSubmitting).toBe(false);
    expect(result.current.formState.errors).toEqual({});
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.email).toBeDefined();
    expect(result.current.formState.errors.senha).toBeDefined();
  });

  it('deve validar formato de email', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'email-invalido');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.email).toBeDefined();
  });

  it('deve validar tamanho mínimo da senha', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('senha', '123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.senha).toBeDefined();
  });

  it('deve chamar login com credenciais válidas', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'usuario@exemplo.com',
      senha: 'senha123',
    });
  });

  it('deve mostrar notificação de sucesso ao fazer login', async () => {
    mockLogin.mockResolvedValueOnce({});

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'success',
      message: 'Login realizado com sucesso',
    });
  });

  it('deve mostrar notificação de erro ao falhar login', async () => {
    const error = new Error('Credenciais inválidas');
    mockLogin.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao fazer login: Credenciais inválidas',
    });
  });

  it('deve limpar formulário após login bem-sucedido', async () => {
    mockLogin.mockResolvedValueOnce({});

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.getValues('email')).toBe('');
    expect(result.current.getValues('senha')).toBe('');
  });

  it('deve manter valores do formulário após erro de login', async () => {
    const error = new Error('Credenciais inválidas');
    mockLogin.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.getValues('email')).toBe('usuario@exemplo.com');
    expect(result.current.getValues('senha')).toBe('senha123');
  });

  it('deve desabilitar submit durante o envio', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
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

  it('deve validar força da senha', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('senha', 'senha');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.senha).toBeDefined();
  });

  it('deve validar domínio de email', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@dominioinvalido.com');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.formState.errors.email).toBeDefined();
  });

  it('deve lidar com erros de rede', async () => {
    const error = new Error('Erro de conexão');
    mockLogin.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao fazer login: Erro de conexão',
    });
  });

  it('deve lidar com timeout', async () => {
    const error = new Error('Timeout');
    mockLogin.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      result.current.setValue('email', 'usuario@exemplo.com');
      result.current.setValue('senha', 'senha123');
      await result.current.handleSubmit(result.current.onSubmit)();
    });

    expect(mockShowNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Erro ao fazer login: Timeout',
    });
  });
}); 