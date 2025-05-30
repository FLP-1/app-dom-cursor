import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EsocialS2250EditPage from '@/pages/esocial/eventos/aviso-previo/[id]';
import { useEsocialS2250Form } from '@/hooks/useEsocialS2250Form';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { useRouter } from 'next/router';

// Mock dos hooks
jest.mock('@/hooks/useEsocialS2250Form');
jest.mock('@/hooks/useEsocialEvent');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('EsocialS2250EditPage', () => {
  const mockRouter = {
    push: jest.fn(),
    query: { id: '123' }
  };

  const mockControl = {};
  const mockOnSubmit = jest.fn();
  const mockLoading = false;
  const mockReset = jest.fn();

  const mockGetEvent = jest.fn();
  const mockLoadingEvent = false;

  const mockEvento = {
    payload: {
      cpf: '123.456.789-00',
      dataAviso: new Date(),
      dataInicioAviso: new Date(),
      dataFimAviso: new Date(),
      tipoAviso: '1',
      codigoMotivoAviso: '1',
      motivoAviso: 'Teste',
      dataDesligamento: new Date(),
      indenizacao: {
        valor: 1000,
        dataPagamento: new Date()
      },
      observacao: 'Teste'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useEsocialS2250Form as jest.Mock).mockReturnValue({
      control: mockControl,
      onSubmit: mockOnSubmit,
      loading: mockLoading,
      reset: mockReset
    });
    (useEsocialEvent as jest.Mock).mockReturnValue({
      getEvent: mockGetEvent,
      loading: mockLoadingEvent
    });
  });

  it('deve renderizar o título da página', () => {
    render(<EsocialS2250EditPage />);

    expect(screen.getByText('esocial:events.S2250.tituloEdicao')).toBeInTheDocument();
  });

  it('deve renderizar o botão de voltar', () => {
    render(<EsocialS2250EditPage />);

    const voltarButton = screen.getByText('common:voltar');
    expect(voltarButton).toBeInTheDocument();
    expect(voltarButton.closest('a')).toHaveAttribute('href', '/esocial/eventos');
  });

  it('deve carregar o evento ao montar o componente', async () => {
    mockGetEvent.mockResolvedValueOnce(mockEvento);

    render(<EsocialS2250EditPage />);

    await waitFor(() => {
      expect(mockGetEvent).toHaveBeenCalledWith('123');
      expect(mockReset).toHaveBeenCalledWith({
        payload: mockEvento.payload
      });
    });
  });

  it('deve mostrar loading enquanto carrega o evento', () => {
    (useEsocialEvent as jest.Mock).mockReturnValue({
      getEvent: mockGetEvent,
      loading: true
    });

    render(<EsocialS2250EditPage />);

    expect(screen.getByText('common:carregando')).toBeInTheDocument();
  });

  it('deve renderizar o formulário com os campos necessários', () => {
    render(<EsocialS2250EditPage />);

    expect(screen.getByLabelText('esocial:events.S2250.cpf')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.dataAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.dataInicioAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.dataFimAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.tipoAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.codigoMotivoAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.motivoAviso')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.dataDesligamento')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.indenizacao.valor')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.indenizacao.dataPagamento')).toBeInTheDocument();
    expect(screen.getByLabelText('esocial:events.S2250.observacao')).toBeInTheDocument();
  });

  it('deve renderizar os botões de ação', () => {
    render(<EsocialS2250EditPage />);

    expect(screen.getByText('common:cancelar')).toBeInTheDocument();
    expect(screen.getByText('common:salvar')).toBeInTheDocument();
  });

  it('deve chamar onSubmit quando o formulário for submetido', async () => {
    render(<EsocialS2250EditPage />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('deve mostrar o botão de salvar com loading quando estiver carregando', () => {
    (useEsocialS2250Form as jest.Mock).mockReturnValue({
      control: mockControl,
      onSubmit: mockOnSubmit,
      loading: true,
      reset: mockReset
    });

    render(<EsocialS2250EditPage />);

    const salvarButton = screen.getByText('common:salvar');
    expect(salvarButton).toHaveAttribute('aria-busy', 'true');
  });
}); 