/**
 * Arquivo: index.tsx
 * Caminho: src/pages/ponto/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de ponto eletrônico principal do sistema, conectada à API via usePontoData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
  Divider
} from '@mui/material';
import {
  AccessTime, Add, CheckCircle, Schedule, Warning,
  Person, Work, Coffee, ExitToApp, Delete, Edit,
  TrendingUp, CalendarToday, Timer, Assessment
} from '@mui/icons-material';
import { usePontoData } from '@/hooks/usePontoData';
import { useLanguage } from '@/contexts/LanguageContext';
import { messages } from '@/i18n/messages';

const Ponto = () => {
  const { data, isLoading, isError, registerPonto, updatePontoRecord, deletePontoRecord } = usePontoData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const { language } = useLanguage();
  const msg = messages[language];

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container columns={12} spacing={3} mt={2}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{msg.ponto.loadError}</Typography>
      </Box>
    );
  }

  const { todayRecords, weeklySummary, monthlyStats, recentRecords, upcomingBreaks } = data;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entrada': return <Work />;
      case 'saida': return <ExitToApp />;
      case 'intervalo_inicio': return <Coffee />;
      case 'intervalo_fim': return <Work />;
      default: return <AccessTime />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entrada': return '#4CAF50';
      case 'saida': return '#F44336';
      case 'intervalo_inicio': return '#FF9800';
      case 'intervalo_fim': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#4CAF50';
      case 'atraso': return '#F44336';
      case 'saida_antecipada': return '#FF9800';
      case 'horas_extras': return '#9C27B0';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle />;
      case 'atraso': return <Warning />;
      case 'saida_antecipada': return <Warning />;
      case 'horas_extras': return <TrendingUp />;
      default: return <AccessTime />;
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US');
  };

  const handleRegisterPonto = () => {
    setSelectedRecord(null);
    setOpenDialog(true);
  };

  const handleEditRecord = (record: any) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleSaveRecord = async (recordData: any) => {
    try {
      if (selectedRecord) {
        await updatePontoRecord(selectedRecord.id, recordData);
      } else {
        await registerPonto(recordData);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error(msg.ponto.saveError, error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {msg.ponto.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {msg.ponto.subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleRegisterPonto}
          sx={{ borderRadius: 2 }}
        >
          {msg.ponto.registerPonto}
        </Button>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container columns={12} spacing={3} mb={4}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#4CAF50', width: 48, height: 48 }}>
                  <CalendarToday />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#4CAF50">
                    {monthlyStats.totalWorkedDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {msg.ponto.workedDays}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#2196F3', width: 48, height: 48 }}>
                  <Timer />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#2196F3">
                    {monthlyStats.totalHours}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {msg.ponto.totalHours}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#9C27B0', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#9C27B0">
                    {monthlyStats.overtimeHours}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {msg.ponto.overtimeHours}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#F44336', width: 48, height: 48 }}>
                  <Warning />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#F44336">
                    {monthlyStats.lateDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {msg.ponto.lateDays}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container columns={12} spacing={3}>
        {/* Registros de Hoje */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {msg.ponto.todayRecords}
              </Typography>
              
              <List>
                {todayRecords.map((record) => (
                  <ListItem
                    key={record.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 2,
                      background: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ 
                        background: getTypeColor(record.type), 
                        width: 40, 
                        height: 40 
                      }}>
                        {getTypeIcon(record.type)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="medium">
                            {record.employeeName}
                          </Typography>
                          <Chip
                            label={record.type.replace('_', ' ')}
                            size="small"
                            sx={{
                              background: getTypeColor(record.type),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                          <Chip
                            label={record.status.replace('_', ' ')}
                            size="small"
                            variant="outlined"
                            icon={getStatusIcon(record.status)}
                            sx={{
                              borderColor: getStatusColor(record.status),
                              color: getStatusColor(record.status),
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {formatTime(record.time)}
                              </Typography>
                            </Box>
                            {record.location && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {record.location}
                                </Typography>
                              </Box>
                            )}
                            {record.device && (
                              <Typography variant="body2" color="text.secondary">
                                {record.device}
                              </Typography>
                            )}
                          </Box>
                          {record.notes && (
                            <Typography variant="body2" color="text.secondary" mt={1}>
                              {record.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box display="flex" gap={1}>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Intervalos Próximos */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.ponto.upcomingBreaks}
              </Typography>
              {upcomingBreaks.map((break_) => (
                <Box key={break_.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getTypeColor(break_.type), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getTypeIcon(break_.type)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {break_.employeeName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(break_.time)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Registros Recentes */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.ponto.recentRecords}
              </Typography>
              {recentRecords.map((record) => (
                <Box key={record.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getTypeColor(record.type), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getTypeIcon(record.type)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {record.employeeName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(record.date)} - {formatTime(record.time)}
                    </Typography>
                  </Box>
                  <Chip
                    label={record.status}
                    size="small"
                    sx={{
                      background: getStatusColor(record.status),
                      color: 'white',
                      fontSize: '0.7rem',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Resumo Semanal */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.ponto.weeklySummary}
              </Typography>
              {weeklySummary.slice(0, 3).map((summary) => (
                <Box key={summary.date} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {formatDate(summary.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {summary.workedHours}h
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(summary.workedHours / 8) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: summary.workedHours >= 8 ? '#4CAF50' : '#FF9800'
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" mt={0.5}>
                    {summary.lateMinutes > 0 && `${summary.lateMinutes}min ${msg.ponto.late}`}
                    {summary.overtimeHours > 0 && ` • ${summary.overtimeHours}h ${msg.ponto.extras}`}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para registrar/editar ponto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRecord ? msg.ponto.editRecord : msg.ponto.registerPonto}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.ponto.employee}
                  defaultValue={selectedRecord?.employeeName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{msg.ponto.type}</InputLabel>
                  <Select
                    defaultValue={selectedRecord?.type || 'entrada'}
                    label={msg.ponto.type}
                  >
                    <MenuItem value="entrada">{msg.ponto.entrada}</MenuItem>
                    <MenuItem value="saida">{msg.ponto.saida}</MenuItem>
                    <MenuItem value="intervalo_inicio">{msg.ponto.breakStart}</MenuItem>
                    <MenuItem value="intervalo_fim">{msg.ponto.breakEnd}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={msg.ponto.time}
                  type="time"
                  defaultValue={selectedRecord?.time || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.ponto.location}
                  defaultValue={selectedRecord?.location || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.ponto.notes}
                  multiline
                  rows={3}
                  defaultValue={selectedRecord?.notes || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{msg.common.cancel}</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveRecord({})}
          >
            {msg.common.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Ponto;
