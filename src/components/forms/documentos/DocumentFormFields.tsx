/**
 * Arquivo: DocumentFormFields.tsx
 * Caminho: src/components/forms/documentos/DocumentFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de documentos.
 */

import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { TipoDocumentoEsocial } from '@prisma/client';
import { DocumentFormData } from './DocumentFormTypes';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSwitch } from '@/components/forms/inputs/FormSwitch';

interface DocumentFormFieldsProps {
  control: Control<DocumentFormData>;
  errors?: Record<string, { message?: string }>;
}

export function DocumentFormFields({ control, errors }: DocumentFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="nome"
          label={t('document.fields.name')}
          control={control}
          error={errors?.nome?.message}
          required
          tooltip={t('document.tooltips.name')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSelect
          name="tipo"
          label={t('document.fields.type')}
          control={control}
          error={errors?.tipo?.message}
          options={Object.values(TipoDocumentoEsocial).map(tipo => ({
            value: tipo,
            label: t(`document.types.${tipo}`),
          }))}
          required
          tooltip={t('document.tooltips.type')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="url"
          label={t('document.fields.url')}
          control={control}
          error={errors?.url?.message}
          required
          tooltip={t('document.tooltips.url')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormDatePicker
          name="dataValidade"
          label={t('document.fields.expirationDate')}
          control={control}
          error={errors?.dataValidade?.message}
          tooltip={t('document.tooltips.expirationDate')}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSwitch
          name="isPublic"
          label={t('document.fields.isPublic')}
          control={control}
          error={errors?.isPublic?.message}
          tooltip={t('document.tooltips.isPublic')}
        />
      </Grid>
    </Grid>
  );
} 
