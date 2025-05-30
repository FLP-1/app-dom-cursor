import { render, screen, waitFor } from '@testing-library/react';
import { EventosPage } from '@/pages/esocial/eventos';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TipoEventoEsocial } from '@/types/esocial';

jest.mock('@/services/EsocialEventService');

describe('EventosPage', () => {
  const mockEvents = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (EsocialEventService.list as jest.Mock).mockResolvedValue(mockEvents);
  });

  it('deve carregar e exibir os eventos S2300, S2399 e S1207 corretamente', async () => {
    render(
      <TestWrapper>
        <EventosPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(EsocialEventService.list).toHaveBeenCalled();
    });

    expect(screen.getByText(/trabalhador sem vínculo/i)).toBeInTheDocument();
    expect(screen.getByText(/desligamento de trabalhador sem vínculo/i)).toBeInTheDocument();
    expect(screen.getByText(/benefícios previdenciários/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando falhar ao carregar eventos', async () => {
    (EsocialEventService.list as jest.Mock).mockRejectedValue(new Error('Erro ao carregar eventos'));

    render(
      <TestWrapper>
        <EventosPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar eventos/i)).toBeInTheDocument();
    });
  });
}); 