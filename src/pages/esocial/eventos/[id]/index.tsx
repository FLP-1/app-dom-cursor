import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert, Button, Chip, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EsocialEvent, EsocialEventType } from '../../../types/esocial-event';
import { EsocialEventService } from '../../../services/esocial-event.service';
import Link from 'next/link';

// TODO: Substituir por hooks reais de documento, ponto e alerta quando disponíveis
// import { useDocument } from '../../../hooks/useDocument';
// import { usePonto } from '../../../hooks/usePonto';

export default function DetalhesEventoEsocialPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EsocialEvent | null>(null);
  const [tipos, setTipos] = useState<EsocialEventType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      EsocialEventService.getById(id),
      EsocialEventService.listTypes(),
    ])
      .then(([eventData, tiposData]) => {
        setEvent(eventData);
        setTipos(tiposData);
      })
      .catch(() => setError(t('Erro ao carregar evento.')))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error || t('Evento não encontrado.')}</Alert>
      </Box>
    );
  }

  const tipo = tipos.find((t) => t.id === event.tipoId);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{t('Detalhes do Evento do eSocial')}</Typography>
          <Link href={`/esocial/eventos/[id]/editar`.replace('[id]', event.id)} passHref legacyBehavior>
            <Button variant="outlined" color="primary">{t('Editar')}</Button>
          </Link>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Código')}</Typography>
            <Typography>{event.codigo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Typography variant="subtitle2">{t('Descrição')}</Typography>
            <Typography>{event.descricao}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">{t('Tipo de Evento')}</Typography>
            <Typography>{tipo ? `${tipo.codigo} - ${tipo.descricao}` : event.tipoId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Status')}</Typography>
            <Chip label={t(event.status)} color={
              event.status === 'PROCESSED' ? 'success' :
              event.status === 'REJECTED' ? 'error' :
              event.status === 'SENT' ? 'info' : 'warning'
            } />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Data de Envio')}</Typography>
            <Typography>{event.dataEnvio ? new Date(event.dataEnvio).toLocaleString() : '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Data de Retorno')}</Typography>
            <Typography>{event.dataRetorno ? new Date(event.dataRetorno).toLocaleString() : '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="subtitle2">{t('Mensagem de Retorno')}</Typography>
            <Typography>{event.mensagemRetorno || '-'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Empregador')}</Typography>
            <Typography>{event.empregadorId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">{t('Usuário')}</Typography>
            <Typography>{event.usuarioId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">{t('XML do Evento')}</Typography>
            <Paper variant="outlined" sx={{ p: 2, mt: 1, maxHeight: 200, overflow: 'auto', bgcolor: 'background.default' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{event.xmlPayload || '-'}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {/* Integrações */}
        <Typography variant="h6" mb={1}>{t('Integrações')}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">{t('Alerta Vinculado')}</Typography>
            {event.alertaId ? (
              <Link href={`/alerts?id=${event.alertaId}`} passHref legacyBehavior>
                <Button variant="text" color="info">{t('Ver Alerta')}</Button>
              </Link>
            ) : (
              <Typography color="text.secondary">{t('Nenhum alerta vinculado')}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">{t('Registro de Ponto Vinculado')}</Typography>
            {event.timeRecordId ? (
              <Link href={`/ponto?id=${event.timeRecordId}`} passHref legacyBehavior>
                <Button variant="text" color="info">{t('Ver Ponto')}</Button>
              </Link>
            ) : (
              <Typography color="text.secondary">{t('Nenhum ponto vinculado')}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2">{t('Documento Anexado')}</Typography>
            {event.documentId ? (
              <Link href={`/documents?id=${event.documentId}`} passHref legacyBehavior>
                <Button variant="text" color="info">{t('Ver Documento')}</Button>
              </Link>
            ) : (
              <Typography color="text.secondary">{t('Nenhum documento anexado')}</Typography>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {/* Histórico/Auditoria - Exemplo de placeholder */}
        <Typography variant="h6" mb={1}>{t('Histórico de Alterações')}</Typography>
        <Typography color="text.secondary" variant="body2" mb={2}>
          {/* TODO: Integrar com logs reais de auditoria */}
          {t('Funcionalidade de histórico/auditoria em desenvolvimento.')}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link href="/esocial/eventos" passHref legacyBehavior>
            <Button variant="outlined" color="secondary">{t('Voltar para lista')}</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

// Sugestão de testes automatizados (Jest + React Testing Library):
// - Deve exibir todos os campos do evento corretamente
// - Deve exibir botões de integração apenas se houver dados vinculados
// - Deve exibir mensagem de erro se o evento não for encontrado
// - Deve garantir acessibilidade (labels, aria, etc)
// - Deve garantir responsividade em diferentes tamanhos de tela
// - Deve navegar corretamente ao clicar em "Editar" e "Voltar para lista" 