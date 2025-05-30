import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S2400Form } from '@/components/esocial/events/S2400Form';
import { TestWrapper } from '@/tests/TestWrapper';

const TestComponent = () => {
  const methods = useForm({
    defaultValues: {
      tipo: 'S2400',
      data: new Date(),
      payload: {
        cpf: '',
        dataInicioBeneficio: new Date(),
        tipoBeneficio: '',
        valorBeneficio: 0,
        dataFimBeneficio: null,
        motivoFimBeneficio: '',
        observacao: ''
      }
    }
  });

  return (
    <TestWrapper>
      <S2400Form control={methods.control} />
    </TestWrapper>
  );
};

describe('S2400Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início do benefício/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de benefício/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor do benefício/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/data de fim do benefício/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo do fim do benefício/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 