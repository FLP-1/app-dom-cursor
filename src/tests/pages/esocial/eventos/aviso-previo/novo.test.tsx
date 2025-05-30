import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EsocialS2250FormPage from '@/pages/esocial/eventos/aviso-previo/novo';
import { useEsocialS2250Form } from '@/hooks/useEsocialS2250Form';
import { useRouter } from 'next/router';

// Mock dos hooks
jest.mock('@/hooks/useEsocialS2250Form');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('EsocialS2250FormPage', () => {
  const mockRouter = {
    push: jest.fn()
  };

  const mockControl = {};
  const mockOnSubmit = jest.fn();
  const mockLoading = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useEsocialS2250Form as jest.Mock).mockReturnValue({
      control: mockControl,
      onSubmit: mockOnSubmit,
      loading: mockLoading
    });
  });

  it('deve renderizar o título da página', () => {
    render(<EsocialS2250FormPage />);

    expect(screen.getByText('esocial:events.S2250.titulo')).toBeInTheDocument();
  });

  it('deve renderizar o botão de voltar', () => {
    render(<EsocialS2250FormPage />);

    const voltarButton = screen.getByText('common:voltar');
    expect(voltarButton).toBeInTheDocument();
    expect(voltarButton.closest('a')).toHaveAttribute('href', '/esocial/eventos');
  });

  it('deve renderizar o formulário com os campos necessários', () => {
    render(<EsocialS2250FormPage />);

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
    render(<EsocialS2250FormPage />);

    expect(screen.getByText('common:cancelar')).toBeInTheDocument();
    expect(screen.getByText('common:salvar')).toBeInTheDocument();
  });

  it('deve chamar onSubmit quando o formulário for submetido', async () => {
    render(<EsocialS2250FormPage />);

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
      loading: true
    });

    render(<EsocialS2250FormPage />);

    const salvarButton = screen.getByText('common:salvar');
    expect(salvarButton).toHaveAttribute('aria-busy', 'true');
  });
}); 