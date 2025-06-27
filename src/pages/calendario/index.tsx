/**
 * Arquivo: index.tsx
 * Caminho: src/pages/calendario/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de calendário principal do sistema, conectada à API via useCalendarData.
 */

import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  CalendarToday, Assignment, MedicalServices, AccessTime, 
  LocationOn, Add, CheckCircle, Warning, Schedule,
  Event, Task, Payment, Notifications
} from '@mui/icons-material';
import { useCalendarData } from '@/hooks/useCalendarData';
import { useLanguage } from '@/contexts/LanguageContext';
import { messages } from '@/i18n/messages';

const Calendario = () => {
  const { data, isLoading, isError, addEvent, updateEvent, deleteEvent } = useCalendarData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentDate] = useState(new Date());
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
        <Typography color="error">{msg.calendar.loadError}</Typography>
      </Box>
    );
  }

  const { events, todayTasks, upcomingEvents, monthlyStats } = data;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <Assignment />;
      case 'appointment': return <MedicalServices />;
      case 'payment': return <Payment />;
      case 'reminder': return <Notifications />;
      default: return <Event />;
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleSaveEvent = async (eventData: any) => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventData);
      } else {
        await addEvent(eventData);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error(msg.calendar.saveError, error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {msg.calendar.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentDate.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEvent}
          sx={{ borderRadius: 2 }}
        >
          {msg.calendar.newEvent}
        </Button>
      </Box>

      <Grid container columns={12} spacing={3}>
        {/* Calendário Principal */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {msg.calendar.monthlyEvents}
              </Typography>
              
              {events.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: `2px solid ${event.color}20`,
                    borderRadius: 2,
                    background: `${event.color}08`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: `${event.color}15`,
                      transform: 'translateX(4px)'
                    }
                  }}
                  onClick={() => handleEditEvent(event)}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" flex={1}>
                      <Avatar sx={{ 
                        background: event.color, 
                        mr: 2, 
                        width: 40, 
                        height: 40 
                      }}>
                        {getTypeIcon(event.type)}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body1" fontWeight="medium">
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {event.date} às {event.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={event.priority}
                        size="small"
                        sx={{
                          background: getPriorityColor(event.priority),
                          color: 'white',
                          textTransform: 'capitalize'
                        }}
                      />
                      {event.completed && (
                        <CheckCircle sx={{ color: '#4CAF50' }} />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Tarefas de Hoje */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.calendar.todayTasks}
              </Typography>
              {todayTasks.map((task) => (
                <Box key={task.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: task.color, 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getTypeIcon(task.type)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.time}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => updateEvent(task.id, { completed: !task.completed })}
                  >
                    {task.completed ? (
                      <CheckCircle sx={{ color: '#4CAF50' }} />
                    ) : (
                      <Schedule sx={{ color: 'text.secondary' }} />
                    )}
                  </IconButton>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.calendar.upcomingEvents}
              </Typography>
              {upcomingEvents.map((event) => (
                <Box key={event.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: event.color, 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getTypeIcon(event.type)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.date} às {event.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.calendar.monthlyStats}
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.calendar.totalEvents}</Typography>
                  <Typography variant="body2" fontWeight="bold">{monthlyStats.totalEvents}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.calendar.completedTasks}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#4CAF50">{monthlyStats.completedTasks}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.calendar.pendingTasks}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#FF9800">{monthlyStats.pendingTasks}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.calendar.overdueTasks}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#F44336">{monthlyStats.overdueTasks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para adicionar/editar evento */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? msg.calendar.editEvent : msg.calendar.newEvent}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={msg.calendar.title}
              defaultValue={selectedEvent?.title || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={msg.calendar.description}
              multiline
              rows={3}
              defaultValue={selectedEvent?.description || ''}
              sx={{ mb: 2 }}
            />
            <Grid container columns={12} spacing={2}>
              <Grid gridColumn={{ xs: 'span 6' }}>
                <TextField
                  fullWidth
                  label={msg.calendar.date}
                  type="date"
                  defaultValue={selectedEvent?.date || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid gridColumn={{ xs: 'span 6' }}>
                <TextField
                  fullWidth
                  label={msg.calendar.time}
                  type="time"
                  defaultValue={selectedEvent?.time || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>{msg.calendar.type}</InputLabel>
              <Select
                defaultValue={selectedEvent?.type || 'task'}
                label={msg.calendar.type}
              >
                <MenuItem value="task">{msg.calendar.taskType}</MenuItem>
                <MenuItem value="appointment">{msg.calendar.appointmentType}</MenuItem>
                <MenuItem value="payment">{msg.calendar.paymentType}</MenuItem>
                <MenuItem value="reminder">{msg.calendar.reminderType}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>{msg.calendar.priority}</InputLabel>
              <Select
                defaultValue={selectedEvent?.priority || 'medium'}
                label={msg.calendar.priority}
              >
                <MenuItem value="low">{msg.calendar.lowPriority}</MenuItem>
                <MenuItem value="medium">{msg.calendar.mediumPriority}</MenuItem>
                <MenuItem value="high">{msg.calendar.highPriority}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{msg.common.cancel}</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveEvent({})}
          >
            {msg.common.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendario;
