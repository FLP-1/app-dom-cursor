import { render, screen } from '@testing-library/react';
import { S2200Form } from '@/components/esocial/events/S2200Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';

const TestWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2200,
      payload: {
        cpf: '',
        nome: '',
        dataNascimento: new Date(),
        sexo: '',
        pis: '',
        carteiraTrabalho: '',
        serieCarteiraTrabalho: '',
        ufCarteiraTrabalho: '',
        dataAdmissao: new Date(),
        tipoRegimePrevidenciario: '',
        cargo: '',
        salario: 0,
      },
    },
  });

  return <S2200Form control={control} />;
};

describe('S2200Form', () => {
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
    expect(screen.getByLabelText(/Data de Admissão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Regime Previdenciário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cargo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salário/i)).toBeInTheDocument();
  });

  it('should render sex options', () => {
    render(<TestWrapper />);

    const sexSelect = screen.getByLabelText(/Sexo/i);
    expect(sexSelect).toHaveValue('');
    expect(screen.getByText(/Masculino/i)).toBeInTheDocument();
    expect(screen.getByText(/Feminino/i)).toBeInTheDocument();
  });

  it('should render regime previdenciario options', () => {
    render(<TestWrapper />);

    const regimeSelect = screen.getByLabelText(/Tipo de Regime Previdenciário/i);
    expect(regimeSelect).toHaveValue('');
    expect(screen.getByText(/Regime Geral de Previdência Social/i)).toBeInTheDocument();
    expect(screen.getByText(/Regime Próprio de Previdência Social/i)).toBeInTheDocument();
    expect(screen.getByText(/Regime de Previdência Social no Exterior/i)).toBeInTheDocument();
  });
}); 