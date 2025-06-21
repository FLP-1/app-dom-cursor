/**
 * Arquivo: index.tsx
 * Caminho: src/pages/esocial/eventos/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de eventos eSocial
 */

import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useEsocialEventList } from '@/hooks/useEsocialEventList';
import { EsocialEventFilter } from '@/types/esocial-event';
import { useForm } from 'react-hook-form';
import { EsocialEventFilters } from '@/components/esocial/EsocialEventFilters';
import { EsocialEventTable } from '@/components/esocial/EsocialEventTable';
import { EsocialEventService } from '@/services/esocial-event.service';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';

const statusOptions = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'SENT', label: 'Enviado' },
  { value: 'PROCESSED', label: 'Processado' },
  { value: 'REJECTED', label: 'Rejeitado' },
];

export default function EsocialEventosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { eventos, tipos, loading, error, filtros, setFiltros, atualizar } = useEsocialEventList();
  const { control, handleSubmit } = useForm<EsocialEventFilter>({ defaultValues: filtros });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (data: EsocialEventFilter) => {
    setFiltros(data);
  };

  const handleVisualizar = (id: string) => {
    router.push(`/esocial/eventos/${id}`);
  };

  const handleEditar = (id: string) => {
    router.push(`/esocial/eventos/${id}/editar`);
  };

  const handleExcluir = async (id: string) => {
    try {
      await EsocialEventService.remove(id);
      atualizar();
      setSnackbar({ open: true, message: t('Evento excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir evento.'), severity: 'error' });
    }
  };

  const handleGerarAlerta = async (id: string) => {
    try {
      await EsocialEventService.gerarAlerta(id);
      setSnackbar({ open: true, message: t('Alerta gerado com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao gerar alerta.'), severity: 'error' });
    }
  };

  if (loading && eventos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{t(error)}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Eventos do eSocial')}
        onAdd={() => router.push('/esocial/eventos/novo')}
        onRefresh={atualizar}
        addButtonText={t('Novo Evento')}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <EsocialEventFilters control={control} tipos={tipos} statusOptions={statusOptions} />
      </form>

      <Box sx={{ mt: 4 }}>
        <EsocialEventTable
          eventos={eventos}
          onVisualizar={handleVisualizar}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
          onGerarAlerta={handleGerarAlerta}
          loading={loading}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 
