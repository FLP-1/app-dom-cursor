/**
 * Arquivo: EmpregadoFormFields.tsx
 * Caminho: src/components/forms/empregado/EmpregadoFormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Campos do formulário de cadastro de empregado.
 */
import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { EmpregadoFormData } from './EmpregadoFormTypes';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormMaskedInput } from '@/components/forms/inputs/FormMaskedInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormMoneyInput } from '@/components/forms/inputs/FormMoneyInput';
import { FormCepInput } from '@/components/forms/inputs/FormCepInput';
import { empregadoMessages } from '@/i18n/messages/empregado.messages';

interface EmpregadoFormFieldsProps {
  control: Control<EmpregadoFormData>;
}

export const EmpregadoFormFields: React.FC<EmpregadoFormFieldsProps> = ({ control }) => {
  const messages = empregadoMessages.pt;

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          control={control}
          label={messages.labels.nome}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMaskedInput
          name="cpf"
          control={control}
          label={messages.labels.cpf}
          mask="999.999.999-99"
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          control={control}
          label={messages.labels.dataNascimento}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargo"
          control={control}
          label={messages.labels.cargo}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMoneyInput
          name="salario"
          control={control}
          label={messages.labels.salario}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="email"
          control={control}
          label={messages.labels.email}
          type="email"
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMaskedInput
          name="telefone"
          control={control}
          label={messages.labels.telefone}
          mask="(99) 99999-9999"
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormCepInput
          name="endereco.cep"
          control={control}
          label={messages.labels.cep}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="endereco.logradouro"
          control={control}
          label={messages.labels.logradouro}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.numero"
          control={control}
          label={messages.labels.numero}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.complemento"
          control={control}
          label={messages.labels.complemento}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.bairro"
          control={control}
          label={messages.labels.bairro}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cidade"
          control={control}
          label={messages.labels.cidade}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.uf"
          control={control}
          label={messages.labels.uf}
          required
          inputProps={{ maxLength: 2 }}
        />
      </Grid>
    </Grid>
  );
}; 
