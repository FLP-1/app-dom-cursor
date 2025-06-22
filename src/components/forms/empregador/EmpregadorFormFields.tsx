/**
 * Arquivo: EmpregadorFormFields.tsx
 * Caminho: src/components/forms/empregador/EmpregadorFormFields.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Campos reutilizáveis do formulário de cadastro de empregador, com acessibilidade, responsividade e tooltips centralizados.
 */

import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { Control, FieldValues } from 'react-hook-form';
import { EmpregadorFormData } from './EmpregadorFormTypes';
import { empregadorMessages } from '@/i18n/messages/empregador.messages';

interface EmpregadorFormFieldsProps<T extends FieldValues> {
  control: Control<T>;
}

export function EmpregadorFormFields<T extends FieldValues>({ control }: EmpregadorFormFieldsProps<T>) {
  const messages = empregadorMessages.pt;

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="nome"
          label={messages.labels.nome}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="cnpj"
          label={messages.labels.cnpj}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="email"
          label={messages.labels.email}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="telefone"
          label={messages.labels.telefone}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.cep"
          label={messages.labels.cep}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.logradouro"
          label={messages.labels.logradouro}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.numero"
          label={messages.labels.numero}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.complemento"
          label={messages.labels.complemento}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.bairro"
          label={messages.labels.bairro}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.cidade"
          label={messages.labels.cidade}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput<T>
          name="endereco.uf"
          label={messages.labels.uf}
          control={control}
        />
      </Grid>
    </Grid>
  );
} 
