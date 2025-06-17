/**
 * Arquivo: UsuarioParceiroFormFields.tsx
 * Caminho: src/components/forms/usuario-parceiro/UsuarioParceiroFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de usuário parceiro.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import FormInput from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import { FormPhoneInput } from '@/components/common/forms/FormPhoneInput';
import { UsuarioParceiroFormData, TipoUsuarioParceiro } from './UsuarioParceiroFormTypes';

interface UsuarioParceiroFormFieldsProps {
  control: Control<UsuarioParceiroFormData>;
  errors?: FieldErrors<UsuarioParceiroFormData>;
}

export function UsuarioParceiroFormFields({ control, errors }: UsuarioParceiroFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          label={t('usuarioParceiro.fields.nome')}
          control={control}
          required
          error={errors?.nome?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="email"
          label={t('usuarioParceiro.fields.email')}
          control={control}
          type="email"
          required
          error={errors?.email?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormPhoneInput
          name="telefone"
          label={t('usuarioParceiro.fields.telefone')}
          control={control}
          required
          error={errors?.telefone?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          label={t('usuarioParceiro.fields.tipo')}
          control={control}
          error={!!errors?.tipo}
          options={Object.values(TipoUsuarioParceiro).map((tipo) => ({
            value: tipo,
            label: t(`usuarioParceiro.tipos.${tipo.toLowerCase()}`)
          }))}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="cpf"
          label={t('usuarioParceiro.fields.cpf')}
          control={control}
          required
          error={errors?.cpf?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataNascimento"
          label={t('usuarioParceiro.fields.dataNascimento')}
          control={control}
          required
          error={errors?.dataNascimento?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cep"
          label={t('usuarioParceiro.fields.cep')}
          control={control}
          required
          error={errors?.endereco?.cep?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.logradouro"
          label={t('usuarioParceiro.fields.logradouro')}
          control={control}
          required
          error={errors?.endereco?.logradouro?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.numero"
          label={t('usuarioParceiro.fields.numero')}
          control={control}
          required
          error={errors?.endereco?.numero?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
        <FormInput
          name="endereco.complemento"
          label={t('usuarioParceiro.fields.complemento')}
          control={control}
          error={errors?.endereco?.complemento?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.bairro"
          label={t('usuarioParceiro.fields.bairro')}
          control={control}
          required
          error={errors?.endereco?.bairro?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.cidade"
          label={t('usuarioParceiro.fields.cidade')}
          control={control}
          required
          error={errors?.endereco?.cidade?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
        <FormInput
          name="endereco.estado"
          label={t('usuarioParceiro.fields.estado')}
          control={control}
          required
          error={errors?.endereco?.estado?.message}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('usuarioParceiro.fields.observacoes')}
          control={control}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
        />
      </Grid>
    </Grid>
  );
} 
