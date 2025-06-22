/**
 * Arquivo: TarefaFormFields.tsx
 * Caminho: src/components/forms/tarefa/TarefaFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Campos reutilizáveis para o formulário de tarefa.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { TarefaFormData, StatusTarefa, PrioridadeTarefa } from './TarefaFormTypes';
import { tarefaMessages } from '@/i18n/messages/tarefa.messages';

interface TarefaFormFieldsProps {
  control: Control<TarefaFormData>;
  errors?: FieldErrors<TarefaFormData>;
}

export function TarefaFormFields({ control, errors }: TarefaFormFieldsProps) {
  const messages = tarefaMessages.pt;

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="titulo"
          label={messages.labels.titulo}
          control={control}
          required
          error={errors?.titulo?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="descricao"
          label={messages.labels.descricao}
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
          label={messages.labels.status}
          control={control}
          error={!!errors?.status}
          options={[
            { value: StatusTarefa.PENDENTE, label: messages.status.pendente },
            { value: StatusTarefa.EM_ANDAMENTO, label: messages.status.emAndamento },
            { value: StatusTarefa.CONCLUIDA, label: messages.status.concluida },
            { value: StatusTarefa.CANCELADA, label: messages.status.cancelada }
          ]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="prioridade"
          label={messages.labels.prioridade}
          control={control}
          error={!!errors?.prioridade}
          options={[
            { value: PrioridadeTarefa.BAIXA, label: messages.prioridade.baixa },
            { value: PrioridadeTarefa.MEDIA, label: messages.prioridade.media },
            { value: PrioridadeTarefa.ALTA, label: messages.prioridade.alta }
          ]}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={messages.labels.dataInicio}
          control={control}
          error={errors?.dataInicio?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={messages.labels.dataFim}
          control={control}
          error={errors?.dataFim?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="responsavel"
          label={messages.labels.responsavel}
          control={control}
          required
          error={errors?.responsavel?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={messages.labels.observacoes}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
        />
      </Grid>
    </Grid>
  );
} 
