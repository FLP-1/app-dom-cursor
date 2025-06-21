/**
 * Arquivo: EmpregadoFormFields.tsx
 * Caminho: src/components/forms/empregado/EmpregadoFormFields.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Campos reutilizáveis do formulário de cadastro de empregado, com acessibilidade, responsividade e tooltips centralizados.
 */

import { Grid } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/common/forms/FormDatePicker';
import { tooltips } from '@/i18n/tooltips';
import { Control } from 'react-hook-form';
import { EmpregadoFormValues } from '@/components/forms/empregado/EmpregadoFormTypes';

interface EmpregadoFormFieldsProps {
  control: Control<EmpregadoFormValues>;
}

export function EmpregadoFormFields({ control }: EmpregadoFormFieldsProps) {
  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="nome"
          label="Nome"
          control={control}
          tooltip={tooltips.nomeCompletoEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cpf"
          label="CPF"
          control={control}
          tooltip={tooltips.cpfEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormDatePicker
          name="dataNascimento"
          label="Data de Nascimento"
          control={control}
          tooltip={tooltips.dataNascimentoEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cargo"
          label="Cargo"
          control={control}
          tooltip={tooltips.cargoEmpregado ? tooltips.cargoEmpregado.pt : ''}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="salario"
          label="Salário"
          control={control}
          tooltip={tooltips.salarioEmpregado ? tooltips.salarioEmpregado.pt : ''}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="email"
          label="E-mail"
          control={control}
          tooltip={tooltips.emailEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="telefone"
          label="Telefone"
          control={control}
          tooltip={tooltips.telefoneEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cep"
          label="CEP"
          control={control}
          tooltip={tooltips.cepEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="endereco"
          label="Endereço"
          control={control}
          tooltip={tooltips.enderecoEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="numero"
          label="Número"
          control={control}
          tooltip={tooltips.numeroEnderecoEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="complemento"
          label="Complemento"
          control={control}
          tooltip={tooltips.complementoEnderecoEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="bairro"
          label="Bairro"
          control={control}
          tooltip={tooltips.bairroEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="cidade"
          label="Cidade"
          control={control}
          tooltip={tooltips.municipioEmpregado.pt}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
        <FormInput
          name="estado"
          label="Estado"
          control={control}
          tooltip={tooltips.ufEmpregado.pt}
        />
      </Grid>
    </Grid>
  );
} 
