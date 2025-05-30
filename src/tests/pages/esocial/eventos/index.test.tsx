import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EsocialEventosPage } from '@/pages/esocial/eventos';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TipoEventoEsocial, StatusEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

jest.mock('@/services/EsocialEventService');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('EsocialEventosPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render page title and new event button', () => {
    render(<EsocialEventosPage />);

    expect(screen.getByText(/eventos do esocial/i)).toBeInTheDocument();
    expect(screen.getByText(/novo evento/i)).toBeInTheDocument();
  });

  it('should load and display events', async () => {
    const mockEvents = [
      {
        id: '1',
        tipo: TipoEventoEsocial.S2200,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '12345678900',
          nome: 'Test User'
        }
      },
      {
        id: '2',
        tipo: TipoEventoEsocial.S2206,
        status: StatusEventoEsocial.ENVIADO,
        data: new Date(),
        payload: {
          cpf: '98765432100',
          cargo: 'Desenvolvedor'
        }
      },
      {
        id: '3',
        tipo: TipoEventoEsocial.S2210,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
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
      },
      {
        id: '4',
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
      },
      {
        id: '5',
        tipo: TipoEventoEsocial.S2240,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '98765432100',
          dataInicio: new Date(),
          codigoCNAE: '1234567',
          codigoFatorRisco: '123',
          descricaoFatorRisco: 'Ruído',
          intensidade: 'ALTA',
          tecnicasUtilizadas: 'Medição de ruído',
          tecnologiasUtilizadas: 'Dosímetro',
          epiUtilizado: 'Protetor auricular',
          epcUtilizado: 'Cabine acústica',
          caUtilizado: 'CA-123',
        }
      },
      {
        id: '6',
        tipo: TipoEventoEsocial.S2250,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '12345678900',
          dataInicio: new Date(),
          dataFim: new Date(),
          tipoAvisoPrevio: '1',
          motivoDesligamento: 'Pedido de demissão',
          observacao: 'Teste'
        }
      },
      {
        id: '7',
        tipo: TipoEventoEsocial.S2299,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '98765432100',
          dataDesligamento: new Date(),
          motivoDesligamento: 'Pedido de demissão',
          observacao: 'Teste'
        }
      },
      {
        id: '8',
        tipo: TipoEventoEsocial.S2400,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '98765432109',
          dataInicioBeneficio: new Date(),
          tipoBeneficio: '01',
          valorBeneficio: 1500.00
        }
      }
    ];

    jest.spyOn(EsocialEventService, 'list').mockResolvedValueOnce(mockEvents);

    render(<EsocialEventosPage />);

    await waitFor(() => {
      expect(screen.getByText(/cadastramento inicial do vínculo/i)).toBeInTheDocument();
      expect(screen.getByText(/alteração de contrato de trabalho/i)).toBeInTheDocument();
      expect(screen.getByText(/comunicação de acidente de trabalho/i)).toBeInTheDocument();
      expect(screen.getByText(/afastamento temporário/i)).toBeInTheDocument();
      expect(screen.getByText(/condições ambientais do trabalho/i)).toBeInTheDocument();
      expect(screen.getByText(/aviso prévio/i)).toBeInTheDocument();
      expect(screen.getByText(/desligamento/i)).toBeInTheDocument();
      expect(screen.getByText(/aposentadoria por idade/i)).toBeInTheDocument();
    });
  });

  it('should handle event sending', async () => {
    const mockEnviar = jest.spyOn(EsocialEventService, 'enviar').mockResolvedValueOnce({} as any);

    const mockEvents = [
      {
        id: '1',
        tipo: TipoEventoEsocial.S2206,
        status: StatusEventoEsocial.PENDENTE,
        data: new Date(),
        payload: {
          cpf: '12345678900',
          cargo: 'Desenvolvedor'
        }
      }
    ];

    jest.spyOn(EsocialEventService, 'list').mockResolvedValueOnce(mockEvents);

    render(<EsocialEventosPage />);

    await waitFor(() => {
      expect(screen.getByText(/alteração de contrato de trabalho/i)).toBeInTheDocument();
    });

    const enviarButton = screen.getByText(/enviar/i);
    fireEvent.click(enviarButton);

    await waitFor(() => {
      expect(mockEnviar).toHaveBeenCalledWith('1');
    });
  });

  it('should handle error when loading events', async () => {
    jest.spyOn(EsocialEventService, 'list').mockRejectedValueOnce(new Error('Failed to load events'));

    render(<EsocialEventosPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar eventos/i)).toBeInTheDocument();
    });
  });
}); 