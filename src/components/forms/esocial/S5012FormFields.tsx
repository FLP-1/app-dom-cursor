/**
 * Arquivo: S5012FormFields.tsx
 * Caminho: src/components/forms/esocial/S5012FormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos do formulário de evento S-5012 do eSocial.
 */

import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput } from '@/components/form';
import { S5012FormData } from './S5012FormTypes';

interface S5012FormFieldsProps {
  control: Control<S5012FormData>;
}

export function S5012FormFields({ control }: S5012FormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="campoExemplo"
          label={t('forms.s5012.campoExemplo.label')}
          placeholder={t('forms.s5012.campoExemplo.placeholder')}
          control={control}
          required
        />
      </Grid>
      {/* Adicione outros campos aqui */}
    </Grid>
  );
} 
