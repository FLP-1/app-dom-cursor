import { render, screen, waitFor } from '@testing-library/react';
import EditS1000Page from '@/app/esocial/events/s-1000/[id]/edit/page';
import { useTranslation } from 'react-i18next';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useParams } from 'next/navigation';

// Mock dos hooks
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('@/hooks/useEsocialApi');
jest.mock('next/navigation');

describe('EditS1000Page', () => {
  const mockGetEvent = jest.fn();
  const mockId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
    (useEsocialApi as jest.Mock).mockReturnValue({
      getEvent: mockGetEvent,
    });
    (useParams as jest.Mock).mockReturnValue({
      id: mockId,
    });
  });

  it('should render the page title', () => {
    render(<EditS1000Page />);
    expect(screen.getByText('esocial.S1000.title')).toBeInTheDocument();
  });

  it('should load event data on mount', async () => {
    const mockEventData = {
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '12345678901234',
        iniValid: '2024-01',
      },
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
    };

    mockGetEvent.mockResolvedValueOnce(mockEventData);

    render(<EditS1000Page />);

    await waitFor(() => {
      expect(mockGetEvent).toHaveBeenCalledWith('S-1000', mockId);
    });

    // Verificar se os campos foram preenchidos com os dados carregados
    expect(screen.getByLabelText(/tipo de inscrição/i)).toHaveValue('1');
    expect(screen.getByLabelText(/número de inscrição/i)).toHaveValue('12345678901234');
    expect(screen.getByLabelText(/início de validade/i)).toHaveValue('2024-01');
    expect(screen.getByLabelText(/classificação tributária/i)).toHaveValue('01');
  });

  it('should handle error when loading event data', async () => {
    mockGetEvent.mockRejectedValueOnce(new Error('API Error'));

    render(<EditS1000Page />);

    await waitFor(() => {
      expect(mockGetEvent).toHaveBeenCalledWith('S-1000', mockId);
    });

    // Verificar se a mensagem de erro foi exibida
    expect(screen.getByText('messages.error.load')).toBeInTheDocument();
  });

  it('should render the form in a paper component', () => {
    render(<EditS1000Page />);
    expect(screen.getByRole('paper')).toBeInTheDocument();
  });

  it('should render the form in a container', () => {
    render(<EditS1000Page />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
}); 