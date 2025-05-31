import { render, screen, waitFor } from '@testing-library/react';
import { AvisoPrevioPage } from '@/pages/esocial/eventos/aviso-previo/[id]';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { TestEvent } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('AvisoPrevioPage', () => {
  const mockEvent: TestEvent = {
    id: '1',
    tipo: 'S2206',
    data: new Date(),
    status: 'PENDENTE',
    payload: {
      cpf: '12345678900',
      data: new Date(),
      dataInicioAviso: new Date(),
      dataFimAviso: new Date(),
      motivoAviso: 'DISPENSA_SEM_JUSTA_CAUSA',
      observacao: 'Aviso prévio iniciado'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display event data', async () => {
    const mockGetEvent = jest.spyOn(EsocialEventService, 'getEvent').mockResolvedValueOnce(mockEvent);
    const mockLoadingEvent = jest.spyOn(EsocialEventService, 'loadingEvent').mockReturnValue(false);

    render(
      <TestWrapper>
        <AvisoPrevioPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockGetEvent).toHaveBeenCalled();
      expect(screen.getByText('Aviso Prévio')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    const mockLoadingEvent = jest.spyOn(EsocialEventService, 'loadingEvent').mockReturnValue(true);

    render(
      <TestWrapper>
        <AvisoPrevioPage />
      </TestWrapper>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show error state', async () => {
    const mockGetEvent = jest.spyOn(EsocialEventService, 'getEvent').mockRejectedValueOnce(new Error('Erro ao carregar evento'));
    const mockLoadingEvent = jest.spyOn(EsocialEventService, 'loadingEvent').mockReturnValue(false);

    render(
      <TestWrapper>
        <AvisoPrevioPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar evento')).toBeInTheDocument();
    });
  });
}); 