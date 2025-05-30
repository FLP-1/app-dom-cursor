import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S3000Form } from '@/components/esocial/events/S3000Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      tipoEventoExcluido: '',
      protocoloEventoExcluido: '',
      dataExclusao: new Date(),
      justificativa: '',
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S3000Form control={control} />
    </TestWrapper>
  );
};

describe('S3000Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/tipo do evento excluído/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/protocolo do evento excluído/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de exclusão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/justificativa/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 