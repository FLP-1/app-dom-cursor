/**
 * Arquivo: AlertDashboardExample.tsx
 * Caminho: src/components/alerts/AlertDashboardExample.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Exemplo de dashboard de alertas usando mensagens centralizadas
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
import { Alert, DocumentAlert, TimeRecordAlert } from '@/types/alert';
import { alertMessages } from '@/i18n/messages/alert.messages';
import { tooltips } from '@/i18n/tooltips';

interface AlertDashboardExampleProps {
  showSettings?: boolean;
  onAlertClick?: (alert: Alert) => void;
  onSettingsClick?: () => void;
}

const AlertDashboardExample: React.FC<AlertDashboardExampleProps> = ({
  showSettings = true,
  onAlertClick,
  onSettingsClick,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [documentAlerts, setDocumentAlerts] = useState<DocumentAlert[]>([]);
  const [timeAlerts, setTimeAlerts] = useState<TimeRecordAlert[]>([]);
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

  // Usar idioma português por padrão
  const messages = alertMessages.pt;

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
    } catch (err) {
      setError(messages.errors.loadFailed);
      console.error('Erro ao carregar alertas:', err);
    } finally {
      setLoading(false);
    }
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
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  const urgentAlerts = alerts.filter(a => a.severity === 'URGENT').length;
  const highAlerts = alerts.filter(a => a.severity === 'HIGH').length;

  return (
    <Box>
      {/* Header com estatísticas */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {messages.title}
            </Typography>
            <Box display="flex" gap={1}>
              {showSettings && (
                <Tooltip title={tooltips.configuracoesAlertas?.pt || messages.settings.title}>
                  <IconButton onClick={onSettingsClick} color="primary">
                    <Settings />
                  </IconButton>
                </Tooltip>
              )}
              <Button
                variant="outlined"
                startIcon={<Notifications />}
                onClick={loadAlerts}
              >
                {messages.update}
              </Button>
            </Box>
          </Box>

          {/* Estatísticas rápidas */}
          <Grid container columns={12} spacing={2}>
            <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
              <Box textAlign="center">
                <Typography variant="h4" color="error" fontWeight="bold">
                  {urgentAlerts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.urgentTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
              <Box textAlign="center">
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  {highAlerts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.importantTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
              <Box textAlign="center">
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {documentAlerts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.documentsTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
              <Box textAlign="center">
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  {timeAlerts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messages.timeRecordsTitle}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
                  {messages.documentsSection}
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
                        primary={alert.documentName}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {messages.documentType.replace('{tipo}', alert.documentType)} • {messages.expiresIn.replace('{dias}', alert.daysUntilExpiration.toString())}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {messages.expirationDate.replace('{data}', formatDate(alert.expirationDate))}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box display="flex" gap={1}>
                          <Chip
                            label={messages.severity[alert.severity as keyof typeof messages.severity]}
                            color={getSeverityColor(alert.severity) as any}
                            size="small"
                          />
                          <Tooltip title={messages.viewDocument}>
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
                  {messages.timeRecordsSection}
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
                        primary={`${alert.empregadoName} - ${messages.timeRecordType[alert.type as keyof typeof messages.timeRecordType]}`}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {messages.recordDate.replace('{data}', formatDate(alert.date))}
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
                            label={messages.severity[alert.severity as keyof typeof messages.severity]}
                            color={getSeverityColor(alert.severity) as any}
                            size="small"
                          />
                          <Tooltip title={messages.viewRecord}>
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
                  {messages.otherAlertsSection}
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
                          primary={messages.alertType[alert.type as keyof typeof messages.alertType] || alert.type}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {alert.message}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {messages.criadoEm}: {formatDate(alert.createdAt)}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box display="flex" gap={1}>
                            <Chip
                              label={messages.severity[alert.severity as keyof typeof messages.severity]}
                              color={getSeverityColor(alert.severity) as any}
                              size="small"
                            />
                            <Tooltip title={messages.resolveAlert}>
                              <IconButton
                                size="small"
                                onClick={() => handleAlertAction(alert.id, 'RESOLVE')}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={messages.dismissAlert}>
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
                {messages.noAlerts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {messages.noAlertsMessage}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AlertDashboardExample; 