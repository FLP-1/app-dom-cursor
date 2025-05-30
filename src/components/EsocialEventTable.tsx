import { EsocialEvent } from '../types/esocial-event';
import { DataTable } from './common/DataTable';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/WarningAmber';
import Link from './common/Link';
import { formatDateBR } from '../utils/date';

interface EsocialEventTableProps {
  eventos: EsocialEvent[];
  onVisualizar: (id: string) => void;
  onEditar: (id: string) => void;
  onExcluir: (id: string) => void;
  onGerarAlerta: (id: string) => void;
  loading?: boolean;
}

export function EsocialEventTable({ eventos, onVisualizar, onEditar, onExcluir, onGerarAlerta, loading }: EsocialEventTableProps) {
  const { t } = useTranslation();

  const columns = [
    { field: 'codigo', headerName: t('Código'), flex: 1 },
    { field: 'descricao', headerName: t('Descrição'), flex: 2 },
    { field: 'status', headerName: t('Status'), flex: 1 },
    { field: 'tipo', headerName: t('Tipo'), flex: 2, valueGetter: (row: EsocialEvent) => `${row.tipo?.codigo} - ${row.tipo?.descricao}` },
    { field: 'empregadorId', headerName: t('Empregador'), flex: 1 },
    { field: 'usuarioId', headerName: t('Usuário'), flex: 1 },
    { field: 'dataEnvio', headerName: t('Data de Envio'), flex: 1, valueGetter: (row: EsocialEvent) => row.dataEnvio ? formatDateBR(row.dataEnvio) : '-' },
    {
      field: 'acoes',
      headerName: t('Ações'),
      flex: 1,
      renderCell: (row: EsocialEvent) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={t('Visualizar')}><IconButton aria-label={t('Visualizar')} onClick={() => onVisualizar(row.id)}><VisibilityIcon /></IconButton></Tooltip>
          <Tooltip title={t('Editar')}><IconButton aria-label={t('Editar')} onClick={() => onEditar(row.id)}><EditIcon /></IconButton></Tooltip>
          <Tooltip title={t('Excluir')}><IconButton aria-label={t('Excluir')} onClick={() => onExcluir(row.id)}><DeleteIcon /></IconButton></Tooltip>
          <Tooltip title={t('Gerar Alerta')}><IconButton aria-label={t('Gerar Alerta')} onClick={() => onGerarAlerta(row.id)}><WarningIcon /></IconButton></Tooltip>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <DataTable
      rows={eventos}
      columns={columns}
      loading={loading}
      getRowId={(row: EsocialEvent) => row.id}
      aria-label={t('Tabela de eventos do eSocial')}
      autoHeight
      responsive
    />
  );
} 