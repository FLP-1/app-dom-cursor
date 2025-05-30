import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S2399Form } from '@/components/esocial/events/S2399Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      cpf: '',
      dataDesligamento: new Date(),
      motivoDesligamento: '',
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S2399Form control={control} />
    </TestWrapper>
  );
};

describe('S2399Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de desligamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo do desligamento/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 