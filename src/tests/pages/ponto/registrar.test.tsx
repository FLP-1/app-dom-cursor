import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrarPonto from '@/pages/ponto/registrar';
import { usePonto } from '@/hooks/usePonto';
import { useConfiguracaoPonto } from '@/hooks/useConfiguracaoPonto';
import { useNotification } from '@/hooks/useNotification';

// Mock dos hooks
jest.mock('@/hooks/usePonto');
jest.mock('@/hooks/useConfiguracaoPonto');
jest.mock('@/hooks/useNotification');

// Mock do fetch
global.fetch = jest.fn();

// Mock do navigator.geolocation
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn()
  }
});

describe('RegistrarPonto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock do useNotification
    (useNotification as jest.Mock).mockReturnValue({
      error: jest.fn(),
      success: jest.fn()
    });

    // Mock do useConfiguracaoPonto
    (useConfiguracaoPonto as jest.Mock).mockReturnValue({
      configuracao: {
        ativo: true,
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0),
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100
      },
      validarHorarioPermitido: jest.fn().mockReturnValue(true),
      validarLocalizacao: jest.fn().mockReturnValue(true)
    });

    // Mock do usePonto
    (usePonto as jest.Mock).mockReturnValue({
      registrarPonto: jest.fn().mockResolvedValue(true),
      loading: false,
      ultimoRegistro: null
    });

    // Mock do fetch para /api/time
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/time') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ timestamp: Date.now() })
        });
      }
      if (url === 'https://api.ipify.org?format=json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ip: '127.0.0.1' })
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    // Mock do navigator.geolocation.getCurrentPosition
    (navigator.geolocation.getCurrentPosition as jest.Mock).mockImplementation((success) => {
      success({
        coords: {
          latitude: -23.5505,
          longitude: -46.6333
        }
      });
    });
  });

  it('deve renderizar a página corretamente', () => {
    render(<RegistrarPonto />);

    expect(screen.getByText('Registro de Ponto')).toBeInTheDocument();
    expect(screen.getByText('Entrada')).toBeInTheDocument();
    expect(screen.getByText('Saída')).toBeInTheDocument();
  });

  it('deve registrar entrada com sucesso', async () => {
    render(<RegistrarPonto />);

    const botaoEntrada = screen.getByText('Entrada');
    await userEvent.click(botaoEntrada);

    await waitFor(() => {
      expect(usePonto().registrarPonto).toHaveBeenCalledWith('ENTRADA');
    });
  });

  it('deve registrar saída com sucesso', async () => {
    render(<RegistrarPonto />);

    const botaoSaida = screen.getByText('Saída');
    await userEvent.click(botaoSaida);

    await waitFor(() => {
      expect(usePonto().registrarPonto).toHaveBeenCalledWith('SAIDA');
    });
  });

  it('deve mostrar loading durante o registro', async () => {
    (usePonto as jest.Mock).mockReturnValue({
      registrarPonto: jest.fn().mockResolvedValue(true),
      loading: true,
      ultimoRegistro: null
    });

    render(<RegistrarPonto />);

    expect(screen.getByText('Registrando...')).toBeInTheDocument();
  });

  it('deve mostrar último registro', async () => {
    const ultimoRegistro = {
      id: '1',
      dataHora: new Date(),
      tipo: 'ENTRADA',
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: 'America/Sao_Paulo',
      dispositivo: 'test',
      ip: '127.0.0.1',
      validado: true
    };

    (usePonto as jest.Mock).mockReturnValue({
      registrarPonto: jest.fn().mockResolvedValue(true),
      loading: false,
      ultimoRegistro
    });

    render(<RegistrarPonto />);

    expect(screen.getByText('Último Registro')).toBeInTheDocument();
    expect(screen.getByText('Entrada')).toBeInTheDocument();
    expect(screen.getByText('Validado')).toBeInTheDocument();
  });

  it('deve mostrar erro ao falhar registro', async () => {
    (usePonto as jest.Mock).mockReturnValue({
      registrarPonto: jest.fn().mockRejectedValue(new Error('Erro ao registrar')),
      loading: false,
      ultimoRegistro: null
    });

    render(<RegistrarPonto />);

    const botaoEntrada = screen.getByText('Entrada');
    await userEvent.click(botaoEntrada);

    await waitFor(() => {
      expect(useNotification().error).toHaveBeenCalledWith('Erro ao registrar ponto. Tente novamente.');
    });
  });

  it('deve validar horário permitido', async () => {
    (useConfiguracaoPonto as jest.Mock).mockReturnValue({
      configuracao: {
        ativo: true,
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0)
      },
      validarHorarioPermitido: jest.fn().mockReturnValue(false),
      validarLocalizacao: jest.fn().mockReturnValue(true)
    });

    render(<RegistrarPonto />);

    const botaoEntrada = screen.getByText('Entrada');
    await userEvent.click(botaoEntrada);

    await waitFor(() => {
      expect(useNotification().error).toHaveBeenCalledWith('Registro de ponto não permitido neste horário.');
    });
  });

  it('deve validar localização', async () => {
    (useConfiguracaoPonto as jest.Mock).mockReturnValue({
      configuracao: {
        ativo: true,
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100
      },
      validarHorarioPermitido: jest.fn().mockReturnValue(true),
      validarLocalizacao: jest.fn().mockReturnValue(false)
    });

    render(<RegistrarPonto />);

    const botaoEntrada = screen.getByText('Entrada');
    await userEvent.click(botaoEntrada);

    await waitFor(() => {
      expect(useNotification().error).toHaveBeenCalledWith('Você está fora da área permitida para registro de ponto.');
    });
  });

  it('deve validar data/hora do dispositivo', async () => {
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/time') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ timestamp: Date.now() + 1000 * 60 * 10 }) // 10 minutos de diferença
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(<RegistrarPonto />);

    const botaoEntrada = screen.getByText('Entrada');
    await userEvent.click(botaoEntrada);

    await waitFor(() => {
      expect(useNotification().error).toHaveBeenCalledWith('O relógio do seu dispositivo está desatualizado. Por favor, sincronize-o com a internet.');
    });
  });
}); 