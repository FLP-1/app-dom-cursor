/**
 * Arquivo: PontoFilter.tsx
 * Caminho: src/components/ponto/PontoFilter.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de filtro para registros de ponto eletrônico
 */

import React from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import { pontoMessages } from '@/i18n/messages/ponto.messages';

interface FiltrosPonto {
  usuarioId?: string;
  data?: string;
  validado?: boolean;
  alerta?: boolean;
}

interface PontoFilterProps {
  filtros: FiltrosPonto;
  setFiltros: (f: FiltrosPonto) => void;
}

const PontoFilter: React.FC<PontoFilterProps> = ({ filtros, setFiltros }) => {
  const { language } = useLanguage();
  const messages = pontoMessages[language];
  
  const safeFiltros = filtros || {};
  
  return (
    <Box component="form" sx={{ mb: 2 }} aria-label={messages.tooltips.filtros}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            label={messages.labels.funcionario}
            value={safeFiltros.usuarioId || ''}
            onChange={e => setFiltros({ ...safeFiltros, usuarioId: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            label={messages.labels.data}
            type="date"
            value={safeFiltros.data || ''}
            onChange={e => setFiltros({ ...safeFiltros, data: e.target.value })}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            select
            label={messages.labels.aprovado}
            value={safeFiltros.validado === undefined ? '' : safeFiltros.validado ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...safeFiltros, validado: val === '' ? undefined : val === 'sim' });
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">{messages.labels.todos}</MenuItem>
            <MenuItem value="sim">{messages.labels.sim}</MenuItem>
            <MenuItem value="nao">{messages.labels.nao}</MenuItem>
          </TextField>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 3' }}>
          <TextField
            select
            label={messages.labels.alerta}
            value={safeFiltros.alerta === undefined ? '' : safeFiltros.alerta ? 'sim' : 'nao'}
            onChange={e => {
              const val = e.target.value;
              setFiltros({ ...safeFiltros, alerta: val === '' ? undefined : val === 'sim' });
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="">{messages.labels.todos}</MenuItem>
            <MenuItem value="sim">{messages.labels.sim}</MenuItem>
            <MenuItem value="nao">{messages.labels.nao}</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PontoFilter;

export { PontoFilter }; 