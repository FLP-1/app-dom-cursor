/**
 * Arquivo: EmpregadoFormFields.tsx
 * Caminho: src/components/forms/empregado/EmpregadoFormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos do formulário de cadastro de empregado.
 */
import React from 'react';
import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { EmpregadoFormData } from './EmpregadoFormTypes';
import { FormInput } from '@/components/form/inputs/FormInput';
import { FormMaskedInput } from '@/components/form/inputs/FormMaskedInput';
import { FormDatePicker } from '@/components/form/inputs/FormDatePicker';
import { FormMoneyInput } from '@/components/form/inputs/FormMoneyInput';
import { FormCEP } from '@/components/form/inputs/FormCEP';
import { tooltips } from '@/i18n/tooltips';

interface EmpregadoFormFieldsProps {
  control: Control<EmpregadoFormData>;
}

export const EmpregadoFormFields: React.FC<EmpregadoFormFieldsProps> = ({ control }) => {
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          control={control}
          label="Nome"
          tooltip={tooltips.empregado_nome.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMaskedInput
          name="cpf"
          control={control}
          label="CPF"
          tooltip={tooltips.empregado_cpf.pt}
          mask="999.999.999-99"
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          control={control}
          label="Data de Nascimento"
          tooltip={tooltips.empregado_dataNascimento.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cargo"
          control={control}
          label="Cargo"
          tooltip={tooltips.empregado_cargo.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMoneyInput
          name="salario"
          control={control}
          label="Salário"
          tooltip={tooltips.empregado_salario.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="email"
          control={control}
          label="E-mail"
          tooltip={tooltips.empregado_email.pt}
          type="email"
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormMaskedInput
          name="telefone"
          control={control}
          label="Telefone"
          tooltip={tooltips.empregado_telefone.pt}
          mask="(99) 99999-9999"
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormCEP
          name="endereco.cep"
          control={control}
          label="CEP"
          tooltip={tooltips.empregado_cep.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="endereco.logradouro"
          control={control}
          label="Logradouro"
          tooltip={tooltips.empregado_endereco.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.numero"
          control={control}
          label="Número"
          tooltip={tooltips.empregado_numero.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.complemento"
          control={control}
          label="Complemento"
          tooltip={tooltips.empregado_complemento.pt}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.bairro"
          control={control}
          label="Bairro"
          tooltip={tooltips.empregado_bairro.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cidade"
          control={control}
          label="Cidade"
          tooltip={tooltips.empregado_cidade.pt}
          required
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.uf"
          control={control}
          label="UF"
          tooltip={tooltips.empregado_estado.pt}
          required
          inputProps={{ maxLength: 2 }}
        />
      </Grid>
    </Grid>
  );
}; 
