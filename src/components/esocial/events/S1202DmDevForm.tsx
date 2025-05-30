import { useTranslation } from 'react-i18next';
import { Control, useFieldArray } from 'react-hook-form';
import { Grid, IconButton, Typography, Paper, Box, Tooltip } from '@mui/material';
import { FormInput, FormSelect } from '@/components/form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { S1202InfoPerApurForm } from './S1202InfoPerApurForm';

interface S1202DmDevFormProps {
  control: Control<S1202Schema>;
}

export const S1202DmDevForm = ({ control }: S1202DmDevFormProps) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dmDev'
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle2">
            {t('esocial.S1202.dmDev.title')}
          </Typography>
          <Tooltip title={t('esocial.S1202.dmDev.help')}>
            <HelpOutlineIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        <IconButton
          onClick={() => append({
            ideDmDev: '',
            codCateg: 0,
            infoPerApur: {
              ideEstabLot: [{
                tpInsc: 1,
                nrInsc: '',
                codLotacao: '',
                detVerbas: [{
                  codRubr: '',
                  ideTabRubr: '',
                  qtdRubr: 0,
                  vrRubr: 0,
                  indApurIR: 0
                }]
              }]
            }
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
            <Typography variant="subtitle1">
              {t('esocial.S1202.dmDev.item', { number: index + 1 })}
            </Typography>
            <IconButton
              onClick={() => remove(index)}
              aria-label={t('common.actions.remove')}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormInput
                name={`dmDev.${index}.ideDmDev`}
                label={t('esocial.S1202.dmDev.ideDmDev')}
                control={control}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                name={`dmDev.${index}.codCateg`}
                label={t('esocial.S1202.dmDev.codCateg')}
                control={control}
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <S1202InfoPerApurForm
                control={control}
                dmDevIndex={index}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}; 