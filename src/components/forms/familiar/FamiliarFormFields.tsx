/**
 * Arquivo: FamiliarFormFields.tsx
 * Caminho: src/components/forms/familiar/FamiliarFormFields.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Campos reutilizáveis do formulário de cadastro de familiar, com acessibilidade, responsividade e tooltips centralizados.
 */

import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { tooltips } from '@/i18n/tooltips';
import { Control } from 'react-hook-form';
import { FamiliarFormValues } from '@/components/forms/familiar/FamiliarFormTypes';

interface FamiliarFormFieldsProps {
  control: Control<FamiliarFormValues>;
}

export function FamiliarFormFields({ control }: FamiliarFormFieldsProps) {
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="nome"
          label="Nome"
          control={control}
          tooltip={tooltips.familiar_nome.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cpf"
          label="CPF"
          control={control}
          tooltip={tooltips.familiar_cpf.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormDatePicker
          name="dataNascimento"
          label="Data de Nascimento"
          control={control}
          tooltip={tooltips.familiar_dataNascimento.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormSelect
          name="parentesco"
          label="Parentesco"
          control={control}
          options={[
            { value: '', label: 'Todos' },
            { value: 'pai', label: 'Pai' },
            { value: 'mae', label: 'Mãe' },
            { value: 'filho', label: 'Filho(a)' },
            { value: 'outro', label: 'Outro' },
          ]}
          tooltip={tooltips.familiar_parentesco.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cep"
          label="CEP"
          control={control}
          tooltip={tooltips.familiar_cep.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="endereco"
          label="Endereço"
          control={control}
          tooltip={tooltips.familiar_endereco.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="numero"
          label="Número"
          control={control}
          tooltip={tooltips.familiar_numero.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="complemento"
          label="Complemento"
          control={control}
          tooltip={tooltips.familiar_complemento.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="bairro"
          label="Bairro"
          control={control}
          tooltip={tooltips.familiar_bairro.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cidade"
          label="Cidade"
          control={control}
          tooltip={tooltips.familiar_cidade.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="estado"
          label="Estado"
          control={control}
          tooltip={tooltips.familiar_estado.pt}
        />
      </Grid>
    </Grid>
  );
} 
