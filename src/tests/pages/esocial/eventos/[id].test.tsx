import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EsocialEventoPage } from '@/pages/esocial/eventos/[id]';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial, StatusEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

jest.mock('@/services/EsocialEventService');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: '123' }
  })
}));

describe('EsocialEventoPage', () => {
  const mockEvent = {
    id: '123',
    tipo: TipoEventoEsocial.S2206,
    status: StatusEventoEsocial.PENDENTE,
    data: new Date(),
    payload: {
      cpf: '12345678900',
      dataAlteracao: new Date(),
      tipoAlteracao: '1',
      motivoAlteracao: 'Alteração de cargo',
      cargo: 'Desenvolvedor',
      salario: 5000,
      jornadaTrabalho: '40 horas',
      tipoRegimePrevidenciario: '1',
      dataInicioAlteracao: new Date(),
      dataFimAlteracao: new Date(),
      naturezaAlteracao: '1'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<EsocialEventoPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should load and display event data', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
      expect(screen.getByLabelText(/tipo de alteração/i)).toHaveValue('1');
      expect(screen.getByLabelText(/motivo da alteração/i)).toHaveValue('Alteração de cargo');
      expect(screen.getByLabelText(/cargo/i)).toHaveValue('Desenvolvedor');
      expect(screen.getByLabelText(/salário/i)).toHaveValue(5000);
      expect(screen.getByLabelText(/jornada de trabalho/i)).toHaveValue('40 horas');
      expect(screen.getByLabelText(/tipo de regime previdenciário/i)).toHaveValue('1');
      expect(screen.getByLabelText(/natureza da alteração/i)).toHaveValue('1');
    });
  });

  it('should handle form submission', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);
    const mockUpdate = jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce({} as any);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith('123', expect.objectContaining({
        tipo: TipoEventoEsocial.S2206,
        payload: expect.objectContaining({
          cpf: '12345678900',
          tipoAlteracao: '1',
          motivoAlteracao: 'Alteração de cargo',
          cargo: 'Desenvolvedor',
          salario: 5000,
          jornadaTrabalho: '40 horas',
          tipoRegimePrevidenciario: '1',
          naturezaAlteracao: '1'
        })
      }));
    });
  });

  it('should handle error when loading event', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockRejectedValueOnce(new Error('Failed to load event'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve carregar e exibir os dados do evento S2210', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2210,
      data: '2024-03-20T14:30:00Z',
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
      expect(screen.getByLabelText(/data do acidente/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/hora do acidente/i)).toHaveValue('14:30');
      expect(screen.getByLabelText(/tipo do acidente/i)).toHaveValue('1');
      expect(screen.getByLabelText(/local do acidente/i)).toHaveValue('1');
      expect(screen.getByLabelText(/código cnae/i)).toHaveValue('1234567');
      expect(screen.getByLabelText(/descrição do acidente/i)).toHaveValue('Descrição do acidente');
      expect(screen.getByLabelText(/parte atingida/i)).toHaveValue('Braço direito');
      expect(screen.getByLabelText(/agente causador/i)).toHaveValue('Queda');
      expect(screen.getByLabelText(/tipo de cat/i)).toHaveValue('1');
      expect(screen.getByLabelText(/número da cat/i)).toHaveValue('123456');
      expect(screen.getByLabelText(/data de emissão da cat/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/data de registro da cat/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/data de afastamento/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/data de retorno/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dias de afastamento/i)).toHaveValue(15);
      expect(screen.getByLabelText(/cid/i)).toHaveValue('S42.0');
      expect(screen.getByLabelText(/descrição do cid/i)).toHaveValue('Fratura da clavícula');
      expect(screen.getByLabelText(/observação/i)).toHaveValue('Observação do acidente');
    });
  });

  it('deve atualizar evento S2210', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2210,
      data: '2024-03-20T14:30:00Z',
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataAcidente: '2024-03-20',
        horaAcidente: '14:30',
        tipoAcidente: '1',
        localAcidente: '1',
        codigoCNAE: '1234567',
        descricaoAcidente: 'Descrição do acidente',
        parteAtingida: 'Braço direito',
        agenteCausador: 'Queda',
        tipoCat: '1',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        dataAfastamento: '2024-03-20',
        dataRetorno: '2024-04-04',
        diasAfastamento: 15,
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        observacao: 'Observação do acidente'
      }
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.update).toHaveBeenCalledWith('1', expect.any(Object));
    });
  });

  it('deve tratar erro ao carregar evento', async () => {
    const error = new Error('Erro ao carregar evento');
    (EsocialEventService.getById as jest.Mock).mockRejectedValueOnce(error);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('should load and display S2230 event data', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2230,
      status: StatusEventoEsocial.PENDENTE,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicioAfastamento: '2024-03-20',
        dataFimAfastamento: '2024-04-04',
        motivoAfastamento: '1',
        tipoAfastamento: '1',
        codigoCNAE: '1234567',
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        diasAfastamento: 15,
        observacao: 'Observação do afastamento'
      }
    };

    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
      expect(screen.getByLabelText(/data de início do afastamento/i)).toHaveValue('20/03/2024');
      expect(screen.getByLabelText(/data de fim do afastamento/i)).toHaveValue('04/04/2024');
      expect(screen.getByLabelText(/motivo do afastamento/i)).toHaveValue('1');
      expect(screen.getByLabelText(/tipo de afastamento/i)).toHaveValue('1');
      expect(screen.getByLabelText(/código cnae/i)).toHaveValue('1234567');
      expect(screen.getByLabelText(/cid/i)).toHaveValue('S42.0');
      expect(screen.getByLabelText(/descrição do cid/i)).toHaveValue('Fratura da clavícula');
      expect(screen.getByLabelText(/número da cat/i)).toHaveValue('123456');
      expect(screen.getByLabelText(/data de emissão da cat/i)).toHaveValue('20/03/2024');
      expect(screen.getByLabelText(/data de registro da cat/i)).toHaveValue('20/03/2024');
      expect(screen.getByLabelText(/dias de afastamento/i)).toHaveValue(15);
      expect(screen.getByLabelText(/observação/i)).toHaveValue('Observação do afastamento');
    });
  });

  it('should handle S2230 event update', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2230,
      status: StatusEventoEsocial.PENDENTE,
      data: new Date(),
      payload: {
        cpf: '12345678900',
        dataInicioAfastamento: '2024-03-20',
        dataFimAfastamento: '2024-04-04',
        motivoAfastamento: '1',
        tipoAfastamento: '1',
        codigoCNAE: '1234567',
        cid: 'S42.0',
        cidDescricao: 'Fratura da clavícula',
        numeroCat: '123456',
        dataEmissaoCat: '2024-03-20',
        dataRegistroCat: '2024-03-20',
        diasAfastamento: 15,
        observacao: 'Observação do afastamento'
      }
    };

    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);
    const mockUpdate = jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce({} as any);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const salvarButton = screen.getByText(/salvar/i);
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith('1', {
        tipo: TipoEventoEsocial.S2230,
        payload: {
          cpf: '12345678900',
          dataInicioAfastamento: '2024-03-20',
          dataFimAfastamento: '2024-04-04',
          motivoAfastamento: '1',
          tipoAfastamento: '1',
          codigoCNAE: '1234567',
          cid: 'S42.0',
          cidDescricao: 'Fratura da clavícula',
          numeroCat: '123456',
          dataEmissaoCat: '2024-03-20',
          dataRegistroCat: '2024-03-20',
          diasAfastamento: 15,
          observacao: 'Observação do afastamento'
        }
      });
    });
  });

  it('should handle error when loading event', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockRejectedValueOnce(new Error('Failed to load event'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve carregar e exibir os dados do evento S2240', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '1234567',
        codigoFatorRisco: '123',
        descricaoFatorRisco: 'Ruído',
        intensidade: 'ALTA',
        tecnicasUtilizadas: 'Medição de ruído',
        tecnologiasUtilizadas: 'Dosímetro',
        epiUtilizado: 'Protetor auricular',
        epcUtilizado: 'Cabine acústica',
        caUtilizado: 'CA-123',
        observacao: 'Teste',
      },
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
    });

    expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
    expect(screen.getByLabelText(/código cnae/i)).toHaveValue('1234567');
    expect(screen.getByLabelText(/código do fator de risco/i)).toHaveValue('123');
    expect(screen.getByLabelText(/descrição do fator de risco/i)).toHaveValue('Ruído');
    expect(screen.getByLabelText(/intensidade/i)).toHaveValue('ALTA');
    expect(screen.getByLabelText(/técnicas utilizadas/i)).toHaveValue('Medição de ruído');
    expect(screen.getByLabelText(/tecnologias utilizadas/i)).toHaveValue('Dosímetro');
    expect(screen.getByLabelText(/epi utilizado/i)).toHaveValue('Protetor auricular');
    expect(screen.getByLabelText(/epc utilizado/i)).toHaveValue('Cabine acústica');
    expect(screen.getByLabelText(/ca utilizado/i)).toHaveValue('CA-123');
    expect(screen.getByLabelText(/observação/i)).toHaveValue('Teste');
  });

  it('deve atualizar o evento S2240', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '1234567',
        codigoFatorRisco: '123',
        descricaoFatorRisco: 'Ruído',
        intensidade: 'ALTA',
        tecnicasUtilizadas: 'Medição de ruído',
        tecnologiasUtilizadas: 'Dosímetro',
        epiUtilizado: 'Protetor auricular',
        epcUtilizado: 'Cabine acústica',
        caUtilizado: 'CA-123',
        observacao: 'Teste',
      },
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
    });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '98765432100' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.update).toHaveBeenCalledWith('1', {
        ...mockEvent,
        payload: {
          ...mockEvent.payload,
          cpf: '98765432100',
        },
      });
    });
  });

  it('deve lidar com erro ao carregar o evento', async () => {
    (EsocialEventService.getById as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve lidar com erro ao atualizar o evento', async () => {
    (EsocialEventService.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
    });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar evento/i)).toBeInTheDocument();
    });
  });

  it('deve carregar e exibir os dados do evento S2250', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2250,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: new Date(),
        tipoAvisoPrevio: '1',
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
    });

    expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
    expect(screen.getByLabelText(/tipo de aviso prévio/i)).toHaveValue('1');
    expect(screen.getByLabelText(/motivo do desligamento/i)).toHaveValue('Pedido de demissão');
    expect(screen.getByLabelText(/observação/i)).toHaveValue('Teste');
  });

  it('deve atualizar o evento S2250', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2250,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678900',
        dataInicio: new Date(),
        dataFim: new Date(),
        tipoAvisoPrevio: '1',
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste',
      },
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalledWith('1');
    });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '98765432100' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.update).toHaveBeenCalledWith('1', {
        ...mockEvent,
        payload: {
          ...mockEvent.payload,
          cpf: '98765432100',
        },
      });
    });
  });

  it('deve lidar com erro ao carregar o evento S2250', async () => {
    (EsocialEventService.getById as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve lidar com erro ao atualizar o evento S2250', async () => {
    (EsocialEventService.update as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar evento/i)).toBeInTheDocument();
    });
  });

  it('deve carregar e exibir os dados do evento S2299', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      status: StatusEventoEsocial.PENDENTE,
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste'
      }
    };

    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toHaveValue('12345678900');
      expect(screen.getByLabelText(/data de desligamento/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/motivo do desligamento/i)).toHaveValue('Pedido de demissão');
      expect(screen.getByLabelText(/observação/i)).toHaveValue('Teste');
    });
  });

  it('deve atualizar um evento S2299', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      status: StatusEventoEsocial.PENDENTE,
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste'
      }
    };

    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);
    jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce({} as any);

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '98765432100' } });

    const salvarButton = screen.getByText(/salvar/i);
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(EsocialEventService.update).toHaveBeenCalledWith('1', {
        ...mockEvent,
        payload: {
          ...mockEvent.payload,
          cpf: '98765432100'
        }
      });
    });
  });

  it('deve lidar com erro ao carregar evento S2299', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockRejectedValueOnce(new Error('Erro ao carregar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve lidar com erro ao atualizar evento S2299', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      status: StatusEventoEsocial.PENDENTE,
      payload: {
        cpf: '12345678900',
        dataDesligamento: new Date(),
        motivoDesligamento: 'Pedido de demissão',
        observacao: 'Teste'
      }
    };

    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);
    jest.spyOn(EsocialEventService, 'update').mockRejectedValueOnce(new Error('Erro ao atualizar evento'));

    render(<EsocialEventoPage />);

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '98765432100' } });

    const salvarButton = screen.getByText(/salvar/i);
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar evento/i)).toBeInTheDocument();
    });
  });

  it('deve carregar e exibir os dados do evento S2400', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2400,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678901',
        dataInicioBeneficio: new Date(),
        tipoBeneficio: '01',
        valorBeneficio: 1500.00,
        dataFimBeneficio: null,
        motivoFimBeneficio: '',
        observacao: 'Teste de benefício'
      }
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);

    render(
      <TestWrapper>
        <EsocialEventoPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('12345678901')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Aposentadoria por Idade')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1500,00')).toBeInTheDocument();
    });
  });

  it('deve atualizar um evento S2400', async () => {
    const mockEvent = {
      id: '1',
      tipo: TipoEventoEsocial.S2400,
      data: new Date(),
      status: 'PENDENTE',
      payload: {
        cpf: '12345678901',
        dataInicioBeneficio: new Date(),
        tipoBeneficio: '01',
        valorBeneficio: 1500.00,
        dataFimBeneficio: null,
        motivoFimBeneficio: '',
        observacao: 'Teste de benefício'
      }
    };

    (EsocialEventService.getById as jest.Mock).mockResolvedValueOnce(mockEvent);
    jest.spyOn(EsocialEventService, 'update').mockResolvedValueOnce(mockEvent);

    render(
      <TestWrapper>
        <EsocialEventoPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '98765432109' } });
    });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(EsocialEventService.update).toHaveBeenCalledWith(mockEvent.id, {
        ...mockEvent,
        payload: {
          ...mockEvent.payload,
          cpf: '98765432109'
        }
      });
    });
  });

  it('deve lidar com erro ao carregar evento S2400', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockRejectedValueOnce(new Error('Erro ao carregar evento'));

    render(
      <TestWrapper>
        <EsocialEventoPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar evento')).toBeInTheDocument();
    });
  });

  it('deve lidar com erro ao atualizar evento S2400', async () => {
    jest.spyOn(EsocialEventService, 'getById').mockResolvedValueOnce(mockEvent);
    jest.spyOn(EsocialEventService, 'update').mockRejectedValueOnce(new Error('Erro ao atualizar evento'));

    render(
      <TestWrapper>
        <EsocialEventoPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '98765432109' } });
    });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao atualizar evento')).toBeInTheDocument();
    });
  });
}); 