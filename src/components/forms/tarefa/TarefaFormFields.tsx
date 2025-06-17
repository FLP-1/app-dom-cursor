/**
 * Arquivo: TarefaFormFields.tsx
 * Caminho: src/components/forms/tarefa/TarefaFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de tarefa.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { TarefaFormData, StatusTarefa, PrioridadeTarefa } from './TarefaFormTypes';

interface TarefaFormFieldsProps {
  control: Control<TarefaFormData>;
  errors?: FieldErrors<TarefaFormData>;
}

export function TarefaFormFields({ control, errors }: TarefaFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="titulo"
          label={t('tarefa.fields.titulo')}
          control={control}
          required
          error={errors?.titulo?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="descricao"
          label={t('tarefa.fields.descricao')}
          control={control}
          required
          multiline
          rows={4}
          error={errors?.descricao?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="status"
          label={t('tarefa.fields.status')}
          control={control}
          error={!!errors?.status}
          options={[
            { value: StatusTarefa.PENDENTE, label: t('tarefa.status.pendente') },
            { value: StatusTarefa.EM_ANDAMENTO, label: t('tarefa.status.emAndamento') },
            { value: StatusTarefa.CONCLUIDA, label: t('tarefa.status.concluida') },
            { value: StatusTarefa.CANCELADA, label: t('tarefa.status.cancelada') }
          ]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="prioridade"
          label={t('tarefa.fields.prioridade')}
          control={control}
          error={!!errors?.prioridade}
          options={[
            { value: PrioridadeTarefa.BAIXA, label: t('tarefa.prioridade.baixa') },
            { value: PrioridadeTarefa.MEDIA, label: t('tarefa.prioridade.media') },
            { value: PrioridadeTarefa.ALTA, label: t('tarefa.prioridade.alta') }
          ]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('tarefa.fields.dataInicio')}
          control={control}
          error={errors?.dataInicio?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('tarefa.fields.dataFim')}
          control={control}
          error={errors?.dataFim?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="responsavel"
          label={t('tarefa.fields.responsavel')}
          control={control}
          required
          error={errors?.responsavel?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('tarefa.fields.observacoes')}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
        />
      </Grid>
    </Grid>
  );
} 
