import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfiguracaoPonto from '@/pages/ponto/configuracao';
import { useConfiguracaoPonto } from '@/hooks/useConfiguracaoPonto';
import { useNotification } from '@/hooks/useNotification';

// Mock dos hooks
jest.mock('@/hooks/useConfiguracaoPonto');
jest.mock('@/hooks/useNotification');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

// Mock do fetch
global.fetch = jest.fn();

describe('ConfiguracaoPonto', () => {
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
        id: '1',
        usuarioId: '1',
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0),
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100,
        ativo: true
      },
      loading: false,
      salvarConfiguracao: jest.fn().mockResolvedValue(true)
    });

    // Mock do fetch
    (global.fetch as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  it('deve renderizar a página corretamente', () => {
    render(<ConfiguracaoPonto />);

    expect(screen.getByText('Configuração do Ponto')).toBeInTheDocument();
    expect(screen.getByText('Horário de Início')).toBeInTheDocument();
    expect(screen.getByText('Horário de Término')).toBeInTheDocument();
    expect(screen.getByText('Ativar registro de ponto')).toBeInTheDocument();
  });

  it('deve mostrar campos de localização quando ativo', () => {
    render(<ConfiguracaoPonto />);

    expect(screen.getByText('Configuração de Localização')).toBeInTheDocument();
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Raio Permitido (metros)')).toBeInTheDocument();
  });

  it('deve esconder campos de localização quando inativo', async () => {
    render(<ConfiguracaoPonto />);

    const switchAtivo = screen.getByLabelText('Ativar registro de ponto');
    await userEvent.click(switchAtivo);

    expect(screen.queryByText('Configuração de Localização')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Latitude')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Longitude')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Raio Permitido (metros)')).not.toBeInTheDocument();
  });

  it('deve salvar configuração com sucesso', async () => {
    render(<ConfiguracaoPonto />);

    const botaoSalvar = screen.getByText('Salvar Configuração');
    await userEvent.click(botaoSalvar);

    await waitFor(() => {
      expect(useConfiguracaoPonto().salvarConfiguracao).toHaveBeenCalled();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    render(<ConfiguracaoPonto />);

    const botaoSalvar = screen.getByText('Salvar Configuração');
    await userEvent.click(botaoSalvar);

    // Campos de horário são obrigatórios
    expect(screen.getByText('Horário de Início')).toBeInTheDocument();
    expect(screen.getByText('Horário de Término')).toBeInTheDocument();
  });

  it('deve validar raio permitido', async () => {
    render(<ConfiguracaoPonto />);

    const campoRaio = screen.getByLabelText('Raio Permitido (metros)');
    await userEvent.clear(campoRaio);
    await userEvent.type(campoRaio, '50'); // Menor que o mínimo permitido (100)

    const botaoSalvar = screen.getByText('Salvar Configuração');
    await userEvent.click(botaoSalvar);

    expect(screen.getByText('Raio deve ser entre 100 e 1000 metros')).toBeInTheDocument();
  });

  it('deve mostrar loading durante o salvamento', async () => {
    (useConfiguracaoPonto as jest.Mock).mockReturnValue({
      configuracao: {
        id: '1',
        usuarioId: '1',
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0),
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100,
        ativo: true
      },
      loading: true,
      salvarConfiguracao: jest.fn().mockResolvedValue(true)
    });

    render(<ConfiguracaoPonto />);

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro ao falhar', async () => {
    (useConfiguracaoPonto as jest.Mock).mockReturnValue({
      configuracao: {
        id: '1',
        usuarioId: '1',
        horaInicio: new Date(2024, 0, 1, 8, 0),
        horaFim: new Date(2024, 0, 1, 18, 0),
        latitude: -23.5505,
        longitude: -46.6333,
        raioMetros: 100,
        ativo: true
      },
      loading: false,
      salvarConfiguracao: jest.fn().mockRejectedValue(new Error('Erro ao salvar'))
    });

    render(<ConfiguracaoPonto />);

    const botaoSalvar = screen.getByText('Salvar Configuração');
    await userEvent.click(botaoSalvar);

    await waitFor(() => {
      expect(useNotification().error).toHaveBeenCalledWith('Erro ao salvar configuração. Tente novamente.');
    });
  });
}); 