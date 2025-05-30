import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CargoForm } from '../../components/CargoForm';
import { useCargoForm } from '../../hooks/forms/useCargoForm';
import { cargoService } from '../../services/cargo.service';

// Mock dos hooks e serviços
jest.mock('../../hooks/forms/useCargoForm');
jest.mock('../../services/cargo.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('CargoForm', () => {
  const mockInitialValues = {
    codigo: '1234-5',
    nome: 'Auxiliar de Serviços Gerais',
    descricao: 'Realiza serviços de limpeza e manutenção',
    categoria: '10',
    salarioBase: 1500,
    jornadaTrabalho: '40h',
    requisitos: 'Ensino Fundamental Completo',
    beneficios: 'Vale Transporte, Vale Refeição',
    ativo: true
  };

  const mockFormHook = {
    control: {},
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
      isSubmitting: false
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCargoForm as jest.Mock).mockReturnValue(mockFormHook);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<CargoForm />);

    expect(screen.getByText('Dados do Cargo')).toBeInTheDocument();
    expect(screen.getByText('Remuneração')).toBeInTheDocument();
    expect(screen.getByText('Requisitos e Benefícios')).toBeInTheDocument();
  });

  it('deve exibir valores iniciais quando fornecidos', () => {
    render(<CargoForm initialValues={mockInitialValues} />);

    expect(screen.getByDisplayValue('1234-5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Auxiliar de Serviços Gerais')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Realiza serviços de limpeza e manutenção')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1500')).toBeInTheDocument();
    expect(screen.getByDisplayValue('40h')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ensino Fundamental Completo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Vale Transporte, Vale Refeição')).toBeInTheDocument();
  });

  it('deve chamar onSubmit ao enviar o formulário', async () => {
    const mockOnSubmit = jest.fn();
    render(<CargoForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(mockFormHook.handleSubmit).toHaveBeenCalledWith(mockOnSubmit);
    });
  });

  it('deve exibir erros de validação', () => {
    const mockErrors = {
      codigo: { message: 'Código é obrigatório' },
      nome: { message: 'Nome é obrigatório' },
      categoria: { message: 'Categoria é obrigatória' },
      salarioBase: { message: 'Salário Base é obrigatório' },
      jornadaTrabalho: { message: 'Jornada de Trabalho é obrigatória' }
    };

    (useCargoForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        errors: mockErrors
      }
    });

    render(<CargoForm />);

    expect(screen.getByText('Código é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Salário Base é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Jornada de Trabalho é obrigatória')).toBeInTheDocument();
  });

  it('deve mostrar estado de carregamento durante o envio', () => {
    (useCargoForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        isSubmitting: true
      }
    });

    render(<CargoForm />);

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });

  it('deve aplicar máscaras nos campos', () => {
    render(<CargoForm />);

    const codigoInput = screen.getByLabelText('Código');
    fireEvent.change(codigoInput, { target: { value: '12345' } });
    expect(codigoInput).toHaveValue('1234-5');

    const salarioInput = screen.getByLabelText('Salário Base');
    fireEvent.change(salarioInput, { target: { value: '1500' } });
    expect(salarioInput).toHaveValue('1500');
  });

  it('deve mostrar tooltips nos campos', () => {
    render(<CargoForm />);

    const tooltips = screen.getAllByRole('tooltip');
    expect(tooltips).toHaveLength(9); // Número total de campos com tooltip
  });
}); 