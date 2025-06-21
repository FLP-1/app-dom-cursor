/**
 * Arquivo: index.tsx
 * Caminho: src/pages/ponto/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de registros de ponto
 */

import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { usePonto } from '@/hooks/usePonto';
import { PontoList } from '@/components/ponto/PontoList';
import { PontoFilter } from '@/components/ponto/PontoFilter';
import { PageHeader } from '@/components/common/PageHeader';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PontoForm } from '@/components/forms/ponto/PontoForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNotification } from '@/hooks/useNotification';

const PontoPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { registros, filtros, setFiltros, loading, error, horasDia, horasSemana, horasMes, alertas, registrarPonto, editarPonto, excluirPonto, aprovarPonto, fetchRegistros } = usePonto();
  const { showNotification } = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPonto, setSelectedPonto] = useState(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleOpenCreate = () => {
    setSelectedPonto(null);
    setModalMode('create');
    setOpenModal(true);
  };

  const handleOpenEdit = (ponto) => {
    setSelectedPonto(ponto);
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPonto(null);
  };

  const handleDelete = async (ponto) => {
    if (window.confirm(t('Deseja realmente excluir este registro de ponto?'))) {
      try {
        await excluirPonto(ponto.id);
        showNotification({ type: 'success', message: t('Registro de ponto excluído com sucesso!') });
      } catch {
        showNotification({ type: 'error', message: t('Erro ao excluir registro de ponto.') });
      }
    }
  };

  const handleValidate = async (ponto) => {
    if (window.confirm(t('Deseja aprovar este registro de ponto?'))) {
      try {
        await aprovarPonto(ponto.id);
        showNotification({ type: 'success', message: t('Registro de ponto aprovado com sucesso!') });
      } catch {
        showNotification({ type: 'error', message: t('Erro ao aprovar registro de ponto.') });
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalMode === 'edit' && selectedPonto) {
        await editarPonto(selectedPonto.id, data);
        showNotification({ type: 'success', message: t('Registro de ponto atualizado com sucesso!') });
      } else {
        await registrarPonto(data);
        showNotification({ type: 'success', message: t('Registro de ponto criado com sucesso!') });
      }
      setOpenModal(false);
    } catch {
      showNotification({ type: 'error', message: t('Erro ao salvar registro de ponto.') });
    }
  };

  if (loading && registros.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Registro de Ponto')}
        onAdd={handleOpenCreate}
        onRefresh={fetchRegistros}
        addButtonText={t('Registrar Ponto')}
      />

      <Box sx={{ mt: 3 }}>
        <PontoFilter filtros={filtros} setFiltros={setFiltros} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <PontoList
          registros={registros}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onValidate={handleValidate}
        />
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm" aria-labelledby="modal-ponto-titulo">
        <DialogTitle id="modal-ponto-titulo">
          {modalMode === 'create' && t('Registrar Ponto')}
          {modalMode === 'edit' && t('Editar Registro de Ponto')}
        </DialogTitle>
        <DialogContent>
          <PontoForm
            initialValues={selectedPonto || {}}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            loading={loading}
            horasDia={horasDia}
            horasSemana={horasSemana}
            horasMes={horasMes}
            alertas={alertas}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            {t('Fechar')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PontoPage; 
