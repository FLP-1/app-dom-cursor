/**
 * Arquivo: VinculoUsuarioFormFields.tsx
 * Caminho: src/components/forms/vinculo-usuario/VinculoUsuarioFormFields.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Campos reutilizáveis para o formulário de vínculo usuário.
 */

import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { VinculoUsuarioFormData, TipoVinculoUsuario } from './VinculoUsuarioFormTypes';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import FormDatePicker from '@/components/forms/inputs/FormDatePicker';
import FormCheckbox from '@/components/forms/inputs/FormCheckbox';
import FormInput from '@/components/forms/inputs/FormInput';
import { tooltips } from '@/i18n/tooltips';

interface VinculoUsuarioFormFieldsProps {
  control: Control<VinculoUsuarioFormData>;
  errors?: FieldErrors<VinculoUsuarioFormData>;
}

export function VinculoUsuarioFormFields({ control, errors }: VinculoUsuarioFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <Grid container columns={12} spacing={2}>
      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormSelect
          name="tipo"
          label={t('vinculo.usuario.tipo')}
          control={control}
          error={!!errors?.tipo}
          options={Object.values(TipoVinculoUsuario).map((tipo) => ({
            value: tipo,
            label: t(`vinculo.usuario.tipo.${tipo.toLowerCase()}`)
          }))}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataInicio"
          label={t('vinculo.usuario.dataInicio')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormDatePicker
          name="dataFim"
          label={t('vinculo.usuario.dataFim')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
        <FormCheckbox
          name="ativo"
          label={t('vinculo.usuario.ativo')}
          control={control}
        />
      </Grid>

      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="observacoes"
          label={t('vinculo.usuario.observacoes')}
          control={control}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
} 
