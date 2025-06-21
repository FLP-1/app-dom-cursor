/**
 * Arquivo: index.tsx
 * Caminho: src/pages/analytics/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de analytics e visualização de dados do sistema DOM, conectada à API via useAnalyticsData.
 */
import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  Button, Chip, Avatar, Paper, Tabs, Tab, CircularProgress
} from '@mui/material';
import {
  TrendingUp, TrendingDown, BarChart, PieChart, ShowChart,
  People, AccessTime, Assignment, CheckCircle,
  ArrowUpward, ArrowDownward, Insights
} from '@mui/icons-material';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const AnalyticsScreen = () => {
  const { data, isLoading, isError, refreshAnalytics } = useAnalyticsData();
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
        <Typography color="error">Falha ao carregar os dados de analytics.</Typography>
      </Box>
    );
  }

  const { metrics, mainChart, secondaryChart, trends, summary } = data;

  const getTrendIcon = (trendType: string) => {
    switch (trendType) {
      case 'up': return <TrendingUp sx={{ color: '#4CAF50' }} />;
      case 'down': return <TrendingDown sx={{ color: '#F44336' }} />;
      default: return <ShowChart sx={{ color: '#757575' }} />;
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Análises e Insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualize o desempenho e descubra oportunidades
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<ShowChart />} onClick={refreshAnalytics}>
          Atualizar
        </Button>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {metrics.map((kpi, index) => (
          <Grid key={index} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              background: `linear-gradient(135deg, ${kpi.color}15, ${kpi.color}05)`,
              border: `1px solid ${kpi.color}20`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 12px 40px ${kpi.color}30`,
              }
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {kpi.name}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color={kpi.color}>
                      {kpi.icon} {kpi.value}{kpi.unit}
                    </Typography>
                  </Box>
                  <Avatar sx={{
                    background: kpi.color,
                    width: 56,
                    height: 56,
                    boxShadow: `0 4px 20px ${kpi.color}40`
                  }}>
                    {getTrendIcon(kpi.trendType)}
                  </Avatar>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip 
                    label={kpi.trend > 0 ? `+${kpi.trend}%` : `${kpi.trend}%`}
                    size="small"
                    sx={{
                      background: kpi.trend > 0 ? '#E8F5E8' : kpi.trend < 0 ? '#FFEBEE' : '#F5F5F5',
                      color: kpi.trend > 0 ? '#2E7D32' : kpi.trend < 0 ? '#C62828' : '#757575',
                      fontWeight: 'bold',
                      fontSize: '0.75rem'
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {kpi.trendType === 'up' && 'Crescimento'}
                    {kpi.trendType === 'down' && 'Queda'}
                    {kpi.trendType === 'neutral' && 'Estável'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Gráficos e Tabs */}
        <Grid gridColumn={{ xs: 'span 12', lg: 'span 8' }}>
          {/* Tabs para diferentes visualizações */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab label="Tendências" />
                <Tab label="Comparativo" />
                <Tab label="Distribuição" />
              </Tabs>

              {/* Simulação de Gráfico */}
              <Box sx={{ 
                height: 350, 
                background: 'linear-gradient(135deg, #667eea10, #764ba210)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box textAlign="center">
                  <BarChart sx={{ fontSize: 80, color: 'primary.main', opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary">
                    Gráfico de {['Tendências', 'Comparativo', 'Distribuição'][tabValue]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (Visualização de dados simulada)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Insights Detalhados */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Tendências
              </Typography>
              {trends.map((trend, index) => (
                <Paper key={trend.id} sx={{
                  p: 3,
                  mb: 2,
                  borderRadius: 2,
                  border: `1px solid #2196F330`,
                  background: '#f9f9fb'
                }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    {getTrendIcon(trend.trendType)}
                    <Box flex={1}>
                      <Typography variant="body1" fontWeight="bold">
                        {trend.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trend.trend > 0 ? `+${trend.trend}%` : `${trend.trend}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo */}
        <Grid gridColumn={{ xs: 'span 12', lg: 'span 4' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Resumo
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Total:
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {summary.total}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Crescimento:
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="#4CAF50">
                  {summary.growth > 0 ? `+${summary.growth}%` : `${summary.growth}%`}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Melhor mês:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {summary.bestMonth}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pior mês:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {summary.worstMonth}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsScreen;
