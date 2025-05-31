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
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useAlerts } from '../../hooks/useAlerts';
import { AlertFilter } from '../../types/alert';
import { useForm } from 'react-hook-form';
import { AlertFilters } from '../../components/alerts/AlertFilters';
import { AlertTable } from '../../components/alerts/AlertTable';
import { AlertService } from '../../services/alert.service';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';

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
  const { t } = useTranslation();
  const router = useRouter();
  const { alerts, tipos, loading, error, filtros, setFiltros, atualizar } = useAlerts();
  const { control, handleSubmit } = useForm<AlertFilter>({ defaultValues: filtros });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (data: AlertFilter) => {
    setFiltros(data);
  };

  const handleVisualizar = (id: string) => {
    router.push(`/alerts/${id}`);
  };

  const handleEditar = (id: string) => {
    router.push(`/alerts/${id}/editar`);
  };

  const handleExcluir = async (id: string) => {
    try {
      await AlertService.remove(id);
      atualizar();
      setSnackbar({ open: true, message: t('Alerta excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir alerta.'), severity: 'error' });
    }
  };

  if (loading && alerts.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{t(error)}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Alertas')}
        onAdd={() => router.push('/alerts/novo')}
        onRefresh={atualizar}
        addButtonText={t('Novo Alerta')}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertFilters control={control} tipos={tipos} />
      </form>

      <Box sx={{ mt: 4 }}>
        <AlertTable
          alerts={alerts}
          onVisualizar={handleVisualizar}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
          loading={loading}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlertManagement; 