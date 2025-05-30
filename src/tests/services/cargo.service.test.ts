import { cargoService } from '../../services/cargo.service';

// Mock do fetch global
global.fetch = jest.fn();

describe('cargoService', () => {
  const mockCargo = {
    id: '1',
    codigo: '1234-5',
    nome: 'Auxiliar de Serviços Gerais',
    descricao: 'Realiza serviços de limpeza e manutenção',
    categoria: '10',
    salarioBase: 1500,
    jornadaTrabalho: '40h',
    requisitos: 'Ensino Fundamental Completo',
    beneficios: 'Vale Transporte, Vale Refeição',
    ativo: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um cargo com sucesso', async () => {
      const mockResponse = { ...mockCargo };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await cargoService.create(mockCargo);

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockCargo)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao criar cargo', async () => {
      const mockError = new Error('Erro ao criar cargo');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(cargoService.create(mockCargo)).rejects.toThrow('Erro ao criar cargo');
    });
  });

  describe('update', () => {
    it('deve atualizar um cargo com sucesso', async () => {
      const mockResponse = { ...mockCargo };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await cargoService.update('1', mockCargo);

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockCargo)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao atualizar cargo', async () => {
      const mockError = new Error('Erro ao atualizar cargo');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(cargoService.update('1', mockCargo)).rejects.toThrow('Erro ao atualizar cargo');
    });
  });

  describe('get', () => {
    it('deve obter um cargo com sucesso', async () => {
      const mockResponse = { ...mockCargo };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await cargoService.get('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos/1');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao obter cargo', async () => {
      const mockError = new Error('Erro ao obter cargo');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(cargoService.get('1')).rejects.toThrow('Erro ao obter cargo');
    });

    it('deve lançar erro quando cargo não encontrado', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(cargoService.get('1')).rejects.toThrow('Cargo não encontrado');
    });
  });

  describe('list', () => {
    it('deve listar cargos com sucesso', async () => {
      const mockResponse = {
        data: [mockCargo],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await cargoService.list();

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos');
      expect(result).toEqual(mockResponse);
    });

    it('deve listar cargos com filtros', async () => {
      const mockResponse = {
        data: [mockCargo],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const filters = {
        nome: 'Auxiliar',
        categoria: '10'
      };

      const result = await cargoService.list(filters);

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos?nome=Auxiliar&categoria=10');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao listar cargos', async () => {
      const mockError = new Error('Erro ao listar cargos');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(cargoService.list()).rejects.toThrow('Erro ao listar cargos');
    });
  });

  describe('delete', () => {
    it('deve deletar um cargo com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await cargoService.delete('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/cargos/1', {
        method: 'DELETE'
      });
    });

    it('deve lançar erro ao falhar ao deletar cargo', async () => {
      const mockError = new Error('Erro ao deletar cargo');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(cargoService.delete('1')).rejects.toThrow('Erro ao deletar cargo');
    });
  });
}); 