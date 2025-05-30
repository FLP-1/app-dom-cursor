import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import EmpregadoDomesticoPage from '../../pages/empregados-domesticos/[id]';
import { empregadoDomesticoService } from '../../services/empregado-domestico.service';

// Mock dos hooks e serviços
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../services/empregado-domestico.service');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

describe('EmpregadoDomesticoPage', () => {
  const mockEmpregado = {
    id: '1',
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

  const mockRouter = {
    push: jest.fn(),
    query: { id: '1' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (empregadoDomesticoService.get as jest.Mock).mockResolvedValue(mockEmpregado);
  });

  it('deve renderizar a página de edição corretamente', async () => {
    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      expect(screen.getByText('Editar Empregado Doméstico')).toBeInTheDocument();
      expect(screen.getByLabelText('CPF')).toHaveValue('123.456.789-00');
      expect(screen.getByLabelText('Nome Completo')).toHaveValue('José da Silva');
    });
  });

  it('deve renderizar a página de novo empregado corretamente', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      expect(screen.getByText('Novo Empregado Doméstico')).toBeInTheDocument();
      expect(screen.getByLabelText('CPF')).toHaveValue('');
      expect(screen.getByLabelText('Nome Completo')).toHaveValue('');
    });
  });

  it('deve salvar um novo empregado com sucesso', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));
    (empregadoDomesticoService.create as jest.Mock).mockResolvedValueOnce(mockEmpregado);

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const cpfInput = screen.getByLabelText('CPF');
      const nomeInput = screen.getByLabelText('Nome Completo');
      const dataNascimentoInput = screen.getByLabelText('Data de Nascimento');
      const sexoInput = screen.getByLabelText('Sexo');
      const nacionalidadeInput = screen.getByLabelText('Nacionalidade');
      const grauInstrucaoInput = screen.getByLabelText('Grau de Instrução');
      const nomeMaeInput = screen.getByLabelText('Nome da Mãe');
      const enderecoInput = screen.getByLabelText('Endereço');
      const numeroInput = screen.getByLabelText('Número');
      const bairroInput = screen.getByLabelText('Bairro');
      const cepInput = screen.getByLabelText('CEP');
      const municipioInput = screen.getByLabelText('Município');
      const ufInput = screen.getByLabelText('UF');
      const telefoneInput = screen.getByLabelText('Telefone');
      const emailInput = screen.getByLabelText('E-mail');
      const dataAdmissaoInput = screen.getByLabelText('Data de Admissão');
      const matriculaInput = screen.getByLabelText('Matrícula');
      const categoriaInput = screen.getByLabelText('Categoria');
      const remuneracaoInput = screen.getByLabelText('Remuneração');
      const cargoInput = screen.getByLabelText('Cargo');
      const jornadaInput = screen.getByLabelText('Jornada de Trabalho');
      const ctpsNumeroInput = screen.getByLabelText('Número da CTPS');
      const ctpsSerieInput = screen.getByLabelText('Série da CTPS');
      const ctpsUfInput = screen.getByLabelText('UF da CTPS');
      const pisInput = screen.getByLabelText('PIS/PASEP');

      fireEvent.change(cpfInput, { target: { value: '123.456.789-00' } });
      fireEvent.change(nomeInput, { target: { value: 'José da Silva' } });
      fireEvent.change(dataNascimentoInput, { target: { value: '1990-01-01' } });
      fireEvent.change(sexoInput, { target: { value: 'M' } });
      fireEvent.change(nacionalidadeInput, { target: { value: 'Brasileiro' } });
      fireEvent.change(grauInstrucaoInput, { target: { value: 'Ensino Médio' } });
      fireEvent.change(nomeMaeInput, { target: { value: 'Maria da Silva' } });
      fireEvent.change(enderecoInput, { target: { value: 'Rua das Flores' } });
      fireEvent.change(numeroInput, { target: { value: '123' } });
      fireEvent.change(bairroInput, { target: { value: 'Centro' } });
      fireEvent.change(cepInput, { target: { value: '12345-678' } });
      fireEvent.change(municipioInput, { target: { value: 'São Paulo' } });
      fireEvent.change(ufInput, { target: { value: 'SP' } });
      fireEvent.change(telefoneInput, { target: { value: '(11) 98765-4321' } });
      fireEvent.change(emailInput, { target: { value: 'jose@email.com' } });
      fireEvent.change(dataAdmissaoInput, { target: { value: '2024-01-01' } });
      fireEvent.change(matriculaInput, { target: { value: '12345' } });
      fireEvent.change(categoriaInput, { target: { value: '21' } });
      fireEvent.change(remuneracaoInput, { target: { value: '1500' } });
      fireEvent.change(cargoInput, { target: { value: '5121-05' } });
      fireEvent.change(jornadaInput, { target: { value: '44h' } });
      fireEvent.change(ctpsNumeroInput, { target: { value: '123456' } });
      fireEvent.change(ctpsSerieInput, { target: { value: '1234' } });
      fireEvent.change(ctpsUfInput, { target: { value: 'SP' } });
      fireEvent.change(pisInput, { target: { value: '123.45678.90-1' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(empregadoDomesticoService.create).toHaveBeenCalledWith(expect.objectContaining({
        cpf: '123.456.789-00',
        nomeCompleto: 'José da Silva'
      }));
      expect(mockRouter.push).toHaveBeenCalledWith('/empregados-domesticos');
    });
  });

  it('deve atualizar um empregado existente com sucesso', async () => {
    (empregadoDomesticoService.update as jest.Mock).mockResolvedValueOnce(mockEmpregado);

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const nomeInput = screen.getByLabelText('Nome Completo');
      fireEvent.change(nomeInput, { target: { value: 'José da Silva Atualizado' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(empregadoDomesticoService.update).toHaveBeenCalledWith('1', expect.objectContaining({
        nomeCompleto: 'José da Silva Atualizado'
      }));
      expect(mockRouter.push).toHaveBeenCalledWith('/empregados-domesticos');
    });
  });

  it('deve mostrar erro ao falhar ao salvar empregado', async () => {
    const mockError = new Error('Erro ao salvar empregado');
    (empregadoDomesticoService.create as jest.Mock).mockRejectedValueOnce(mockError);

    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const cpfInput = screen.getByLabelText('CPF');
      fireEvent.change(cpfInput, { target: { value: '123.456.789-00' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar empregado doméstico')).toBeInTheDocument();
    });
  });

  it('deve validar campos obrigatórios', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('CPF é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Nome Completo é obrigatório')).toBeInTheDocument();
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
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const cpfInput = screen.getByLabelText('CPF');
      fireEvent.change(cpfInput, { target: { value: '123.456.789-99' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('CPF inválido')).toBeInTheDocument();
    });
  });

  it('deve validar formato do CEP', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const cepInput = screen.getByLabelText('CEP');
      fireEvent.change(cepInput, { target: { value: '12345-67' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('CEP inválido')).toBeInTheDocument();
    });
  });

  it('deve validar formato do PIS', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const pisInput = screen.getByLabelText('PIS/PASEP');
      fireEvent.change(pisInput, { target: { value: '123.45678.90-9' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('PIS/PASEP inválido')).toBeInTheDocument();
    });
  });

  it('deve validar remuneração negativa', async () => {
    (useRouter as jest.Mock).mockReturnValue({ ...mockRouter, query: { id: 'novo' } });
    (empregadoDomesticoService.get as jest.Mock).mockRejectedValue(new Error('Not found'));

    render(<EmpregadoDomesticoPage />);

    await waitFor(() => {
      const remuneracaoInput = screen.getByLabelText('Remuneração');
      fireEvent.change(remuneracaoInput, { target: { value: '-1000' } });
    });

    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(screen.getByText('Remuneração não pode ser negativa')).toBeInTheDocument();
    });
  });
}); 