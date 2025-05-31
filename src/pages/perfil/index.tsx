import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Snackbar, Card, CardContent, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useNotification } from '../../hooks/useNotification';
import { usePerfilForm } from '../../hooks/usePerfilForm';
import { usePerfil } from '../../hooks/usePerfil';
import { Perfil } from '../../types/perfil';
import { PerfilForm } from '../../components/perfil/PerfilForm';
import { PageHeader } from '../../components/common/PageHeader';
import { api } from '../../services/api';

export default function PerfilPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const { updatePerfil } = usePerfilForm();
  const { loading } = usePerfil();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSuccess = async () => {
    handleCloseForm();
    await loadPerfil();
  };

  const loadPerfil = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/perfil');
      setPerfil(response.data);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('perfil.messages.erroCarregar'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  if (isLoading && !perfil) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Perfil')}
        onEdit={handleOpenForm}
      />

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {t('perfil.informacoesPessoais')}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    <strong>{t('perfil.nome.label')}:</strong> {perfil?.nome}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t('perfil.email.label')}:</strong> {perfil?.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t('perfil.telefone.label')}:</strong> {perfil?.telefone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {t('perfil.informacoesConta')}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    <strong>{t('perfil.perfil.label')}:</strong> {perfil?.perfil}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t('perfil.status.label')}:</strong> {perfil?.status}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t('perfil.dataCriacao.label')}:</strong> {formatDateBR(perfil?.dataCriacao)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {t('perfil.ultimasAtividades')}
                </Typography>
                {/* Adicionar lista de últimas atividades */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <PerfilForm
        perfil={perfil}
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