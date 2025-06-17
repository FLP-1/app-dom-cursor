/**
 * Arquivo: OperacaoFinanceiraForm.tsx
 * Caminho: src/components/operacoes-financeiras/OperacaoFinanceiraForm.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Formulário de operações financeiras com Material UI.
 */

import { Button, Grid, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useOperacaoFinanceiraForm } from '@/hooks/forms/useOperacaoFinanceiraForm';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormMaskedInput } from '@/components/forms/inputs/FormMaskedInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';

interface OperacaoFinanceiraFormProps {
  onSubmit: (data: OperacaoFinanceiraFormData) => void;
  initialData?: OperacaoFinanceiraFormData;
}

export interface OperacaoFinanceiraFormData {
  descricao: string;
  valor: string;
  data: Date;
  tipo: string;
  status: string;
  formaPagamento: string;
}

export function OperacaoFinanceiraForm({ onSubmit, initialData }: OperacaoFinanceiraFormProps) {
  const { control, handleSubmit, errors } = useOperacaoFinanceiraForm(initialData);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.history.back();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Dados da Operação
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormInput
              name="descricao"
              control={control}
              label="Descrição"
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormMaskedInput
              name="valor"
              control={control}
              label="Valor"
              mask="R$ #.##0,00"
              error={!!errors.valor}
              helperText={errors.valor?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormDatePicker
              name="data"
              control={control}
              label="Data"
              error={!!errors.data}
              helperText={errors.data?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
} 
