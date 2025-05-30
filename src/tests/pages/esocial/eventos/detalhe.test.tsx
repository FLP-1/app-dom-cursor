import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { EventoDetalhePage } from '@/pages/esocial/eventos/[id]';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TipoEventoEsocial } from '@/types/esocial';

jest.mock('@/services/EsocialEventService');

describe('EventoDetalhePage', () => {
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

  describe('Evento S2300', () => {
    beforeEach(() => {
      (EsocialEventService.getById as jest.Mock).mockResolvedValue(mockEventS2300);
    });

    it('deve carregar e exibir os dados do evento S2300 corretamente', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      expect(screen.getByText(/trabalhador sem vínculo/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('12345678900')).toBeInTheDocument();
      expect(screen.getByDisplayValue('João da Silva')).toBeInTheDocument();
    });

    it('deve atualizar um evento S2300 com sucesso', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '11122233344' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.update).toHaveBeenCalledWith('1', {
          ...mockEventS2300.payload,
          cpf: '11122233344'
        });
      });
    });
  });

  describe('Evento S2399', () => {
    beforeEach(() => {
      (EsocialEventService.getById as jest.Mock).mockResolvedValue(mockEventS2399);
    });

    it('deve carregar e exibir os dados do evento S2399 corretamente', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      expect(screen.getByText(/desligamento de trabalhador sem vínculo/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('98765432100')).toBeInTheDocument();
    });

    it('deve atualizar um evento S2399 com sucesso', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '11122233344' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.update).toHaveBeenCalledWith('2', {
          ...mockEventS2399.payload,
          cpf: '11122233344'
        });
      });
    });
  });

  describe('Evento S1207', () => {
    beforeEach(() => {
      (EsocialEventService.getById as jest.Mock).mockResolvedValue(mockEventS1207);
    });

    it('deve carregar e exibir os dados do evento S1207 corretamente', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      expect(screen.getByText(/benefícios previdenciários/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue('45678912300')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
    });

    it('deve atualizar um evento S1207 com sucesso', async () => {
      render(
        <TestWrapper>
          <EventoDetalhePage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(EsocialEventService.getById).toHaveBeenCalled();
      });

      const cpfInput = screen.getByLabelText(/cpf/i);
      fireEvent.change(cpfInput, { target: { value: '11122233344' } });

      const saveButton = screen.getByText(/salvar/i);
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(EsocialEventService.update).toHaveBeenCalledWith('3', {
          ...mockEventS1207.payload,
          cpf: '11122233344'
        });
      });
    });
  });

  it('deve exibir mensagem de erro quando falhar ao carregar evento', async () => {
    (EsocialEventService.getById as jest.Mock).mockRejectedValue(new Error('Erro ao carregar evento'));

    render(
      <TestWrapper>
        <EventoDetalhePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar evento/i)).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem de erro quando falhar ao atualizar evento', async () => {
    (EsocialEventService.getById as jest.Mock).mockResolvedValue(mockEventS2300);
    (EsocialEventService.update as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar evento'));

    render(
      <TestWrapper>
        <EventoDetalhePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(EsocialEventService.getById).toHaveBeenCalled();
    });

    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '11122233344' } });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar evento/i)).toBeInTheDocument();
    });
  });
}); 