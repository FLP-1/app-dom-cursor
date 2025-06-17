/**
 * Arquivo: VinculoTarefaFormFields.tsx
 * Caminho: src/components/forms/vinculo-tarefa/VinculoTarefaFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de vínculo tarefa.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { VinculoTarefaFormData, TipoVinculoTarefa } from './VinculoTarefaFormTypes';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import FormInput from '@/components/forms/inputs/FormInput';
import { tooltips } from '@/i18n/tooltips';

interface VinculoTarefaFormFieldsProps {
  control: Control<VinculoTarefaFormData>;
  errors?: FieldErrors<VinculoTarefaFormData>;
}

export function VinculoTarefaFormFields({ control, errors }: VinculoTarefaFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          label={t('vinculo.tarefa.tipo')}
          control={control}
          error={!!errors?.tipo}
          options={Object.values(TipoVinculoTarefa).map((tipo) => ({
            value: tipo,
            label: t(`vinculo.tarefa.tipo.${tipo.toLowerCase()}`)
          }))}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('vinculo.tarefa.dataInicio')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('vinculo.tarefa.dataFim')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          label={t('vinculo.tarefa.ativo')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('vinculo.tarefa.observacoes')}
          control={control}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
} 
