import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useNotification } from '../../hooks/useNotification';
import { useUsuarioForm } from '../../hooks/useUsuarioForm';
import { useUsuarios } from '../../hooks/useUsuarios';
import { Usuario } from '../../types/usuario';
import { UsuarioForm } from '../../components/usuarios/UsuarioForm';
import { PageHeader } from '../../components/common/PageHeader';
import { TableActions } from '../../components/common/TableActions';
import { api } from '../../services/api';
import { formatDateBR } from '../../utils/formatters';

export default function UsuariosPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { updateUsuario, deleteUsuario } = useUsuarioForm();
  const { loading } = useUsuarios();
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSuccess = async () => {
    handleCloseForm();
    await loadUsuarios();
  };

  const loadUsuarios = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('usuario.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUsuario(id);
      await loadUsuarios();
      setSnackbar({ open: true, message: t('Usuário excluído com sucesso!'), severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: t('Erro ao excluir usuário.'), severity: 'error' });
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  if (isLoading && usuarios.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Usuários')}
        onAdd={handleOpenForm}
        onRefresh={loadUsuarios}
        addButtonText={t('Novo Usuário')}
      />

      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('usuarios.nome.label')}</TableCell>
                <TableCell>{t('usuarios.email.label')}</TableCell>
                <TableCell>{t('usuarios.perfil.label')}</TableCell>
                <TableCell>{t('usuarios.status.label')}</TableCell>
                <TableCell>{t('usuarios.dataCriacao.label')}</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.perfil}</TableCell>
                  <TableCell>{usuario.status}</TableCell>
                  <TableCell>{formatDateBR(usuario.dataCriacao)}</TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => handleEdit(usuario)}
                      onDelete={() => handleDelete(usuario.id)}
                      disabled={loading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <UsuarioForm
        usuario={selectedUsuario}
        onSuccess={handleSuccess}
        open={isFormOpen}
        onClose={handleCloseForm}
      />

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
} 