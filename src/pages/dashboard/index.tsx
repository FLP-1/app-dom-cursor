/**
 * Arquivo: index.tsx
 * Caminho: src/pages/dashboard/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de dashboard principal do sistema, conectada à API via useDashboardData.
 */

import { Grid, Card, CardContent, Typography, Box, IconButton, Avatar, Chip, LinearProgress, Skeleton } from '@mui/material';
import { AccessTime, Description, Assignment, ShoppingCart, Chat, People, Notifications, TrendingUp, CheckCircle, Warning } from '@mui/icons-material';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useMessages } from '@/hooks/useMessages';
import { dashboardMessages } from '@/i18n/messages/dashboard.messages';

// Mapeamento de string para componente de ícone
const iconMap = {
  AccessTime, Description, Assignment, ShoppingCart,
  Chat, People, Notifications, TrendingUp,
  CheckCircle, Warning
};

const Dashboard = () => {
  const { messages } = useMessages(dashboardMessages);
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container columns={12} spacing={3} mt={2}>
          {[...Array(4)].map((_, i) => (
            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }} key={i}>
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
          <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{messages.error.loadData}</Typography>
      </Box>
    );
  }
  
  const { statsCards, recentActivities, monthlyProgress, quickMessages } = data;

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">{messages.header.welcome}</Typography>
          <Typography variant="body1" color="text.secondary">{messages.header.subtitle}</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <IconButton sx={{ background: 'rgba(103, 126, 234, 0.1)', '&:hover': { background: 'rgba(103, 126, 234, 0.2)' } }}><Notifications color="primary" /></IconButton>
          <Avatar sx={{ width: 48, height: 48 }}>JD</Avatar>
        </Box>
      </Box>

      {/* Cards Estatísticas */}
      <Grid container columns={12} spacing={3} mb={4}>
        {statsCards.map((card, index) => {
          const IconComponent = iconMap[card.icon];
          return (
            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>{card.title}</Typography>
                      <Typography variant="h4" fontWeight="bold" color={card.color}>{card.value}</Typography>
                      <Chip label={card.change} size="small" sx={{ mt: 1, background: card.change.includes('+') ? '#E8F5E8' : '#FFF3E0', color: card.change.includes('+') ? '#2E7D32' : '#E65100' }} />
                    </Box>
                    <Avatar sx={{ background: card.gradient, width: 56, height: 56 }}>
                      {IconComponent && <IconComponent sx={{ fontSize: 28, color: 'white' }} />}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Seção Principal */}
      <Grid container columns={12} spacing={3}>
        {/* Atividades Recentes */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>{messages.sections.recentActivities.title}</Typography>
              <Box>
                {recentActivities.map((activity, index) => {
                  const IconComponent = iconMap[activity.icon];
                  return (
                    <Box key={index} display="flex" alignItems="center" py={2} borderBottom={index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none'}>
                      <Avatar sx={{ background: `${activity.color}20`, mr: 2, width: 40, height: 40 }}>
                        {IconComponent && <IconComponent sx={{ color: activity.color, fontSize: 20 }} />}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body2" fontWeight="medium">{activity.text}</Typography>
                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Painel Lateral */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Progresso Mensal */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>{messages.sections.monthlyProgress.title}</Typography>
              {monthlyProgress.map((progress, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{progress.label}</Typography>
                    <Typography variant="body2" fontWeight="bold">{progress.value}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={progress.value} sx={{ height: 8, borderRadius: 4, backgroundColor: '#E3F2FD', '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #2196F3, #21CBF3)' } }} />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Mensagens Rápidas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>{messages.sections.quickMessages.title}</Typography>
              {quickMessages.map((msg, index) => (
                <Box key={index} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: 12 }}>{msg.avatar}</Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">{msg.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{msg.message}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
