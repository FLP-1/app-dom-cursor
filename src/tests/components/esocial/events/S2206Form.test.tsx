import { render, screen } from '@testing-library/react';
import { S2206Form } from '@/components/esocial/events/S2206Form';
import { useForm } from 'react-hook-form';
import { TipoEventoEsocial } from '@/types/esocial';

const TestWrapper = () => {
  const { control } = useForm({
    defaultValues: {
      tipo: TipoEventoEsocial.S2206,
      payload: {
        cpf: '',
        dataAlteracao: '',
        tipoAlteracao: '',
        motivoAlteracao: '',
        cargo: '',
        salario: '',
        jornadaTrabalho: '',
        tipoRegimePrevidenciario: '',
        dataInicioAlteracao: '',
        dataFimAlteracao: '',
        naturezaAlteracao: ''
      }
    }
  });

  return <S2206Form control={control} />;
};

describe('S2206Form', () => {
  it('should render all required fields', () => {
    render(<TestWrapper />);

    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data da alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/motivo da alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cargo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/jornada de trabalho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de regime previdenciário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início da alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de fim da alteração/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/natureza da alteração/i)).toBeInTheDocument();
  });

  it('should render tipo alteracao options', () => {
    render(<TestWrapper />);

    const tipoAlteracaoSelect = screen.getByLabelText(/tipo de alteração/i);
    expect(tipoAlteracaoSelect).toHaveValue('');

    const options = tipoAlteracaoSelect.querySelectorAll('option');
    expect(options).toHaveLength(10); // 9 tipos + empty option
    expect(options[1]).toHaveTextContent('Alteração de Cargo');
    expect(options[2]).toHaveTextContent('Alteração de Salário');
    expect(options[3]).toHaveTextContent('Alteração de Jornada de Trabalho');
    expect(options[4]).toHaveTextContent('Alteração de Regime Previdenciário');
    expect(options[5]).toHaveTextContent('Alteração de Local de Trabalho');
    expect(options[6]).toHaveTextContent('Alteração de Função');
    expect(options[7]).toHaveTextContent('Alteração de Categoria');
    expect(options[8]).toHaveTextContent('Alteração de Horário');
    expect(options[9]).toHaveTextContent('Alteração de Outras Condições');
  });

  it('should render regime previdenciario options', () => {
    render(<TestWrapper />);

    const regimeSelect = screen.getByLabelText(/tipo de regime previdenciário/i);
    expect(regimeSelect).toHaveValue('');

    const options = regimeSelect.querySelectorAll('option');
    expect(options).toHaveLength(4); // 3 regimes + empty option
    expect(options[1]).toHaveTextContent('Regime Geral de Previdência Social');
    expect(options[2]).toHaveTextContent('Regime Próprio de Previdência Social');
    expect(options[3]).toHaveTextContent('Regime de Previdência Social no Exterior');
  });

  it('should render natureza alteracao options', () => {
    render(<TestWrapper />);

    const naturezaSelect = screen.getByLabelText(/natureza da alteração/i);
    expect(naturezaSelect).toHaveValue('');

    const options = naturezaSelect.querySelectorAll('option');
    expect(options).toHaveLength(6); // 5 naturezas + empty option
    expect(options[1]).toHaveTextContent('Alteração Normal');
    expect(options[2]).toHaveTextContent('Alteração por Acordo Coletivo');
    expect(options[3]).toHaveTextContent('Alteração por Decisão Judicial');
    expect(options[4]).toHaveTextContent('Alteração por Acordo Individual');
    expect(options[5]).toHaveTextContent('Alteração por Outros Motivos');
  });
}); 