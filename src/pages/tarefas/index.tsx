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
import { tarefasMessages } from '@/i18n/messages/tarefas.messages';
import { useLanguage } from '@/contexts/LanguageContext';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: 'housework' | 'personal' | 'work' | 'health' | 'shopping' | 'other';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  assignedTo?: string;
  tags: string[];
  estimatedTime?: string;
  actualTime?: string;
}

const Tarefas = () => {
  const { language } = useLanguage();
  const messages = tarefasMessages[language] || tarefasMessages['pt'];
  const { data, isLoading, isError, createTask, updateTask, deleteTask, toggleTaskStatus } = useTasksData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<Task>>({});

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
        <Typography color="error">{messages.erros.carregar}</Typography>
      </Box>
    );
  }

  const { tasks, todayTasks, upcomingTasks, completedTasks, categories, stats } = data || { 
    tasks: [], todayTasks: [], upcomingTasks: [], completedTasks: [], categories: [], stats: { total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0 } 
  };

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
    setFormData({});
    setOpenDialog(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      estimatedTime: task.estimatedTime,
      category: task.category,
    });
    setOpenDialog(true);
  };

  const handleSaveTask = async () => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
      } else {
        await createTask(formData as Omit<Task, 'id' | 'createdAt'>);
      }
      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleToggleStatus = async (task: Task) => {
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
            {messages.titulo} 📋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {messages.mensagens.subtitulo}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTask}
          sx={{ borderRadius: 2 }}
        >
          {messages.labels.novaTarefa}
        </Button>
      </Box>

      <Grid container columns={12} spacing={3}>
        {/* Lista de Tarefas */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              {/* Filtros */}
              <Box display="flex" gap={2} mb={3}>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>{messages.labels.status}</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label={messages.labels.status}
                  >
                    <MenuItem value="all">{messages.status.todas}</MenuItem>
                    <MenuItem value="pending">{messages.status.pendente}</MenuItem>
                    <MenuItem value="in_progress">{messages.status.emProgresso}</MenuItem>
                    <MenuItem value="completed">{messages.status.concluida}</MenuItem>
                    <MenuItem value="cancelled">{messages.status.cancelada}</MenuItem>
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
                            variant="h6"
                            sx={{
                              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                              color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                            }}
                          >
                            {task.title}
                          </Typography>
                          <Chip
                            label={messages.prioridades[task.priority] || task.priority}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(task.priority),
                              color: 'white',
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.description}
                          </Typography>
                          <Box display="flex" gap={1} alignItems="center">
                            <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {messages.labels.vencimento}: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleEditTask(task)} size="small">
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Estatísticas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {messages.labels.estatisticas}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">{messages.labels.hoje}:</Typography>
                <Typography variant="body2" fontWeight="bold">{todayTasks.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">{messages.labels.proximas}:</Typography>
                <Typography variant="body2" fontWeight="bold">{upcomingTasks.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">{messages.labels.concluidas}:</Typography>
                <Typography variant="body2" fontWeight="bold">{completedTasks.length}</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Categorias */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {messages.labels.categorias}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {categories.map((category) => (
                  <Box key={category.name} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: category.color
                        }}
                      />
                      <Typography variant="body2">{category.name}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      {category.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para adicionar/editar tarefa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedTask ? messages.labels.editarTarefa : messages.labels.novaTarefa}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={messages.labels.titulo}
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label={messages.labels.descricao}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label={messages.labels.dataVencimento}
              value={formData.dueDate || ''}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label={messages.labels.tempoEstimado}
              placeholder={messages.placeholders.tempoEstimado}
              value={formData.estimatedTime || ''}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{messages.labels.prioridade}</InputLabel>
              <Select
                value={formData.priority || 'medium'}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                label={messages.labels.prioridade}
              >
                <MenuItem value="low">{messages.prioridades.low}</MenuItem>
                <MenuItem value="medium">{messages.prioridades.medium}</MenuItem>
                <MenuItem value="high">{messages.prioridades.high}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{messages.labels.categoria}</InputLabel>
              <Select
                value={formData.category || 'personal'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                label={messages.labels.categoria}
              >
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name.toLowerCase()}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            {messages.labels.cancelar}
          </Button>
          <Button onClick={handleSaveTask} variant="contained">
            {messages.labels.salvar}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tarefas;
