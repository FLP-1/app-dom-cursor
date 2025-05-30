import { empregadoDomesticoService } from '../../services/empregado-domestico.service';

// Mock do fetch global
global.fetch = jest.fn();

describe('empregadoDomesticoService', () => {
  const mockEmpregado = {
    id: '1',
    cpf: '123.456.789-00',
    nomeCompleto: 'José da Silva',
    dataNascimento: '1990-01-01',
    sexo: 'M',
    nacionalidade: 'Brasileiro',
    grauInstrucao: 'Ensino Médio',
    nomeMae: 'Maria da Silva',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '12345-678',
    municipio: 'São Paulo',
    uf: 'SP',
    telefone: '(11) 98765-4321',
    email: 'jose@email.com',
    dataAdmissao: '2024-01-01',
    matricula: '12345',
    categoria: '21',
    remuneracao: 1500,
    cargoId: '5121-05',
    jornadaTrabalho: '44h',
    ctpsNumero: '123456',
    ctpsSerie: '1234',
    ctpsUf: 'SP',
    pisPasep: '123.45678.90-1',
    empregadorId: '1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um empregado doméstico com sucesso', async () => {
      const mockResponse = { ...mockEmpregado };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadoDomesticoService.create(mockEmpregado);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockEmpregado)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao criar empregado doméstico', async () => {
      const mockError = { message: 'Erro ao criar empregado doméstico' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockError)
      });

      await expect(empregadoDomesticoService.create(mockEmpregado)).rejects.toThrow('Erro ao criar empregado doméstico');
    });
  });

  describe('update', () => {
    it('deve atualizar um empregado doméstico com sucesso', async () => {
      const mockResponse = { ...mockEmpregado };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadoDomesticoService.update('1', mockEmpregado);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockEmpregado)
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao atualizar empregado doméstico', async () => {
      const mockError = { message: 'Erro ao atualizar empregado doméstico' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockError)
      });

      await expect(empregadoDomesticoService.update('1', mockEmpregado)).rejects.toThrow('Erro ao atualizar empregado doméstico');
    });
  });

  describe('get', () => {
    it('deve buscar um empregado doméstico com sucesso', async () => {
      const mockResponse = { ...mockEmpregado };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadoDomesticoService.get('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao não encontrar empregado doméstico', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(empregadoDomesticoService.get('1')).rejects.toThrow('Empregado doméstico não encontrado');
    });
  });

  describe('list', () => {
    it('deve listar empregados domésticos com sucesso', async () => {
      const mockResponse = {
        data: [mockEmpregado],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await empregadoDomesticoService.list();

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve listar empregados domésticos com filtros', async () => {
      const mockResponse = {
        data: [mockEmpregado],
        total: 1,
        page: 1,
        limit: 10
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const filters = {
        nome: 'José',
        cpf: '123.456.789-00'
      };

      const result = await empregadoDomesticoService.list(filters);

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos?nome=José&cpf=123.456.789-00', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao listar empregados domésticos', async () => {
      const mockError = { message: 'Erro ao listar empregados domésticos' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockError)
      });

      await expect(empregadoDomesticoService.list()).rejects.toThrow('Erro ao listar empregados domésticos');
    });
  });

  describe('delete', () => {
    it('deve deletar um empregado doméstico com sucesso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await empregadoDomesticoService.delete('1');

      expect(global.fetch).toHaveBeenCalledWith('/api/empregados-domesticos/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    it('deve lançar erro ao falhar ao deletar empregado doméstico', async () => {
      const mockError = { message: 'Erro ao deletar empregado doméstico' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockError)
      });

      await expect(empregadoDomesticoService.delete('1')).rejects.toThrow('Erro ao deletar empregado doméstico');
    });
  });
}); 