/**
 * Arquivo: S1202DetVerbasForm.tsx
 * Caminho: src/components/esocial/events/S1202DetVerbasForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control, useFieldArray } from 'react-hook-form';
import { Grid, IconButton, Typography, Paper, Box, Tooltip } from '@mui/material';
import { FormInput, FormSelect } from '@/components/form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { tooltips } from '@/i18n/tooltips';

interface S1202DetVerbasFormProps {
  control: Control<S1202Schema>;
  dmDevIndex: number;
  estabLotIndex: number;
}

export const S1202DetVerbasForm = ({ control, dmDevIndex, estabLotIndex }: S1202DetVerbasFormProps) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas`
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2">
            {t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.title')}
          </Typography>
          <Tooltip title={tooltips.esocialS1202DetVerbasHelp.pt}>
            <HelpOutlineIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        <IconButton
          onClick={() => append({
            codRubr: '',
            ideTabRubr: '',
            qtdRubr: 0,
            vrRubr: 0,
            indApurIR: 0
          })}
          aria-label={t('common.actions.add')}
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body2">
              {t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.item', { number: index + 1 })}
            </Typography>
            <IconButton
              onClick={() => remove(index)}
              aria-label="Remover verba"
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} columns={12}>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas.${index}.codRubr`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.codRubr')}
                control={control}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas.${index}.ideTabRubr`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.ideTabRubr')}
                control={control}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 2' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas.${index}.qtdRubr`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.qtdRubr')}
                control={control}
                type="number"
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 2' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas.${index}.vrRubr`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.vrRubr')}
                control={control}
                mask="currency"
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 2' }}>
              <FormSelect
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${estabLotIndex}.detVerbas.${index}.indApurIR`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.indApurIR')}
                control={control}
                options={[
                  { value: '0', label: t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.indApurIR.nao') },
                  { value: '1', label: t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.detVerbas.indApurIR.sim') }
                ]}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}; 
