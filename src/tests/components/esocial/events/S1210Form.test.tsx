import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S1210Form } from '@/components/esocial/events/S1210Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      cpf: '',
      dataPagamento: new Date(),
      tipoRendimento: '',
      valorBruto: 0,
      valorINSS: 0,
      valorIRRF: 0,
      valorFGTS: 0,
      valorLiquido: 0,
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S1210Form control={control} />
    </TestWrapper>
  );
};

describe('S1210Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de pagamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de rendimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor bruto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor inss/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor irrf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor fgts/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor líquido/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 