import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { api } from '../../services/api';

// Mock do useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/'
  })
}));

// Mock do api
jest.mock('../../services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn()
  }
}));

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve inicializar com usuário não autenticado', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('deve fazer login com sucesso', async () => {
    const mockUser = { id: '1', name: 'Teste', email: 'teste@exemplo.com', role: 'user' };
    const mockToken = 'token-123';

    api.post.mockResolvedValueOnce({ data: { token: mockToken, user: mockUser } });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'teste@exemplo.com',
        password: 'senha123'
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  it('deve fazer logout com sucesso', async () => {
    api.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useAuth());

    // Primeiro faz login
    localStorage.setItem('token', 'token-123');
    result.current.user = { id: '1', name: 'Teste', email: 'teste@exemplo.com', role: 'user' };
    result.current.isAuthenticated = true;

    // Depois faz logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('deve lidar com erro de login', async () => {
    api.post.mockRejectedValueOnce({ response: { data: { message: 'Credenciais inválidas' } } });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login({
          email: 'email-invalido@exemplo.com',
          password: 'senha-errada'
        });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.error).toBe('Credenciais inválidas');
  });

  it('deve verificar token expirado', async () => {
    api.get.mockRejectedValueOnce({ response: { status: 401 } });

    localStorage.setItem('token', 'token-expirado');

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.checkAuth();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
  });
}); 