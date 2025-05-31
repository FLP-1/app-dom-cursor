import { renderHook, act } from '@testing-library/react';
import { usePlanosVigentes } from '../../hooks/usePlanosVigentes';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('usePlanosVigentes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar o estado inicial corretamente', () => {
    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    expect(result.current.planos).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('deve carregar planos para EMPREGADOR', async () => {
    const mockPlanos = [
      { id: 1, nome: 'Plano Básico' },
      { id: 2, nome: 'Plano Premium' }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockPlanos });

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/planos', {
      params: { perfil: 'EMPREGADOR' }
    });
    expect(result.current.planos).toEqual(mockPlanos);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve carregar planos para PARCEIRO', async () => {
    const mockPlanos = [
      { id: 3, nome: 'Plano Parceiro' }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockPlanos });

    const { result } = renderHook(() => usePlanosVigentes('PARCEIRO'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/planos', {
      params: { perfil: 'PARCEIRO' }
    });
    expect(result.current.planos).toEqual(mockPlanos);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve carregar planos para AMBOS', async () => {
    const mockPlanos = [
      { id: 1, nome: 'Plano Básico' },
      { id: 2, nome: 'Plano Premium' },
      { id: 3, nome: 'Plano Parceiro' }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockPlanos });

    const { result } = renderHook(() => usePlanosVigentes('AMBOS'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/planos', {
      params: { perfil: 'AMBOS' }
    });
    expect(result.current.planos).toEqual(mockPlanos);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve lidar com erro na requisição', async () => {
    const mockError = new Error('Erro ao carregar planos');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/planos', {
      params: { perfil: 'EMPREGADOR' }
    });
    expect(result.current.planos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve atualizar os planos quando o perfil muda', async () => {
    const mockPlanosEmpregador = [
      { id: 1, nome: 'Plano Básico' }
    ];

    const mockPlanosParceiro = [
      { id: 2, nome: 'Plano Parceiro' }
    ];

    mockedAxios.get
      .mockResolvedValueOnce({ data: mockPlanosEmpregador })
      .mockResolvedValueOnce({ data: mockPlanosParceiro });

    const { result, rerender } = renderHook(
      ({ perfil }) => usePlanosVigentes(perfil),
      { initialProps: { perfil: 'EMPREGADOR' } }
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.planos).toEqual(mockPlanosEmpregador);
    expect(result.current.isLoading).toBe(false);

    rerender({ perfil: 'PARCEIRO' });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.planos).toEqual(mockPlanosParceiro);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve manter o estado de loading durante a requisição', async () => {
    let resolveRequest: (value: unknown) => void;
    const requestPromise = new Promise((resolve) => {
      resolveRequest = resolve;
    });

    mockedAxios.get.mockReturnValueOnce(requestPromise);

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    expect(result.current.isLoading).toBe(true);

    resolveRequest([
      { id: 1, nome: 'Plano 1' },
      { id: 2, nome: 'Plano 2' }
    ]);

    await requestPromise;

    expect(result.current.isLoading).toBe(false);
  });

  it('deve lidar com resposta vazia', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.planos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve lidar com resposta undefined', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: undefined });

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.planos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('deve lidar com resposta null', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });

    const { result } = renderHook(() => usePlanosVigentes('EMPREGADOR'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.planos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
}); 