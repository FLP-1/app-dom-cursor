/**
 * Arquivo: DocumentForm.tsx
 * Caminho: src/components/DocumentForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Box, Button, Grid, Typography } from '@mui/material';
import { useDocumentForm } from '@/hooks/useDocumentForm';
import { Document } from '@prisma/client';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSwitch } from '@/components/form/FormSwitch';
import { TipoDocumentoEsocial } from '@prisma/client';
import { useTranslation } from 'next-i18next';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';

interface DocumentFormProps {
  document?: Document;
  onSuccess?: () => void;
}

export function DocumentForm({ document, onSuccess }: DocumentFormProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleDelete,
  } = useDocumentForm({ document, onSuccess });

  const { ConfirmDialog, showConfirmDialog } = useConfirmDialog({
    title: t('document.delete.title'),
    message: t('document.delete.message'),
    confirmLabel: t('common.delete'),
    cancelLabel: t('common.cancel'),
    onConfirm: handleDelete,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Typography variant="h6">
            {document ? t('document.edit.title') : t('document.create.title')}
          </Typography>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <FormInput
            name="nome"
            label={t('document.fields.name')}
            control={control}
            error={errors.nome?.message}
            required
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <FormSelect
            name="tipo"
            label={t('document.fields.type')}
            control={control}
            error={errors.tipo?.message}
            options={Object.values(TipoDocumentoEsocial).map(tipo => ({
              value: tipo,
              label: t(`document.types.${tipo}`),
            }))}
            required
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <FormInput
            name="url"
            label={t('document.fields.url')}
            control={control}
            error={errors.url?.message}
            required
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <FormDatePicker
            name="dataValidade"
            label={t('document.fields.expirationDate')}
            control={control}
            error={errors.dataValidade?.message}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <FormSwitch
            name="isPublic"
            label={t('document.fields.isPublic')}
            control={control}
            error={errors.isPublic?.message}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {document ? t('common.save') : t('common.create')}
            </Button>
            {document && (
              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={() => showConfirmDialog()}
              >
                {t('common.delete')}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog />
    </Box>
  );
} 
