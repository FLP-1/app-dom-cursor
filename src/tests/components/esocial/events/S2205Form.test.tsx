import { render, screen } from '@testing-library/react';
import { S2205Form } from '@/components/esocial/events/S2205Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';

const TestWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2205,
      payload: {
        cpf: '',
        nome: '',
        dataNascimento: new Date(),
        sexo: '',
        pis: '',
        carteiraTrabalho: '',
        serieCarteiraTrabalho: '',
        ufCarteiraTrabalho: '',
        dataAlteracao: new Date(),
        tipoAlteracao: '',
        motivoAlteracao: '',
      },
    },
  });

  return <S2205Form control={control} />;
};

describe('S2205Form', () => {
  it('should render all required fields', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sexo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PIS\/PASEP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número da Carteira de Trabalho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Série da Carteira de Trabalho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/UF da Carteira de Trabalho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data da Alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Motivo da Alteração/i)).toBeInTheDocument();
  });

  it('should render sex options', () => {
    render(<TestWrapper />);

    const sexSelect = screen.getByLabelText(/Sexo/i);
    expect(sexSelect).toHaveValue('');
    expect(screen.getByText(/Masculino/i)).toBeInTheDocument();
    expect(screen.getByText(/Feminino/i)).toBeInTheDocument();
  });

  it('should render tipo alteracao options', () => {
    render(<TestWrapper />);

    const tipoAlteracaoSelect = screen.getByLabelText(/Tipo de Alteração/i);
    expect(tipoAlteracaoSelect).toHaveValue('');
    expect(screen.getByText(/Alteração de Dados Cadastrais/i)).toBeInTheDocument();
    expect(screen.getByText(/Alteração de Endereço/i)).toBeInTheDocument();
    expect(screen.getByText(/Alteração de Documentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Alteração de Dados Bancários/i)).toBeInTheDocument();
    expect(screen.getByText(/Alteração de Dados de Contato/i)).toBeInTheDocument();
  });
}); 