/**
 * Arquivo: S1207Form.tsx
 * Caminho: src/components/esocial/events/S1207Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Grid, Button, Paper } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormMoneyInput, FormTextArea } from '@/components/form';
import { tooltips } from '@/i18n/tooltips';
import { useS1207Form } from '@/hooks/esocial/useS1207Form';
import { S1207Schema } from '@/schemas/esocial/S1207Schema';

export const S1207Form = ({ initialData }: { initialData?: Partial<typeof S1207Schema._type> }) => {
  const { t } = useTranslation('esocial');
  const { methods, onSubmit } = useS1207Form(initialData);

  const tiposBeneficio = Object.entries(t('tiposBeneficio', { returnObjects: true })).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormInput
              name="cpf"
              label={t('campos.cpf')}
              control={methods.control}
              required
              tooltip={tooltips.s1207_cpf.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormDatePicker
              name="dataInicioBeneficio"
              label={t('campos.dataInicioBeneficio')}
              control={methods.control}
              required
              tooltip={tooltips.s1207_dataInicioBeneficio.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormSelect
              name="tipoBeneficio"
              label={t('campos.tipoBeneficio')}
              control={methods.control}
              options={tiposBeneficio}
              required
              tooltip={tooltips.s1207_tipoBeneficio.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormMoneyInput
              name="valorBeneficio"
              label={t('campos.valorBeneficio')}
              control={methods.control}
              required
              tooltip={tooltips.s1207_valorBeneficio.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormDatePicker
              name="dataFimBeneficio"
              label={t('campos.dataFimBeneficio')}
              control={methods.control}
              tooltip={tooltips.s1207_dataFimBeneficio.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormInput
              name="motivoFimBeneficio"
              label={t('campos.motivoFimBeneficio')}
              control={methods.control}
              tooltip={tooltips.s1207_motivoFimBeneficio.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormTextArea
              name="observacao"
              label={t('campos.observacao')}
              control={methods.control}
              minRows={2}
              tooltip={tooltips.s1207_observacao.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <Button type="submit" variant="contained">
              {t('common.actions.save')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}; 
