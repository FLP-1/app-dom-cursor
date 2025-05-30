import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth.service';

// Mock do authService
jest.mock('../../services/auth.service', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
    refreshToken: jest.fn()
  }
}));

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Componente de teste que usa o contexto
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Usuário: {user?.nome}</p>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <button onClick={() => login({ email: 'test@email.com', senha: '123456' })}>
          Entrar
        </button>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  const mockUser = {
    id: 1,
    nome: 'João',
    email: 'joao@email.com',
    perfil: 'ADMIN'
  };

  const mockToken = 'mock-jwt-token';
  const mockRefreshToken = 'mock-refresh-token';

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('deve renderizar o provider corretamente', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('deve fazer login com sucesso', async () => {
    (authService.login as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
      token: mockToken,
      refreshToken: mockRefreshToken
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Usuário: João')).toBeInTheDocument();
    });

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@email.com',
      senha: '123456'
    });
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('refreshToken', mockRefreshToken);
  });

  it('deve fazer logout com sucesso', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Usuário: João')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: 'Sair' });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    expect(authService.logout).toHaveBeenCalled();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('deve carregar usuário atual ao inicializar com token válido', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Usuário: João')).toBeInTheDocument();
    });

    expect(authService.getCurrentUser).toHaveBeenCalled();
  });

  it('deve renovar token quando expirado', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    mockLocalStorage.getItem.mockReturnValueOnce(mockRefreshToken);
    (authService.getCurrentUser as jest.Mock).mockRejectedValueOnce(new Error('Token expirado'));
    (authService.refreshToken as jest.Mock).mockResolvedValueOnce({
      token: 'new-token',
      refreshToken: 'new-refresh-token'
    });
    (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Usuário: João')).toBeInTheDocument();
    });

    expect(authService.refreshToken).toHaveBeenCalledWith(mockRefreshToken);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'new-token');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('refreshToken', 'new-refresh-token');
  });

  it('deve lidar com erro ao fazer login', async () => {
    (authService.login as jest.Mock).mockRejectedValueOnce(new Error('Credenciais inválidas'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', { name: 'Entrar' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    expect(authService.login).toHaveBeenCalled();
  });

  it('deve lidar com erro ao carregar usuário atual', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    (authService.getCurrentUser as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar usuário'));
    (authService.refreshToken as jest.Mock).mockRejectedValueOnce(new Error('Erro ao renovar token'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    expect(authService.getCurrentUser).toHaveBeenCalled();
  });

  it('deve limpar dados de autenticação ao fazer logout com erro', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(mockToken);
    (authService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (authService.logout as jest.Mock).mockRejectedValueOnce(new Error('Erro ao fazer logout'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Usuário: João')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: 'Sair' });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('deve lançar erro quando useAuth é usado fora do AuthProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth deve ser usado dentro de um AuthProvider');

    consoleError.mockRestore();
  });
}); 