import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { useEffect, useState } from 'react';
import { StatusEvento } from '@/types/esocial';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EsocialEvent } from '@/types/esocial';
import { getStatusDescricao } from '@/utils/esocial';

interface EsocialEventListProps {
  events: EsocialEvent[];
  onEventClick: (event: EsocialEvent) => void;
}

export function EsocialEventList({ events, onEventClick }: EsocialEventListProps) {
  const { getTabela } = useEsocialTabela();
  const [statusOptions, setStatusOptions] = useState<StatusEvento[]>([]);

  useEffect(() => {
    const carregarStatus = async () => {
      const tabela = await getTabela('11');
      if (tabela?.itens) {
        setStatusOptions(tabela.itens as StatusEvento[]);
      }
    };

    carregarStatus();
  }, [getTabela]);

  const getStatusDescricao = (codigo: string) => {
    const status = statusOptions.find(s => s.codigo === codigo);
    return status?.descricao || codigo;
  };

  const columns: GridColDef[] = [
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    { field: 'dataEvento', headerName: 'Data', width: 130, valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy', { locale: ptBR }) },
    { field: 'status', headerName: 'Status', width: 130, valueGetter: (params) => getStatusDescricao(params.value) },
    { field: 'dataEnvio', headerName: 'Envio', width: 130, valueFormatter: (params) => params.value ? format(new Date(params.value), 'dd/MM/yyyy', { locale: ptBR }) : '-' },
    { field: 'dataProcessamento', headerName: 'Processamento', width: 130, valueFormatter: (params) => params.value ? format(new Date(params.value), 'dd/MM/yyyy', { locale: ptBR }) : '-' },
    { field: 'mensagemErro', headerName: 'Erro', width: 200 }
  ];

  return (
    <DataGrid
      rows={events}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      onRowClick={(params) => onEventClick(params.row)}
      autoHeight
      disableSelectionOnClick
    />
  );
} 