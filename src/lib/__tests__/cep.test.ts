import { buscarCEP } from '../cep';

// Mock do fetch
global.fetch = jest.fn();

describe('CEP Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar CEP com sucesso', async () => {
    const mockResponse = {
      cep: '01311-000',
      logradouro: 'Avenida Paulista',
      complemento: '',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await buscarCEP('01311000');

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/01311000/json/'
    );
  });

  it('deve lançar erro para CEP inválido', async () => {
    await expect(buscarCEP('123')).rejects.toThrow('CEP inválido');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('deve lançar erro quando a API retorna erro', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(buscarCEP('01311000')).rejects.toThrow('Erro ao buscar CEP');
  });

  it('deve lançar erro quando o CEP não é encontrado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ erro: true }),
    });

    await expect(buscarCEP('01311000')).rejects.toThrow('CEP não encontrado');
  });

  it('deve limpar caracteres não numéricos do CEP', async () => {
    const mockResponse = {
      cep: '01311-000',
      logradouro: 'Avenida Paulista',
      complemento: '',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await buscarCEP('01311-000');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/01311000/json/'
    );
  });
}); 