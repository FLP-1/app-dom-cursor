import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S1200Form } from '@/components/esocial/events/S1200Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      cpf: '',
      competencia: new Date(),
      valorTotal: 0,
      valorBaseINSS: 0,
      valorBaseIRRF: 0,
      valorBaseFGTS: 0,
      valorFGTS: 0,
      valorINSS: 0,
      valorIRRF: 0,
      valorOutrasEntidades: 0,
      valorOutrasDeducoes: 0,
      valorLiquido: 0,
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S1200Form control={control} />
    </TestWrapper>
  );
};

describe('S1200Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/competência/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor total/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/base inss/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/base irrf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/base fgts/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor fgts/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor inss/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor irrf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor líquido/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/outras entidades/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/outras deduções/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 