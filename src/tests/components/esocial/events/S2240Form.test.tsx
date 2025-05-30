import { render, screen } from '@testing-library/react';
import { S2240Form } from '@/components/esocial/events/S2240Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';
import { TestWrapper } from '@/tests/utils/TestWrapper';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2240,
      data: new Date(),
      payload: {
        cpf: '',
        dataInicio: new Date(),
        dataFim: undefined,
        codigoCNAE: '',
        codigoFatorRisco: '',
        descricaoFatorRisco: '',
        intensidade: '',
        tecnicasUtilizadas: '',
        tecnologiasUtilizadas: '',
        epiUtilizado: '',
        epcUtilizado: '',
        caUtilizado: '',
        observacao: '',
      },
    },
  });

  return <>{children}</>;
};

describe('S2240Form', () => {
  it('deve renderizar todos os campos obrigatórios', () => {
    render(
      <TestWrapper>
        <S2240Form control={control} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de fim/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código cnae/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código do fator de risco/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição do fator de risco/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/intensidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/técnicas utilizadas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tecnologias utilizadas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/epi utilizado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/epc utilizado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ca utilizado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/observação/i)).toBeInTheDocument();
  });

  it('deve renderizar as opções de intensidade corretamente', () => {
    render(
      <TestWrapper>
        <S2240Form control={control} />
      </TestWrapper>
    );

    const intensidadeSelect = screen.getByLabelText(/intensidade/i);
    expect(intensidadeSelect).toBeInTheDocument();

    const options = intensidadeSelect.querySelectorAll('option');
    expect(options).toHaveLength(6); // 5 níveis + placeholder

    expect(screen.getByText(/mínima/i)).toBeInTheDocument();
    expect(screen.getByText(/baixa/i)).toBeInTheDocument();
    expect(screen.getByText(/média/i)).toBeInTheDocument();
    expect(screen.getByText(/alta/i)).toBeInTheDocument();
    expect(screen.getByText(/máxima/i)).toBeInTheDocument();
  });
}); 