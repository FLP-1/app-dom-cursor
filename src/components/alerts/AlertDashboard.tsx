/**
 * Arquivo: AlertDashboard.tsx
 * Caminho: src/components/alerts/AlertDashboard.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Dashboard de alertas com foco em documentos e ponto, seguindo o plano de melhorias
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
  Alert,
  CircularProgress,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  ExpandMore,
  ExpandLess,
  Notifications,
  Description,
  Schedule,
  Payment,
  Assignment,
  Visibility,
  Dismiss,
  Settings,
} from '@mui/icons-material';
import { AlertService } from '@/services/alert.service';
import { Alert, DocumentAlert, TimeRecordAlert, AlertStats } from '@/types/alert';
import { tooltips } from '@/i18n/tooltips';
import { useMessages } from '@/hooks/useMessages';
import { alertasMessages } from '@/i18n/messages/alertas.messages';

interface AlertDashboardProps {
  showSettings?: boolean;
  onAlertClick?: (alert: Alert) => void;
  onSettingsClick?: () => void;
}

const AlertDashboard: React.FC<AlertDashboardProps> = ({
  showSettings = true,
  onAlertClick,
  onSettingsClick,
}) => {
  const { messages } = useMessages(alertasMessages);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [documentAlerts, setDocumentAlerts] = useState<DocumentAlert[]>([]);
  const [timeAlerts, setTimeAlerts] = useState<TimeRecordAlert[]>([]);
  const [stats, setStats] = useState<AlertStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    documents: boolean;
    timeRecords: boolean;
    others: boolean;
  }>({
    documents: true,
    timeRecords: true,
    others: false,
  });

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar alertas gerais
      const generalAlerts = await AlertService.getAlerts({ status: 'ACTIVE' });
      setAlerts(generalAlerts);

      // Carregar alertas específicos de documentos
      const docAlerts = await AlertService.checkDocumentExpiration();
      setDocumentAlerts(docAlerts);

      // Carregar alertas específicos de ponto
      const timeRecordAlerts = await AlertService.checkTimeRecordAlerts();
      setTimeAlerts(timeRecordAlerts);

      // Calcular estatísticas
      calculateStats(generalAlerts, docAlerts, timeRecordAlerts);
    } catch (err) {
      setError(messages.errors.loadError);
      console.error('Erro ao carregar alertas:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (
    generalAlerts: Alert[],
    docAlerts: DocumentAlert[],
    timeAlerts: TimeRecordAlert[]
  ) => {
    const stats: AlertStats = {
      total: generalAlerts.length + docAlerts.length + timeAlerts.length,
      active: generalAlerts.filter(a => a.status === 'ACTIVE').length,
      resolved: generalAlerts.filter(a => a.status === 'RESOLVED').length,
      dismissed: generalAlerts.filter(a => a.status === 'DISMISSED').length,
      bySeverity: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        URGENT: 0,
      },
      byType: {
        DOCUMENT_EXPIRATION: docAlerts.length,
        TIME_RECORD: timeAlerts.length,
        PAYMENT: 0,
        TASK: 0,
        OTHER: 0,
      },
      byChannel: {
        EMAIL: 0,
        SMS: 0,
        PUSH: 0,
        WHATSAPP: 0,
      },
    };

    // Calcular por severidade
    [...generalAlerts, ...docAlerts, ...timeAlerts].forEach(alert => {
      stats.bySeverity[alert.severity]++;
    });

    // Calcular por canal
    [...generalAlerts, ...docAlerts, ...timeAlerts].forEach(alert => {
      alert.channels.forEach(channel => {
        stats.byChannel[channel]++;
      });
    });

    setStats(stats);
  };

  const handleAlertAction = async (alertId: string, action: 'RESOLVE' | 'DISMISS') => {
    try {
      const success = await AlertService.updateAlert(alertId, {
        status: action === 'RESOLVE' ? 'RESOLVED' : 'DISMISSED',
      });

      if (success) {
        await loadAlerts(); // Recarregar alertas
      }
    } catch (err) {
      console.error('Erro ao executar ação no alerta:', err);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'URGENT':
        return <Error color="error" />;
      case 'HIGH':
        return <Warning color="warning" />;
      case 'MEDIUM':
        return <Info color="info" />;
      case 'LOW':
        return <CheckCircle color="success" />;
      default:
        return <Info color="info" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'URGENT':
        return 'error';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'info';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      {/* Cabeçalho com estatísticas */}
      {stats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main">
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.stats.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main">
                  {stats.resolved}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.stats.resolved}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main">
                  {stats.dismissed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.stats.dismissed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Seção de Alertas de Documentos */}
      {documentAlerts.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => toggleSection('documents')}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Description color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {messages.sections.documents}
                </Typography>
                <Badge badgeContent={documentAlerts.length} color="error" />
              </Box>
              {expandedSections.documents ? <ExpandLess /> : <ExpandMore />}
            </Box>

            <Collapse in={expandedSections.documents}>
              <List>
                {documentAlerts.map((alert, index) => (
                  <React.Fragment key={alert.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getSeverityIcon(alert.severity)}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${alert.documentName} - ${messages.types.documentExpiration}`}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {messages.fields.expirationDate}: {formatDate(alert.expirationDate)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {alert.message}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box display="flex" gap={1}>
                          <Chip
                            label={alert.severity}
                            color={getSeverityColor(alert.severity) as any}
                            size="small"
                          />
                          <Tooltip title={messages.actions.viewDocument}>
                            <IconButton
                              size="small"
                              onClick={() => onAlertClick?.(alert as any)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < documentAlerts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Seção de Alertas de Ponto */}
      {timeAlerts.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => toggleSection('timeRecords')}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Schedule color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {messages.sections.timeRecords}
                </Typography>
                <Badge badgeContent={timeAlerts.length} color="warning" />
              </Box>
              {expandedSections.timeRecords ? <ExpandLess /> : <ExpandMore />}
            </Box>

            <Collapse in={expandedSections.timeRecords}>
              <List>
                {timeAlerts.map((alert, index) => (
                  <React.Fragment key={alert.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getSeverityIcon(alert.severity)}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${alert.empregadoName} - ${alert.type.replace('_', ' ')}`}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {messages.fields.date}: {formatDate(alert.date)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {alert.message}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box display="flex" gap={1}>
                          <Chip
                            label={alert.severity}
                            color={getSeverityColor(alert.severity) as any}
                            size="small"
                          />
                          <Tooltip title={messages.actions.viewRecord}>
                            <IconButton
                              size="small"
                              onClick={() => onAlertClick?.(alert as any)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < timeAlerts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Seção de Outros Alertas */}
      {alerts.filter(a => a.type !== 'DOCUMENT_EXPIRATION' && a.type !== 'TIME_RECORD').length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={() => toggleSection('others')}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Notifications color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {messages.sections.others}
                </Typography>
                <Badge
                  badgeContent={alerts.filter(a => a.type !== 'DOCUMENT_EXPIRATION' && a.type !== 'TIME_RECORD').length}
                  color="info"
                />
              </Box>
              {expandedSections.others ? <ExpandLess /> : <ExpandMore />}
            </Box>

            <Collapse in={expandedSections.others}>
              <List>
                {alerts
                  .filter(a => a.type !== 'DOCUMENT_EXPIRATION' && a.type !== 'TIME_RECORD')
                  .map((alert, index) => (
                    <React.Fragment key={alert.id}>
                      <ListItem>
                        <ListItemIcon>
                          {getSeverityIcon(alert.severity)}
                        </ListItemIcon>
                        <ListItemText
                          primary={alert.type.replace('_', ' ')}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {alert.message}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {messages.fields.createdAt}: {formatDate(alert.createdAt)}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box display="flex" gap={1}>
                            <Chip
                              label={alert.severity}
                              color={getSeverityColor(alert.severity) as any}
                              size="small"
                            />
                            <Tooltip title={messages.actions.resolve}>
                              <IconButton
                                size="small"
                                onClick={() => handleAlertAction(alert.id, 'RESOLVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={messages.actions.dismiss}>
                              <IconButton
                                size="small"
                                onClick={() => handleAlertAction(alert.id, 'DISMISS')}
                              >
                                <Dismiss />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < alerts.filter(a => a.type !== 'DOCUMENT_EXPIRATION' && a.type !== 'TIME_RECORD').length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
              </List>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há alertas */}
      {alerts.length === 0 && documentAlerts.length === 0 && timeAlerts.length === 0 && (
        <Card>
          <CardContent>
            <Box textAlign="center" py={3}>
              <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {messages.empty.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {messages.empty.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AlertDashboard;