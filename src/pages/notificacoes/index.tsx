/**
 * Arquivo: index.tsx
 * Caminho: src/pages/notificacoes/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página para visualização e gerenciamento de notificações do sistema DOM, conectada à API via useNotificationsData.
 */
import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Avatar, 
  Chip, IconButton, Button, Divider, List, ListItem,
  ListItemAvatar, ListItemText, Badge, Tabs, Tab, CircularProgress
} from '@mui/material';
import {
  Notifications, MarkEmailRead, Delete, Settings,
  AccessTime, Assignment, ShoppingCart, Chat,
  Warning, Info, CheckCircle, Error, Clear
} from '@mui/icons-material';
import { useNotificationsData } from '@/hooks/useNotificationsData';

const NotificationsScreen = () => {
  const { data, isLoading, isError, markAsRead, deleteNotification } = useNotificationsData();
  const [tabValue, setTabValue] = useState(0);

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
        <Typography color="error">Falha ao carregar as notificações.</Typography>
      </Box>
    );
  }

  const { notifications, unreadCount } = data;

  const notificationTypes = [
    { name: 'Todas', count: notifications.length, color: '#2196F3', filter: () => true },
    { name: 'Não Lidas', count: unreadCount, color: '#F44336', filter: n => !n.read },
    { name: 'Lidas', count: notifications.length - unreadCount, color: '#4CAF50', filter: n => n.read },
    { name: 'Erros', count: notifications.filter(n => n.type === 'error').length, color: '#FF9800', filter: n => n.type === 'error' },
  ];

  const filteredNotifications = notifications.filter(notificationTypes[tabValue].filter);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'info': return <Info sx={{ color: '#2196F3' }} />;
      case 'warning': return <Warning sx={{ color: '#FF9800' }} />;
      case 'error': return <Error sx={{ color: '#F44336' }} />;
      default: return <Notifications />;
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Notificações
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Acompanhe todas as suas notificações
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<MarkEmailRead />}
            sx={{ borderRadius: 2 }}
            onClick={async () => {
              for (const n of notifications.filter(n => !n.read)) {
                await markAsRead(n.id);
              }
            }}
          >
            Marcar Todas
          </Button>
          <Button
            variant="contained"
            startIcon={<Settings />}
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
            }}
            href="/configuracoes"
          >
            Configurar
          </Button>
        </Box>
      </Box>

      {/* Tabs de Filtro */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 4 }}>
        <CardContent sx={{ py: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              '& .MuiTab-root': {
                minHeight: 48,
                textTransform: 'none',
                fontWeight: 'medium',
                borderRadius: 2,
                mx: 1
              }
            }}
          >
            {notificationTypes.map((type, index) => (
              <Tab 
                key={index}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>{type.name}</Typography>
                    <Badge 
                      badgeContent={type.count} 
                      sx={{
                        '& .MuiBadge-badge': {
                          background: type.color,
                          color: 'white',
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Lista de Notificações */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <List>
            {filteredNotifications.length === 0 && (
              <Box p={4} textAlign="center">
                <Typography color="text.secondary">Nenhuma notificação encontrada.</Typography>
              </Box>
            )}
            {filteredNotifications.map((notification) => (
              <Box key={notification.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 3,
                    background: notification.read ? 'transparent' : '#F8F9FA',
                    borderLeft: notification.read ? 'none' : `4px solid #2196F3`,
                    '&:hover': {
                      background: '#f5f5f5'
                    }
                  }}
                  secondaryAction={
                    <Box display="flex" gap={1}>
                      {!notification.read && (
                        <IconButton onClick={() => markAsRead(notification.id)}>
                          <MarkEmailRead />
                        </IconButton>
                      )}
                      <IconButton color="error" onClick={() => deleteNotification(notification.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ background: '#e3f2fd', width: 48, height: 48 }}>
                      {getTypeIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight={notification.read ? 'regular' : 'bold'}>
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip label="Novo" color="primary" size="small" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.createdAt).toLocaleString('pt-BR')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationsScreen;
