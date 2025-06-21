/**
 * Arquivo: EsocialEventFilters.tsx
 * Caminho: src/components/EsocialEventFilters.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Control } from 'react-hook-form';
import { FormInput } from '@/components/common/forms/FormInput';
import { FormSelect } from '@/components/common/forms/FormSelect';
import { EsocialEventStatus, EsocialEventType, EsocialEventFilter } from '@/types/esocial-event';
import type { StatusEvento } from '@/types/esocial';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import { EsocialEventFilter as EsocialEventFilterType } from '@/types/esocial';

interface EsocialEventFiltersProps {
  control: Control<unknown>;
  tipos: string[];
  onFilter: (values: EsocialEventFilterType) => void;
}

export function EsocialEventFilters({ control, tipos, onFilter }: EsocialEventFiltersProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { getTabela } = useEsocialTabela();
  const [statusOptions, setStatusOptions] = useState<StatusEvento[]>([]);

  useEffect(() => {
    const carregarStatus = async () => {
      const statusTabela = await getTabela('9'); // Tabela de Status
      if (statusTabela) {
        setStatusOptions(statusTabela.itens);
      }
    };

    carregarStatus();
  }, [getTabela]);

  return (
    <Box sx={{ p: theme.spacing(2) }}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn="span 12">
          <FormInput
            name="codigo"
            label={t('Código do Evento')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Código do Evento') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormInput
            name="descricao"
            label={t('Descrição')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Descrição') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormSelect
            name="status"
            label={t('Status')}
            control={control}
            options={statusOptions.map(item => ({
              value: item.codigo,
              label: item.descricao
            }))}
            fullWidth
            inputProps={{ 'aria-label': t('Status') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormSelect
            name="tipoId"
            label={t('Tipo de Evento')}
            control={control}
            options={tipos.map(tipo => ({ value: tipo, label: tipo }))}
            fullWidth
            inputProps={{ 'aria-label': t('Tipo de Evento') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormInput
            name="empregadorId"
            label={t('Empregador')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Empregador') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormInput
            name="usuarioId"
            label={t('Usuário')}
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Usuário') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <FormInput
            name="dataInicio"
            label={t('Data Início')}
            type="date"
            control={control}
            fullWidth
            inputProps={{ 'aria-label': t('Data Início') }}
          />
        </Grid>
        <Grid gridColumn="span 12">
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
