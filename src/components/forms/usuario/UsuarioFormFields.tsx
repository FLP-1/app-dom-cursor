/**
 * Arquivo: UsuarioFormFields.tsx
 * Caminho: src/components/forms/usuario/UsuarioFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-14
 * Descrição: Campos reutilizáveis do formulário de usuário.
 */

import { Grid, MenuItem } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { UsuarioFormData, TipoUsuario } from './UsuarioFormTypes';

interface UsuarioFormFieldsProps {
  control: Control<UsuarioFormData>;
  errors?: FieldErrors<UsuarioFormData>;
}

export function UsuarioFormFields({ control, errors }: UsuarioFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="nome"
          control={control}
          label={t('usuario.fields.nome')}
          required
          error={errors?.nome?.message}
          tooltip={t('usuario.tooltips.nome')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="email"
          control={control}
          label={t('usuario.fields.email')}
          required
          error={errors?.email?.message}
          tooltip={t('usuario.tooltips.email')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="senha"
          control={control}
          label={t('usuario.fields.senha')}
          type="password"
          required
          error={errors?.senha?.message}
          tooltip={t('usuario.tooltips.senha')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormInput
          name="confirmarSenha"
          control={control}
          label={t('usuario.fields.confirmarSenha')}
          type="password"
          required
          error={errors?.confirmarSenha?.message}
          tooltip={t('usuario.tooltips.confirmarSenha')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          control={control}
          label={t('usuario.fields.tipo')}
          required
          error={errors?.tipo?.message}
          tooltip={t('usuario.tooltips.tipo')}
        >
          {Object.values(TipoUsuario).map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {t(`usuario.tipo.${tipo.toLowerCase()}`)}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          control={control}
          label={t('usuario.fields.ativo')}
          tooltip={t('usuario.tooltips.ativo')}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          control={control}
          label={t('usuario.fields.observacoes')}
          multiline
          rows={4}
          error={errors?.observacoes?.message}
          tooltip={t('usuario.tooltips.observacoes')}
        />
      </Grid>
    </Grid>
  );
} 
