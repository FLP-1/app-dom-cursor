/**
 * Arquivo: DocumentFormFields.tsx
 * Caminho: src/components/forms/documentos/DocumentFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Campos reutilizáveis para o formulário de documentos.
 */

import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { TipoDocumentoEsocial } from '@prisma/client';
import { DocumentFormData } from './DocumentFormTypes';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSwitch } from '@/components/forms/inputs/FormSwitch';
import { documentMessages } from '@/i18n/messages/document.messages';

interface DocumentFormFieldsProps {
  control: Control<DocumentFormData>;
  errors?: Record<string, { message?: string }>;
}

export function DocumentFormFields({ control, errors }: DocumentFormFieldsProps) {
  const messages = documentMessages.pt;

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="nome"
          label={messages.labels.nome}
          control={control}
          error={errors?.nome?.message}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSelect
          name="tipo"
          label={messages.labels.tipo}
          control={control}
          error={errors?.tipo?.message}
          options={Object.values(TipoDocumentoEsocial).map(tipo => ({
            value: tipo,
            label: messages.tipos[tipo] || tipo,
          }))}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="url"
          label={messages.labels.url}
          control={control}
          error={errors?.url?.message}
          required
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormDatePicker
          name="dataValidade"
          label={messages.labels.dataValidade}
          control={control}
          error={errors?.dataValidade?.message}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSwitch
          name="isPublic"
          label={messages.labels.isPublic}
          control={control}
          error={errors?.isPublic?.message}
        />
      </Grid>
    </Grid>
  );
} 
