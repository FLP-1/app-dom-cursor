import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmpregadoDomesticoForm } from '../../components/EmpregadoDomesticoForm';
import { useEmpregadoDomesticoForm } from '../../hooks/forms/useEmpregadoDomesticoForm';
import { empregadoDomesticoService } from '../../services/empregado-domestico.service';

// Mock dos hooks e serviços
jest.mock('../../hooks/forms/useEmpregadoDomesticoForm');
jest.mock('../../services/empregado-domestico.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadoDomesticoForm', () => {
  const mockCargos = [
    { codigo: '5121-05', descricao: 'Empregado(a) doméstico(a)' },
    { codigo: '5121-10', descricao: 'Cozinheiro(a) do serviço doméstico' }
  ];

  const mockEmpregadores = [
    { id: '1', nomeCompleto: 'João Silva' },
    { id: '2', nomeCompleto: 'Maria Santos' }
  ];

  const mockInitialValues = {
    cpf: '123.456.789-00',
    nomeCompleto: 'José da Silva',
    dataNascimento: '1990-01-01',
    sexo: 'M',
    nacionalidade: 'Brasileiro',
    grauInstrucao: 'Ensino Médio',
    nomeMae: 'Maria da Silva',
    endereco: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    cep: '12345-678',
    municipio: 'São Paulo',
    uf: 'SP',
    telefone: '(11) 98765-4321',
    email: 'jose@email.com',
    dataAdmissao: '2024-01-01',
    matricula: '12345',
    categoria: '21',
    remuneracao: 1500,
    cargoId: '5121-05',
    jornadaTrabalho: '44h',
    ctpsNumero: '123456',
    ctpsSerie: '1234',
    ctpsUf: 'SP',
    pisPasep: '123.45678.90-1',
    empregadorId: '1'
  };

  const mockFormHook = {
    control: {},
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
      isSubmitting: false
    },
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    reset: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useEmpregadoDomesticoForm as jest.Mock).mockReturnValue(mockFormHook);
  });

  it('deve renderizar o formulário corretamente', () => {
    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
      />
    );

    expect(screen.getByText('Cadastro de Empregado Doméstico')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Nascimento')).toBeInTheDocument();
    expect(screen.getByLabelText('Sexo')).toBeInTheDocument();
  });

  it('deve preencher os campos com valores iniciais', () => {
    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
        initialValues={mockInitialValues}
      />
    );

    expect(screen.getByLabelText('CPF')).toHaveValue('123.456.789-00');
    expect(screen.getByLabelText('Nome Completo')).toHaveValue('José da Silva');
    expect(screen.getByLabelText('Data de Nascimento')).toHaveValue('1990-01-01');
  });

  it('deve adicionar um dependente', async () => {
    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
      />
    );

    const addButton = screen.getByLabelText('Adicionar dependente');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toBeInTheDocument();
      expect(screen.getByLabelText('Parentesco')).toBeInTheDocument();
      expect(screen.getByLabelText('Data de Nascimento')).toBeInTheDocument();
    });
  });

  it('deve remover um dependente', async () => {
    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
        initialValues={{
          ...mockInitialValues,
          dependentes: [
            {
              nome: 'Filho',
              parentesco: 'FILHO',
              dataNascimento: '2010-01-01',
              cpf: '987.654.321-00'
            }
          ]
        }}
      />
    );

    const removeButton = screen.getByLabelText('Remover dependente');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument();
    });
  });

  it('deve submeter o formulário com sucesso', async () => {
    const mockOnSubmitSuccess = jest.fn();
    const mockOnSubmit = jest.fn();

    (useEmpregadoDomesticoForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => fn,
      onSubmit: mockOnSubmit,
      loading: false,
      error: null,
      success: 'Empregado doméstico cadastrado com sucesso!'
    });

    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
        onSubmitSuccess={mockOnSubmitSuccess}
      />
    );

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(screen.getByText('Empregado doméstico cadastrado com sucesso!')).toBeInTheDocument();
    });
  });

  it('deve mostrar erro ao submeter formulário inválido', async () => {
    (useEmpregadoDomesticoForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => fn,
      onSubmit: jest.fn(),
      loading: false,
      error: 'Erro ao cadastrar empregado doméstico',
      success: null
    });

    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
      />
    );

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao cadastrar empregado doméstico')).toBeInTheDocument();
    });
  });

  it('deve mostrar loading durante o envio', async () => {
    (useEmpregadoDomesticoForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => fn,
      onSubmit: jest.fn(),
      loading: true,
      error: null,
      success: null
    });

    render(
      <EmpregadoDomesticoForm
        cargos={mockCargos}
        empregadores={mockEmpregadores}
      />
    );

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });
}); 