/**
 * Arquivo: EmpregadoDomesticoForm.tsx
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente principal do formulário de cadastro de empregado doméstico, acessível, responsivo, integrado ao hook customizado e mensagens centralizadas.
 */

import React from 'react';
import { Grid, Button, Box, Typography, Tooltip, IconButton } from '@mui/material';
import { FormInput } from '@/components/common/forms/FormInput';
import { FormSelect } from '@/components/common/forms/FormSelect';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { useEmpregadoDomesticoForm, EmpregadoDomesticoFormValues } from '@/hooks/forms/useEmpregadoDomesticoForm';
import { useTranslation } from 'react-i18next';
import { CboCargo } from '@/types/empregado-domestico';
import { DependenteEmpregado } from '@/types/empregado-domestico';
import { Controller, useFieldArray } from 'react-hook-form';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import { tooltips } from '@/i18n/tooltips';
import { EmpregadoDomesticoFormFields } from '@/components/forms/empregado-domestico/EmpregadoDomesticoFormFields';

export const EmpregadoDomesticoForm: React.FC<EmpregadoDomesticoFormProps> = ({ initialValues, cargos, onSubmitSuccess, empregadores }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, onSubmit, loading, error, success } = useEmpregadoDomesticoForm(initialValues);
  const { fields, append, remove } = useFieldArray({ control, name: 'dependentes' });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('Cadastro de Empregado Doméstico')}
      </Typography>
      <EmpregadoDomesticoFormFields
        control={control}
        cargos={cargos}
        empregadores={empregadores}
        append={append}
        remove={remove}
        fields={fields}
      />
      {/* ...botoes, mensagens de erro/sucesso, etc... */}
    </Box>
  );
}; 
