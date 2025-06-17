/**
 * Arquivo: S3000Form.tsx
 * Caminho: src/components/esocial/events/S3000Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Grid, Button, Paper } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormTextArea } from '@/components/form';
import { TipoEventoEsocial } from '@/types/esocial';
import { tooltips } from '@/i18n/tooltips';
import { useS3000Form } from '@/hooks/esocial/useS3000Form';
import { S3000Schema } from '@/schemas/esocial/S3000Schema';

export const S3000Form = ({ initialData }: { initialData?: Partial<typeof S3000Schema._type> }) => {
  const { t } = useTranslation('esocial');
  const { methods, onSubmit } = useS3000Form(initialData);

  const tiposEvento = Object.values(TipoEventoEsocial).map(tipo => ({
    value: tipo,
    label: t(`eventos.${tipo}`)
  }));

  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormSelect
              name="tipoEventoExcluido"
              label={t('campos.tipoEventoExcluido')}
              control={methods.control}
              options={tiposEvento}
              required
              tooltip={tooltips.s3000_tipoEventoExcluido.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormInput
              name="protocoloEventoExcluido"
              label={t('campos.protocoloEventoExcluido')}
              control={methods.control}
              required
              tooltip={tooltips.s3000_protocoloEventoExcluido.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <FormDatePicker
              name="dataExclusao"
              label={t('campos.dataExclusao')}
              control={methods.control}
              required
              tooltip={tooltips.s3000_dataExclusao.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormTextArea
              name="justificativa"
              label={t('campos.justificativa')}
              control={methods.control}
              required
              minRows={3}
              tooltip={tooltips.s3000_justificativa.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormTextArea
              name="observacao"
              label={t('campos.observacao')}
              control={methods.control}
              minRows={2}
              tooltip={tooltips.s3000_observacao.pt}
            />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <Button type="submit" variant="contained">
              {t('common.actions.save')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}; 
