/**
 * Arquivo: S5011FormFields.tsx
 * Caminho: src/components/forms/esocial/S5011FormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos do formulário de evento S-5011 do eSocial.
 */

import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput } from '@/components/form';
import { S5011FormData } from './S5011FormTypes';

interface S5011FormFieldsProps {
  control: Control<S5011FormData>;
}

export function S5011FormFields({ control }: S5011FormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="campoExemplo"
          label={t('forms.s5011.campoExemplo.label')}
          placeholder={t('forms.s5011.campoExemplo.placeholder')}
          control={control}
          required
        />
      </Grid>
      {/* Adicione outros campos aqui */}
    </Grid>
  );
} 
