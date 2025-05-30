import { useForm } from 'react-hook-form';
import { useEsocialEventList } from '../../hooks/useEsocialEventList';
import { EsocialEventFilters } from '../../components/EsocialEventFilters';
import { EsocialEventTable } from '../../components/EsocialEventTable';
import { Box, Button, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from '../../components/common/Link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { EsocialEventService } from '../../services/esocial-event.service';
import { EsocialEventFilter } from '../../types/esocial-event';

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

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">{t('Eventos do eSocial')}</Typography>
        <Link href="/esocial/eventos/novo" passHref>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>{t('Novo Evento')}</Button>
        </Link>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EsocialEventFilters control={control} tipos={tipos} statusOptions={statusOptions} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="outlined">{t('Filtrar')}</Button>
          <Button sx={{ ml: 2 }} variant="text" onClick={() => { setFiltros({}); atualizar(); }}>{t('Limpar')}</Button>
        </Box>
      </form>
      <Box sx={{ mt: 4 }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{t(error)}</Alert>}
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