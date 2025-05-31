import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NovoAvisoPrevioPage } from '@/pages/esocial/eventos/aviso-previo/novo';
import { EsocialEventService } from '@/services/EsocialEventService';
import { TestWrapper } from '@/tests/utils/TestWrapper';
import { EsocialEventResponse } from '@/tests/types';

jest.mock('@/services/EsocialEventService');

describe('NovoAvisoPrevioPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page title', () => {
    render(
      <TestWrapper>
        <NovoAvisoPrevioPage />
      </TestWrapper>
    );

    expect(screen.getByText('Novo Aviso Prévio')).toBeInTheDocument();
  });

  it('should render the back button', () => {
    render(
      <TestWrapper>
        <NovoAvisoPrevioPage />
      </TestWrapper>
    );

    const backButton = screen.getByText('Voltar');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/esocial/eventos');
  });

  it('should handle form submission', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockResolvedValueOnce({} as EsocialEventResponse);

    render(
      <TestWrapper>
        <NovoAvisoPrevioPage />
      </TestWrapper>
    );

    // Preencher formulário
    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '12345678900' } });
    fireEvent.change(screen.getByLabelText('Data do Aviso'), { target: { value: '2024-03-20' } });
    fireEvent.change(screen.getByLabelText('Data de Início'), { target: { value: '2024-03-21' } });
    fireEvent.change(screen.getByLabelText('Data de Fim'), { target: { value: '2024-04-20' } });
    fireEvent.change(screen.getByLabelText('Motivo do Aviso'), { target: { value: 'DISPENSA_SEM_JUSTA_CAUSA' } });
    fireEvent.change(screen.getByLabelText('Observação'), { target: { value: 'Aviso prévio iniciado' } });

    // Submeter formulário
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
        tipo: 'S2206',
        payload: {
          cpf: '12345678900',
          data: '2024-03-20',
          dataInicioAviso: '2024-03-21',
          dataFimAviso: '2024-04-20',
          motivoAviso: 'DISPENSA_SEM_JUSTA_CAUSA',
          observacao: 'Aviso prévio iniciado'
        }
      });
    });
  });

  it('should show loading state during submission', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockImplementation(() => new Promise(() => {}));

    render(
      <TestWrapper>
        <NovoAvisoPrevioPage />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Salvar'));

    expect(screen.getByText('Salvar')).toHaveAttribute('aria-busy', 'true');
  });

  it('should show error message on submission failure', async () => {
    const mockCreate = jest.spyOn(EsocialEventService, 'create').mockRejectedValueOnce(new Error('Erro ao criar evento'));

    render(
      <TestWrapper>
        <NovoAvisoPrevioPage />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar evento')).toBeInTheDocument();
    });
  });
}); 