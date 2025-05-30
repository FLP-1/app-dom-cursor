import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S1207Form } from '@/components/esocial/events/S1207Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      cpf: '',
      dataInicioBeneficio: new Date(),
      tipoBeneficio: '',
      valorBeneficio: 0,
      dataFimBeneficio: null,
      motivoFimBeneficio: '',
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S1207Form control={control} />
    </TestWrapper>
  );
};

describe('S1207Form', () => {
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