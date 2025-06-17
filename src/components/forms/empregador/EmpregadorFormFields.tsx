/**
 * Arquivo: EmpregadorFormFields.tsx
 * Caminho: src/components/forms/empregador/EmpregadorFormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis do formulário de cadastro de empregador, com acessibilidade, responsividade e tooltips centralizados.
 */

import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { tooltips } from '@/i18n/tooltips';
import { Control, FieldValues } from 'react-hook-form';
import { EmpregadorFormData } from './EmpregadorFormTypes';

interface EmpregadorFormFieldsProps<T extends FieldValues> {
  control: Control<T>;
}

export function EmpregadorFormFields<T extends FieldValues>({ control }: EmpregadorFormFieldsProps<T>) {
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="nome"
          label={tooltips.forms.empregador.fields.nome.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.nome.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="cnpj"
          label={tooltips.forms.empregador.fields.cnpj.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.cnpj.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="email"
          label={tooltips.forms.empregador.fields.email.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.email.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="telefone"
          label={tooltips.forms.empregador.fields.telefone.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.telefone.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.cep"
          label={tooltips.forms.empregador.fields.cep.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.cep.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.logradouro"
          label={tooltips.forms.empregador.fields.endereco.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.endereco.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.numero"
          label={tooltips.forms.empregador.fields.numero.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.numero.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.complemento"
          label={tooltips.forms.empregador.fields.complemento.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.complemento.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.bairro"
          label={tooltips.forms.empregador.fields.bairro.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.bairro.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.cidade"
          label={tooltips.forms.empregador.fields.cidade.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.cidade.tooltip.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.uf"
          label={tooltips.forms.empregador.fields.estado.label.pt}
          control={control}
          tooltip={tooltips.forms.empregador.fields.estado.tooltip.pt}
        />
      </Grid>
    </Grid>
  );
} 
