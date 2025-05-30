import { render, screen } from '@testing-library/react';
import CreateS1000Page from '@/app/esocial/events/s-1000/create/page';
import { useTranslation } from 'react-i18next';

// Mock dos hooks
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('CreateS1000Page', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it('should render the page title', () => {
    render(<CreateS1000Page />);
    expect(screen.getByText('esocial.S1000.title')).toBeInTheDocument();
  });

  it('should render the form', () => {
    render(<CreateS1000Page />);
    
    // Verificar campos principais do formulário
    expect(screen.getByLabelText(/tipo de inscrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de inscrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/início de validade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/classificação tributária/i)).toBeInTheDocument();
  });

  it('should render the form in a paper component', () => {
    render(<CreateS1000Page />);
    expect(screen.getByRole('paper')).toBeInTheDocument();
  });

  it('should render the form in a container', () => {
    render(<CreateS1000Page />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
}); 