/**
 * Arquivo: S5003FormFields.tsx
 * Caminho: src/components/forms/esocial/S5003FormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos do formulário de evento S-5003 do eSocial.
 */

import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormMoneyInput } from '@/components/forms/inputs/FormMoneyInput';
import { FormTextArea } from '@/components/forms/inputs/FormTextArea';
import { S5003FormData } from './S5003FormTypes';

interface S5003FormFieldsProps {
  control: Control<S5003FormData>;
}

export function S5003FormFields({ control }: S5003FormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="campoExemplo"
          label={t('forms.s5003.campoExemplo.label')}
          placeholder={t('forms.s5003.campoExemplo.placeholder')}
          control={control}
          required
        />
      </Grid>
      {/* Adicione outros campos aqui */}
    </Grid>
  );
} 
