import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

// Mock do api
jest.mock('../../services/api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn()
  }
}));

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('useAuth', () => {
  const mockUser = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    perfil: 'admin'
  };

  const mockToken = 'mock-jwt-token';

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('deve inicializar com usuário não autenticado', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('deve inicializar com usuário autenticado se houver token no localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(mockToken);
    (api.get as jest.Mock).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeTruthy();
  });

  it('deve fazer login com sucesso', async () => {
    const mockCredentials = {
      email: 'joao@email.com',
      senha: '123456'
    };

    (api.post as jest.Mock).mockResolvedValue({
      data: {
        user: mockUser,
        token: mockToken
      }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(api.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('@App:token', mockToken);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('deve falhar ao fazer login com credenciais inválidas', async () => {
    const mockCredentials = {
      email: 'joao@email.com',
      senha: 'senha-errada'
    };

    (api.post as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: 'Credenciais inválidas'
        }
      }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.login(mockCredentials)).rejects.toThrow('Credenciais inválidas');
    });

    expect(api.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('deve fazer logout com sucesso', async () => {
    mockLocalStorage.getItem.mockReturnValue(mockToken);
    (api.get as jest.Mock).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(api.delete).toHaveBeenCalledWith('/auth/logout');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('@App:token');
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('deve atualizar dados do usuário', async () => {
    const mockUpdatedUser = {
      ...mockUser,
      nome: 'João Silva Atualizado'
    };

    (api.put as jest.Mock).mockResolvedValue({
      data: mockUpdatedUser
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.updateUser(mockUpdatedUser);
    });

    expect(api.put).toHaveBeenCalledWith('/users/profile', mockUpdatedUser);
    expect(result.current.user).toEqual(mockUpdatedUser);
  });

  it('deve alterar senha com sucesso', async () => {
    const mockPasswordData = {
      senhaAtual: '123456',
      novaSenha: '654321'
    };

    (api.put as jest.Mock).mockResolvedValue({
      data: { message: 'Senha alterada com sucesso' }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.changePassword(mockPasswordData);
    });

    expect(api.put).toHaveBeenCalledWith('/users/password', mockPasswordData);
  });

  it('deve falhar ao alterar senha com senha atual incorreta', async () => {
    const mockPasswordData = {
      senhaAtual: 'senha-errada',
      novaSenha: '654321'
    };

    (api.put as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: 'Senha atual incorreta'
        }
      }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.changePassword(mockPasswordData)).rejects.toThrow('Senha atual incorreta');
    });

    expect(api.put).toHaveBeenCalledWith('/users/password', mockPasswordData);
  });

  it('deve solicitar recuperação de senha', async () => {
    const mockEmail = 'joao@email.com';

    (api.post as jest.Mock).mockResolvedValue({
      data: { message: 'Email de recuperação enviado' }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.forgotPassword(mockEmail);
    });

    expect(api.post).toHaveBeenCalledWith('/auth/forgot-password', { email: mockEmail });
  });

  it('deve redefinir senha com sucesso', async () => {
    const mockResetData = {
      token: 'reset-token',
      novaSenha: '654321'
    };

    (api.post as jest.Mock).mockResolvedValue({
      data: { message: 'Senha redefinida com sucesso' }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.resetPassword(mockResetData);
    });

    expect(api.post).toHaveBeenCalledWith('/auth/reset-password', mockResetData);
  });

  it('deve falhar ao redefinir senha com token inválido', async () => {
    const mockResetData = {
      token: 'token-invalido',
      novaSenha: '654321'
    };

    (api.post as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: 'Token inválido ou expirado'
        }
      }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.resetPassword(mockResetData)).rejects.toThrow('Token inválido ou expirado');
    });

    expect(api.post).toHaveBeenCalledWith('/auth/reset-password', mockResetData);
  });

  it('deve verificar se o token está expirado', async () => {
    mockLocalStorage.getItem.mockReturnValue(mockToken);
    (api.get as jest.Mock).mockRejectedValue({
      response: {
        status: 401
      }
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('@App:token');
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('deve lidar com erro de rede', async () => {
    const mockCredentials = {
      email: 'joao@email.com',
      senha: '123456'
    };

    (api.post as jest.Mock).mockRejectedValue({
      message: 'Erro de conexão'
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.login(mockCredentials)).rejects.toThrow('Erro de conexão');
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });
}); 