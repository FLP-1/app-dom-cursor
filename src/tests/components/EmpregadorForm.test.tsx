import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmpregadorForm } from '../../components/EmpregadorForm';
import { useEmpregadorForm } from '../../hooks/forms/useEmpregadorForm';
import { empregadorService } from '../../services/empregador.service';

// Mock dos hooks e serviços
jest.mock('../../hooks/forms/useEmpregadorForm');
jest.mock('../../services/empregador.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadorForm', () => {
  const mockInitialValues = {
    cpf: '123.456.789-00',
    nomeCompleto: 'João Silva',
    dataNascimento: '1980-01-01',
    sexo: 'M',
    nacionalidade: 'Brasileiro',
    grauInstrucao: 'Ensino Superior',
    nomeMae: 'Maria Silva',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '12345-678',
    municipio: 'São Paulo',
    uf: 'SP',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
    dataAdmissao: '2024-01-01',
    matricula: '12345',
    categoria: '10',
    remuneracao: 5000,
    cargoId: '1234-5',
    jornadaTrabalho: '40h',
    ctpsNumero: '123456',
    ctpsSerie: '1234',
    ctpsUf: 'SP',
    pisPasep: '123.45678.90-1'
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
    (useEmpregadorForm as jest.Mock).mockReturnValue(mockFormHook);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<EmpregadorForm />);

    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText('Dados Profissionais')).toBeInTheDocument();
    expect(screen.getByText('Documentos')).toBeInTheDocument();
  });

  it('deve exibir valores iniciais quando fornecidos', () => {
    render(<EmpregadorForm initialValues={mockInitialValues} />);

    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123.456.789-00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1980-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('M')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Brasileiro')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ensino Superior')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Maria Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rua das Flores')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Centro')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345-678')).toBeInTheDocument();
    expect(screen.getByDisplayValue('São Paulo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('SP')).toBeInTheDocument();
    expect(screen.getByDisplayValue('(11) 98765-4321')).toBeInTheDocument();
    expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234-5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('40h')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    expect(screen.getByDisplayValue('SP')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123.45678.90-1')).toBeInTheDocument();
  });

  it('deve chamar onSubmit ao enviar o formulário', async () => {
    const mockOnSubmit = jest.fn();
    render(<EmpregadorForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(mockFormHook.handleSubmit).toHaveBeenCalledWith(mockOnSubmit);
    });
  });

  it('deve exibir erros de validação', () => {
    const mockErrors = {
      nomeCompleto: { message: 'Nome Completo é obrigatório' },
      cpf: { message: 'CPF é obrigatório' },
      dataNascimento: { message: 'Data de Nascimento é obrigatória' },
      sexo: { message: 'Sexo é obrigatório' },
      nacionalidade: { message: 'Nacionalidade é obrigatória' },
      nomeMae: { message: 'Nome da Mãe é obrigatório' },
      endereco: { message: 'Endereço é obrigatório' },
      numero: { message: 'Número é obrigatório' },
      bairro: { message: 'Bairro é obrigatório' },
      cep: { message: 'CEP é obrigatório' },
      municipio: { message: 'Município é obrigatório' },
      uf: { message: 'UF é obrigatória' },
      telefone: { message: 'Telefone é obrigatório' },
      dataAdmissao: { message: 'Data de Admissão é obrigatória' },
      matricula: { message: 'Matrícula é obrigatória' },
      categoria: { message: 'Categoria é obrigatória' },
      remuneracao: { message: 'Remuneração é obrigatória' },
      cargoId: { message: 'Cargo é obrigatório' },
      jornadaTrabalho: { message: 'Jornada de Trabalho é obrigatória' },
      ctpsNumero: { message: 'Número da CTPS é obrigatório' },
      ctpsSerie: { message: 'Série da CTPS é obrigatória' },
      ctpsUf: { message: 'UF da CTPS é obrigatória' },
      pisPasep: { message: 'PIS/PASEP é obrigatório' }
    };

    (useEmpregadorForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        errors: mockErrors
      }
    });

    render(<EmpregadorForm />);

    expect(screen.getByText('Nome Completo é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('CPF é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Data de Nascimento é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Sexo é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Nacionalidade é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Nome da Mãe é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Endereço é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Número é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Bairro é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('CEP é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Município é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('UF é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Telefone é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Data de Admissão é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Matrícula é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Remuneração é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Cargo é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Jornada de Trabalho é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Número da CTPS é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Série da CTPS é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('UF da CTPS é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('PIS/PASEP é obrigatório')).toBeInTheDocument();
  });

  it('deve mostrar estado de carregamento durante o envio', () => {
    (useEmpregadorForm as jest.Mock).mockReturnValue({
      ...mockFormHook,
      formState: {
        ...mockFormHook.formState,
        isSubmitting: true
      }
    });

    render(<EmpregadorForm />);

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });

  it('deve aplicar máscaras nos campos', () => {
    render(<EmpregadorForm />);

    const cpfInput = screen.getByLabelText('CPF');
    fireEvent.change(cpfInput, { target: { value: '12345678900' } });
    expect(cpfInput).toHaveValue('123.456.789-00');

    const cepInput = screen.getByLabelText('CEP');
    fireEvent.change(cepInput, { target: { value: '12345678' } });
    expect(cepInput).toHaveValue('12345-678');

    const telefoneInput = screen.getByLabelText('Telefone');
    fireEvent.change(telefoneInput, { target: { value: '11987654321' } });
    expect(telefoneInput).toHaveValue('(11) 98765-4321');

    const pisInput = screen.getByLabelText('PIS/PASEP');
    fireEvent.change(pisInput, { target: { value: '12345678901' } });
    expect(pisInput).toHaveValue('123.45678.90-1');
  });

  it('deve mostrar tooltips nos campos', () => {
    render(<EmpregadorForm />);

    const tooltips = screen.getAllByRole('tooltip');
    expect(tooltips).toHaveLength(24); // Número total de campos com tooltip
  });
}); 