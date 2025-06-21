/**
 * Arquivo: index.tsx
 * Caminho: src/pages/relatorios/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de relatórios principal do sistema, conectada à API via useRelatoriosData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, TextField, List, ListItem, ListItemText, ListItemIcon,
  ListItemAvatar, Badge, Divider, Paper, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  TrendingUp, TrendingDown, Remove, Download, FilterList,
  Assessment, People, Task, AttachMoney, EmojiEvents,
  CheckCircle, Schedule, Error, Person, Department
} from '@mui/icons-material';
import { useRelatoriosData } from '@/hooks/useRelatoriosData';

const Relatorios = () => {
  const { data, isLoading, isError, generateReport, exportReport } = useRelatoriosData();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('all');

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Falha ao carregar os dados dos relatórios.</Typography>
      </Box>
    );
  }

  const { metrics, recentActivity, topPerformers, departmentStats, summary } = data;

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return <TrendingUp sx={{ color: '#4CAF50' }} />;
      case 'decrease': return <TrendingDown sx={{ color: '#F44336' }} />;
      default: return <Remove sx={{ color: '#757575' }} />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return '#4CAF50';
      case 'decrease': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle sx={{ color: '#4CAF50' }} />;
      case 'pending': return <Schedule sx={{ color: '#FF9800' }} />;
      case 'failed': return <Error sx={{ color: '#F44336' }} />;
      default: return <Schedule />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('pt-BR');
  };

  const handleExportReport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      await exportReport(selectedReport, format);
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Relatórios 📊
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Análise e insights do sistema DOM
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              label="Período"
            >
              <MenuItem value="week">Semana</MenuItem>
              <MenuItem value="month">Mês</MenuItem>
              <MenuItem value="quarter">Trimestre</MenuItem>
              <MenuItem value="year">Ano</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Relatório</InputLabel>
            <Select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              label="Relatório"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="financial">Financeiro</MenuItem>
              <MenuItem value="hr">RH</MenuItem>
              <MenuItem value="operations">Operações</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => handleExportReport('pdf')}
          >
            Exportar
          </Button>
        </Box>
      </Box>

      {/* Métricas Principais */}
      <Grid container spacing={3} mb={4}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h4" sx={{ color: metric.color }}>
                    {metric.icon}
                  </Typography>
                  {getChangeIcon(metric.changeType)}
                </Box>
                <Typography variant="h4" fontWeight="bold" mb={1}>
                  {metric.unit}{metric.value.toLocaleString('pt-BR')}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {metric.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography 
                    variant="caption" 
                    sx={{ color: getChangeColor(metric.changeType) }}
                  >
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    vs período anterior
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Resumo Geral */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Resumo Geral
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {formatCurrency(summary.totalRevenue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receita Total
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {summary.totalEmployees}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Funcionários
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {summary.totalTasks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tarefas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {summary.avgPerformance}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Performance Média
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
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
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      {getStatusIcon(activity.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.description}
                      secondary={
                        <Box display="flex" alignItems="center" gap={2}>
                          <Typography variant="caption" color="text.secondary">
                            {activity.user}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(activity.timestamp)}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={activity.status}
                      size="small"
                      sx={{
                        backgroundColor: activity.status === 'completed' ? '#E8F5E8' : 
                                        activity.status === 'pending' ? '#FFF3E0' : '#FFEBEE',
                        color: activity.status === 'completed' ? '#2E7D32' : 
                               activity.status === 'pending' ? '#E65100' : '#C62828',
                        textTransform: 'capitalize'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Top Performers */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Top Performers
              </Typography>
              {topPerformers.map((performer, index) => (
                <Box key={performer.id} display="flex" alignItems="center" mb={2}>
                  <Avatar src={performer.avatar} sx={{ mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {performer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {performer.role}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      {performer.performance}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {performer.tasksCompleted} tarefas
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Estatísticas por Departamento */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Por Departamento
              </Typography>
              {departmentStats.map((dept) => (
                <Box key={dept.id} mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {dept.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dept.employeeCount} funcionários
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dept.avgPerformance}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: dept.avgPerformance >= 90 ? '#4CAF50' : 
                                   dept.avgPerformance >= 80 ? '#FF9800' : '#F44336'
                      }
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="caption" color="text.secondary">
                      Performance: {dept.avgPerformance}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dept.completedTasks}/{dept.totalTasks} tarefas
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Relatorios;
