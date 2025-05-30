import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { S2300Form } from '@/components/esocial/events/S2300Form';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: {
      cpf: '',
      nome: '',
      dataNascimento: new Date(),
      sexo: '',
      pis: '',
      dataInicio: new Date(),
      dataFim: null,
      tipoTrabalhador: '',
      cargo: '',
      valorHora: 0,
      cargaHoraria: 0,
      observacao: ''
    }
  });

  return (
    <TestWrapper>
      <S2300Form control={control} />
    </TestWrapper>
  );
};

describe('S2300Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pis\/pasep/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de trabalhador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cargo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/carga horária/i)).toBeInTheDocument();
  });

  it('deve renderizar campos opcionais', () => {
    render(<TestComponent />);

    expect(screen.getByLabelText(/data de fim/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 