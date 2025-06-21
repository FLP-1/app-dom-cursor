/**
 * Arquivo: index.tsx
 * Caminho: src/pages/security/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de configurações de segurança do sistema DOM, conectada à API via useSecurityData.
 */
import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  Switch, Button, Avatar, List, ListItem, ListItemIcon,
  ListItemText, Divider, Alert, LinearProgress, CircularProgress
} from '@mui/material';
import {
  Security, VpnKey, Shield, Fingerprint, Visibility,
  History, DeviceUnknown, Warning, CheckCircle,
  Lock, VerifiedUser, AdminPanelSettings
} from '@mui/icons-material';
import { useSecurityData } from '@/hooks/useSecurityData';

const SecurityScreen = () => {
  const { data, isLoading, isError, updateSecuritySettings } = useSecurityData();
  const [saving, setSaving] = useState(false);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">Falha ao carregar as configurações de segurança.</Typography>
      </Box>
    );
  }

  const { logs, settings, stats, recentActivity } = data;

  const handleToggleSetting = async (setting: string, value: boolean) => {
    setSaving(true);
    try {
      await updateSecuritySettings({ [setting]: value });
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'failed': return <Warning sx={{ color: '#F44336' }} />;
      case 'warning': return <Warning sx={{ color: '#FF9800' }} />;
      default: return <History />;
    }
  };

  const securityScore = Math.min(100, Math.max(0, 
    100 - (stats.failedAttempts * 10) - (stats.suspiciousActivities * 15)
  ));

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Segurança & Privacidade
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Proteja sua conta e dados pessoais
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Score de Segurança */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            mb: 3
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <Shield sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" fontWeight="bold" mb={1}>
                {securityScore}%
              </Typography>
              <Typography variant="body1" mb={2} opacity={0.9}>
                Score de Segurança
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={securityScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: 'white'
                  }
                }}
              />
              <Typography variant="caption" mt={1} display="block" opacity={0.8}>
                {securityScore >= 80 ? 'Muito Bom' : securityScore >= 60 ? 'Bom' : 'Atenção'} - Continue assim!
              </Typography>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Estatísticas
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Logins totais:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stats.totalLogins}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Tentativas falhadas:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#F44336">
                  {stats.failedAttempts}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Atividades suspeitas:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#FF9800">
                  {stats.suspiciousActivities}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Alertas de Segurança */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Alertas de Segurança
              </Typography>

              {stats.failedAttempts > 0 && (
                <Alert 
                  severity="warning" 
                  sx={{ mb: 2, borderRadius: 2 }}
                  icon={<Warning />}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {stats.failedAttempts} tentativa(s) de login falhada(s)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Verifique se foram você
                  </Typography>
                </Alert>
              )}

              {stats.suspiciousActivities > 0 && (
                <Alert 
                  severity="error" 
                  sx={{ mb: 2, borderRadius: 2 }}
                  icon={<DeviceUnknown />}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {stats.suspiciousActivities} atividade(s) suspeita(s) detectada(s)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Recomendamos verificar seus logs
                  </Typography>
                </Alert>
              )}

              <Alert 
                severity="info" 
                sx={{ borderRadius: 2 }}
                icon={<History />}
              >
                <Typography variant="body2" fontWeight="medium">
                  Última alteração de senha
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(stats.lastPasswordChange).toLocaleDateString('pt-BR')}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Configurações de Segurança */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Configurações de Segurança
              </Typography>

              <List>
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon>
                    <Avatar sx={{ background: '#F4433620', width: 48, height: 48 }}>
                      <VerifiedUser sx={{ color: '#F44336' }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight="medium">
                          Autenticação de Dois Fatores
                        </Typography>
                        <Chip label="Crítico" size="small" color="error" />
                      </Box>
                    }
                    secondary="Adicione uma camada extra de segurança"
                  />
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleToggleSetting('twoFactorAuth', e.target.checked)}
                    disabled={saving}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon>
                    <Avatar sx={{ background: '#2196F320', width: 48, height: 48 }}>
                      <Visibility sx={{ color: '#2196F3' }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Notificações de Login"
                    secondary="Receba alertas quando houver novos acessos"
                  />
                  <Switch
                    checked={settings.loginAlerts}
                    onChange={(e) => handleToggleSetting('loginAlerts', e.target.checked)}
                    disabled={saving}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Atividade Recente
              </Typography>

              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      {getStatusIcon(activity.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.user} • {activity.ip} • {activity.location}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(activity.timestamp).toLocaleString('pt-BR')}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityScreen;
