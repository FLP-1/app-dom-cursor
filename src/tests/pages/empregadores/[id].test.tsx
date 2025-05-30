import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { EmpregadorPage } from '../../../pages/empregadores/[id]';
import { empregadorService } from '../../../services/empregador.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../services/empregador.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadorPage', () => {
  const mockEmpregador = {
    id: '1',
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

  const mockRouter = {
    push: jest.fn(),
    query: { id: '1' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (empregadorService.get as jest.Mock).mockResolvedValue(mockEmpregador);
  });

  it('deve renderizar a página de edição corretamente', async () => {
    render(<EmpregadorPage />);

    await waitFor(() => {
      expect(screen.getByText('Editar Empregador')).toBeInTheDocument();
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123.456.789-00')).toBeInTheDocument();
    });
  });

  it('deve renderizar a página de novo empregador corretamente', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    expect(screen.getByText('Novo Empregador')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome Completo')).toHaveValue('');
    expect(screen.getByLabelText('CPF')).toHaveValue('');
  });

  it('deve salvar novo empregador com sucesso', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadorService.create as jest.Mock).mockResolvedValueOnce(mockEmpregador);

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-00' } });
    // Preencher outros campos obrigatórios...

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(empregadorService.create).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/empregadores');
    });
  });

  it('deve atualizar empregador existente com sucesso', async () => {
    (empregadorService.update as jest.Mock).mockResolvedValueOnce(mockEmpregador);

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: 'João Silva Atualizado' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(empregadorService.update).toHaveBeenCalledWith('1', expect.any(Object));
      expect(mockRouter.push).toHaveBeenCalledWith('/empregadores');
    });
  });

  it('deve mostrar erro ao falhar ao salvar', async () => {
    const mockError = new Error('Erro ao salvar empregador');
    (empregadorService.create as jest.Mock).mockRejectedValueOnce(mockError);

    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-00' } });
    // Preencher outros campos obrigatórios...

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar empregador')).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
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
  });

  it('deve validar formato do CPF', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('CPF'), { target: { value: '123.456.789-99' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('CPF inválido')).toBeInTheDocument();
    });
  });

  it('deve validar formato do CEP', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '12345-67' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('CEP inválido')).toBeInTheDocument();
    });
  });

  it('deve validar formato do PIS/PASEP', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('PIS/PASEP'), { target: { value: '123.45678.90-9' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('PIS/PASEP inválido')).toBeInTheDocument();
    });
  });

  it('deve validar UF inválida', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('UF'), { target: { value: 'XX' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('UF inválida')).toBeInTheDocument();
    });
  });

  it('deve validar remuneração negativa', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });

    render(<EmpregadorPage />);

    fireEvent.change(screen.getByLabelText('Remuneração'), { target: { value: '-1000' } });
    fireEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {
      expect(screen.getByText('Remuneração não pode ser negativa')).toBeInTheDocument();
    });
  });
}); 