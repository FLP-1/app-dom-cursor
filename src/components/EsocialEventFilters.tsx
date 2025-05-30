import { Control } from 'react-hook-form';
import { FormInput } from './common/forms/FormInput';
import { FormSelect } from './common/forms/FormSelect';
import { EsocialEventStatus, EsocialEventType, EsocialEventFilter } from '../types/esocial-event';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EsocialEventFiltersProps {
  control: Control<EsocialEventFilter>;
  tipos: EsocialEventType[];
  statusOptions: { value: EsocialEventStatus; label: string }[];
}

export function EsocialEventFilters({ control, tipos, statusOptions }: EsocialEventFiltersProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ p: theme.spacing(2) }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <FormInput
            name="codigo"
            label={t('Código do Evento')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Código do Evento') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormInput
            name="descricao"
            label={t('Descrição')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Descrição') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormSelect
            name="status"
            label={t('Status')}
            control={control}
            options={statusOptions}
            fullWidth
            inputProps={{ 'aria-label': t('Status') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormSelect
            name="tipoId"
            label={t('Tipo de Evento')}
            control={control}
            options={tipos.map(tipo => ({ value: tipo.id, label: `${tipo.codigo} - ${tipo.descricao}` }))}
            fullWidth
            inputProps={{ 'aria-label': t('Tipo de Evento') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <FormInput
            name="empregadorId"
            label={t('Empregador')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Empregador') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <FormInput
            name="usuarioId"
            label={t('Usuário')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Usuário') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <FormInput
            name="dataInicio"
            label={t('Data Início')}
            type="date"
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Data Início') }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <FormInput
            name="dataFim"
            label={t('Data Fim')}
            type="date"
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Data Fim') }}
          />
        </Grid>
      </Grid>
    </Box>
  );
} 