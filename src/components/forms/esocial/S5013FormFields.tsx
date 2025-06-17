/**
 * Arquivo: S5013FormFields.tsx
 * Caminho: src/components/forms/esocial/S5013FormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos do formulário de evento S-5013 do eSocial.
 */

import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput } from '@/components/form';
import { S5013FormData } from './S5013FormTypes';

interface S5013FormFieldsProps {
  control: Control<S5013FormData>;
}

export function S5013FormFields({ control }: S5013FormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="campoExemplo"
          label={t('forms.s5013.campoExemplo.label')}
          placeholder={t('forms.s5013.campoExemplo.placeholder')}
          control={control}
          required
        />
      </Grid>
      {/* Adicione outros campos aqui */}
    </Grid>
  );
} 
