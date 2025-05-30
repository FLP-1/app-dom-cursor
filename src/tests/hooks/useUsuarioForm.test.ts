import { renderHook, act } from '@testing-library/react-hooks';
import { useUsuarioForm } from '../../hooks/forms/useUsuarioForm';
import { usuarioService } from '../../services/usuario.service';

// Mock dos serviços
jest.mock('../../services/usuario.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('useUsuarioForm', () => {
  const mockInitialValues = {
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'Senha@123',
    confirmarSenha: 'Senha@123',
    perfil: 'ADMIN',
    ativo: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar o hook com valores padrão', () => {
    const { result } = renderHook(() => useUsuarioForm());

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve inicializar o hook com valores iniciais', () => {
    const { result } = renderHook(() => useUsuarioForm(mockInitialValues));

    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isSubmitting).toBe(false);
  });

  it('deve criar um novo usuário com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (usuarioService.create as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useUsuarioForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(usuarioService.create).toHaveBeenCalledWith(mockInitialValues);
  });

  it('deve atualizar um usuário existente com sucesso', async () => {
    const mockResponse = { ...mockInitialValues, id: '1' };
    (usuarioService.update as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useUsuarioForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(usuarioService.update).toHaveBeenCalledWith('1', mockInitialValues);
  });

  it('deve validar e-mail inválido', async () => {
    const { result } = renderHook(() => useUsuarioForm());

    const invalidEmail = { ...mockInitialValues, email: 'email-invalido' };

    await act(async () => {
      await result.current.handleSubmit(invalidEmail)();
    });

    expect(usuarioService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.email).toBeDefined();
  });

  it('deve validar senha fraca', async () => {
    const { result } = renderHook(() => useUsuarioForm());

    const weakPassword = { ...mockInitialValues, senha: '123', confirmarSenha: '123' };

    await act(async () => {
      await result.current.handleSubmit(weakPassword)();
    });

    expect(usuarioService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.senha).toBeDefined();
  });

  it('deve validar senhas diferentes', async () => {
    const { result } = renderHook(() => useUsuarioForm());

    const differentPasswords = { ...mockInitialValues, senha: 'Senha@123', confirmarSenha: 'Senha@456' };

    await act(async () => {
      await result.current.handleSubmit(differentPasswords)();
    });

    expect(usuarioService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.confirmarSenha).toBeDefined();
  });

  it('deve validar campos obrigatórios', async () => {
    const { result } = renderHook(() => useUsuarioForm());

    const emptyValues = {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      perfil: '',
      ativo: true
    };

    await act(async () => {
      await result.current.handleSubmit(emptyValues)();
    });

    expect(usuarioService.create).not.toHaveBeenCalled();
    expect(result.current.formState.errors.nome).toBeDefined();
    expect(result.current.formState.errors.email).toBeDefined();
    expect(result.current.formState.errors.senha).toBeDefined();
    expect(result.current.formState.errors.confirmarSenha).toBeDefined();
    expect(result.current.formState.errors.perfil).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao criar usuário', async () => {
    const mockError = new Error('Erro ao criar usuário');
    (usuarioService.create as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useUsuarioForm());

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(usuarioService.create).toHaveBeenCalledWith(mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });

  it('deve mostrar erro ao falhar ao atualizar usuário', async () => {
    const mockError = new Error('Erro ao atualizar usuário');
    (usuarioService.update as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useUsuarioForm({ ...mockInitialValues, id: '1' }));

    await act(async () => {
      await result.current.handleSubmit(mockInitialValues)();
    });

    expect(usuarioService.update).toHaveBeenCalledWith('1', mockInitialValues);
    expect(result.current.formState.errors).toBeDefined();
  });
}); 