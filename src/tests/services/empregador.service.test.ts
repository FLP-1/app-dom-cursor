import { empregadorService } from '../../services/empregador.service';

// Mock do fetch global
global.fetch = jest.fn();

describe('empregadorService', () => {
  const mockEmpregador = {
    id: '1',
    cpf: '123.456.789-00',
    nomeCompleto: 'João Silva',
    dataNascimento: '1980-01-01',
    sexo: 'M',
    nacionalidade: 'Brasileiro',
    grauInstrucao: 'Ensino Superior',
    nomeMae: 'Maria Silva',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '12345-678',
    municipio: 'São Paulo',
    uf: 'SP',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
    dataAdmissao: '2024-01-01',
    matricula: '12345',
    categoria: '10',
    remuneracao: 5000,
    cargoId: '1234-5',
    jornadaTrabalho: '40h',
    ctpsNumero: '123456',
    ctpsSerie: '1234',
    ctpsUf: 'SP',
    pisPasep: '123.45678.90-1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um empregador com sucesso', async () => {
      const mockResponse = { ...mockEmpregador };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadorService.create(mockEmpregador);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockEmpregador)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao criar empregador', async () => {
      const mockError = new Error('Erro ao criar empregador');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(empregadorService.create(mockEmpregador)).rejects.toThrow('Erro ao criar empregador');
    });
  });

  describe('update', () => {
    it('deve atualizar um empregador com sucesso', async () => {
      const mockResponse = { ...mockEmpregador };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadorService.update('1', mockEmpregador);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockEmpregador)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao atualizar empregador', async () => {
      const mockError = new Error('Erro ao atualizar empregador');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(empregadorService.update('1', mockEmpregador)).rejects.toThrow('Erro ao atualizar empregador');
    });
  });

  describe('get', () => {
    it('deve obter um empregador com sucesso', async () => {
      const mockResponse = { ...mockEmpregador };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadorService.get('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores/1');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao obter empregador', async () => {
      const mockError = new Error('Erro ao obter empregador');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(empregadorService.get('1')).rejects.toThrow('Erro ao obter empregador');
    });

    it('deve lançar erro quando empregador não encontrado', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(empregadorService.get('1')).rejects.toThrow('Empregador não encontrado');
    });
  });

  describe('list', () => {
    it('deve listar empregadores com sucesso', async () => {
      const mockResponse = {
        data: [mockEmpregador],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadorService.list();

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores');
      expect(result).toEqual(mockResponse);
    });

    it('deve listar empregadores com filtros', async () => {
      const mockResponse = {
        data: [mockEmpregador],
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
        cpf: '123.456.789-00'
      };

      const result = await empregadorService.list(filters);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores?nome=João&cpf=123.456.789-00');
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao listar empregadores', async () => {
      const mockError = new Error('Erro ao listar empregadores');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(empregadorService.list()).rejects.toThrow('Erro ao listar empregadores');
    });
  });

  describe('delete', () => {
    it('deve deletar um empregador com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await empregadorService.delete('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/empregadores/1', {
        method: 'DELETE'
      });
    });

    it('deve lançar erro ao falhar ao deletar empregador', async () => {
      const mockError = new Error('Erro ao deletar empregador');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(empregadorService.delete('1')).rejects.toThrow('Erro ao deletar empregador');
    });
  });
}); 