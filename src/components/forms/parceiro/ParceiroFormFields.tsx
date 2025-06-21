/**
 * Arquivo: ParceiroFormFields.tsx
 * Caminho: src/components/forms/parceiro/ParceiroFormFields.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Campos reutilizáveis do formulário de cadastro de parceiro, com acessibilidade, responsividade e tooltips centralizados.
 */

import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { tooltips } from '@/i18n/tooltips';
import { Control } from 'react-hook-form';
import { ParceiroFormValues } from '@/components/forms/parceiro/ParceiroFormTypes';

interface ParceiroFormFieldsProps {
  control: Control<ParceiroFormValues>;
}

export function ParceiroFormFields({ control }: ParceiroFormFieldsProps) {
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="nome"
          label="Nome"
          control={control}
          tooltip={tooltips.parceiroNome.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cnpj"
          label="CNPJ"
          control={control}
          tooltip={tooltips.parceiroCnpj.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="email"
          label="E-mail"
          control={control}
          tooltip={tooltips.parceiroEmail.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="telefone"
          label="Telefone"
          control={control}
          tooltip={tooltips.parceiroTelefone.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cep"
          label="CEP"
          control={control}
          tooltip={tooltips.parceiroCep.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="endereco"
          label="Endereço"
          control={control}
          tooltip={tooltips.parceiroEndereco.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="numero"
          label="Número"
          control={control}
          tooltip={tooltips.parceiroNumero.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="complemento"
          label="Complemento"
          control={control}
          tooltip={tooltips.parceiroComplemento.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="bairro"
          label="Bairro"
          control={control}
          tooltip={tooltips.parceiroBairro.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cidade"
          label="Cidade"
          control={control}
          tooltip={tooltips.parceiroCidade.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="estado"
          label="Estado"
          control={control}
          tooltip={tooltips.parceiroEstado.pt}
        />
      </Grid>
    </Grid>
  );
} 
