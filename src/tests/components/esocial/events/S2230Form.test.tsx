import { render, screen } from '@testing-library/react';
import { S2230Form } from '@/components/esocial/events/S2230Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';

const TestWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2230,
      data: new Date(),
      cpf: '12345678900',
      dataInicioAfastamento: new Date(),
      dataFimAfastamento: new Date(),
      motivoAfastamento: '1',
      tipoAfastamento: '1',
      codigoCNAE: '1234567',
      cid: 'S42.0',
      cidDescricao: 'Fratura da clavícula',
      numeroCat: '123456',
      dataEmissaoCat: new Date(),
      dataRegistroCat: new Date(),
      diasAfastamento: 15,
      observacao: 'Observação do afastamento'
    }
  });

  return <S2230Form control={control} />;
};

describe('S2230Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início do afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de fim do afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo do afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de afastamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código cnae/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cid/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição do cid/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções do motivo do afastamento', () => {
    render(<TestWrapper />);

    const motivoAfastamentoSelect = screen.getByLabelText(/motivo do afastamento/i);
    expect(motivoAfastamentoSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(10); // 9 opções + 1 placeholder
    expect(screen.getByText(/acidente de trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/doença do trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/doença não relacionada ao trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/licença maternidade/i)).toBeInTheDocument();
    expect(screen.getByText(/licença paternidade/i)).toBeInTheDocument();
    expect(screen.getByText(/licença adoção/i)).toBeInTheDocument();
    expect(screen.getByText(/licença para acompanhamento de cônjuge/i)).toBeInTheDocument();
    expect(screen.getByText(/licença para acompanhamento de filho/i)).toBeInTheDocument();
    expect(screen.getByText(/outros motivos/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções do tipo de afastamento', () => {
    render(<TestWrapper />);

    const tipoAfastamentoSelect = screen.getByLabelText(/tipo de afastamento/i);
    expect(tipoAfastamentoSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // 3 opções + 1 placeholder
    expect(screen.getByText(/afastamento por acidente de trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/afastamento por doença do trabalho/i)).toBeInTheDocument();
    expect(screen.getByText(/afastamento por outros motivos/i)).toBeInTheDocument();
  });
}); 