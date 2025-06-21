/**
 * Arquivo: EmpregadoDomesticoFormFields.tsx
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormFields.tsx
 * Criado em: 2025-06-06
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

// Este arquivo deve conter apenas os campos do formulário EmpregadoDomesticoForm, recebendo props necessárias.
// Exemplo de exportação:
// export function EmpregadoDomesticoFormFields(props: EmpregadoDomesticoFormFieldsProps) { ... } 

import React from 'react';
import { Grid, Tooltip, IconButton, Box, Typography } from '@mui/material';
import { Controller, useFieldArray, Control } from 'react-hook-form';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { FormInput } from '@/components/common/forms/FormInput';
import { FormSelect } from '@/components/common/forms/FormSelect';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { tooltips } from '@/i18n/tooltips';
import { EmpregadoDomesticoFormValues } from '@/hooks/forms/useEmpregadoDomesticoForm';
import { CboCargo } from '@/types/empregado-domestico';
import { CPFMask, CEPMask, TelefoneMask, PISMask } from '@/components/forms/empregado-domestico/EmpregadoDomesticoFormUtils';

interface EmpregadoDomesticoFormFieldsProps {
  control: Control<EmpregadoDomesticoFormValues>;
  cargos: CboCargo[];
  empregadores: { id: string; nomeCompleto: string }[];
  append: ReturnType<typeof useFieldArray>["append"];
  remove: ReturnType<typeof useFieldArray>["remove"];
  fields: ReturnType<typeof useFieldArray>["fields"];
}

export const EmpregadoDomesticoFormFields: React.FC<EmpregadoDomesticoFormFieldsProps> = ({
  control,
  cargos,
  empregadores,
  append,
  remove,
  fields
}) => (
  <Grid container spacing={2}>
    {/* ... aqui vai todo o conteúdo JSX dos campos do formulário, extraído do EmpregadoDomesticoForm ... */}
  </Grid>
); 
