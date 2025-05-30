import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NovoEsocialEventoPage } from '@/pages/esocial/eventos/novo';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

jest.mock('@/services/EsocialEventService');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('NovoEsocialEventoPage', () => {
  const mockEventS2300 = {
    id: '1',
    tipo: TipoEventoEsocial.S2300,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      nome: 'João da Silva',
      dataNascimento: new Date('1990-01-01'),
      sexo: 'M',
      pis: '12345678900',
      dataInicio: new Date(),
      tipoTrabalhador: 'AVULSO',
      cargo: 'Diarista',
      valorHora: 50,
      cargaHoraria: 40
    }
  };

  const mockEventS2399 = {
    id: '2',
    tipo: TipoEventoEsocial.S2399,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '98765432100',
      dataDesligamento: new Date(),
      motivoDesligamento: 'PEDIDO_DEMISSAO',
      observacao: 'Desligamento solicitado pelo trabalhador'
    }
  };

  const mockEventS1207 = {
    id: '3',
    tipo: TipoEventoEsocial.S1207,
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '45678912300',
      dataInicioBeneficio: new Date(),
      tipoBeneficio: 'AUXILIO_DOENCA',
      valorBeneficio: 1000,
      dataFimBeneficio: null,
      motivoFimBeneficio: '',
      observacao: 'Benefício concedido por 15 dias'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with event type selection', () => {
    render(<NovoEsocialEventoPage />);

    expect(screen.getByLabelText(/tipo de evento/i)).toBeInTheDocument();
  });

  it('should handle form submission for S2206 event', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce({} as any);

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2206 } });

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const formData = {
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
    };

    Object.entries(formData).forEach(([key, value]) => {
      const input = screen.getByLabelText(new RegExp(key, 'i'));
      if (input) {
        fireEvent.change(input, { target: { value: value.toString() } });
      }
    });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        tipo: TipoEventoEsocial.S2206,
        payload: expect.objectContaining(formData)
      }));
    });
  });

  it('should handle error on form submission', async () => {
    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Failed to create event'));

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2206 } });

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('deve criar novo evento S2210', async () => {
    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2210 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataAcidenteInput = screen.getByLabelText(/data do acidente/i);
    fireEvent.change(dataAcidenteInput, { target: { value: '2024-03-20' } });

    const horaAcidenteInput = screen.getByLabelText(/hora do acidente/i);
    fireEvent.change(horaAcidenteInput, { target: { value: '14:30' } });

    const tipoAcidenteSelect = screen.getByLabelText(/tipo do acidente/i);
    fireEvent.change(tipoAcidenteSelect, { target: { value: '1' } });

    const localAcidenteSelect = screen.getByLabelText(/local do acidente/i);
    fireEvent.change(localAcidenteSelect, { target: { value: '1' } });

    const codigoCNAEInput = screen.getByLabelText(/código cnae/i);
    fireEvent.change(codigoCNAEInput, { target: { value: '1234567' } });

    const descricaoAcidenteInput = screen.getByLabelText(/descrição do acidente/i);
    fireEvent.change(descricaoAcidenteInput, { target: { value: 'Descrição do acidente' } });

    const parteAtingidaInput = screen.getByLabelText(/parte atingida/i);
    fireEvent.change(parteAtingidaInput, { target: { value: 'Braço direito' } });

    const agenteCausadorInput = screen.getByLabelText(/agente causador/i);
    fireEvent.change(agenteCausadorInput, { target: { value: 'Queda' } });

    const tipoCatSelect = screen.getByLabelText(/tipo de cat/i);
    fireEvent.change(tipoCatSelect, { target: { value: '1' } });

    const numeroCatInput = screen.getByLabelText(/número da cat/i);
    fireEvent.change(numeroCatInput, { target: { value: '123456' } });

    const dataEmissaoCatInput = screen.getByLabelText(/data de emissão da cat/i);
    fireEvent.change(dataEmissaoCatInput, { target: { value: '2024-03-20' } });

    const dataRegistroCatInput = screen.getByLabelText(/data de registro da cat/i);
    fireEvent.change(dataRegistroCatInput, { target: { value: '2024-03-20' } });

    const dataAfastamentoInput = screen.getByLabelText(/data de afastamento/i);
    fireEvent.change(dataAfastamentoInput, { target: { value: '2024-03-20' } });

    const dataRetornoInput = screen.getByLabelText(/data de retorno/i);
    fireEvent.change(dataRetornoInput, { target: { value: '2024-04-04' } });

    const diasAfastamentoInput = screen.getByLabelText(/dias de afastamento/i);
    fireEvent.change(diasAfastamentoInput, { target: { value: '15' } });

    const cidInput = screen.getByLabelText(/cid/i);
    fireEvent.change(cidInput, { target: { value: 'S42.0' } });

    const cidDescricaoInput = screen.getByLabelText(/descrição do cid/i);
    fireEvent.change(cidDescricaoInput, { target: { value: 'Fratura da clavícula' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Observação do acidente' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.create).toHaveBeenCalledWith({
        tipo: TipoEventoEsocial.S2210,
        data: expect.any(Date),
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
      });
    });
  });

  it('deve tratar erro ao criar evento', async () => {
    const error = new Error('Erro ao criar evento');
    (EsocialEventService.create as jest.Mock).mockRejectedValueOnce(error);

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2210 } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('should handle S2230 event creation', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce({} as any);

    render(<NovoEsocialEventoPage />);

    const tipoEventoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoEventoSelect, { target: { value: TipoEventoEsocial.S2230 } });

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '12345678900' } });
    fireEvent.change(screen.getByLabelText(/data de início do afastamento/i), { target: { value: '20/03/2024' } });
    fireEvent.change(screen.getByLabelText(/data de fim do afastamento/i), { target: { value: '04/04/2024' } });
    fireEvent.change(screen.getByLabelText(/motivo do afastamento/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/tipo de afastamento/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/código cnae/i), { target: { value: '1234567' } });
    fireEvent.change(screen.getByLabelText(/cid/i), { target: { value: 'S42.0' } });
    fireEvent.change(screen.getByLabelText(/descrição do cid/i), { target: { value: 'Fratura da clavícula' } });
    fireEvent.change(screen.getByLabelText(/número da cat/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/data de emissão da cat/i), { target: { value: '20/03/2024' } });
    fireEvent.change(screen.getByLabelText(/data de registro da cat/i), { target: { value: '20/03/2024' } });
    fireEvent.change(screen.getByLabelText(/dias de afastamento/i), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText(/observação/i), { target: { value: 'Observação do afastamento' } });

    const salvarButton = screen.getByText(/salvar/i);
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
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

  it('should handle error when creating event', async () => {
    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Failed to create event'));

    render(<NovoEsocialEventoPage />);

    const tipoEventoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoEventoSelect, { target: { value: TipoEventoEsocial.S2230 } });

    await waitFor(() => {
      expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '12345678900' } });
    fireEvent.change(screen.getByLabelText(/data de início do afastamento/i), { target: { value: '20/03/2024' } });
    fireEvent.change(screen.getByLabelText(/motivo do afastamento/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/tipo de afastamento/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/código cnae/i), { target: { value: '1234567' } });
    fireEvent.change(screen.getByLabelText(/cid/i), { target: { value: 'S42.0' } });
    fireEvent.change(screen.getByLabelText(/descrição do cid/i), { target: { value: 'Fratura da clavícula' } });

    const salvarButton = screen.getByText(/salvar/i);
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('deve criar um novo evento S2240', async () => {
    render(
      <TestWrapper>
        <NovoEsocialEventoPage />
      </TestWrapper>
    );

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2240 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataInicioInput = screen.getByLabelText(/data de início/i);
    fireEvent.change(dataInicioInput, { target: { value: '2024-03-20' } });

    const codigoCNAEInput = screen.getByLabelText(/código cnae/i);
    fireEvent.change(codigoCNAEInput, { target: { value: '1234567' } });

    const codigoFatorRiscoInput = screen.getByLabelText(/código do fator de risco/i);
    fireEvent.change(codigoFatorRiscoInput, { target: { value: '123' } });

    const descricaoFatorRiscoInput = screen.getByLabelText(/descrição do fator de risco/i);
    fireEvent.change(descricaoFatorRiscoInput, { target: { value: 'Ruído' } });

    const intensidadeSelect = screen.getByLabelText(/intensidade/i);
    fireEvent.change(intensidadeSelect, { target: { value: 'ALTA' } });

    const tecnicasUtilizadasInput = screen.getByLabelText(/técnicas utilizadas/i);
    fireEvent.change(tecnicasUtilizadasInput, { target: { value: 'Medição de ruído' } });

    const tecnologiasUtilizadasInput = screen.getByLabelText(/tecnologias utilizadas/i);
    fireEvent.change(tecnologiasUtilizadasInput, { target: { value: 'Dosímetro' } });

    const epiUtilizadoInput = screen.getByLabelText(/epi utilizado/i);
    fireEvent.change(epiUtilizadoInput, { target: { value: 'Protetor auricular' } });

    const epcUtilizadoInput = screen.getByLabelText(/epc utilizado/i);
    fireEvent.change(epcUtilizadoInput, { target: { value: 'Cabine acústica' } });

    const caUtilizadoInput = screen.getByLabelText(/ca utilizado/i);
    fireEvent.change(caUtilizadoInput, { target: { value: 'CA-123' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Teste' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.create).toHaveBeenCalledWith({
        tipo: TipoEventoEsocial.S2240,
        data: expect.any(Date),
        payload: {
          cpf: '12345678900',
          dataInicio: expect.any(Date),
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
      });
    });
  });

  it('deve lidar com erro ao criar evento', async () => {
    (EsocialEventService.create as jest.Mock).mockRejectedValueOnce(new Error('Erro ao criar evento'));

    render(
      <TestWrapper>
        <NovoEsocialEventoPage />
      </TestWrapper>
    );

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2240 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('deve criar um novo evento S2250', async () => {
    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2250 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataInicioInput = screen.getByLabelText(/data de início/i);
    fireEvent.change(dataInicioInput, { target: { value: '2024-01-01' } });

    const dataFimInput = screen.getByLabelText(/data de término/i);
    fireEvent.change(dataFimInput, { target: { value: '2024-02-01' } });

    const tipoAvisoPrevioInput = screen.getByLabelText(/tipo de aviso prévio/i);
    fireEvent.change(tipoAvisoPrevioInput, { target: { value: '1' } });

    const motivoDesligamentoInput = screen.getByLabelText(/motivo do desligamento/i);
    fireEvent.change(motivoDesligamentoInput, { target: { value: 'Pedido de demissão' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Teste' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.create).toHaveBeenCalledWith({
        tipo: TipoEventoEsocial.S2250,
        payload: {
          cpf: '12345678900',
          dataInicio: new Date('2024-01-01'),
          dataFim: new Date('2024-02-01'),
          tipoAvisoPrevio: '1',
          motivoDesligamento: 'Pedido de demissão',
          observacao: 'Teste',
        },
      });
    });
  });

  it('deve lidar com erro ao criar evento S2250', async () => {
    (EsocialEventService.create as jest.Mock).mockRejectedValueOnce(new Error('Erro ao criar evento'));

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2250 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataInicioInput = screen.getByLabelText(/data de início/i);
    fireEvent.change(dataInicioInput, { target: { value: '2024-01-01' } });

    const dataFimInput = screen.getByLabelText(/data de término/i);
    fireEvent.change(dataFimInput, { target: { value: '2024-02-01' } });

    const tipoAvisoPrevioInput = screen.getByLabelText(/tipo de aviso prévio/i);
    fireEvent.change(tipoAvisoPrevioInput, { target: { value: '1' } });

    const motivoDesligamentoInput = screen.getByLabelText(/motivo do desligamento/i);
    fireEvent.change(motivoDesligamentoInput, { target: { value: 'Pedido de demissão' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('deve criar um novo evento S2299', async () => {
    jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce({} as any);

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2299 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataDesligamentoInput = screen.getByLabelText(/data de desligamento/i);
    fireEvent.change(dataDesligamentoInput, { target: { value: '2024-03-20' } });

    const motivoDesligamentoInput = screen.getByLabelText(/motivo do desligamento/i);
    fireEvent.change(motivoDesligamentoInput, { target: { value: 'Pedido de demissão' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Teste' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.create).toHaveBeenCalledWith({
        tipo: TipoEventoEsocial.S2299,
        data: expect.any(Date),
        payload: {
          cpf: '12345678900',
          dataDesligamento: expect.any(Date),
          motivoDesligamento: 'Pedido de demissão',
          observacao: 'Teste'
        }
      });
    });
  });

  it('deve lidar com erro ao criar evento S2299', async () => {
    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    render(<NovoEsocialEventoPage />);

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2299 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const dataDesligamentoInput = screen.getByLabelText(/data de desligamento/i);
    fireEvent.change(dataDesligamentoInput, { target: { value: '2024-03-20' } });

    const motivoDesligamentoInput = screen.getByLabelText(/motivo do desligamento/i);
    fireEvent.change(motivoDesligamentoInput, { target: { value: 'Pedido de demissão' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Teste' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });

  it('deve criar um novo evento S2400', async () => {
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

    jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce(mockEvent);

    render(
      <TestWrapper>
        <NovoEsocialEventoPage />
      </TestWrapper>
    );

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2400 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678901' } });

    const dataInicioInput = screen.getByLabelText(/data de início do benefício/i);
    fireEvent.change(dataInicioInput, { target: { value: '2024-03-20' } });

    const tipoBeneficioSelect = screen.getByLabelText(/tipo de benefício/i);
    fireEvent.change(tipoBeneficioSelect, { target: { value: '01' } });

    const valorInput = screen.getByLabelText(/valor do benefício/i);
    fireEvent.change(valorInput, { target: { value: '1500,00' } });

    const observacaoInput = screen.getByLabelText(/observação/i);
    fireEvent.change(observacaoInput, { target: { value: 'Teste de benefício' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(EsocialEventService.create).toHaveBeenCalledWith({
        tipo: TipoEventoEsocial.S2400,
        data: expect.any(Date),
        payload: {
          cpf: '12345678901',
          dataInicioBeneficio: expect.any(Date),
          tipoBeneficio: '01',
          valorBeneficio: 1500.00,
          dataFimBeneficio: null,
          motivoFimBeneficio: '',
          observacao: 'Teste de benefício'
        }
      });
    });
  });

  it('deve lidar com erro ao criar evento S2400', async () => {
    jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    render(
      <TestWrapper>
        <NovoEsocialEventoPage />
      </TestWrapper>
    );

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2400 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678901' } });

    const dataInicioInput = screen.getByLabelText(/data de início do benefício/i);
    fireEvent.change(dataInicioInput, { target: { value: '2024-03-20' } });

    const tipoBeneficioSelect = screen.getByLabelText(/tipo de benefício/i);
    fireEvent.change(tipoBeneficioSelect, { target: { value: '01' } });

    const valorInput = screen.getByLabelText(/valor do benefício/i);
    fireEvent.change(valorInput, { target: { value: '1500,00' } });

    const submitButton = screen.getByText(/salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar evento')).toBeInTheDocument();
    });
  });

  describe('Evento S2300', () => {
    beforeEach(() => {
      (EsocialEventService.create as jest.Mock).mockResolvedValue(mockEventS2300);
    });

    it('deve criar um evento S2300 com sucesso', async () => {
      render(
        <TestWrapper>
          <NovoEsocialEventoPage />
        </TestWrapper>
      );

      const tipoSelect = screen.getByLabelText(/tipo de evento/i);
      fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2300 } });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '12345678900' } });

      const nomeInput = screen.getByLabelText(/nome completo/i);
      fireEvent.change(nomeInput, { target: { value: 'João da Silva' } });

      const dataNascimentoInput = screen.getByLabelText(/data de nascimento/i);
      fireEvent.change(dataNascimentoInput, { target: { value: '1990-01-01' } });

      const sexoSelect = screen.getByLabelText(/sexo/i);
      fireEvent.change(sexoSelect, { target: { value: 'M' } });

      const pisInput = screen.getByLabelText(/pis\/pasep/i);
      fireEvent.change(pisInput, { target: { value: '12345678900' } });

      const dataInicioInput = screen.getByLabelText(/data de início/i);
      fireEvent.change(dataInicioInput, { target: { value: new Date().toISOString().split('T')[0] } });

      const tipoTrabalhadorSelect = screen.getByLabelText(/tipo de trabalhador/i);
      fireEvent.change(tipoTrabalhadorSelect, { target: { value: 'AVULSO' } });

      const cargoInput = screen.getByLabelText(/cargo/i);
      fireEvent.change(cargoInput, { target: { value: 'Diarista' } });

      const valorHoraInput = screen.getByLabelText(/valor hora/i);
      fireEvent.change(valorHoraInput, { target: { value: '50' } });

      const cargaHorariaInput = screen.getByLabelText(/carga horária/i);
      fireEvent.change(cargaHorariaInput, { target: { value: '40' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.create).toHaveBeenCalledWith({
          tipo: TipoEventoEsocial.S2300,
          payload: mockEventS2300.payload
        });
      });
    });
  });

  describe('Evento S2399', () => {
    beforeEach(() => {
      (EsocialEventService.create as jest.Mock).mockResolvedValue(mockEventS2399);
    });

    it('deve criar um evento S2399 com sucesso', async () => {
      render(
        <TestWrapper>
          <NovoEsocialEventoPage />
        </TestWrapper>
      );

      const tipoSelect = screen.getByLabelText(/tipo de evento/i);
      fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2399 } });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '98765432100' } });

      const dataDesligamentoInput = screen.getByLabelText(/data de desligamento/i);
      fireEvent.change(dataDesligamentoInput, { target: { value: new Date().toISOString().split('T')[0] } });

      const motivoDesligamentoSelect = screen.getByLabelText(/motivo do desligamento/i);
      fireEvent.change(motivoDesligamentoSelect, { target: { value: 'PEDIDO_DEMISSAO' } });

      const observacaoInput = screen.getByLabelText(/observação/i);
      fireEvent.change(observacaoInput, { target: { value: 'Desligamento solicitado pelo trabalhador' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.create).toHaveBeenCalledWith({
          tipo: TipoEventoEsocial.S2399,
          payload: mockEventS2399.payload
        });
      });
    });
  });

  describe('Evento S1207', () => {
    beforeEach(() => {
      (EsocialEventService.create as jest.Mock).mockResolvedValue(mockEventS1207);
    });

    it('deve criar um evento S1207 com sucesso', async () => {
      render(
        <TestWrapper>
          <NovoEsocialEventoPage />
        </TestWrapper>
      );

      const tipoSelect = screen.getByLabelText(/tipo de evento/i);
      fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S1207 } });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '45678912300' } });

      const dataInicioBeneficioInput = screen.getByLabelText(/data de início do benefício/i);
      fireEvent.change(dataInicioBeneficioInput, { target: { value: new Date().toISOString().split('T')[0] } });

      const tipoBeneficioSelect = screen.getByLabelText(/tipo de benefício/i);
      fireEvent.change(tipoBeneficioSelect, { target: { value: 'AUXILIO_DOENCA' } });

      const valorBeneficioInput = screen.getByLabelText(/valor do benefício/i);
      fireEvent.change(valorBeneficioInput, { target: { value: '1000' } });

      const observacaoInput = screen.getByLabelText(/observação/i);
      fireEvent.change(observacaoInput, { target: { value: 'Benefício concedido por 15 dias' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.create).toHaveBeenCalledWith({
          tipo: TipoEventoEsocial.S1207,
          payload: mockEventS1207.payload
        });
      });
    });
  });

  it('deve exibir mensagem de erro quando falhar ao criar evento', async () => {
    (EsocialEventService.create as jest.Mock).mockRejectedValue(new Error('Erro ao criar evento'));

    render(
      <TestWrapper>
        <NovoEsocialEventoPage />
      </TestWrapper>
    );

    const tipoSelect = screen.getByLabelText(/tipo de evento/i);
    fireEvent.change(tipoSelect, { target: { value: TipoEventoEsocial.S2300 } });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar evento/i)).toBeInTheDocument();
    });
  });
}); 