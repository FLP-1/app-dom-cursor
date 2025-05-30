import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
  DialogContentText,
  Modal,
  Container,
  TablePagination,
  InputAdornment,
  Snackbar,
  Chip,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, Search as SearchIcon, FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { formatDateBR } from '../../utils/date';

// Define a basic interface for an Alert (should match backend structure)
interface AlertData {
  alert_id: number;
  type: string;
  message: string;
  severity: string;
  channels: string[]; // Assuming channels is an array of strings
  created_at: string; // Assuming date is returned as string
  criteria: Record<string, unknown>; // Substituído 'any' por objeto genérico
  preferences: Record<string, unknown>; // Substituído 'any' por objeto genérico
  created_by: number; // Include created_by for potential future use on frontend
}

// Define interface for JWT payload (should match backend auth utility)
interface JwtPayload {
  userId: number;
  userType: string;
  // Add any other relevant user info you included in the token
  exp: number; // Expiration timestamp
}

// Define interface for new alert data (for the form)
interface NewAlertData {
    type: string;
    message: string;
    severity: string;
    channels: string[];
    criteria: Record<string, unknown>; // Substituído 'any' por objeto genérico
    preferences: Record<string, unknown>; // Substituído 'any' por objeto genérico
}

const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create modal
  const [newAlertData, setNewAlertData] = useState<NewAlertData>({
      type: '',
      message: '',
      severity: '',
      channels: [],
      criteria: {},
      preferences: {},
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view modal
  const [viewingAlertData, setViewingAlertData] = useState<AlertData | null>(null); // State for alert data being viewed
  const [loadingView, setLoadingView] = useState(false); // Loading state for fetching single alert
  const [errorView, setErrorView] = useState(''); // Error state for fetching single alert

  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null); // Estado para armazenar o alerta selecionado

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<AlertData | null>(null);

  // Estados para paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('');

  // Estados para filtros adicionais
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [channelFilter, setChannelFilter] = useState<string[]>([]);

  // Estado para confirmação de alterações
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<AlertData | null>(null);

  // Estado para notificações
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Estado para confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Decode token and get user type on component mount
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
         // Check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
           setCurrentUserType(decodedToken.userType);
        } else {
            // TODO: Handle expired token (e.g., clear token, redirect to login)
             console.log('Token expirado.');
             localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        // TODO: Handle invalid token (e.g., clear token, redirect to login)
         localStorage.removeItem('token');
      }
    }

    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token'); // Get token from storage
      if (!token) {
        // TODO: Redirect to login if no token
        setError('Usuário não autenticado. Redirecionando para login...');
        setLoading(false);
        // window.location.href = '/auth/login'; // Example redirect
        return;
      }

      const response = await fetch('/api/alerts/list', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao carregar alertas.');
      }

      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement handlers for Edit actions
  const handleCreateClick = () => {
    setIsCreateModalOpen(true); // Open create modal
  };

  const handleViewAlert = async (alertId: number) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedAlert(data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do alerta:', error);
      // TODO: Exibir mensagem de erro para o usuário
    }
  };

  const handleEditClick = async (alertId: number) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEditingAlert(data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do alerta para edição:', error);
      setError('Erro ao carregar dados do alerta para edição');
    }
  };

  const handleDeleteClick = (alertId: number) => {
    setAlertToDelete(alertId);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateModalClose = () => {
      setIsCreateModalOpen(false);
      // Reset form data when closing modal
       setNewAlertData({
           type: '',
           message: '',
           severity: '',
           channels: [],
           criteria: {},
           preferences: {},
       });
       setError(''); // Clear main error when closing create modal
  };

   const handleViewModalClose = () => {
       setIsViewModalOpen(false);
       setViewingAlertData(null); // Clear viewed data on close
       setErrorView(''); // Clear view modal error
   };

  const handleNewAlertInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewAlertData({ ...newAlertData, [name]: value });
  };

   const handleSeverityChange = (e: React.ChangeEvent<{ value: unknown }>) => {
       setNewAlertData({ ...newAlertData, severity: e.target.value as string });
   };

   const handleChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const { value, checked } = event.target;
       setNewAlertData(prevData => {
           const newChannels = checked
               ? [...prevData.channels, value]
               : prevData.channels.filter(channel => channel !== value);
           return { ...prevData, channels: newChannels };
       });
   };

   const handleSaveNewAlert = async () => {
       setLoading(true); // Show loading indicator during save
       // Error state is handled at the component level, will be displayed in the modal if open

       try {
           const token = localStorage.getItem('token');
            if (!token) {
               setError('Usuário não autenticado.'); // Set main error
               setLoading(false);
                // TODO: Redirect to login
               return;
            }

            const response = await fetch('/api/alerts/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAlertData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar alerta.');
            }

            // Close modal, clear form, refetch alerts, show success message
             handleCreateModalClose(); // Close modal and reset form
             fetchAlerts(); // Refresh the list of alerts
             showNotification(data.message || 'Alerta criado com sucesso!'); // Replace with better notification

       } catch (err) {
           setError(err.message); // Set main error
           console.error('Error saving new alert:', err);
       } finally {
           setLoading(false);
       }
   };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingAlert(null);
    setError('');
  };

  const handleEditAlert = async () => {
    if (!editingAlert) return;
    setPendingChanges(editingAlert);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    if (!pendingChanges) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/alerts/${pendingChanges.alert_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(pendingChanges),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar alerta');
      }

      const data = await response.json();
      handleEditModalClose();
      setIsConfirmDialogOpen(false);
      setPendingChanges(null);
      fetchAlerts();
      showNotification('Alerta atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar alerta:', error);
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Função para mostrar notificação
  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Função para fechar notificação
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Função para obter cor baseada na severidade
  const getSeverityColor = (severity: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (severity.toLowerCase()) {
      case 'baixa':
        return 'success';
      case 'média':
        return 'info';
      case 'severa':
        return 'warning';
      case 'urgente':
        return 'error';
      default:
        return 'default';
    }
  };

  // Nova função para confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!alertToDelete) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Usuário não autenticado.', 'error');
        return;
      }

      const response = await fetch(`/api/alerts/${alertToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao excluir alerta.');
      }

      setAlerts(alerts.filter(alert => alert.alert_id !== alertToDelete));
      showNotification('Alerta excluído com sucesso!');
    } catch (err) {
      showNotification(err.message, 'error');
      console.error('Error deleting alert:', err);
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setAlertToDelete(null);
    }
  };

  // Determine if the current user is allowed to create/edit/delete alerts
  const canManageAlerts = currentUserType === 'Administrador' || currentUserType === 'Empregador';

  // Função para filtrar alertas (atualizada)
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !severityFilter || alert.severity === severityFilter;
    
    // Filtro por data
    const alertDate = new Date(alert.created_at);
    const matchesStartDate = !startDate || alertDate >= startDate;
    const matchesEndDate = !endDate || alertDate <= endDate;
    
    // Filtro por canais
    const matchesChannels = channelFilter.length === 0 || 
                          channelFilter.every(channel => alert.channels.includes(channel));

    return matchesSearch && matchesSeverity && matchesStartDate && matchesEndDate && matchesChannels;
  });

  // Função para paginar alertas
  const paginatedAlerts = filteredAlerts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Função para exportar dados
  const handleExportData = () => {
    try {
      // Preparar dados para exportação
      const exportData = filteredAlerts.map(alert => ({
        ID: alert.alert_id,
        Tipo: alert.type,
        Mensagem: alert.message,
        Severidade: alert.severity,
        Canais: alert.channels.join(', '),
        'Criado em': formatDateBR(alert.created_at),
        'Atualizado em': formatDateBR(alert.updated_at),
      }));

      // Converter para CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escapar vírgulas e aspas no valor
            return `"${String(value).replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');

      // Criar e baixar arquivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `alertas_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showNotification('Dados exportados com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      showNotification('Erro ao exportar dados', 'error');
    }
  };

  if (loading && alerts.length === 0) { // Show spinner only on initial load or when list is empty
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !isCreateModalOpen && !isViewModalOpen) { // Show main error only if no modals are open
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        {/* Optional: Add a retry button */}
        {!loading && <Button onClick={fetchAlerts}>Tentar novamente</Button>}
      </Box>
    );
  }

   // Show loading spinner on top of the content during operations other than initial load
   if(loading) {
       return (
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Gestão de Alertas</Typography>
                <CircularProgress size={24} sx={{ mr: 2 }} /> Carregando...
                {/* Render existing content while loading */}
                <Box mb={2}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateClick} disabled={!canManageAlerts}>
                        Criar Novo Alerta
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Mensagem</TableCell>
                                <TableCell>Severidade</TableCell>
                                <TableCell>Canais</TableCell>
                                <TableCell>Criado Em</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAlerts.map((alert) => (
                                <TableRow key={alert.alert_id}>
                                    <TableCell>{alert.alert_id}</TableCell>
                                    <TableCell>{alert.type}</TableCell>
                                    <TableCell>{alert.message}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={alert.severity}
                                            color={getSeverityColor(alert.severity)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{alert.channels.join(', ')}</TableCell>
                                    <TableCell>{formatDateBR(alert.created_at)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleViewAlert(alert.alert_id)} title="Visualizar">
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleEditClick(alert.alert_id)} title="Editar" disabled={!canManageAlerts}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteClick(alert.alert_id)} title="Excluir" disabled={!canManageAlerts}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

  if (loading && alerts.length === 0) { // Show spinner only on initial load or when list is empty
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !isCreateModalOpen && !isViewModalOpen) { // Show main error only if no modals are open
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        {/* Optional: Add a retry button */}
        {!loading && <Button onClick={fetchAlerts}>Tentar novamente</Button>}
      </Box>
    );
  }

   // Show loading spinner on top of the content during operations other than initial load
   if(loading) {
       return (
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Gestão de Alertas</Typography>
                <CircularProgress size={24} sx={{ mr: 2 }} /> Carregando...
                {/* Render existing content while loading */}
                <Box mb={2}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateClick} disabled={!canManageAlerts}>
                        Criar Novo Alerta
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Mensagem</TableCell>
                                <TableCell>Severidade</TableCell>
                                <TableCell>Canais</TableCell>
                                <TableCell>Criado Em</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAlerts.map((alert) => (
                                <TableRow key={alert.alert_id}>
                                    <TableCell>{alert.alert_id}</TableCell>
                                    <TableCell>{alert.type}</TableCell>
                                    <TableCell>{alert.message}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={alert.severity}
                                            color={getSeverityColor(alert.severity)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{alert.channels.join(', ')}</TableCell>
                                    <TableCell>{formatDateBR(alert.created_at)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleViewAlert(alert.alert_id)} title="Visualizar">
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleEditClick(alert.alert_id)} title="Editar" disabled={!canManageAlerts}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDeleteClick(alert.alert_id)} title="Excluir" disabled={!canManageAlerts}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
};

export default AlertManagement; 