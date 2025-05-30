import { usuarioService } from '../../services/usuario.service';

// Mock do fetch global
global.fetch = jest.fn();

describe('usuarioService', () => {
  const mockUsuario = {
    id: '1',
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

  describe('create', () => {
    it('deve criar um usuário com sucesso', async () => {
      const mockResponse = { ...mockUsuario };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await usuarioService.create(mockUsuario);

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockUsuario)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao criar usuário', async () => {
      const mockError = new Error('Erro ao criar usuário');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(usuarioService.create(mockUsuario)).rejects.toThrow('Erro ao criar usuário');
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário com sucesso', async () => {
      const mockResponse = { ...mockUsuario };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await usuarioService.update('1', mockUsuario);

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockUsuario)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao atualizar usuário', async () => {
      const mockError = new Error('Erro ao atualizar usuário');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(usuarioService.update('1', mockUsuario)).rejects.toThrow('Erro ao atualizar usuário');
    });
  });

  describe('get', () => {
    it('deve obter um usuário com sucesso', async () => {
      const mockResponse = { ...mockUsuario };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await usuarioService.get('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios/1');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao obter usuário', async () => {
      const mockError = new Error('Erro ao obter usuário');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(usuarioService.get('1')).rejects.toThrow('Erro ao obter usuário');
    });

    it('deve lançar erro quando usuário não encontrado', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(usuarioService.get('1')).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe('list', () => {
    it('deve listar usuários com sucesso', async () => {
      const mockResponse = {
        data: [mockUsuario],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await usuarioService.list();

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios');
      expect(result).toEqual(mockResponse);
    });

    it('deve listar usuários com filtros', async () => {
      const mockResponse = {
        data: [mockUsuario],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const filters = {
        nome: 'João',
        perfil: 'ADMIN'
      };

      const result = await usuarioService.list(filters);

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios?nome=João&perfil=ADMIN');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao listar usuários', async () => {
      const mockError = new Error('Erro ao listar usuários');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(usuarioService.list()).rejects.toThrow('Erro ao listar usuários');
    });
  });

  describe('delete', () => {
    it('deve deletar um usuário com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await usuarioService.delete('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/usuarios/1', {
        method: 'DELETE'
      });
    });

    it('deve lançar erro ao falhar ao deletar usuário', async () => {
      const mockError = new Error('Erro ao deletar usuário');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(usuarioService.delete('1')).rejects.toThrow('Erro ao deletar usuário');
    });
  });
}); 