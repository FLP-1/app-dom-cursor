import { renderHook, act } from '@testing-library/react';
import { useEsocialConfig } from '@/hooks/useEsocialConfig';
import { EsocialConfigService } from '@/services/EsocialConfigService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEsocialConfig } from '@/tests/types';

jest.mock('@/services/EsocialConfigService');

describe('useEsocialConfig', () => {
  const mockConfig: TestEsocialConfig = {
    id: '1',
    empresaId: '1',
    ambiente: 'PRODUCAO',
    versao: '2.5',
    certificadoDigital: {
      nome: 'certificado.pfx',
      senha: '123456',
      dataValidade: new Date()
    },
    configuracao: {
      tipoInscricao: '1',
      numeroInscricao: '12345678901234',
      codigoCategoria: '101-5',
      indicadorSimples: '1',
      indicadorCooperativa: '2',
      indicadorContribuinte: '1',
      indicadorDesoneracao: '2',
      indicadorOptanteMEI: '2',
      indicadorEntidade: '2',
      indicadorPrestador: '2',
      indicadorTransmissor: '2'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load config successfully', async () => {
    const mockGetConfig = jest.spyOn(EsocialConfigService, 'getConfig').mockResolvedValueOnce(mockConfig);

    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.carregarConfig();
    });

    expect(mockGetConfig).toHaveBeenCalled();
    expect(result.current.config).toEqual(mockConfig);
  });

  it('should handle error when loading config', async () => {
    const mockGetConfig = jest.spyOn(EsocialConfigService, 'getConfig').mockRejectedValueOnce(new Error('Erro ao carregar configuração'));

    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.carregarConfig()).rejects.toThrow('Erro ao carregar configuração');
    });

    expect(mockGetConfig).toHaveBeenCalled();
    expect(result.current.config).toBeNull();
  });

  it('should save config successfully', async () => {
    const mockSaveConfig = jest.spyOn(EsocialConfigService, 'saveConfig').mockResolvedValueOnce(mockConfig);

    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await result.current.salvarConfig(mockConfig);
    });

    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(result.current.config).toEqual(mockConfig);
  });

  it('should handle error when saving config', async () => {
    const mockSaveConfig = jest.spyOn(EsocialConfigService, 'saveConfig').mockRejectedValueOnce(new Error('Erro ao salvar configuração'));

    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    await act(async () => {
      await expect(result.current.salvarConfig(mockConfig)).rejects.toThrow('Erro ao salvar configuração');
    });

    expect(mockSaveConfig).toHaveBeenCalledWith(mockConfig);
    expect(result.current.config).toBeNull();
  });

  it('should validate config successfully', () => {
    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    const isValid = result.current.validarConfig(mockConfig);

    expect(isValid).toBe(true);
  });

  it('should handle invalid config', () => {
    const { result } = renderHook(() => useEsocialConfig(), {
      wrapper: TestWrapper
    });

    const invalidConfig = {
      ...mockConfig,
      configuracao: {
        ...mockConfig.configuracao,
        tipoInscricao: 'INVALIDO'
      }
    };

    const isValid = result.current.validarConfig(invalidConfig);

    expect(isValid).toBe(false);
  });
}); 