import { render, screen } from '@testing-library/react';
import { S2299Form } from '@/components/esocial/events/S2299Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2299,
      data: new Date(),
      payload: {
        cpf: '',
        dataDesligamento: new Date(),
        motivoDesligamento: '',
        observacao: '',
      },
    },
  });

  return <>{children}</>;
};

describe('S2299Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(
      <TestWrapper>
        <S2299Form control={control} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data do desligamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo do desligamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });
}); 