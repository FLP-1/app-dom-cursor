import { authService } from '../../services/auth.service';

// Mock do fetch global
global.fetch = jest.fn();

describe('authService', () => {
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
    (global.fetch as jest.Mock).mockReset();
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'joao@email.com',
      senha: 'senha123'
    };

    it('deve fazer login com sucesso', async () => {
      const mockResponse = {
        user: mockUser,
        token: mockToken,
        refreshToken: mockRefreshToken
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await authService.login(mockCredentials);

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockCredentials)
      });

      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro quando as credenciais são inválidas', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Credenciais inválidas' })
      });

      await expect(authService.login(mockCredentials)).rejects.toThrow('Credenciais inválidas');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.login(mockCredentials)).rejects.toThrow('Erro de conexão');
    });
  });

  describe('logout', () => {
    it('deve fazer logout com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await authService.logout();

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.logout()).rejects.toThrow('Erro de conexão');
    });
  });

  describe('getCurrentUser', () => {
    it('deve obter usuário atual com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser)
      });

      const result = await authService.getCurrentUser();

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${mockToken}`
        }
      });

      expect(result).toEqual(mockUser);
    });

    it('deve lançar erro quando o token é inválido', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Token inválido' })
      });

      await expect(authService.getCurrentUser()).rejects.toThrow('Token inválido');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.getCurrentUser()).rejects.toThrow('Erro de conexão');
    });
  });

  describe('refreshToken', () => {
    it('deve renovar token com sucesso', async () => {
      const mockResponse = {
        token: 'new-token',
        refreshToken: 'new-refresh-token'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await authService.refreshToken(mockRefreshToken);

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: mockRefreshToken })
      });

      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro quando o refresh token é inválido', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Refresh token inválido' })
      });

      await expect(authService.refreshToken(mockRefreshToken)).rejects.toThrow('Refresh token inválido');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.refreshToken(mockRefreshToken)).rejects.toThrow('Erro de conexão');
    });
  });

  describe('changePassword', () => {
    const mockPasswordChange = {
      senhaAtual: 'senha123',
      novaSenha: 'novaSenha123',
      confirmarSenha: 'novaSenha123'
    };

    it('deve alterar senha com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await authService.changePassword(mockPasswordChange);

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify(mockPasswordChange)
      });
    });

    it('deve lançar erro quando a senha atual é inválida', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Senha atual inválida' })
      });

      await expect(authService.changePassword(mockPasswordChange)).rejects.toThrow('Senha atual inválida');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.changePassword(mockPasswordChange)).rejects.toThrow('Erro de conexão');
    });
  });

  describe('requestPasswordReset', () => {
    const mockEmail = 'joao@email.com';

    it('deve solicitar reset de senha com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await authService.requestPasswordReset(mockEmail);

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: mockEmail })
      });
    });

    it('deve lançar erro quando o email não existe', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Email não encontrado' })
      });

      await expect(authService.requestPasswordReset(mockEmail)).rejects.toThrow('Email não encontrado');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.requestPasswordReset(mockEmail)).rejects.toThrow('Erro de conexão');
    });
  });

  describe('resetPassword', () => {
    const mockResetData = {
      token: 'reset-token',
      novaSenha: 'novaSenha123',
      confirmarSenha: 'novaSenha123'
    };

    it('deve resetar senha com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await authService.resetPassword(mockResetData);

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockResetData)
      });
    });

    it('deve lançar erro quando o token é inválido', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'Token inválido ou expirado' })
      });

      await expect(authService.resetPassword(mockResetData)).rejects.toThrow('Token inválido ou expirado');
    });

    it('deve lançar erro quando o servidor está indisponível', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de conexão'));

      await expect(authService.resetPassword(mockResetData)).rejects.toThrow('Erro de conexão');
    });
  });
}); 