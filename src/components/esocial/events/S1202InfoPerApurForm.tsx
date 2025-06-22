/**
 * Arquivo: S1202InfoPerApurForm.tsx
 * Caminho: src/components/esocial/events/S1202InfoPerApurForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de formulário S1202 Info Per Apur com mensagens centralizadas
 */

import { useTranslation } from 'react-i18next';
import { Control, useFieldArray } from 'react-hook-form';
import { Grid, IconButton, Typography, Paper, Box, Tooltip } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormTextArea } from '@/components/forms/inputs/FormTextArea';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { S1202DetVerbasForm } from '@/components/esocial/events/S1202DetVerbasForm';
import { tooltips } from '@/i18n/tooltips';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

interface S1202InfoPerApurFormProps {
  control: Control<S1202Schema>;
  dmDevIndex: number;
}

export const S1202InfoPerApurForm = ({ control, dmDevIndex }: S1202InfoPerApurFormProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: `dmDev.${dmDevIndex}.infoPerApur.ideEstabLot`
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle1">
            {t('esocial.S1202.dmDev.infoPerApur.title')}
          </Typography>
          <Tooltip title={tooltips.esocialS1202InfoPerApurHelp[language]}>
            <HelpOutlineIcon fontSize="small" color="action" />
          </Tooltip>
        </Box>
        <IconButton
          onClick={() => append({
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
            <Typography variant="subtitle2">
              {t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.item', { number: index + 1 })}
            </Typography>
            <IconButton
              onClick={() => remove(index)}
              aria-label={messages.removeEstablishment}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} columns={12}>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
              <FormSelect
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${index}.tpInsc`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.tpInsc')}
                control={control}
                options={[
                  { value: '1', label: t('esocial.S1202.ideEmpregador.tpInsc.cnpj') },
                  { value: '2', label: t('esocial.S1202.ideEmpregador.tpInsc.cpf') },
                  { value: '3', label: t('esocial.S1202.ideEmpregador.tpInsc.caepf') },
                  { value: '4', label: t('esocial.S1202.ideEmpregador.tpInsc.cno') }
                ]}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${index}.nrInsc`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.nrInsc')}
                control={control}
                mask="cnpj"
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
              <FormInput
                name={`dmDev.${dmDevIndex}.infoPerApur.ideEstabLot.${index}.codLotacao`}
                label={t('esocial.S1202.dmDev.infoPerApur.ideEstabLot.codLotacao')}
                control={control}
              />
            </Grid>
            <Grid gridColumn={{ xs: 'span 12' }}>
              <S1202DetVerbasForm
                control={control}
                dmDevIndex={dmDevIndex}
                estabLotIndex={index}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}; 
