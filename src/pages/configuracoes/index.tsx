/**
 * Arquivo: index.tsx
 * Caminho: src/pages/configuracoes/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de configurações do sistema DOM, conectada à API via useSettingsData.
 */
import React, { useState } from 'react';
import { 
  Grid, Card, CardHeader, CardContent, Typography, Box, 
  Button, IconButton, Chip, Avatar, Divider, Switch,
  TextField, MenuItem, List, ListItem, ListItemIcon, ListItemText, Skeleton, CircularProgress
} from '@mui/material';
import { 
  Settings, Person, Notifications, Palette, Security, Language, Edit, Save
} from '@mui/icons-material';
import { useSettingsData } from '@/hooks/useSettingsData';

const SettingsScreen = () => {
  const { data, isLoading, isError, updatePreferences, updateIntegrations, updateSecurity } = useSettingsData();
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
        <Typography color="error">Falha ao carregar as configurações.</Typography>
      </Box>
    );
  }

  // Preferências
  const { preferences, integrations, security } = data;
  const [theme, setTheme] = useState(preferences.theme);
  const [language, setLanguage] = useState(preferences.language);
  const [notifications, setNotifications] = useState(preferences.notifications);
  const [autoUpdate, setAutoUpdate] = useState(preferences.autoUpdate);
  const [googleDrive, setGoogleDrive] = useState(integrations.googleDrive);
  const [dropbox, setDropbox] = useState(integrations.dropbox);
  const [slack, setSlack] = useState(integrations.slack);
  const [twoFactorAuth, setTwoFactorAuth] = useState(security.twoFactorAuth);
  const [loginAlerts, setLoginAlerts] = useState(security.loginAlerts);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updatePreferences({ theme, language, notifications, autoUpdate });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveIntegrations = async () => {
    setSaving(true);
    try {
      await updateIntegrations({ googleDrive, dropbox, slack });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async () => {
    setSaving(true);
    try {
      await updateSecurity({ twoFactorAuth, loginAlerts });
    } finally {
      setSaving(false);
    }
  };

  const settingsCategories = [
    { name: 'Perfil', icon: Person, color: '#2196F3' },
    { name: 'Notificações', icon: Notifications, color: '#FF9800' },
    { name: 'Segurança', icon: Security, color: '#F44336' },
    { name: 'Aparência', icon: Palette, color: '#9C27B0' }
  ];

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Configurações
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Personalize sua experiência no sistema
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Menu Lateral */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 0 }}>
              <List>
                {settingsCategories.map((category, index) => (
                  <ListItem 
                    key={index}
                    button
                    selected={index === 0}
                    sx={{
                      borderRadius: 2,
                      m: 1,
                      '&.Mui-selected': {
                        background: `${category.color}10`,
                        '&:hover': {
                          background: `${category.color}15`,
                        }
                      }
                    }}
                  >
                    <ListItemIcon>
                      <category.icon sx={{ color: category.color }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={category.name}
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Conteúdo Principal */}
        <Grid item xs={12} md={9}>
          {/* Preferências */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Preferências
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Tema"
                    value={theme}
                    onChange={e => setTheme(e.target.value as typeof theme)}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="light">Claro</MenuItem>
                    <MenuItem value="dark">Escuro</MenuItem>
                    <MenuItem value="system">Automático</MenuItem>
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Idioma"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                    <MenuItem value="en-US">Inglês (EUA)</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Typography variant="body2">Notificações</Typography>
                    <Switch checked={notifications} onChange={e => setNotifications(e.target.checked)} />
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2">Atualização automática</Typography>
                    <Switch checked={autoUpdate} onChange={e => setAutoUpdate(e.target.checked)} />
                  </Box>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSavePreferences}
                  disabled={saving}
                  sx={{ borderRadius: 2 }}
                >
                  Salvar Preferências
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Integrações */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Integrações
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="body2">Google Drive</Typography>
                <Switch checked={googleDrive} onChange={e => setGoogleDrive(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="body2">Dropbox</Typography>
                <Switch checked={dropbox} onChange={e => setDropbox(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2">Slack</Typography>
                <Switch checked={slack} onChange={e => setSlack(e.target.checked)} />
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveIntegrations}
                  disabled={saving}
                  sx={{ borderRadius: 2 }}
                >
                  Salvar Integrações
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Segurança
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="body2">Autenticação em 2 fatores</Typography>
                <Switch checked={twoFactorAuth} onChange={e => setTwoFactorAuth(e.target.checked)} />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="body2">Alertas de login</Typography>
                <Switch checked={loginAlerts} onChange={e => setLoginAlerts(e.target.checked)} />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Última troca de senha: {new Date(security.lastPasswordChange).toLocaleDateString('pt-BR')}
              </Typography>
              <Box mt={3}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveSecurity}
                  disabled={saving}
                  sx={{ borderRadius: 2 }}
                >
                  Salvar Segurança
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsScreen;
