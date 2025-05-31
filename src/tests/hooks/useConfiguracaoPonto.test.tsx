import { renderHook, act } from '@testing-library/react-hooks';
import { useConfiguracaoPonto } from '@/hooks/useConfiguracaoPonto';
import { useNotification } from '@/hooks/useNotification';

// Mock dos hooks
jest.mock('@/hooks/useNotification');

// Mock do fetch
global.fetch = jest.fn();

describe('useConfiguracaoPonto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock do useNotification
    (useNotification as jest.Mock).mockReturnValue({
      error: jest.fn(),
      success: jest.fn()
    });

    // Mock do fetch para /api/ponto/configuracao
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/ponto/configuracao') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: '1',
            usuarioId: '1',
            horaInicio: new Date(2024, 0, 1, 8, 0),
            horaFim: new Date(2024, 0, 1, 18, 0),
            latitude: -23.5505,
            longitude: -46.6333,
            raioMetros: 100,
            ativo: true
          })
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('deve carregar configuração com sucesso', async () => {
    const { result } = renderHook(() => useConfiguracaoPonto());

    expect(result.current.loading).toBe(true);
    expect(result.current.configuracao).toBeNull();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.configuracao).toBeTruthy();
    expect(result.current.configuracao?.ativo).toBe(true);
  });

  it('deve salvar configuração com sucesso', async () => {
    const { result } = renderHook(() => useConfiguracaoPonto());

    const novaConfiguracao = {
      horaInicio: new Date(2024, 0, 1, 9, 0),
      horaFim: new Date(2024, 0, 1, 17, 0),
      latitude: -23.5505,
      longitude: -46.6333,
      raioMetros: 200,
      ativo: true
    };

    await act(async () => {
      await result.current.salvarConfiguracao(novaConfiguracao);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.configuracao).toBeTruthy();
    expect(result.current.configuracao?.raioMetros).toBe(200);
  });

  it('deve validar horário permitido', () => {
    const { result } = renderHook(() => useConfiguracaoPonto());

    // Configuração com horário permitido
    const dataHoraPermitida = new Date(2024, 0, 1, 10, 0);
    expect(result.current.validarHorarioPermitido(dataHoraPermitida)).toBe(true);

    // Configuração com horário não permitido
    const dataHoraNaoPermitida = new Date(2024, 0, 1, 7, 0);
    expect(result.current.validarHorarioPermitido(dataHoraNaoPermitida)).toBe(false);
  });

  it('deve validar localização', () => {
    const { result } = renderHook(() => useConfiguracaoPonto());

    // Localização dentro do raio permitido
    const localizacaoValida = {
      latitude: -23.5505,
      longitude: -46.6333
    };
    expect(result.current.validarLocalizacao(localizacaoValida.latitude, localizacaoValida.longitude)).toBe(true);

    // Localização fora do raio permitido
    const localizacaoInvalida = {
      latitude: -23.5605,
      longitude: -46.6433
    };
    expect(result.current.validarLocalizacao(localizacaoInvalida.latitude, localizacaoInvalida.longitude)).toBe(false);
  });

  it('deve lidar com erro ao carregar configuração', async () => {
    // Mock de erro no fetch
    (global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error('Erro ao carregar configuração'));
    });

    const { result } = renderHook(() => useConfiguracaoPonto());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.configuracao).toBeNull();
  });

  it('deve lidar com erro ao salvar configuração', async () => {
    // Mock de erro no fetch
    (global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error('Erro ao salvar configuração'));
    });

    const { result } = renderHook(() => useConfiguracaoPonto());

    const novaConfiguracao = {
      horaInicio: new Date(2024, 0, 1, 9, 0),
      horaFim: new Date(2024, 0, 1, 17, 0),
      latitude: -23.5505,
      longitude: -46.6333,
      raioMetros: 200,
      ativo: true
    };

    await act(async () => {
      await result.current.salvarConfiguracao(novaConfiguracao);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.configuracao).toBeNull();
  });
}); 