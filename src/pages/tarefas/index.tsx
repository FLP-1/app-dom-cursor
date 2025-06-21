/**
 * Arquivo: index.tsx
 * Caminho: src/pages/tarefas/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de tarefas principal do sistema, conectada à API via useTasksData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
  Checkbox, Fab
} from '@mui/material';
import {
  Assignment, Add, CheckCircle, Schedule, Warning,
  Home, ShoppingCart, HealthAndSafety, Work, Person,
  Delete, Edit, MoreVert, TrendingUp, CalendarToday
} from '@mui/icons-material';
import { useTasksData } from '@/hooks/useTasksData';

const Tarefas = () => {
  const { data, isLoading, isError, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasksData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={4}>
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
        <Typography color="error">Falha ao carregar as tarefas.</Typography>
      </Box>
    );
  }

  const { tasks, todayTasks, upcomingTasks, completedTasks, categories, stats } = data;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#757575';
      default: return '#757575';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housework': return <Home />;
      case 'shopping': return <ShoppingCart />;
      case 'health': return <HealthAndSafety />;
      case 'work': return <Work />;
      case 'personal': return <Person />;
      default: return <Assignment />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name.toLowerCase().includes(category));
    return cat ? cat.color : '#757575';
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'all') return true;
    return task.status === selectedStatus;
  });

  const handleAddTask = () => {
    setSelectedTask(null);
    setOpenDialog(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleSaveTask = async (taskData: any) => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleToggleStatus = async (task: any) => {
    try {
      await toggleTaskStatus(task.id, task.status);
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Tarefas 📋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Organize suas atividades diárias
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTask}
          sx={{ borderRadius: 2 }}
        >
          Nova Tarefa
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Lista de Tarefas */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              {/* Filtros */}
              <Box display="flex" gap={2} mb={3}>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">Todas</MenuItem>
                    <MenuItem value="pending">Pendentes</MenuItem>
                    <MenuItem value="in_progress">Em Progresso</MenuItem>
                    <MenuItem value="completed">Concluídas</MenuItem>
                    <MenuItem value="cancelled">Canceladas</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Lista de Tarefas */}
              <List>
                {filteredTasks.map((task) => (
                  <ListItem
                    key={task.id}
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
                      <Checkbox
                        checked={task.status === 'completed'}
                        onChange={() => handleToggleStatus(task)}
                        sx={{
                          color: getStatusColor(task.status),
                          '&.Mui-checked': {
                            color: getStatusColor(task.status),
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography 
                            variant="body1" 
                            fontWeight="medium"
                            sx={{
                              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                              color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                            }}
                          >
                            {task.title}
                          </Typography>
                          <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                              background: getPriorityColor(task.priority),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                          <Chip
                            label={task.status}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: getStatusColor(task.status),
                              color: getStatusColor(task.status),
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {task.description}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {task.dueDate}
                              </Typography>
                            </Box>
                            {task.estimatedTime && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {task.estimatedTime}
                                </Typography>
                              </Box>
                            )}
                            <Box display="flex" gap={0.5}>
                              {task.tags.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          </Box>
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
        <Grid item xs={12} md={4}>
          {/* Tarefas de Hoje */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Tarefas de Hoje
              </Typography>
              {todayTasks.map((task) => (
                <Box key={task.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getCategoryColor(task.category), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getCategoryIcon(task.category)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.estimatedTime}
                    </Typography>
                  </Box>
                  <Checkbox
                    checked={task.status === 'completed'}
                    onChange={() => handleToggleStatus(task)}
                    size="small"
                  />
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Próximas Tarefas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Próximas Tarefas
              </Typography>
              {upcomingTasks.map((task) => (
                <Box key={task.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getCategoryColor(task.category), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getCategoryIcon(task.category)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.dueDate}
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
                Estatísticas
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Total</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Pendentes</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#FF9800">{stats.pending}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Em Progresso</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#2196F3">{stats.inProgress}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Concluídas</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#4CAF50">{stats.completed}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Atrasadas</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#F44336">{stats.overdue}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para adicionar/editar tarefa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Título"
              defaultValue={selectedTask?.title || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descrição"
              multiline
              rows={3}
              defaultValue={selectedTask?.description || ''}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Data de Vencimento"
                  type="date"
                  defaultValue={selectedTask?.dueDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tempo Estimado"
                  defaultValue={selectedTask?.estimatedTime || ''}
                  placeholder="ex: 1h, 30min"
                />
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Prioridade</InputLabel>
              <Select
                defaultValue={selectedTask?.priority || 'medium'}
                label="Prioridade"
              >
                <MenuItem value="low">Baixa</MenuItem>
                <MenuItem value="medium">Média</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                defaultValue={selectedTask?.category || 'personal'}
                label="Categoria"
              >
                <MenuItem value="housework">Trabalho Doméstico</MenuItem>
                <MenuItem value="shopping">Compras</MenuItem>
                <MenuItem value="health">Saúde</MenuItem>
                <MenuItem value="personal">Pessoal</MenuItem>
                <MenuItem value="work">Trabalho</MenuItem>
                <MenuItem value="other">Outros</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveTask({})}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tarefas;
